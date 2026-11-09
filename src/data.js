// Content for the site. Edit this file to update services, projects, properties and testimonials.
// Projects/properties use gradient "art" as placeholders — swap `image` for a real path (e.g. "/images/x.jpg").

export const services = [
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
    title: 'Graphic Design',
    text: 'Logos, brand identities, social media kits, flyers, packaging and print — visuals that make people stop and look.',
    items: ['Brand Identity', 'Logo Design', 'Print & Packaging', 'Social Media Kits'],
  },
  {
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l-2 2 2 2M17 8l2 2-2 2M13 7l-2 6"/></svg>`,
    title: 'Web Design & Development',
    text: 'Modern, fast, responsive websites — designed with intent and built to convert, from landing pages to full business sites.',
    items: ['UI / UX Design', 'Responsive Websites', 'E-commerce', 'Maintenance & SEO'],
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>`,
    title: 'Real Estate',
    text: 'Buying, selling or letting — guided by local expertise, honest advice and beautifully marketed listings.',
    items: ['Property Sales', 'Rentals & Letting', 'Property Marketing', 'Investment Advice'],
  },
];

export const projects = [
  { title: 'Aurum Coffee Co.', category: 'graphic', tag: 'Brand Identity', year: 2026, art: 'linear-gradient(135deg,#1a1a1a 0%,#3a2f12 60%,#d4af37 140%)', glyph: 'A', desc: 'Complete brand identity for a specialty coffee roaster — logo, packaging, menu boards and signage in a warm black-and-gold palette.' },
  { title: 'Noir Living', category: 'web', tag: 'Website', year: 2026, art: 'linear-gradient(160deg,#0d0d0d 0%,#262626 55%,#8a7224 130%)', glyph: 'N', desc: 'A minimalist e-commerce site for a luxury furniture brand. Custom product pages, smooth animations, and a 98 Lighthouse score.' },
  { title: 'The Westlands Residence', category: 'realestate', tag: 'Property Campaign', year: 2025, art: 'linear-gradient(200deg,#f5f1e6 -20%,#2a2a2a 50%,#0a0a0a 100%)', glyph: 'W', desc: 'Full marketing campaign for a premium residential development — brochure, website, and social ads that sold out phase one in 6 weeks.' },
  { title: 'Bloom Florals', category: 'graphic', tag: 'Logo & Print', year: 2025, art: 'linear-gradient(120deg,#d4af37 -30%,#1c1c1c 45%,#0a0a0a 100%)', glyph: 'B', desc: 'Elegant wordmark, business cards and gift-tag system for a boutique florist.' },
  { title: 'Kora Fitness', category: 'web', tag: 'Web App', year: 2025, art: 'linear-gradient(145deg,#0a0a0a 10%,#333 70%,#f4e4a6 160%)', glyph: 'K', desc: 'Class-booking website with member dashboard, built mobile-first for a growing gym brand.' },
  { title: 'Lavington Villas', category: 'realestate', tag: 'Listing Design', year: 2026, art: 'linear-gradient(180deg,#1a1a1a 0%,#0a0a0a 50%,#b8962e 160%)', glyph: 'L', desc: 'Listing photography direction, virtual-tour microsite and print flyers for a set of four executive villas.' },
  { title: 'Saffron Kitchen', category: 'graphic', tag: 'Menu & Social', year: 2024, art: 'linear-gradient(90deg,#0a0a0a 0%,#2b2414 60%,#e6c35c 150%)', glyph: 'S', desc: 'Menu design and a 3-month social content kit for a modern African restaurant.' },
  { title: 'Atelier Studio', category: 'web', tag: 'Portfolio Site', year: 2024, art: 'linear-gradient(225deg,#f8f6f0 -40%,#1a1a1a 40%,#0a0a0a 100%)', glyph: 'A', desc: 'An editorial-style portfolio website for an architecture studio with a custom CMS.' },
];

export const properties = [
  { title: 'Modern 4-Bed Villa', location: 'Karen, Nairobi', price: 'KES 85,000,000', status: 'For Sale', beds: 4, baths: 5, area: '420 m²', art: 'linear-gradient(160deg,#2a2a2a 0%,#0a0a0a 60%,#d4af37 180%)' },
  { title: 'Penthouse with City Views', location: 'Westlands, Nairobi', price: 'KES 350,000 / mo', status: 'For Rent', beds: 3, baths: 3, area: '260 m²', art: 'linear-gradient(200deg,#d4af37 -40%,#1a1a1a 50%,#0a0a0a 100%)' },
  { title: 'Garden Townhouse', location: 'Kilimani, Nairobi', price: 'KES 32,500,000', status: 'For Sale', beds: 3, baths: 3, area: '210 m²', art: 'linear-gradient(130deg,#0a0a0a 20%,#333 80%,#f4e4a6 160%)' },
];

export const testimonials = [
  { quote: 'Meggie completely transformed our brand. The new identity feels premium and our customers noticed immediately.', name: 'Wanjiru K.', role: 'Founder, Aurum Coffee Co.' },
  { quote: 'Our website went from outdated to stunning. Fast, beautiful, and our enquiries doubled within a month.', name: 'David O.', role: 'Director, Noir Living' },
  { quote: 'Finding our home was effortless. Meggie listened, shortlisted perfectly, and handled everything professionally.', name: 'Amina & Joseph', role: 'Homeowners, Karen' },
];
