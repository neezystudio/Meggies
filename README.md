# Meggie's

A modern portfolio site for a multidisciplinary creative — **graphic design**, **web design & development**, and **real estate**. Bold brutalist black, white & gold theme (Archivo Black + Space Grotesk/Mono), built with vanilla JavaScript and [Vite](https://vitejs.dev).

## Features

- Animated hero with typed word rotator, cursor-follow glow and grid backdrop
- Custom gold cursor and magnetic buttons (auto-disabled on touch devices)
- Scroll-reveal animations and animated stat counters
- Filterable portfolio with project detail modal
- Featured property listings with one-click enquiry (prefills the contact form)
- Testimonial slider, process timeline, contact form with validation
- Fully responsive, keyboard accessible, respects `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Editing content

All services, projects, properties and testimonials live in [`src/data.js`](src/data.js).
Projects and properties currently use gradient placeholders — drop real images into `public/images/` and update the data/markup to use them.

Contact details (email, phone, socials) are in [`index.html`](index.html). The contact form currently opens the visitor's email app; connect it to Formspree, EmailJS or a serverless function for direct submissions.

## Structure

```
index.html        # page markup
src/main.js       # rendering + interactions
src/data.js       # site content
src/style.css     # theme & layout
public/           # static assets (favicon, images)
```
