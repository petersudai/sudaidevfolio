export type Screen = { src: string; label: string };

export type Project = {
  slug: string;
  title: string;
  type: string;
  url: string;
  accent: string;
  outcome: string;
  description: string;
  meta: string;
  screens: Screen[];
  featured?: boolean;
  // Case study fields
  year: string;
  role: string;
  location: string;
  intro: string;
  highlights: string[];
  stack: string[];
  palette: { name: string; hex: string }[];
};

/*
 * Single source of truth for every project.
 * Order here is the order shown on the home page.
 * The first entry renders as the featured block.
 */
export const PROJECTS: Project[] = [
  {
    slug: "mawimbi",
    title: "Mawimbi Energy",
    type: "Brand website · Consumer product",
    url: "https://mawimbi-diani.vercel.app",
    accent: "#22d3ee",
    featured: true,
    outcome: "A Kenyan coastal brand launched online before hitting a single shelf",
    description:
      "Brand and pre-launch platform for Mawimbi, an energy drink born at the edge of the Indian Ocean in Diani, Kenya. Six flavours crafted from coastal botanicals and marine minerals, an early access waitlist and a visual identity built around the rhythm of the Kenyan coast.",
    meta: "Next.js · Tailwind · Brand identity · Pre-launch",
    year: "2026",
    role: "Brand and web",
    location: "Diani, Kenya",
    palette: [
      { name: "Ocean",    hex: "#22d3ee" },
      { name: "Lagoon",   hex: "#0e7490" },
      { name: "Deep sea", hex: "#06141d" },
      { name: "Sand",     hex: "#e8e2d4" },
    ],
    intro:
      "Mawimbi is an energy drink from Diani, on the Kenyan coast. The brand needed a home online before the cans reached any shelf. The site introduces the six flavours, tells the story behind the drink, and gathers an early list of people who want it first.",
    highlights: [
      "Full visual identity and art direction",
      "Six flavour range, each with its own colour story",
      "Early access waitlist with email capture",
      "Built mobile first for a young coastal audience",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    screens: [
      { src: "/images/mawimbi/hero.png",     label: "Hero"     },
      { src: "/images/mawimbi/product.png",  label: "Product"  },
      { src: "/images/mawimbi/flavours.png", label: "Flavours" },
      { src: "/images/mawimbi/waitlist.png", label: "Waitlist" },
    ],
  },
  {
    slug: "aura-residences",
    title: "Aura Residences",
    type: "Real estate · Luxury residential",
    url: "https://aura-residences-alpha.vercel.app",
    accent: "#c9a166",
    outcome: "42 luxury residences presented through a single digital experience",
    description:
      "A premium real estate platform for a curated collection of 42 residences in Westlands, Nairobi. Three tiers from executive to penthouse, a private viewing scheduler and an amenities showcase built to match the architecture it sells.",
    meta: "React · Vite · Tailwind · Booking calendar",
    year: "2026",
    role: "Design and development",
    location: "Westlands, Nairobi",
    palette: [
      { name: "Champagne", hex: "#c9a166" },
      { name: "Warm sand", hex: "#e7ddcb" },
      { name: "Charcoal",  hex: "#1a1714" },
      { name: "Ink",       hex: "#0c0a08" },
    ],
    intro:
      "Aura Residences is a collection of 42 homes in Westlands, Nairobi. The site sells the building the way the building sells itself, through space, light and detail. Buyers move through the residences, study the floor plans, and book a private viewing without filling in a long form first.",
    highlights: [
      "Three residence tiers from executive to penthouse",
      "Private viewing scheduler with a real calendar",
      "Amenities shown through full bleed photography",
      "Location section mapping the surrounding district",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    screens: [
      { src: "/images/aura-residences/hero.png",       label: "Landing"         },
      { src: "/images/aura-residences/residences.png", label: "Residences"      },
      { src: "/images/aura-residences/amenities.png",  label: "Amenities"       },
      { src: "/images/aura-residences/viewing.png",    label: "Private viewing" },
      { src: "/images/aura-residences/location.png",   label: "Location"        },
    ],
  },
  {
    slug: "ticketforge",
    title: "TicketForge",
    type: "Live SaaS · Event management",
    url: "https://ticketforge.vercel.app",
    accent: "#8b5cf6",
    outcome: "Live across East Africa. Real events, real revenue.",
    description:
      "A full-cycle event management SaaS serving organizers across East Africa. M-Pesa native payments, QR-based entry validation, real-time attendee dashboards and tiered ticketing. All in one platform built from the ground up.",
    meta: "Next.js · Supabase · PostgreSQL · M-Pesa",
    year: "2026",
    role: "Product design and full stack",
    location: "East Africa",
    palette: [
      { name: "Violet",   hex: "#8b5cf6" },
      { name: "Indigo",   hex: "#6366f1" },
      { name: "Midnight", hex: "#070f18" },
      { name: "Mint",     hex: "#2dd4bf" },
    ],
    intro:
      "TicketForge runs events end to end. Organizers sell tickets, take M-Pesa payments, and validate entry with QR codes at the door. A live dashboard shows sales and attendance as the event happens. Everything was built from scratch, from the database to the gate.",
    highlights: [
      "M-Pesa payments built in, not bolted on",
      "QR codes that validate entry in under a second",
      "General and VIP tiers with their own rules",
      "Live dashboard for sales and attendance",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "M-Pesa API"],
    screens: [
      { src: "/images/ticketforge/landing.png",     label: "Landing page"    },
      { src: "/images/ticketforge/marketplace.png", label: "Event discovery" },
      { src: "/images/ticketforge/ticket-qr.png",   label: "QR ticket"       },
    ],
  },
  {
    slug: "sarah-mitchell",
    title: "Sarah Mitchell Consulting",
    type: "Business website · Lead generation",
    url: "https://sarahmitchellcorp.vercel.app",
    accent: "#c2510c",
    outcome: "Converts C-suite visitors into booked calls before they hit the form",
    description:
      "Built for a business consultant targeting mid-market CEOs. Every section earns its place. Credibility-first hero with floating proof overlays, social validation built into the layout, and a booking form designed to qualify leads before the first call is ever made.",
    meta: "Next.js · Tailwind · Lead generation",
    year: "2026",
    role: "Design and development",
    location: "Remote",
    palette: [
      { name: "Ember",    hex: "#c2510c" },
      { name: "Clay",     hex: "#e07a3e" },
      { name: "Off white", hex: "#f5f1ea" },
      { name: "Graphite", hex: "#1c1a17" },
    ],
    intro:
      "Sarah Mitchell advises mid-market CEOs. Her site has one job: turn a senior visitor into a booked call. The layout leads with credibility, carries proof through every section, and ends with a form that qualifies the lead before the first conversation.",
    highlights: [
      "Credibility-first hero with proof overlays",
      "Social proof woven through the layout",
      "Booking form that qualifies leads up front",
      "Clean, senior tone that matches the audience",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    screens: [
      { src: "/images/sarah-mitchell/hero.png",    label: "Hero"         },
      { src: "/images/sarah-mitchell/about.png",   label: "About"        },
      { src: "/images/sarah-mitchell/booking.png", label: "Booking form" },
    ],
  },
  {
    slug: "creative-folio",
    title: "Creative Folio",
    type: "Portfolio platform · Creatives",
    url: "https://sudaicreativefolio.vercel.app",
    accent: "#7c3aed",
    outcome: "One codebase, infinite client identities. Shipped in days, not months.",
    description:
      "One platform, any creative identity. Built for DJs, photographers and visual artists who want a site that actually represents their work. Custom audio player with waveform visualisation, masonry gallery with lightbox, booking tiers and a design language that adapts completely per client.",
    meta: "Next.js · TypeScript · Motion design",
    year: "2026",
    role: "Design and development",
    location: "Remote",
    palette: [
      { name: "Violet",   hex: "#7c3aed" },
      { name: "Lavender", hex: "#a78bfa" },
      { name: "Noir",     hex: "#0d0a14" },
      { name: "Ash",      hex: "#1e1b2e" },
    ],
    intro:
      "Creative Folio is one platform that wears many faces. A DJ, a photographer and a visual artist each get a site that looks built only for them, from the same codebase. Swap the content and the brand, and the whole identity changes with it.",
    highlights: [
      "Custom audio player with waveform display",
      "Masonry gallery with full screen lightbox",
      "Session booking tiers per creative",
      "A design system that re-skins per client",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    screens: [
      { src: "/images/creative-folio/main.png",  label: "Platform home"            },
      { src: "/images/amara/hero.png",           label: "AMARA, DJ site"           },
      { src: "/images/amara/about.png",          label: "AMARA, About"             },
      { src: "/images/nadia-osei/hero.png",      label: "Nadia Osei, Photography"  },
      { src: "/images/nadia-osei/about.png",     label: "Nadia Osei, About"        },
    ],
  },
  {
    slug: "voltamobile",
    title: "VoltaMobile",
    type: "E-commerce · Phone retail",
    url: "https://voltamobile.vercel.app",
    accent: "#3b82f6",
    outcome: "Takes Nairobi phone shops online. No developer dependency after handoff.",
    description:
      "A full storefront built to pitch phone shop owners and general merchants on what an online presence can do for them. Filterable device catalog, a featured section for weekly highlights, WhatsApp-first checkout and battery-tested verification badges. Everything a Nairobi electronics shop needs to move stock online, under one roof.",
    meta: "Next.js · Tailwind · WhatsApp commerce",
    year: "2026",
    role: "Design and development",
    location: "Nairobi, Kenya",
    palette: [
      { name: "Electric", hex: "#3b82f6" },
      { name: "Sky",      hex: "#7dd3fc" },
      { name: "Carbon",   hex: "#0b1120" },
      { name: "Steel",    hex: "#1e293b" },
    ],
    intro:
      "VoltaMobile gives a Nairobi phone shop a real storefront online. Shoppers filter by brand, condition and colour, check a weekly featured section, and order straight through WhatsApp. After handoff the owner runs it without needing a developer.",
    highlights: [
      "Catalog filtered by brand, condition and colour",
      "Featured section for weekly highlights",
      "Checkout that runs through WhatsApp",
      "Condition badges for Ex-UK and battery tested stock",
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "WhatsApp API"],
    screens: [
      { src: "/images/voltamobile/hero.png",     label: "Hero"          },
      { src: "/images/voltamobile/featured.png", label: "Featured week" },
      { src: "/images/voltamobile/catalog.png",  label: "All phones"    },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex(p => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
