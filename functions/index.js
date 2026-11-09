import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions, logger } from 'firebase-functions/v2';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

setGlobalOptions({ region: 'europe-west1', maxInstances: 5 });

initializeApp();
const db = getFirestore();

const SERVICES = new Set([
  'Graphic Design',
  'Web Design & Development',
  'Real Estate — Buying',
  'Real Estate — Selling / Letting',
  'Something else',
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/**
 * API served under /api/** via the Hosting rewrite.
 *   POST /api/enquiry  { name, email, service, message, website? }  → 201 { ok: true, id }
 */
export const api = onRequest({ cors: false }, async (req, res) => {
  if (req.path !== '/api/enquiry') {
    res.status(404).json({ ok: false, error: 'Not found' });
    return;
  }
  if (req.method !== 'POST') {
    res.set('Allow', 'POST').status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: real visitors never fill the hidden "website" field. Pretend success for bots.
  if (clean(body.website, 200)) {
    res.status(201).json({ ok: true });
    return;
  }

  const enquiry = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    service: clean(body.service, 80),
    message: clean(body.message, 5000),
  };

  const errors = [];
  if (enquiry.name.length < 2) errors.push('name');
  if (!EMAIL_RE.test(enquiry.email)) errors.push('email');
  if (!SERVICES.has(enquiry.service)) errors.push('service');
  if (enquiry.message.length < 5) errors.push('message');
  if (errors.length) {
    res.status(400).json({ ok: false, error: 'Invalid fields', fields: errors });
    return;
  }

  try {
    const ref = await db.collection('enquiries').add({
      ...enquiry,
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
      userAgent: clean(req.get('user-agent'), 300),
      ip: clean(req.get('x-forwarded-for')?.split(',')[0], 64),
    });
    logger.info('New enquiry', { id: ref.id, service: enquiry.service });
    res.status(201).json({ ok: true, id: ref.id });
  } catch (err) {
    logger.error('Failed to save enquiry', err);
    res.status(500).json({ ok: false, error: 'Could not save enquiry' });
  }
});
