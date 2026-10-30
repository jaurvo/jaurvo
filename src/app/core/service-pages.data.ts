// SEO content for individual service pages (one page per sub-service).
// Tone: professional English, human-written, concrete. No AI cliches,
// no em/en dashes, no exclamation marks.

export interface ServicePageFaq {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  categoryKey: string;
  categoryCode: string;
  categoryName: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  points: string[];
  faqs: ServicePageFaq[];
  priceHint: string;
}

const WEBSITE_PRICE = 'Starting from $300. Fixed quote in writing.';
const STANDARD_PRICE = 'Fixed quote in writing. Price negotiable.';

export const SERVICE_PAGES: ServicePage[] = [
  // ------------------------------------------------ S.01 WEBSITES
  {
    slug: 'business-website',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Business website',
    seoTitle: 'Business Website Design | Jaurvo',
    seoDescription:
      'A complete business website, designed around your company and built to turn visitors into enquiries. Fixed quote, delivered on time.',
    h1: 'A business website that works as hard as you do.',
    intro:
      'Most business websites are online brochures nobody reads. We build yours around one job: turning visitors into enquiries. Your services are explained in plain language, your best work is shown properly, and contacting you takes seconds on a phone. Every page is designed from scratch to match your business, never picked from a template gallery. You get a site that loads fast, looks right on every screen, and gives customers a reason to message you instead of your competitor.',
    points: [
      'Custom design matched to your brand and trade',
      'Services, about, gallery and contact pages',
      'Enquiry buttons and forms that reach your email or phone',
      'Mobile-first layout, fast loading on phones',
      'Basic on-page SEO so Google can find you',
    ],
    faqs: [
      {
        q: 'How long does a business website take?',
        a: 'Most business websites take two to three weeks from the day we have your content and photos. If you need it faster for a launch or a season, tell us the date and we will plan around it.',
      },
      {
        q: 'Do I need to write the content myself?',
        a: 'You know your business best, so we ask you for the raw facts and shape them into clear page copy. If writing is not your thing, our content writing service can handle it as an add-on.',
      },
      {
        q: 'Will I be able to update the site myself?',
        a: 'Yes. We hand over simple instructions for the things you change often, like photos, prices and contact details. Anything bigger is covered by our care plan.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'shop-store-website',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Shop/store website',
    seoTitle: 'Online Store Website Design | Jaurvo',
    seoDescription:
      'Sell online with a store website that is simple to browse and easy to buy from. Products, offers and direct ordering, built for phones.',
    h1: 'An online store your customers can actually buy from.',
    intro:
      'A shop website fails when buying feels like hard work. We design your store so products are easy to find, prices are clear, and ordering takes a few taps. Customers can message or order directly, without accounts or complicated checkouts getting in the way. Your offers and bestsellers sit where eyes land first. The whole store is built mobile-first, because that is where most of your customers will open it.',
    points: [
      'Product listings with photos, prices and clear categories',
      'Direct ordering through message, call or simple checkout',
      'Offers and bestseller sections placed for visibility',
      'Payment options your customers already use',
      'Mobile-first design, fast on low-end phones',
    ],
    faqs: [
      {
        q: 'Can customers pay online on my store?',
        a: 'Yes. We integrate UPI, cards and netbanking through a payment gateway, so customers can pay you directly. If you prefer orders on WhatsApp or phone first, we can start with that and add online payments later.',
      },
      {
        q: 'How do I add new products later?',
        a: 'We show you exactly how to add and edit products yourself. It takes a few minutes per product. If you would rather not touch it, the monthly care plan includes product updates.',
      },
      {
        q: 'Do I need a large catalogue to start?',
        a: 'No. Many stores start with ten to twenty products. A small, well-presented catalogue sells better than a large messy one, and you can grow it over time.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'restaurant-cafe-website',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Restaurant & cafe website',
    seoTitle: 'Restaurant Website Design | Jaurvo',
    seoDescription:
      'Menus, photos, table booking and ordering for restaurants and cafes. Bilingual English and Arabic ready, designed to fill tables.',
    h1: 'A restaurant website that fills tables.',
    intro:
      'People decide where to eat on their phones, usually within minutes. Your website needs to answer three questions fast: what is on the menu, what does the place look like, and how do I get there or order. We build restaurant sites around exactly that. Full menu with prices, real photos, location with one-tap directions, and ordering or table booking built in. English and Arabic versions are available, which matters if you serve Gulf customers.',
    points: [
      'Full menu with prices, categories and photos',
      'Table booking and direct food ordering',
      'Google Maps location with one-tap directions',
      'Photo gallery that shows the real ambience',
      'Bilingual English and Arabic (RTL) option',
    ],
    faqs: [
      {
        q: 'Can customers order food directly from the website?',
        a: 'Yes. Orders can come to you through WhatsApp, a call button or an order form, whichever suits your kitchen flow. We set it up around how you already take orders.',
      },
      {
        q: 'Do you write the menu content?',
        a: 'We format and present your menu, and we can write dish descriptions that sound appetising as an add-on. You provide the dishes, names and prices; we make them read well.',
      },
      {
        q: 'Is Arabic really necessary?',
        a: 'If your customers include Arabic speakers, yes, it makes a visible difference. We build the site so both languages stay in sync. For purely local Indian restaurants, English alone is fine.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'landing-page',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Landing page',
    seoTitle: 'Landing Page Design | Jaurvo',
    seoDescription:
      'One focused page for one offer. Built to get a single clear action from every visitor, whether that is a booking, a call or a sale.',
    h1: 'One page. One offer. One clear action.',
    intro:
      'A landing page has a single job, and we design it to do that job well. Whether you are launching a product, running an ad campaign or collecting bookings for an event, every section pushes the visitor toward one action. No menus to wander through, no distractions. We write the page around your offer, design it to match your brand, and make the call to action impossible to miss on any screen.',
    points: [
      'Single-goal layout built around your offer',
      'Headline and copy written for conversion',
      'Clear call-to-action buttons throughout',
      'Lead form or booking flow connected to you',
      'Fast loading, built for ad traffic',
    ],
    faqs: [
      {
        q: 'When do I need a landing page instead of a website?',
        a: 'When you have one specific thing to promote: a new product, a limited offer, an event or an ad campaign. A landing page converts better than sending ad traffic to a general homepage.',
      },
      {
        q: 'Can it collect leads for me?',
        a: 'Yes. Forms send enquiries straight to your email or phone. We can also connect it to WhatsApp so leads land where you will actually see them.',
      },
      {
        q: 'How is this different from a one-page website?',
        a: 'A one-page website describes a business. A landing page sells one thing. The structure, copy and design are all built around getting the visitor to act, not just to read.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'portfolio-website',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Portfolio website',
    seoTitle: 'Portfolio Website Design | Jaurvo',
    seoDescription:
      'Show your work the way it deserves. A clean portfolio site for professionals, creators and freelancers who win clients on first impressions.',
    h1: 'Your work, presented like it matters.',
    intro:
      'Clients judge your work by how you present it. A scattered social grid or a PDF does not do justice to good work. We build portfolio sites that give each project room to breathe: large images, the story behind the work, and what the client got out of it. Your about section reads like a person, not a resume. And contacting you is one tap away from every project, because a portfolio that does not bring enquiries is just a gallery.',
    points: [
      'Project case studies with large images',
      'About section that reads like a person',
      'Services and engagement info',
      'Contact and enquiry flow on every page',
      'Clean, fast design that keeps focus on the work',
    ],
    faqs: [
      {
        q: 'I am a freelancer, not a company. Is this for me?',
        a: 'Absolutely. Most of our portfolio sites are for individuals: designers, photographers, developers, consultants. A personal portfolio often wins more work than a company site because clients feel they know who they are hiring.',
      },
      {
        q: 'What if I only have a few projects to show?',
        a: 'Quality beats quantity. Five strong projects presented well outperform twenty thumbnails. We design the layout around what you actually have.',
      },
      {
        q: 'Can I add new projects myself later?',
        a: 'Yes. We set up a simple way to add projects and show you how. New work should go up the week you finish it, not months later.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'salon-beauty-parlour-website',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Salon/beauty parlour website',
    seoTitle: 'Salon Website Design | Jaurvo',
    seoDescription:
      'Services, prices and galleries in an elegant design for salons and beauty parlours. Online booking that fills your appointment book.',
    h1: 'A salon website as polished as your work.',
    intro:
      'A salon sells an experience, and the website is the first part of it. We design salon sites that feel calm and premium: your services with honest prices, photo galleries of real work, and booking that takes under a minute. Clients can check treatments, see the results and book without calling. The design matches the atmosphere you have built in your parlour, so the online visit feels like the real one.',
    points: [
      'Services and price list, easy to browse',
      'Photo gallery of real client work',
      'Online appointment booking',
      'Location, hours and contact details up front',
      'Elegant design matched to your brand',
    ],
    faqs: [
      {
        q: 'How does online booking work?',
        a: 'Clients pick a service, choose a time slot, and you get the booking on your phone or email. We set it up around your working hours and the time each service takes.',
      },
      {
        q: 'Can I show before-and-after photos?',
        a: 'Yes, and you should. Real results are the strongest selling point a salon has. We design the gallery so photos look their best on phones.',
      },
      {
        q: 'Do you work with home-based salons too?',
        a: 'Yes. Many of our salon clients run from home or a small studio. The website makes a small setup look established and trustworthy.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'travel-tourism-website',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Travel/tourism website',
    seoTitle: 'Travel Website Design | Jaurvo',
    seoDescription:
      'Trips, packages and services laid out clearly, with enquiry flows that bring bookings straight to you. Built for travel businesses.',
    h1: 'A travel website that brings bookings to you.',
    intro:
      'Travellers compare options before they ever message you. Your website needs to make that comparison easy to win: clear packages with what is included, honest prices, real photos, and a booking enquiry that takes a minute. We build travel sites around itineraries and trust. Destinations get proper pages, packages show day-by-day detail, and your contact sits one tap away from every package.',
    points: [
      'Tour packages with itineraries and inclusions',
      'Destination pages with photos and highlights',
      'Booking enquiry forms tied to each package',
      'Testimonials and trust signals throughout',
      'Mobile-first, built for travellers on phones',
    ],
    faqs: [
      {
        q: 'Can customers book and pay online?',
        a: 'Enquiry-based booking works best for most travel businesses, since trips need discussion first. We build smooth enquiry flows, and can add online payment for fixed packages if you want it.',
      },
      {
        q: 'I run holiday or pilgrimage packages. Does this fit?',
        a: 'Yes. Package-based travel is exactly what these sites are built for. We lay out inclusions, dates and prices clearly so enquiries come pre-qualified.',
      },
      {
        q: 'Can the site be in Arabic too?',
        a: 'Yes. Bilingual English and Arabic is available, which helps significantly for Gulf-based travel businesses.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'event-website',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Event website',
    seoTitle: 'Event Website Design | Jaurvo',
    seoDescription:
      'Dates, venue, schedule and guest info in one shareable link. An event website your guests can open anywhere, on any phone.',
    h1: 'One link with everything your guests need.',
    intro:
      'Event details scattered across messages get lost. An event website puts the date, venue, schedule and everything else in one link you can share anywhere. Guests open it on their phones and find the map, the timing and the contact without asking you. We design it in your event\u2019s own style, whether that is a corporate conference or a family celebration, and it works on every phone your guests carry.',
    points: [
      'Date, venue and schedule on one page',
      'Map with one-tap directions',
      'Guest information and FAQs',
      'Registration or RSVP collection',
      'Design matched to your event theme',
    ],
    faqs: [
      {
        q: 'Is this different from an invitation website?',
        a: 'They overlap. An invitation website is personal and story-driven, for weddings and celebrations. An event website is information-driven, for conferences, launches and public events. If you are unsure which fits, ask us.',
      },
      {
        q: 'Can guests register through the site?',
        a: 'Yes. Registration forms collect names and details straight to you. For ticketed events, we can discuss payment options.',
      },
      {
        q: 'How fast can you build one?',
        a: 'Event sites are usually ready in one to two weeks. If your event date is close, tell us immediately and we will prioritise it.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'website-redesign',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Website redesign',
    seoTitle: 'Website Redesign Services | Jaurvo',
    seoDescription:
      'Your existing website rebuilt with a fresh, modern design. We keep what works, fix what holds you back, and protect your Google ranking.',
    h1: 'A redesign that keeps what works and fixes the rest.',
    intro:
      'You do not always need a new website. Sometimes the business is solid and the site is just old, slow or embarrassing on a phone. We rebuild it with a modern design while keeping your content, your pages and your Google ranking intact. The process starts with an honest review of what is wrong: speed, mobile layout, confusing navigation, outdated look. Then we fix exactly that, without breaking what already brings you customers.',
    points: [
      'Honest audit of your current site first',
      'Modern design, your content preserved',
      'Mobile layout rebuilt properly',
      'Speed improvements as standard',
      'SEO preserved, no ranking loss',
    ],
    faqs: [
      {
        q: 'Will I lose my Google ranking?',
        a: 'No. We keep your page URLs, titles and content structure intact through the redesign. Done properly, rankings usually improve because the new site is faster and mobile-friendly.',
      },
      {
        q: 'Can you redesign a site someone else built?',
        a: 'Yes, that is most of our redesign work. We do not need the original designer. We need access to your hosting and domain, and we take it from there.',
      },
      {
        q: 'How do I know if I need a redesign or a new site?',
        a: 'If your content and structure are fine but the design is dated, redesign. If the whole thing confuses visitors or was built on broken foundations, a fresh build is cheaper in the long run. We will tell you honestly which one you need.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'payment-gateway-integration',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Payment gateway integration',
    seoTitle: 'Payment Gateway Integration | Jaurvo',
    seoDescription:
      'Accept UPI, cards and netbanking on your website. Secure online payments set up properly, so customers can pay you directly.',
    h1: 'Let customers pay you directly on your site.',
    intro:
      'If customers have to call or message to pay, some of them will not bother. Online payment removes that friction. We integrate trusted payment gateways into your website so you can accept UPI, credit and debit cards, and netbanking. The setup includes test transactions before anything goes live, and we make sure the money reaches your bank account correctly. It works for stores, booking sites and service businesses alike.',
    points: [
      'UPI, cards and netbanking acceptance',
      'Trusted gateway setup (Razorpay, Stripe, and others)',
      'Test transactions before going live',
      'Payment confirmation and receipts',
      'Secure checkout, no card data on your site',
    ],
    faqs: [
      {
        q: 'Which payment gateway should I use?',
        a: 'For Indian customers, Razorpay is the usual choice. For international customers, Stripe. We recommend based on where your customers are and set up whichever you choose.',
      },
      {
        q: 'Are there extra charges?',
        a: 'Gateways charge a small percentage per transaction, usually around two percent. There is no charge from us beyond the one-time integration work.',
      },
      {
        q: 'Is it safe? Will card details touch my website?',
        a: 'Card details go directly to the gateway, never to your site. That is how the integration is designed, and it keeps you clear of most compliance headaches.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'website-speed-optimization',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Website speed optimization',
    seoTitle: 'Website Speed Optimization | Jaurvo',
    seoDescription:
      'A slow website made fast. We cut load times so visitors stay longer, enquire more, and Google ranks you higher.',
    h1: 'A slow site loses customers. We fix that.',
    intro:
      'Every extra second of load time costs you visitors. People leave, Google ranks you lower, and ad money gets wasted on bounces. We go through your site methodically: oversized images, heavy scripts, slow hosting, render-blocking code. Then we fix each one and measure the difference. You get before-and-after numbers, not promises. Most sites we touch load in under three seconds when we are done.',
    points: [
      'Full speed audit with measured baseline',
      'Image compression and modern formats',
      'Script and code cleanup',
      'Caching and hosting recommendations',
      'Before-and-after performance report',
    ],
    faqs: [
      {
        q: 'How much faster will my site get?',
        a: 'It depends on how bad things are now, which is why we measure first. Most sites improve dramatically, often from eight to ten seconds down to under three. We show you the numbers before and after.',
      },
      {
        q: 'Will optimization change how my site looks?',
        a: 'No. Speed work happens under the surface. Your design stays exactly the same, it just loads faster.',
      },
      {
        q: 'My site is on a website builder. Can you still help?',
        a: 'Yes. We work with custom sites and common platforms. Some platforms have limits, and we will tell you honestly what is achievable on yours.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  {
    slug: 'website-care-plan',
    categoryKey: 'websites',
    categoryCode: 'S.01',
    categoryName: 'Websites',
    name: 'Website care plan',
    seoTitle: 'Website Maintenance Plan | Jaurvo',
    seoDescription:
      'Your website looked after every month. Updates, backups, security and small changes handled for you, without you touching anything.',
    h1: 'Your website, looked after. Every month.',
    intro:
      'A website is not a one-time purchase. Software needs updates, backups need to happen, and small changes come up constantly: a new photo, a price change, a festival banner. Our care plan handles all of it. We keep your site updated and secure, back it up regularly, and make the small edits you would otherwise postpone for months. You message us the change, we do it. That is the whole process.',
    points: [
      'Monthly updates and security checks',
      'Regular backups you can rely on',
      'Small content changes done for you',
      'Uptime monitoring',
      'Priority support when something breaks',
    ],
    faqs: [
      {
        q: 'What counts as a small change?',
        a: 'Text edits, photo swaps, price updates, adding a notice or banner. Things that take under an hour. Bigger work like new pages or features is quoted separately, at a discount for plan members.',
      },
      {
        q: 'What happens if my site gets hacked?',
        a: 'We restore from a clean backup and close the hole that let it happen. Prevention is the real work though: updated software and monitored security stop most attacks before they start.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. The plan is monthly, no lock-in. If you cancel, your site stays exactly as it is, and we hand over everything you need.',
      },
    ],
    priceHint: WEBSITE_PRICE,
  },
  // ------------------------------------------------ S.02 LOGO & BRANDING
  {
    slug: 'business-logo',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Business logo',
    seoTitle: 'Business Logo Design | Jaurvo',
    seoDescription:
      'A clean, memorable logo designed around your business. Concepts, revisions and final files for print, web and signage.',
    h1: 'A logo your customers remember.',
    intro:
      'Your logo shows up everywhere: your signboard, your packaging, your social profiles, your invoices. It needs to work at every size and still feel like your business. We design logos from scratch around your name, your trade and the customers you serve. You get real concepts to choose from, not variations of one idea, and the final files in every format you will ever need.',
    points: [
      'Multiple original concepts to choose from',
      'Revisions until it feels right',
      'Final files: print, web and vector formats',
      'Colour and monochrome versions',
      'Simple usage guidance',
    ],
    faqs: [
      {
        q: 'How many logo options will I get?',
        a: 'You will see several distinct directions, not small tweaks of the same mark. Most clients find their logo within the first round because the concepts are genuinely different.',
      },
      {
        q: 'What files do I receive?',
        a: 'Vector files for print and signage, plus PNG and JPG for web and social media, in colour and single-colour versions. Everything organised and labelled.',
      },
      {
        q: 'Can you redesign my existing logo?',
        a: 'Yes. Sometimes a logo needs a refresh, not a replacement. We keep what people recognise and fix what looks dated.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'restaurant-shop-logo',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Restaurant/shop logo',
    seoTitle: 'Restaurant & Shop Logo Design | Jaurvo',
    seoDescription:
      'Logos for food and retail businesses that read clearly on signboards, menus and delivery apps. Recognised at a glance.',
    h1: 'A logo that works on your board and your menu.',
    intro:
      'A restaurant or shop logo has a harder job than most. It must read from across the street on a signboard, look good small on a delivery app, and still feel right printed on a menu or a carry bag. We design with all of these in mind from the start. The mark is bold enough for signage, clean enough for packaging, and distinctive enough that customers recognise it before they read the name.',
    points: [
      'Designed for signboards and storefronts',
      'Reads clearly at small sizes (apps, packaging)',
      'Colour and single-colour versions',
      'Works on menus, bags and uniforms',
      'Print and web file sets included',
    ],
    faqs: [
      {
        q: 'Will it work on a glowing signboard?',
        a: 'Yes. We check the design against real signage conditions: distance readability, single-colour reproduction, and how it looks lit at night.',
      },
      {
        q: 'Can you include Arabic text in the logo?',
        a: 'Yes. Bilingual logos are common for Gulf-facing food businesses. We design both scripts to sit together properly, not as an afterthought.',
      },
      {
        q: 'Do you design the full shop board too?',
        a: 'The logo package covers the mark itself. Full board layouts, menus and packaging are separate services we can bundle at a better price.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'personal-brand-logo',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Personal brand logo',
    seoTitle: 'Personal Brand Logo Design | Jaurvo',
    seoDescription:
      'A signature-style logo for creators, consultants and professionals. Your name, designed to be recognised and remembered.',
    h1: 'Your name, designed like a brand.',
    intro:
      'When you are the business, your name is the logo. We design personal marks for creators, consultants, coaches and professionals: monograms, signature styles and wordmarks that feel like you. The goal is recognition. People should see the mark and think of you before they read the name. It works across your content, your proposals and your profiles without ever feeling corporate.',
    points: [
      'Monogram, signature or wordmark styles',
      'Designed around your name and field',
      'Profile-ready versions for social media',
      'Watermark version for your content',
      'Full file set for print and web',
    ],
    faqs: [
      {
        q: 'I am just starting out. Is a logo worth it yet?',
        a: 'If you are putting your name on content, proposals or a profile, yes. A consistent mark makes a new personal brand look intentional from day one, which is when it matters most.',
      },
      {
        q: 'Can it be based on my signature?',
        a: 'Often, yes. We can refine your actual signature into a clean mark, or design something new inspired by it. Both routes are on the table.',
      },
      {
        q: 'Will it suit both formal and casual use?',
        a: 'We deliver versions for both: a polished lockup for proposals and a relaxed mark for content and social.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'instagram-profile-logo',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Instagram profile logo',
    seoTitle: 'Instagram Logo Design | Jaurvo',
    seoDescription:
      'Your logo sharpened for Instagram. A profile version sized and designed to read clearly in a small circle, at a glance.',
    h1: 'A profile picture that looks professional.',
    intro:
      'Your Instagram profile picture is tiny, circular, and the first thing anyone sees. Most logos were not designed for that. We adapt your mark specifically for the profile circle: simplified, sharpened and tested at actual size. The result reads clearly in a feed, in comments and in search. If you do not have a logo yet, we design one with the profile version built in from the start.',
    points: [
      'Logo adapted for the circular crop',
      'Tested readable at small sizes',
      'Matching highlight cover set option',
      'High-resolution export for upload',
      'Dark and light background versions',
    ],
    faqs: [
      {
        q: 'I already have a logo. Can you just adapt it?',
        a: 'Yes, that is the most common request. Send us your logo and we return a profile-optimised version, usually within a few days.',
      },
      {
        q: 'Why not just upload my normal logo?',
        a: 'You can, but detail gets lost and text becomes unreadable at that size. A version designed for the circle looks sharper and more professional.',
      },
      {
        q: 'Do you also fix my bio and highlights?',
        a: 'Yes, profile setup and page optimisation is a separate service. Most clients bundle it with the logo for a complete profile refresh.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'complete-basic-brand-identity',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Complete basic brand identity',
    seoTitle: 'Brand Identity Design | Jaurvo',
    seoDescription:
      'Logo, colours, fonts and everyday files together. A complete starter identity for a new business, consistent from day one.',
    h1: 'Everything your brand needs to look consistent.',
    intro:
      'A new business needs more than a logo. It needs colours that stay the same, fonts that match, and the everyday files: cards, letterhead, social profiles. We build the complete starter identity in one go, so nothing looks mismatched later. You get the logo, the colour palette, the fonts and the core stationery, all designed together and documented simply. From day one, your business looks like it has been around.',
    points: [
      'Logo with full file set',
      'Brand colours and fonts, documented',
      'Visiting card and letterhead design',
      'Social profile versions',
      'Simple brand guideline sheet',
    ],
    faqs: [
      {
        q: 'What exactly is included?',
        a: 'Logo, colour palette, font selection, visiting card, letterhead and social profile assets, plus a one-page guideline showing how to use them. Enough to keep everything consistent.',
      },
      {
        q: 'Is this enough for a new business?',
        a: 'For most new businesses, yes. It covers every touchpoint a customer sees in the first year. Bigger needs like packaging or signage can be added later in the same style.',
      },
      {
        q: 'How long does it take?',
        a: 'Usually three to four weeks. Identity work needs thinking time between rounds, and rushing it shows in the result.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'visiting-business-card',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Visiting/business card',
    seoTitle: 'Visiting Card Design | Jaurvo',
    seoDescription:
      'A visiting card designed to match your brand. Print-ready files for any printer, front and back, done properly.',
    h1: 'A card people keep, not bin.',
    intro:
      'People still judge businesses by their cards. A flimsy design with cramped text goes in the bin; a clean, well-made card gets kept. We design visiting cards that match your logo and colours exactly, with your details laid out so they are easy to read and easy to act on. You get print-ready files any printer can use, front and back, with proper bleed and margins.',
    points: [
      'Front and back design',
      'Matched to your logo and colours',
      'Print-ready files with bleed',
      'QR code to your site or profile',
      'Works with any local printer',
    ],
    faqs: [
      {
        q: 'Do you also print the cards?',
        a: 'We design; printing is usually cheaper through your local printer. Our files work with any printer. If you want us to arrange printing, we can.',
      },
      {
        q: 'What details should go on the card?',
        a: 'Name, role, phone, email and one web address or social handle. Less is more. A QR code can carry the rest.',
      },
      {
        q: 'Can you match my existing logo?',
        a: 'Yes. Send the logo and brand colours, and the card will sit perfectly with the rest of your identity.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'letterhead',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Letterhead',
    seoTitle: 'Letterhead Design | Jaurvo',
    seoDescription:
      'A clean letterhead for invoices, quotations and letters. Every document you send stays on-brand and looks professional.',
    h1: 'Every document, on-brand.',
    intro:
      'Quotations, invoices and official letters carry your name. A proper letterhead makes each one look considered instead of improvised. We design a clean header and footer around your logo, with space for addresses, phone numbers and the details your trade needs. You get files for print and a Word-compatible version for everyday typing, so the branding survives real office use.',
    points: [
      'Header and footer matched to your brand',
      'Print-ready and Word-compatible versions',
      'Space for addresses and contact details',
      'Invoice-friendly layout option',
      'Consistent with your other stationery',
    ],
    faqs: [
      {
        q: 'Will it work in MS Word?',
        a: 'Yes. Alongside the print files, you get a version set up for Word so your team can type letters on it daily without breaking the design.',
      },
      {
        q: 'Can it include my tax or trade licence number?',
        a: 'Yes. We leave proper space for registration numbers, addresses and whatever your paperwork requires.',
      },
      {
        q: 'I need an invoice format too. Is that separate?',
        a: 'We can design a matching invoice layout as an add-on. Most businesses bundle letterhead and invoice together.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'brand-colour-font-selection',
    categoryKey: 'logo',
    categoryCode: 'S.02',
    categoryName: 'Logo & Branding',
    name: 'Brand colour & font selection',
    seoTitle: 'Brand Colours & Fonts | Jaurvo',
    seoDescription:
      'Your brand colours and fonts chosen and documented. Every design you order stays consistent, whoever makes it.',
    h1: 'Colours and fonts, decided once, used everywhere.',
    intro:
      'Inconsistent colours and random fonts make a business look scattered, even when each design is fine on its own. We choose your brand palette and typefaces properly: colours that work together and reproduce well in print and on screen, fonts that are readable and available to your whole team. Everything is written down in a simple sheet, so any designer you hire later keeps you consistent without guessing.',
    points: [
      'Primary and supporting colour palette',
      'Print (CMYK) and screen (RGB/HEX) values',
      'Heading and body font pairing',
      'One-page brand reference sheet',
      'Guidance on where each colour is used',
    ],
    faqs: [
      {
        q: 'I already have a logo. Can you build colours around it?',
        a: 'Yes, that is the ideal starting point. We extract and extend your logo colours into a full working palette.',
      },
      {
        q: 'Will the fonts cost money?',
        a: 'We recommend freely available fonts unless you want something licensed. Your team can use them without paying or installing anything unusual.',
      },
      {
        q: 'Why does this matter if I am a small business?',
        a: 'Consistency is what makes small businesses look established. It costs little and affects everything you print or post.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.03 INVITATION WEBSITES
  {
    slug: 'wedding-nikah-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Wedding/Nikah invitation',
    seoTitle: 'Wedding Invitation Website | Jaurvo',
    seoDescription:
      'A wedding or Nikah invitation website in your card colours. Story, countdown, venue map and RSVP in one beautiful link.',
    h1: 'Your wedding, in a link guests will keep.',
    intro:
      'A printed card gets seen once. An invitation website gets opened, shared and revisited. We build wedding and Nikah invitations in your own colours and style: your story, the venue on a map, a live countdown, and RSVP that actually collects replies. Guests can find everything without calling the family. It works on every phone, and the link is yours to share on WhatsApp, Instagram or anywhere else.',
    points: [
      'Design in your card or theme colours',
      'Couple story and photo gallery',
      'Live countdown to the big day',
      'Venue map with directions',
      'RSVP form that collects guest replies',
    ],
    faqs: [
      {
        q: 'Can it match my printed card?',
        a: 'Yes. Send us a photo of your card and we design the website in the same colours and mood. Many families use both together.',
      },
      {
        q: 'How do guests RSVP?',
        a: 'Through a simple form on the site. Replies come to you organised by name, so you know your headcount without chasing calls.',
      },
      {
        q: 'Can it be in Urdu or Arabic too?',
        a: 'Yes. Bilingual invitations are common, and we handle right-to-left layouts properly. Names and details stay correct in every script.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'couple-story-gallery-venue-countdown-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Couple story + gallery + venue + countdown invitation',
    seoTitle: 'Couple Story Invitation Website | Jaurvo',
    seoDescription:
      'The full experience: how you met, your photos, countdown, venue map and RSVP. A wedding invitation website with everything.',
    h1: 'The whole story, not just the date.',
    intro:
      'Some invitations just announce. This one tells the story. How you met, the moments since, your favourite photos, all leading to the celebration details: venue, schedule, countdown and RSVP. Guests spend real time on these pages, and they arrive at your wedding already feeling part of it. We design it like a small film in web form, paced well, beautiful on phones, and personal to the two of you.',
    points: [
      'Full couple story section with photos',
      'Curated photo gallery',
      'Venue details with map and directions',
      'Live countdown timer',
      'RSVP and guest information',
    ],
    faqs: [
      {
        q: 'We are private people. How much do we have to share?',
        a: 'Only what you want. Some couples share a short paragraph and ten photos; others tell the full story. The design works either way.',
      },
      {
        q: 'Can family members be included?',
        a: 'Yes. Parents, siblings and the wedding party can each have a place. We lay it out tastefully, not like a directory.',
      },
      {
        q: 'How long does it take to build?',
        a: 'Two to three weeks once we have your photos and details. Wedding timelines are real, so tell us the date early and we plan backwards from it.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'engagement-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Engagement invitation',
    seoTitle: 'Engagement Invitation Website | Jaurvo',
    seoDescription:
      'Announce your engagement beautifully. Event details in a shareable link guests can save, with RSVP built in.',
    h1: 'Announce it beautifully.',
    intro:
      'An engagement deserves more than a forwarded message. We build a small, elegant page with your names, the event details, venue map and RSVP, in a design that suits the occasion. Guests get one link with everything: when, where, and how to confirm. It takes minutes to share and works on every phone, which is exactly what you need when the guest list lives on WhatsApp.',
    points: [
      'Elegant design for the occasion',
      'Date, venue and schedule details',
      'Map with directions',
      'RSVP collection',
      'Shareable link for WhatsApp and social',
    ],
    faqs: [
      {
        q: 'How is this different from a wedding invitation site?',
        a: 'It is smaller and focused on one event. Same quality, less content, faster to build, and priced accordingly.',
      },
      {
        q: 'Can we add our photos?',
        a: 'Yes. Even a few good photos make the page feel personal. We will tell you what works best.',
      },
      {
        q: 'What if the date changes?',
        a: 'We update it for you. Dates shift, especially with family events, and a quick edit is part of the service.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'birthday-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Birthday invitation',
    seoTitle: 'Birthday Invitation Website | Jaurvo',
    seoDescription:
      'A fun, personal birthday invitation page. Venue, timing and RSVP in one link, ready to forward to your guests.',
    h1: 'A birthday invite worth forwarding.',
    intro:
      'Birthday invites usually die in chat threads. A proper invitation page fixes that: the theme, the venue, the timing and RSVP in one link that looks like the party will be fun. We design it to match the mood, from a child\u2019s first birthday to a fiftieth, bright and playful or elegant and grown-up. Guests tap RSVP instead of replying with a thumbs-up in a group.',
    points: [
      'Design matched to the birthday theme',
      'Venue, date and timing details',
      'RSVP form for headcount',
      'Photo or theme graphics',
      'Easy sharing on WhatsApp',
    ],
    faqs: [
      {
        q: 'Is this overkill for a small party?',
        a: 'Not if you want a proper headcount. Even twenty guests are easier to manage with RSVP than with chat replies. The page takes us days, not weeks.',
      },
      {
        q: 'Can it match my party theme?',
        a: 'Yes. Tell us the theme or colours and the design follows. Kids themes, elegant dinners, surprise parties, we have done the range.',
      },
      {
        q: 'Do you write the wording?',
        a: 'We can. Invitation wording is a separate small service, and most birthday clients add it so the whole thing sounds right.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'anniversary-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Anniversary invitation',
    seoTitle: 'Anniversary Invitation Website | Jaurvo',
    seoDescription:
      'Celebrate the milestone with your story and photos. An elegant anniversary invitation page with celebration details and RSVP.',
    h1: 'Years together, celebrated properly.',
    intro:
      'Milestone anniversaries bring family from everywhere, and everyone needs the same details. We build an elegant page with your story, photos through the years, and the celebration details: venue, date and RSVP. Older relatives get a simple page that just works on their phones. The design is warm and dignified, never flashy, because the occasion carries its own weight. You tell us the story; we make sure the page honours it.',
    points: [
      'Couple story and photo journey',
      'Celebration details and venue map',
      'RSVP for family headcount',
      'Warm, elegant design',
      'Simple enough for older guests',
    ],
    faqs: [
      {
        q: 'My parents are not tech-savvy. Will they manage?',
        a: 'The page is designed for exactly that: big text, obvious buttons, nothing to figure out. If they can open WhatsApp, they can open this.',
      },
      {
        q: 'Can we include family photos?',
        a: 'Please do. A journey through the years is what makes these pages special. We arrange them chronologically and beautifully.',
      },
      {
        q: 'Is this only for big milestones?',
        a: 'Most are 25th or 50th, but any anniversary worth gathering for is worth a proper invitation.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'baby-shower-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Baby shower invitation',
    seoTitle: 'Baby Shower Invitation Website | Jaurvo',
    seoDescription:
      'A warm baby shower invitation page. Venue details and simple RSVP in one link your guests will love to open.',
    h1: 'A warm welcome before the welcome.',
    intro:
      'A baby shower is a happy, intimate gathering, and the invitation should feel like it. We design soft, warm pages with the venue details, timing and a simple RSVP, all in one link. Guests, often family spread across cities, get everything without a single phone call. The tone stays gentle and joyful, and the page is easy enough for grandparents to open.',
    points: [
      'Soft, warm design for the occasion',
      'Venue and timing details',
      'Simple RSVP form',
      'Shareable family link',
      'Easy for older relatives to use',
    ],
    faqs: [
      {
        q: 'Can the theme be for a boy or girl, or neutral?',
        a: 'Any of the three. Tell us your preference, or keep it neutral, and the design follows.',
      },
      {
        q: 'Do we need many photos?',
        a: 'No. These pages work beautifully with minimal photos. The warmth comes from the design and wording.',
      },
      {
        q: 'Can we add a gift registry link?',
        a: 'Yes. If you have a registry or prefer blessings only, we include a tasteful note either way.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'housewarming-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Housewarming invitation',
    seoTitle: 'Housewarming Invitation Website | Jaurvo',
    seoDescription:
      'Invite everyone to your new home. Address on a map with one-tap directions, plus RSVP, in one simple link.',
    h1: 'Show them the way home.',
    intro:
      'The hardest part of a housewarming is getting people to the right address. We build a simple invitation page with your new home pinned on a map, one-tap directions, the date and time, and RSVP. No one gets lost, no one calls for landmarks. Add a photo of the new place if you like, and the page doubles as a small celebration of the move itself.',
    points: [
      'Map with one-tap directions',
      'Date, time and programme details',
      'RSVP headcount form',
      'Photo of your new home (optional)',
      'Simple, shareable link',
    ],
    faqs: [
      {
        q: 'What if my location is hard to find?',
        a: 'That is exactly when this helps most. A pinned map with directions beats a texted landmark every time. We can add a short how-to-reach note too.',
      },
      {
        q: 'Can we do it in our language?',
        a: 'Yes. Hindi, Urdu, English, or a mix, whatever your family reads. Bilingual pages are common.',
      },
      {
        q: 'Is this too formal for a casual gathering?',
        a: 'The design can be as relaxed as the event. Simple and warm is the default.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'corporate-event-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Corporate event invitation',
    seoTitle: 'Corporate Event Invitation | Jaurvo',
    seoDescription:
      'A professional invitation page for launches, conferences and company events. Schedule, speakers and registration in one link.',
    h1: 'An invitation your brand would be proud of.',
    intro:
      'Corporate events reflect on the company, and the invitation is the first impression. We build professional pages with the agenda, speakers, venue and registration, all in your brand\u2019s colours and tone. Attendees get one link with everything, and your team gets registrations collected neatly. It looks like it came from your marketing department, not from a forwarded PDF. Your events team gets a link they can send with confidence.',
    points: [
      'On-brand professional design',
      'Agenda and speaker sections',
      'Venue details with map',
      'Registration form',
      'Consistent with your brand guidelines',
    ],
    faqs: [
      {
        q: 'Can it match our brand guidelines?',
        a: 'Yes. Send the guidelines and we follow them: colours, fonts, logo usage. The page will look like a natural extension of your brand.',
      },
      {
        q: 'We need registrations, not just RSVP. Possible?',
        a: 'Yes. Registration forms can collect company, role and dietary needs, whatever your event team requires.',
      },
      {
        q: 'Can you handle multiple sessions or days?',
        a: 'Yes. Multi-day agendas with session details are standard for conferences. We lay them out so attendees can scan quickly.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'rsvp-invitation-website',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'RSVP invitation website',
    seoTitle: 'RSVP Invitation Website | Jaurvo',
    seoDescription:
      'An invitation built around replies. Guest confirmations collected neatly in one place, no chasing phone calls.',
    h1: 'Know exactly who is coming.',
    intro:
      'The hardest part of any event is the headcount. This invitation is built around one thing: getting a clear yes or no from every guest. The page is beautiful, but the RSVP form is the hero: simple, fast and impossible to miss. Replies land in one organised list with names and counts. No more scrolling through chat replies or calling relatives to confirm.',
    points: [
      'RSVP-first page design',
      'Simple yes/no form, seconds to complete',
      'Organised guest list for you',
      'Plus-one and count options',
      'Reminder-friendly shareable link',
    ],
    faqs: [
      {
        q: 'How do I see the replies?',
        a: 'They come to your email or phone as they arrive, and we can set up a simple sheet that fills automatically. You always know the current count.',
      },
      {
        q: 'What if guests do not RSVP?',
        a: 'The page makes it as easy as possible, which lifts response rates a lot. For the rest, you will at least know exactly who has not replied.',
      },
      {
        q: 'Can guests change their reply later?',
        a: 'Yes. We can allow updates, so a maybe can become a yes without messaging you.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'digital-invitation-card-design',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Digital invitation card design',
    seoTitle: 'Digital Invitation Card Design | Jaurvo',
    seoDescription:
      'A designed digital invitation card, ready to send on WhatsApp and share on social media. Your event, beautifully presented.',
    h1: 'A card made for sharing.',
    intro:
      'Most invitations today are sent, not posted. We design digital cards specifically for the screen: the right dimensions for WhatsApp and status, readable on a phone, and beautiful enough to be saved. You get the card as a high-quality image, ready to forward. It carries your event details cleanly, in a design that suits the occasion, without the clutter that makes most forwarded cards hard to read.',
    points: [
      'Sized for WhatsApp and social sharing',
      'Readable on small phone screens',
      'Design matched to your occasion',
      'High-quality image files',
      'Optional animated version',
    ],
    faqs: [
      {
        q: 'What is the difference between this and an invitation website?',
        a: 'This is a single designed image you forward. A website is a full page with RSVP, maps and galleries. The card is faster and cheaper; the website does more.',
      },
      {
        q: 'Can you animate it?',
        a: 'Yes, a subtle animated version for WhatsApp status is available as an add-on. It gets noticeably more attention.',
      },
      {
        q: 'What details do you need from me?',
        a: 'Names, date, time, venue and any photo or motif you want. We handle the design and wording.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'printable-wedding-invitation',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Printable wedding invitation',
    seoTitle: 'Printable Wedding Invitation | Jaurvo',
    seoDescription:
      'A print-ready wedding invitation your printer can produce exactly as designed. Proper files, proper sizes, no surprises.',
    h1: 'Designed for print, perfect on paper.',
    intro:
      'Print has no undo button, so the design files have to be right. We create wedding invitation designs with proper print specifications: correct sizes, bleed, high resolution and colours set for print. What you approve on screen is what comes off the press. We design in your family\u2019s style and colours, and the files work with any professional printer. We check every proof with you before the files are finalised.',
    points: [
      'Print-ready files with bleed',
      'High resolution for sharp printing',
      'Standard and custom sizes',
      'Designed in your colours and style',
      'Works with any professional printer',
    ],
    faqs: [
      {
        q: 'Do you handle the printing?',
        a: 'We design; most families print locally where they can check paper quality. Our files work with any printer. If you want us to arrange printing, we can discuss it.',
      },
      {
        q: 'Can it match our website invitation?',
        a: 'Yes, and it should. We design both in the same visual language so the print and digital invitations feel like one set.',
      },
      {
        q: 'What about Urdu or Arabic text?',
        a: 'Fully supported. We set right-to-left text properly so names and verses print exactly as they should.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'invitation-poster',
    categoryKey: 'invitations',
    categoryCode: 'S.03',
    categoryName: 'Invitation Websites',
    name: 'Invitation poster',
    seoTitle: 'Invitation Poster Design | Jaurvo',
    seoDescription:
      'A poster version of your invitation for displays, status updates and sharing beyond the guest list.',
    h1: 'Your invitation, poster-sized.',
    intro:
      'Sometimes the invitation needs to be seen, not just sent: on a display at the venue, as a status update, or shared beyond the guest list. We design poster versions of your invitation in the right sizes for print displays and social sharing. Same design language as your card or website, scaled up properly so nothing looks stretched or pixelated.',
    points: [
      'Print display sizes',
      'Social and status sizes',
      'Matched to your invitation design',
      'High resolution throughout',
      'Venue display layout option',
    ],
    faqs: [
      {
        q: 'What sizes do you provide?',
        a: 'Standard poster sizes for print, plus optimised versions for WhatsApp status and social posts. Tell us where it will be displayed and we size accordingly.',
      },
      {
        q: 'Can it be different from my card design?',
        a: 'It can, but matching looks better. We usually extend your existing invitation design to poster format.',
      },
      {
        q: 'Do you design the venue welcome board too?',
        a: 'Yes, as an add-on. Welcome boards, stage backdrops and table cards can all be designed in the same style.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.04 UI/UX DESIGN
  {
    slug: 'website-ui-ux-design',
    categoryKey: 'uiux',
    categoryCode: 'S.04',
    categoryName: 'UI/UX Design',
    name: 'Website UI/UX design',
    seoTitle: 'Website UI/UX Design | Jaurvo',
    seoDescription:
      'Complete website screens designed in Figma, with a clickable prototype. Professional UI/UX design, ready for development.',
    h1: 'The design, before a line of code.',
    intro:
      'Good websites are designed before they are built. We create your complete website as high-fidelity screens in Figma: every page, every state, worked out properly. You also get a clickable prototype, so you can feel the site before development starts. This is design only, which means your own developer can build it, or we can build it for you as a separate step.',
    points: [
      'All website screens in Figma',
      'Clickable prototype to test the flow',
      'Mobile and desktop layouts',
      'Design system: colours, fonts, components',
      'Developer-ready handoff files',
    ],
    faqs: [
      {
        q: 'What is the difference between this and a website?',
        a: 'This is the design phase only: screens and prototype, no working site. A full website includes design plus development. Some clients already have developers and only need the design done right.',
      },
      {
        q: 'Can my developer build from your Figma files?',
        a: 'Yes. We organise files the way developers expect: named layers, components, spacing specs and exportable assets.',
      },
      {
        q: 'Do you also build what you design?',
        a: 'Yes, as a separate step with its own quote. Many clients do design first, approve it fully, then move to development with no surprises.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'mobile-app-ui-design',
    categoryKey: 'uiux',
    categoryCode: 'S.04',
    categoryName: 'UI/UX Design',
    name: 'Mobile app UI design',
    seoTitle: 'Mobile App UI Design | Jaurvo',
    seoDescription:
      'Clean app screens for Android and iOS, designed in Figma and ready for your developer to build. Thoughtful mobile UX.',
    h1: 'App screens your developer can actually build.',
    intro:
      'App design is a discipline of its own: thumb zones, navigation patterns, screen states most people forget. We design complete app screen sets in Figma for Android and iOS, following each platform\u2019s conventions. Every screen is thought through, including empty states, errors and loading. Your developer gets organised, build-ready files, and you get a prototype to test with real users before a line of code is written.',
    points: [
      'Complete app screen sets',
      'Android and iOS conventions followed',
      'Empty, error and loading states included',
      'Clickable prototype for user testing',
      'Developer-ready Figma handoff',
    ],
    faqs: [
      {
        q: 'Do you design for both Android and iOS?',
        a: 'Yes. We follow Material Design for Android and Human Interface Guidelines for iOS, so the app feels native on each.',
      },
      {
        q: 'Can you test the design with users first?',
        a: 'The clickable prototype is made for exactly that. We recommend testing with five to ten real users before development; it is the cheapest stage to find problems.',
      },
      {
        q: 'Do you also develop the app?',
        a: 'Our strength is web. For app development we design to a standard your app developer can build cleanly, and we stay available during build for design questions.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.05 SEO & GROWTH
  {
    slug: 'local-seo',
    categoryKey: 'seo',
    categoryCode: 'S.05',
    categoryName: 'SEO & Growth',
    name: 'Local SEO',
    seoTitle: 'Local SEO Services | Jaurvo',
    seoDescription:
      'Rank higher for the searches your nearby customers type. Local SEO that brings calls, visits and orders from your area.',
    h1: 'Be found by customers near you.',
    intro:
      'When someone nearby searches for what you do, you want to be in the results they actually see. Local SEO is the work of making that happen: your Google presence fixed, your site speaking the local language, and your business showing up for near-me searches. It is slow, honest work, not tricks. Rankings build over months and then keep bringing customers without ad spend.',
    points: [
      'Google Business Profile optimisation',
      'Local keywords on your website',
      'Reviews strategy and setup',
      'Local citations and listings',
      'Monthly progress reporting',
    ],
    faqs: [
      {
        q: 'How long before I see results?',
        a: 'Honestly, three to six months for meaningful movement. Anyone promising page one in two weeks is selling something risky. Local SEO compounds: slow start, lasting results.',
      },
      {
        q: 'Is this different from normal SEO?',
        a: 'Yes. Local SEO targets geographic searches: your city, your area, near-me queries. It is what brings footfall and local calls, which is what most small businesses actually need.',
      },
      {
        q: 'Do I need a new website for this?',
        a: 'Not necessarily. We audit your current site first. Often the foundations are fine and the work is in optimisation, content and your Google presence.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'google-business-profile-setup',
    categoryKey: 'seo',
    categoryCode: 'S.05',
    categoryName: 'SEO & Growth',
    name: 'Google business profile setup',
    seoTitle: 'Google Business Profile Setup | Jaurvo',
    seoDescription:
      'Your business properly listed on Google Maps and Search. Photos, hours and details that customers trust, set up right.',
    h1: 'Your Google listing, done properly.',
    intro:
      'Your Google Business Profile is often the first thing customers see: the map pin, the hours, the photos, the reviews. Most listings are half-finished, which quietly costs customers every day. We set yours up completely: correct categories, full hours including holidays, good photos, services listed, and the review flow working. It is a small job with an outsized effect on local trust.',
    points: [
      'Complete profile setup and verification',
      'Correct categories and attributes',
      'Hours, services and photos added',
      'Review request flow set up',
      'Handover with management guidance',
    ],
    faqs: [
      {
        q: 'Is this not free to do myself?',
        a: 'Setting it up is free; doing it well takes knowledge. Wrong categories, missing hours and bad photos are the usual DIY mistakes, and each one costs visibility.',
      },
      {
        q: 'How long does verification take?',
        a: 'Google usually verifies within a few days to two weeks, depending on the method available for your business. We handle the process end to end.',
      },
      {
        q: 'Can you manage it ongoing?',
        a: 'Yes. Posting updates, responding to reviews and keeping hours current can be bundled into a monthly arrangement.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.06 SOCIAL MEDIA DESIGNS
  {
    slug: 'instagram-post-design',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Instagram post design',
    seoTitle: 'Instagram Post Design | Jaurvo',
    seoDescription:
      'Single posts designed in your brand style. Offers, announcements and everyday content that looks professional, every time.',
    h1: 'Posts that look like a brand, not a hobby.',
    intro:
      'Your Instagram grid is your shop window. When posts look inconsistent, visitors assume the business is too. We design single posts in your brand style: offers, announcements, testimonials, everyday content, each one clean and readable. You send the message or photo, we return a post ready to publish. Over time, the grid starts looking like a business that takes itself seriously.',
    points: [
      'Designed in your brand colours and fonts',
      'Readable on small phone screens',
      'Offers, announcements, testimonials, quotes',
      'Correct sizes for feed posts',
      'Quick turnaround on regular orders',
    ],
    faqs: [
      {
        q: 'Do I need to give you the text?',
        a: 'Rough text or even bullet points are enough. We tighten the wording as part of the design. If you want full caption writing too, that is a separate service.',
      },
      {
        q: 'How fast is the turnaround?',
        a: 'Single posts are usually ready in one to two days. Regular clients on a monthly plan get priority slots.',
      },
      {
        q: 'Can you match my existing feed style?',
        a: 'Yes. Send your profile and we study the current look first. New posts will feel like a natural continuation, only sharper.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'carousel-post',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Carousel post',
    seoTitle: 'Carousel Post Design | Jaurvo',
    seoDescription:
      'Multi-slide carousels that explain or persuade, slide by slide. One consistent design that keeps people swiping.',
    h1: 'Carousels people actually swipe through.',
    intro:
      'Carousels earn more reach than single posts, but only if people keep swiping. We design multi-slide carousels with a real structure: a hook on slide one, one idea per slide, and a payoff at the end. The design stays consistent across slides while each one feels fresh enough to continue. Good for explaining services, sharing tips, telling stories or breaking down offers.',
    points: [
      'Hook-first slide structure',
      'One clear idea per slide',
      'Consistent design across all slides',
      'Swipe-driving flow and pacing',
      'Cover slide designed for the grid',
    ],
    faqs: [
      {
        q: 'How many slides should a carousel have?',
        a: 'Five to ten is the sweet spot. Enough to say something real, short enough to finish. We advise on length based on your topic.',
      },
      {
        q: 'Do carousels really perform better?',
        a: 'They consistently earn more saves and shares than single images, because each swipe is engagement. But only well-structured ones; random slide dumps do not work.',
      },
      {
        q: 'Can you repurpose my article into a carousel?',
        a: 'Yes, that is a great use. Send the article and we distil it into a swipeable story.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'reel-cover-thumbnail',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Reel cover/thumbnail',
    seoTitle: 'Reel Cover Design | Jaurvo',
    seoDescription:
      'Covers that make your reels look like a series worth watching. Designed to earn the tap before anyone presses play.',
    h1: 'Covers that earn the tap.',
    intro:
      'Nobody watches a reel with an ugly cover. The cover decides in a split second whether someone taps or scrolls past, and it also defines how your profile grid looks. We design reel covers with bold, readable titles and a consistent series style, so your profile starts looking like a show, not a random collection. The style carries across episodes, which builds recognition over time.',
    points: [
      'Bold titles readable at thumbnail size',
      'Consistent series style across reels',
      'Designed for the profile grid look',
      'Safe zones respected (UI overlays)',
      'Templates for ongoing series',
    ],
    faqs: [
      {
        q: 'Can you make a template I reuse myself?',
        a: 'Yes. For ongoing series we deliver a template set you can edit for each episode, plus the first batch designed by us.',
      },
      {
        q: 'Does the cover affect views?',
        a: 'Directly. The cover is the thumbnail for your reel everywhere it appears: feed, explore, your grid. A clear, intriguing cover lifts tap-through noticeably.',
      },
      {
        q: 'What about the title text on the cover?',
        a: 'We write or tighten it. The cover title is a headline job: short, specific, curiosity-driving. Three to six words usually.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'story-design',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Story design',
    seoTitle: 'Instagram Story Design | Jaurvo',
    seoDescription:
      'Vertical story designs for daily updates, offers and polls. Stories that match your feed instead of clashing with it.',
    h1: 'Stories that match your brand.',
    intro:
      'Stories are where the daily conversation happens: polls, offers, behind-the-scenes, quick updates. But most business stories look thrown together, which wastes the most-viewed surface on Instagram. We design vertical story templates and one-off stories in your brand style, with space for your text and stickers. Your stories start looking intentional, and people start watching them as a habit. Small effort daily, professional result always.',
    points: [
      'Vertical designs for the story format',
      'Templates for daily use',
      'Poll, quiz and question layouts',
      'Offer and announcement designs',
      'Matched to your feed aesthetic',
    ],
    faqs: [
      {
        q: 'Templates or one-off designs?',
        a: 'Both. Templates for your recurring story types, custom designs for launches and big announcements. Most clients need a mix.',
      },
      {
        q: 'Will text I add later still look good?',
        a: 'Yes. Templates are built with your fonts and safe zones, so your daily text sits properly without design skills.',
      },
      {
        q: 'Can stories drive sales?',
        a: 'They are among the best surfaces for it: limited-time offers, polls that segment interest, links to order. We design with the action in mind.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'festival-greeting-post',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Festival greeting post',
    seoTitle: 'Festival Greeting Post Design | Jaurvo',
    seoDescription:
      'Festival and occasion greetings in your brand colours, delivered before the day. Never miss a festival post again.',
    h1: 'Never miss a festival post again.',
    intro:
      'Festival greetings are small, but missing them looks careless and posting them late looks worse. We design greeting posts for every festival and occasion that matters to your customers: Diwali, Eid, Christmas, New Year, and the regional ones others forget. Delivered before the day, in your brand colours, ready to post. Some clients order the full year at once and never think about it again.',
    points: [
      'All major festivals covered',
      'Regional and religious occasions included',
      'Your branding on every greeting',
      'Delivered before the date',
      'Full-year packages available',
    ],
    faqs: [
      {
        q: 'Which festivals are covered?',
        a: 'The national ones plus the ones your customers actually celebrate. Tell us your audience and we build the calendar: Eid, Diwali, regional festivals, New Year, and more.',
      },
      {
        q: 'Can I get the whole year at once?',
        a: 'Yes, and it is cheaper that way. We deliver the full set dated and organised, so posting is one tap on the day.',
      },
      {
        q: 'Do you write the greeting text?',
        a: 'Yes, in the tone you prefer: formal, warm or festive. Hindi, Urdu and English options available.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'messaging-promotional-creative',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Messaging promotional creative',
    seoTitle: 'WhatsApp Promo Creative Design | Jaurvo',
    seoDescription:
      'Creatives sized for WhatsApp status and broadcasts, where your customers actually see them. Offers designed to be read in seconds.',
    h1: 'Designed for where customers actually look.',
    intro:
      'For many businesses, WhatsApp status and broadcasts reach more customers than Instagram ever will. But the creatives are usually cramped screenshots. We design promotionals specifically for messaging: the right dimensions, big readable text, and the offer up front. Price, dates and how to order, all readable in the two seconds a status gets. This is practical design for real reach.',
    points: [
      'Sized for status and broadcasts',
      'Offer readable in seconds',
      'Price and validity up front',
      'Order action made obvious',
      'Matches your brand',
    ],
    faqs: [
      {
        q: 'Is this different from an Instagram post?',
        a: 'Yes. Different dimensions, different viewing behaviour, different text sizes. A post shrunk to status is unreadable; we design for the surface from the start.',
      },
      {
        q: 'Can you do these regularly for my offers?',
        a: 'Yes. Many shops send us each new offer and get the creative back within a day. Monthly arrangements work well.',
      },
      {
        q: 'Do you write the offer text?',
        a: 'We tighten it. Send the rough details and we shape them into the short, sharp wording these creatives need.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'youtube-thumbnail',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'YouTube thumbnail',
    seoTitle: 'YouTube Thumbnail Design | Jaurvo',
    seoDescription:
      'Bold, readable thumbnails designed to earn the click. Tested at small sizes, styled for your channel.',
    h1: 'Thumbnails that earn the click.',
    intro:
      'The thumbnail decides whether your video gets watched. We design thumbnails with the three things that work: a readable title in few words, a clear focal image, and a style viewers start recognising as yours. Every thumbnail is checked at small size, because most viewers are on phones. Over time, a consistent thumbnail style becomes part of your channel\u2019s identity.',
    points: [
      'Bold titles, three to six words',
      'Checked readable at small sizes',
      'Consistent channel style',
      'Face and emotion forward when it fits',
      'Templates for series',
    ],
    faqs: [
      {
        q: 'Do thumbnails really matter that much?',
        a: 'Enormously. Click-through rate is a major ranking factor, and the thumbnail is half of it. Many channels double views with better thumbnails alone.',
      },
      {
        q: 'I do not show my face. Can it still work?',
        a: 'Yes. Object, text and graphic-driven thumbnails work well in many niches. We design around what your channel actually shows.',
      },
      {
        q: 'Can you do all my thumbnails monthly?',
        a: 'Yes. Channels on a monthly plan get a consistent style and fast turnaround per video.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'facebook-cover-banner',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Facebook cover/banner',
    seoTitle: 'Facebook Cover Design | Jaurvo',
    seoDescription:
      'Cover images sized correctly for Facebook, designed around your latest offer or season. Your page, looking current.',
    h1: 'A cover that looks current.',
    intro:
      'The Facebook cover is the billboard of your page, and most are outdated or wrongly sized. We design covers at the exact dimensions, composed so nothing important hides behind the profile picture or buttons. Seasonal updates keep the page feeling alive: a new offer, a festival, a launch. It is a small design with a big first-impression job. We keep it sharp, current and unmistakably yours.',
    points: [
      'Exact Facebook dimensions',
      'Safe zones for profile pic and buttons',
      'Designed around your current offer',
      'Seasonal refresh option',
      'Matched to your branding',
    ],
    faqs: [
      {
        q: 'Why does my current cover look cropped?',
        a: 'Facebook crops covers differently on phone and desktop, and the profile picture overlaps one corner. We compose within the safe area so it looks right everywhere.',
      },
      {
        q: 'How often should I update it?',
        a: 'With each season, offer or campaign. A stale cover signals a stale business. Quarterly refreshes are a good rhythm.',
      },
      {
        q: 'Can it match my website?',
        a: 'Yes. We pull the same visual language so your Facebook page feels like an extension of your site.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'instagram-highlight-covers',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Instagram highlight covers',
    seoTitle: 'Instagram Highlight Covers | Jaurvo',
    seoDescription:
      'Matching highlight cover icons that make your profile look organised. Small details that complete the first impression.',
    h1: 'The small detail that completes your profile.',
    intro:
      'Highlight covers are tiny, but a profile with matching covers looks organised and a profile without them looks unfinished. We design a matching icon set for your highlights: services, reviews, offers, behind-the-scenes, whatever your profile needs. Simple, readable at small size, and unmistakably yours. It is one of the cheapest upgrades to how your profile feels. Done once, working for you every day.',
    points: [
      'Matching icon set',
      'Readable at small sizes',
      'Covers for your key highlights',
      'On-brand colours and style',
      'Files ready to upload',
    ],
    faqs: [
      {
        q: 'How many covers do I need?',
        a: 'Usually five to eight: services, reviews, offers, location, about, and whatever is specific to you. We advise based on your profile.',
      },
      {
        q: 'Can you use my brand icons?',
        a: 'Yes. If you have a brand style, we extend it. If not, we design a clean set that suits your business.',
      },
      {
        q: 'Is this really worth paying for?',
        a: 'It is small money for a visible finish. Profiles are judged in seconds, and complete profiles convert better.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'monthly-social-media-design-package',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Monthly social-media design package',
    seoTitle: 'Monthly Social Media Design | Jaurvo',
    seoDescription:
      'A month of posts, stories and covers planned together. Your pages stay active and consistent without you chasing designers.',
    h1: 'A month of content, handled.',
    intro:
      'Consistency is what grows social pages, and consistency is what busy owners cannot maintain alone. Our monthly package plans and designs your content for the whole month: posts, stories, covers, festival greetings, all in one coherent style. You approve the plan, we deliver on schedule, you post. Your page never goes quiet, and every piece looks like it came from one brand.',
    points: [
      'Monthly content plan included',
      'Posts, stories and covers together',
      'Festival dates covered automatically',
      'One consistent brand style',
      'Scheduled delivery, priority turnaround',
    ],
    faqs: [
      {
        q: 'How many posts are included?',
        a: 'Packages are tiered by volume. A typical plan covers twelve to sixteen posts plus stories. Tell us your posting rhythm and we fit the plan to it.',
      },
      {
        q: 'Do I approve everything first?',
        a: 'Yes. Nothing posts without your approval. We send batches for review, you request changes, then it is scheduled.',
      },
      {
        q: 'Can I pause for a month?',
        a: 'Yes. Monthly means monthly. Pause when you need to, resume when you are ready.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'profile-setup-page-optimization',
    categoryKey: 'social',
    categoryCode: 'S.06',
    categoryName: 'Social Media Designs',
    name: 'Profile setup & page optimization',
    seoTitle: 'Social Profile Setup & Optimisation | Jaurvo',
    seoDescription:
      'Your profile photo, bio and highlights set up properly. A first-time visitor understands your business in seconds.',
    h1: 'A profile that explains itself.',
    intro:
      'Most business profiles confuse first-time visitors: unclear bio, random highlights, no contact info. We set up your profile properly from top to bottom. Photo, name field with keywords, bio that says what you do and where, highlights organised, contact buttons working. The test is simple: a stranger should understand your business and know how to reach you within seconds of landing.',
    points: [
      'Profile photo and name optimisation',
      'Bio written for clarity and keywords',
      'Highlights organised with covers',
      'Contact and action buttons set up',
      'First-impression review included',
    ],
    faqs: [
      {
        q: 'Which platforms do you cover?',
        a: 'Instagram, Facebook and YouTube primarily. The principles apply everywhere, and we adapt per platform.',
      },
      {
        q: 'Will this get me more followers?',
        a: 'It improves conversion, not reach. More of the people who find you will follow and contact you. Reach still needs content and consistency.',
      },
      {
        q: 'Can you also manage posting?',
        a: 'Setup and optimisation is the foundation. Ongoing design is the monthly package. Full account management we discuss case by case.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.07 POSTERS & BANNERS
  {
    slug: 'business-promotional-poster',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Business promotional poster',
    seoTitle: 'Business Poster Design | Jaurvo',
    seoDescription:
      'A poster that promotes your business, offer or service. Designed to be read in seconds, for print and social sharing.',
    h1: 'A poster read in seconds, remembered for days.',
    intro:
      'A poster has about three seconds. We design business posters with a clear hierarchy: the offer first, the details second, your name always visible. Whether it goes on a shop wall or a WhatsApp forward, it reads instantly and looks professional. No clutter, no tiny text, no decoration for its own sake. Just a poster that does its job. That is the standard we hold every design to.',
    points: [
      'Clear visual hierarchy',
      'Offer-first layout',
      'Print and digital sizes',
      'Your branding throughout',
      'Readable at a distance',
    ],
    faqs: [
      {
        q: 'What size will I get?',
        a: 'Print sizes for display plus digital versions for sharing. Tell us where it will be used and we size it right.',
      },
      {
        q: 'How much text can it carry?',
        a: 'Less than you think. We will tell you honestly what to cut. A poster with a paragraph is a flyer that failed.',
      },
      {
        q: 'Can I get variations for different offers?',
        a: 'Yes. Once the base design exists, variations for new offers are quick and cheaper.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'sale-discount-creative',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Sale/discount creative',
    seoTitle: 'Sale Poster Design | Jaurvo',
    seoDescription:
      'Sale and discount designs that create urgency without looking cheap. For print, social media and storefronts.',
    h1: 'Urgency, without looking cheap.',
    intro:
      'Sale designs walk a fine line: they need excitement without looking desperate. We design discount creatives with bold offer presentation, clear validity dates, and a premium feel that protects your brand. The discount reads instantly, the terms are honest and visible, and the whole thing looks like a brand having a sale, not a shop closing down. Your margins stay protected and your brand stays proud.',
    points: [
      'Bold, instant-read offer layout',
      'Validity dates made clear',
      'Premium feel preserved',
      'Print and social sizes',
      'Storefront and digital versions',
    ],
    faqs: [
      {
        q: 'Can you make it look premium despite the discount?',
        a: 'That is the whole skill. Restraint in design, confidence in typography. Cheap-looking sales come from clutter, not from the discount itself.',
      },
      {
        q: 'What details do you need?',
        a: 'The offer, the dates, any terms, and your branding. We handle the rest, including honest fine print.',
      },
      {
        q: 'How fast can you deliver?',
        a: 'Sale creatives are usually ready in one to two days. Sales are time-sensitive and we treat them that way.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'festival-offer-poster',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Festival offer poster',
    seoTitle: 'Festival Offer Poster Design | Jaurvo',
    seoDescription:
      'Festival-season offers designed for your shop. Ready for print and sharing, delivered before the rush begins.',
    h1: 'Ready before the festival rush.',
    intro:
      'Festival season is when shops make their year, and the posters need to be up before the customers arrive, not after. We design festival offer posters with the season\u2019s warmth and your offer\u2019s clarity: what is on sale, how much off, until when. Delivered early enough to print and display. One less thing to panic about in your busiest weeks.',
    points: [
      'Festival-themed design',
      'Offer and dates prominent',
      'Print-ready for shop display',
      'Digital version for sharing',
      'Delivered before the season',
    ],
    faqs: [
      {
        q: 'Which festivals do you cover?',
        a: 'All of them: Diwali, Eid, Christmas, regional festivals. Tell us your market and we design for the festivals your customers celebrate.',
      },
      {
        q: 'How early should I order?',
        a: 'Two to three weeks before the festival. Design, printing and display all take time, and last-minute work costs more everywhere.',
      },
      {
        q: 'Can you do a full festival campaign?',
        a: 'Yes. Poster, social posts, status creatives and banners as one coordinated set. Campaigns look stronger than scattered pieces.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'restaurant-offer-poster',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Restaurant offer poster',
    seoTitle: 'Restaurant Offer Poster Design | Jaurvo',
    seoDescription:
      'Food offers and combos presented appetisingly. Posters that make customers message to order.',
    h1: 'Make them hungry, then make them order.',
    intro:
      'A food offer poster has one job: make the mouth water and the phone come out. We design restaurant offer posters with appetising food presentation, prices that read instantly, and the order action obvious. Combos, thalis, weekend specials, whatever the offer, the design makes it feel like a good decision. These work on shop displays, table tents and WhatsApp forwards alike.',
    points: [
      'Appetising food presentation',
      'Prices instantly readable',
      'Order action made obvious',
      'Display and share sizes',
      'Matches your restaurant branding',
    ],
    faqs: [
      {
        q: 'I do not have professional food photos. What then?',
        a: 'We work with what you have and enhance it. For best results we recommend a small photo shoot; good photos pay for themselves many times over in food marketing.',
      },
      {
        q: 'Can you design table tents too?',
        a: 'Yes. Table tents, menu inserts and display boards in the same design language as the poster.',
      },
      {
        q: 'How often should offers change?',
        a: 'Monthly or seasonally keeps regulars interested. We offer arrangements for restaurants that run frequent offers.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'event-poster',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Event poster',
    seoTitle: 'Event Poster Design | Jaurvo',
    seoDescription:
      'Posters for events, programmes and gatherings. The details guests need first, designed to be noticed.',
    h1: 'The details first, the design around them.',
    intro:
      'An event poster fails when the date is buried under decoration. We design event posters with ruthless priority: what, when, where, in that order, readable from a distance. Then the design earns attention around those facts. Conferences, religious programmes, community gatherings, college fests: the format adapts, the clarity does not. We have designed for crowds of fifty and for fifty thousand.',
    points: [
      'Date, venue, time prioritised',
      'Readable from a distance',
      'Print and digital sizes',
      'Programme schedule layout option',
      'On-theme design',
    ],
    faqs: [
      {
        q: 'What if details change after printing?',
        a: 'We always recommend a digital version for sharing alongside print, so updates are possible. For print, we double-check every detail with you before finalising.',
      },
      {
        q: 'Can you design in Urdu or Arabic?',
        a: 'Yes. Right-to-left layouts are handled properly, which matters for religious and community events.',
      },
      {
        q: 'Do you do the full event branding?',
        a: 'Yes. Poster, banners, stage backdrop, badges and social creatives as one set. Events look far more professional with unified branding.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'shop-opening-poster',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Shop-opening poster',
    seoTitle: 'Shop Opening Poster Design | Jaurvo',
    seoDescription:
      'Grand-opening designs that announce your new shop. Date, address and opening offers up front, impossible to miss.',
    h1: 'Announce the opening like you mean it.',
    intro:
      'A new shop gets one opening. The posters need to make the neighbourhood notice: the name, the date, the address, and a reason to come on day one. We design grand-opening posters with all of it up front, in a celebratory style that suits your trade. For the digital side, shareable versions go on status and local groups. Openings with proper announcements simply get more footfall.',
    points: [
      'Grand-opening celebratory design',
      'Date, address, timing prominent',
      'Opening offers highlighted',
      'Print sizes for the locality',
      'Shareable digital versions',
    ],
    faqs: [
      {
        q: 'How early should I get these designed?',
        a: 'Three to four weeks before opening. You need time for printing, distribution and display, plus the digital buzz to build.',
      },
      {
        q: 'Can you design the shop board too?',
        a: 'Yes, as a separate service. Many new shops bundle the opening posters with board design for a coordinated launch look.',
      },
      {
        q: 'What about pamphlet distribution?',
        a: 'We design flyers for distribution as well. Poster plus flyer is the classic opening combination.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'flex-banner-design',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Flex/banner design',
    seoTitle: 'Flex Banner Design | Jaurvo',
    seoDescription:
      'Large-format banner designs for your shop front or event. Delivered print-ready at the exact size, sharp at any scale.',
    h1: 'Big, sharp, impossible to ignore.',
    intro:
      'Flex banners are seen from far and judged fast. We design them with oversized typography, minimal text, and layouts that work at ten feet, not ten inches. Files are delivered print-ready at your exact size and resolution, so the print comes out sharp, not pixelated. Shop fronts, events, roadside: wherever the banner goes, it reads. One strong message, visible from across the road.',
    points: [
      'Designed for distance reading',
      'Exact-size print-ready files',
      'High resolution, no pixelation',
      'Minimal text, maximum impact',
      'Your branding bold and clear',
    ],
    faqs: [
      {
        q: 'What size do you need from me?',
        a: 'The exact width and height in feet where it will be printed. We design to those dimensions so nothing gets stretched or cropped at the press.',
      },
      {
        q: 'Do you arrange printing?',
        a: 'We deliver print-ready files; most clients print locally for speed and cost. If you want us to arrange it, we can.',
      },
      {
        q: 'How little text should a banner have?',
        a: 'Name, one line about what you do, phone or address. That is it. Banners with paragraphs do not get read.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'flyer-pamphlet',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Flyer/pamphlet',
    seoTitle: 'Flyer & Pamphlet Design | Jaurvo',
    seoDescription:
      'Single and folded flyers that explain your services clearly. Designed to survive the journey from hand to home.',
    h1: 'A flyer that survives the journey home.',
    intro:
      'Most flyers get glanced at and dropped. Ours are designed to make the glance count: a clear headline, the essential details, and a reason to keep it. We do single-side, double-side and folded formats, each laid out so the key information lands even in a two-second look. Print-ready files with proper margins, so the press output matches the design. Clean, honest and ready to distribute.',
    points: [
      'Single, double-side and folded formats',
      'Glance-readable layout',
      'Print-ready with proper margins',
      'Your offer and contact prominent',
      'Distribution-friendly sizes',
    ],
    faqs: [
      {
        q: 'What is the best size for distribution?',
        a: 'A5 for handouts, A4 for detailed services. We recommend based on how much you need to say and where it will be distributed.',
      },
      {
        q: 'How much can a flyer say?',
        a: 'More than a poster, less than a brochure. Services list, key details, contact. We edit ruthlessly; cramped flyers do not get read.',
      },
      {
        q: 'Can you write the content?',
        a: 'We shape your rough points into flyer copy as part of the design. Full content writing is available as a separate service.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'brochure',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Brochure',
    seoTitle: 'Brochure Design Services | Jaurvo',
    seoDescription:
      'Multi-page brochures that present your business, services and prices in a polished, structured way.',
    h1: 'Your business, presented page by page.',
    intro:
      'A brochure is for when someone is already interested and wants the full picture. We design multi-page brochures with a real structure: who you are, what you offer, how it works, what it costs, how to reach you. Each spread is designed, not just filled. The result feels like a document from an established company, which is exactly the impression it needs to give.',
    points: [
      'Structured multi-page layout',
      'Services, pricing and process sections',
      'Professional print specifications',
      'Digital PDF version included',
      'Consistent with your brand',
    ],
    faqs: [
      {
        q: 'How many pages should a brochure be?',
        a: 'Six to twelve pages covers most businesses. Enough to be complete, short enough to be read. We advise on length after understanding your content.',
      },
      {
        q: 'Do you write the brochure content?',
        a: 'We structure and polish your material as part of the design. Full writing from scratch is our content service, often bundled.',
      },
      {
        q: 'Print or digital?',
        a: 'Both. You get press-ready files and a screen-optimised PDF for email and WhatsApp sharing.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'restaurant-menu-design',
    categoryKey: 'posters',
    categoryCode: 'S.07',
    categoryName: 'Posters & Banners',
    name: 'Restaurant menu design',
    seoTitle: 'Restaurant Menu Design | Jaurvo',
    seoDescription:
      'Menus designed to be read easily and ordered from confidently. For print, display and sharing.',
    h1: 'A menu that sells, not just lists.',
    intro:
      'A menu is a sales document. We design menus that guide the eye: categories that make sense, prices that are easy to scan, and your profitable dishes placed where they get ordered. Readable fonts, sensible spacing, no clutter. For print, display boards and digital sharing, each version sized right. A well-designed menu quietly raises the average bill. Good design pays for itself within weeks.',
    points: [
      'Logical categories and flow',
      'Prices easy to scan',
      'High-margin dishes highlighted',
      'Print, board and digital versions',
      'Matches your restaurant identity',
    ],
    faqs: [
      {
        q: 'Can you work with my existing dishes and prices?',
        a: 'Yes. Send the list and we organise, categorise and design it. We often spot improvements in grouping just from laying it out.',
      },
      {
        q: 'Do you design menu boards too?',
        a: 'Yes. Wall boards, table menus and takeaway flyers in one consistent system.',
      },
      {
        q: 'My menu changes seasonally. Then what?',
        a: 'We deliver editable-friendly structures and offer update arrangements. Seasonal changes should be easy, not a redesign each time.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.08 CONTENT WRITING
  {
    slug: 'website-content',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Website content',
    seoTitle: 'Website Content Writing | Jaurvo',
    seoDescription:
      'Home, about and service page writing that explains what you do clearly. Professional copy that sounds like a real business.',
    h1: 'Words that sound like your business.',
    intro:
      'Most website copy is either empty or confusing. We write page content that explains what you do in plain language: home, about, services, each page with a clear purpose. The tone is professional but human, written for your customers, not for a grammar test. Good copy does quiet work: visitors understand faster, trust sooner, and contact you more. That is what professional copy is for.',
    points: [
      'Home, about and services pages',
      'Plain-language, professional tone',
      'Written for your actual customers',
      'SEO-friendly structure included',
      'Revisions until it sounds right',
    ],
    faqs: [
      {
        q: 'How do you learn about my business?',
        a: 'A detailed questionnaire plus a call. You know your business; our job is to ask the right questions and turn your answers into copy that reads well.',
      },
      {
        q: 'Will it sound like me or like a template?',
        a: 'Like you, polished. We write in your voice, not ours. Every business gets fresh copy; nothing is recycled between clients.',
      },
      {
        q: 'Can you write in Hindi or Urdu?',
        a: 'Yes. Hindi, English and Urdu content is a separate service, often bundled with website copy for bilingual sites.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'product-descriptions',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Product descriptions',
    seoTitle: 'Product Description Writing | Jaurvo',
    seoDescription:
      'Descriptions that sell the benefit, not the feature list. Product copy that tells customers why they should buy.',
    h1: 'Descriptions that sell the why.',
    intro:
      'Customers buy benefits, not specifications. We write product descriptions that lead with what the product does for the buyer, then cover the details they need to decide. Each description is scannable: a strong opening, key points, honest specs. For stores with many products, we build a consistent voice so the whole catalogue feels like one brand. Clear, consistent and written to convert browsers into buyers.',
    points: [
      'Benefit-first copy structure',
      'Scannable format for shoppers',
      'Consistent voice across catalogue',
      'SEO-friendly product text',
      'Bulk packages for large catalogues',
    ],
    faqs: [
      {
        q: 'How many products can you handle?',
        a: 'From ten to ten thousand. Bulk packages bring the per-product cost down significantly, and consistency improves with volume.',
      },
      {
        q: 'Do you need the physical product?',
        a: 'No. Photos, specifications and your notes are enough. For technical products, a short call fills the gaps.',
      },
      {
        q: 'Will descriptions be unique for SEO?',
        a: 'Yes. Every description is written fresh. Duplicate manufacturer text is exactly what we replace, and Google notices the difference.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'business-introduction-profile',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Business introduction/profile',
    seoTitle: 'Business Profile Writing | Jaurvo',
    seoDescription:
      'A polished introduction of your business for proposals, directories and partner enquiries. Your company, presented well.',
    h1: 'Your business, introduced properly.',
    intro:
      'Proposals, directories, tender documents and partner enquiries all ask for the same thing: who are you, what do you do, why should we trust you. We write a polished business introduction that answers all three convincingly. One strong document, adaptable to proposals, profiles and listings. It reads like an established company wrote it, because after our edit, it did. Serious on paper, true in person.',
    points: [
      'Company overview that builds trust',
      'Services and strengths clearly stated',
      'Adaptable to proposals and listings',
      'Professional, credible tone',
      'Multiple length versions',
    ],
    faqs: [
      {
        q: 'Where will I use this?',
        a: 'Tenders, proposals, directory listings, partnership emails, about pages. Anywhere someone asks you to describe your company.',
      },
      {
        q: 'What if my business is small or new?',
        a: 'Then this matters more, not less. Good writing makes a young company sound serious and a small company sound focused.',
      },
      {
        q: 'Can you make different lengths?',
        a: 'Yes. We usually deliver a full version, a one-paragraph version and a one-line version, so you are ready for any form.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'instagram-captions',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Instagram captions',
    seoTitle: 'Instagram Caption Writing | Jaurvo',
    seoDescription:
      'Captions written to be read, saved and acted on. In your brand voice, not generic filler.',
    h1: 'Captions people actually read.',
    intro:
      'A good photo with a weak caption is a missed opportunity. We write captions with a job to do: stop the scroll, say something worth reading, and end with a reason to act. The voice matches your brand, whether that is warm, witty or straight-talking. Hashtags researched, not dumped. Delivered in batches so your posting stays consistent without daily effort.',
    points: [
      'Written in your brand voice',
      'Hook-first caption structure',
      'Call to action in every caption',
      'Researched hashtags included',
      'Batch delivery for consistency',
    ],
    faqs: [
      {
        q: 'How many captions per batch?',
        a: 'Batches of ten, twenty or thirty. Monthly rhythms work best: captions ready before the month starts.',
      },
      {
        q: 'Will they sound like me?',
        a: 'After the first batch, yes. We study your existing voice and refine with your feedback until it is natural.',
      },
      {
        q: 'Do you write in Hinglish or Hindi too?',
        a: 'Yes. Many audiences respond better to Hinglish or Hindi. We write in whatever your followers actually read.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'restaurant-menu-content',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Restaurant menu content',
    seoTitle: 'Restaurant Menu Content Writing | Jaurvo',
    seoDescription:
      'Dish names and descriptions written to sound as good as the food tastes. English with Arabic support for Gulf menus.',
    h1: 'Words as appetising as the food.',
    intro:
      'People order with their imagination first. A dish described well sells more than the same dish listed plainly. We write menu content that makes food sound like it tastes: vivid but honest, appetising but accurate. Dish names polished, descriptions tight, categories sensible. English standard, Arabic available for Gulf restaurants, because a bilingual menu serves every table. Your dishes deserve descriptions that do them justice.',
    points: [
      'Appetising dish descriptions',
      'Polished dish names',
      'Sensible categories and flow',
      'English with Arabic option',
      'Print and digital ready',
    ],
    faqs: [
      {
        q: 'Do you taste the food first?',
        a: 'We work from your recipes, photos and your description of each dish. For large menus, a tasting visit helps and we welcome it.',
      },
      {
        q: 'Can you keep it honest? I do not want exaggeration.',
        a: 'Absolutely. The best menu writing is accurate writing, well said. Exaggeration disappoints; precision sells.',
      },
      {
        q: 'How long is the turnaround?',
        a: 'Depends on menu size. A fifty-dish menu typically takes one to two weeks including your review rounds.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'poster-banner-text',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Poster/banner text',
    seoTitle: 'Poster & Banner Copywriting | Jaurvo',
    seoDescription:
      'Short, sharp poster wording. Headline, offer and call to action that fit the design and get read.',
    h1: 'Fewer words, more impact.',
    intro:
      'Poster text is a different skill from page writing. Every word must earn its place, because nobody reads a poster twice. We write the short, sharp copy posters need: a headline that stops, an offer line that is instantly clear, and a call to action that fits the space. Delivered alongside or ahead of design, so the words and the layout are built for each other.',
    points: [
      'Headlines that stop the eye',
      'Offer lines instantly clear',
      'Calls to action that fit the space',
      'Word counts matched to design',
      'Hindi, English, Urdu options',
    ],
    faqs: [
      {
        q: 'Can you just write the text if someone else designs?',
        a: 'Yes. We deliver copy with word counts and hierarchy notes, so any designer can lay it out correctly.',
      },
      {
        q: 'How short is short?',
        a: 'A poster headline is three to seven words. The whole poster rarely needs more than thirty. We will show you.',
      },
      {
        q: 'Do you handle multiple languages?',
        a: 'Yes. Hindi, English and Urdu, matched to your audience.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'wedding-invitation-wording',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Wedding invitation wording',
    seoTitle: 'Wedding Invitation Wording | Jaurvo',
    seoDescription:
      'Invitation wording that sounds like your family. Respectful, warm and correct in every detail.',
    h1: 'Words worthy of the occasion.',
    intro:
      'Wedding wording carries weight: names, relations, blessings, all correct and all graceful. We write invitation text that sounds like your family at its best: respectful, warm, never stiff. Every name spelled right, every relation correct, religious phrases accurate. In English, Hindi, Urdu or Arabic, or a dignified mix, because families are multilingual and invitations should be too. Every word earns its place on the card.',
    points: [
      'Names and relations verified correct',
      'Respectful, warm tone',
      'Religious phrases accurately used',
      'English, Hindi, Urdu, Arabic options',
      'Matches your card or website design',
    ],
    faqs: [
      {
        q: 'How do you get the names and details right?',
        a: 'A detailed form plus verification. You review the final wording before anything is printed or published. Nothing goes out unchecked.',
      },
      {
        q: 'Can you write in a mix of languages?',
        a: 'Yes, and most families want exactly that. We handle the blend gracefully so nothing feels patched together.',
      },
      {
        q: 'Do you also design the card?',
        a: 'Wording pairs naturally with our invitation design services. Most clients order both together.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'birthday-invitation-wording',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Birthday invitation wording',
    seoTitle: 'Birthday Invitation Wording | Jaurvo',
    seoDescription:
      'Birthday invitation lines that match the mood. From a first birthday to a milestone, wording that fits.',
    h1: 'The right words for the celebration.',
    intro:
      'A first birthday and a fiftieth need very different words. We write birthday invitation text matched to the mood: playful for kids, warm for family, elegant for milestones. The essentials stay clear (date, venue, RSVP) while the tone makes people smile before they arrive. Short enough for a card, warm enough to feel personal. Simple, heartfelt and ready to send to everyone you love.',
    points: [
      'Tone matched to the occasion',
      'Playful, warm or elegant as needed',
      'Essentials kept clear',
      'Short, card-ready text',
      'Rhyming options for kids parties',
    ],
    faqs: [
      {
        q: 'Can you make it fun for a kids party?',
        a: 'Yes. Rhyming, playful wording is a specialty for children\u2019s birthdays. It sets the tone for the whole party.',
      },
      {
        q: 'What about milestone birthdays?',
        a: 'Elegant and warm, with the milestone honoured properly. These wordings often become keepsakes.',
      },
      {
        q: 'How long is the text?',
        a: 'Short. Invitation wording is measured in lines, not paragraphs. We keep it tight.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'hindi-english-urdu-content',
    categoryKey: 'content',
    categoryCode: 'S.08',
    categoryName: 'Content Writing',
    name: 'Hindi, English & Urdu content',
    seoTitle: 'Hindi English Urdu Content | Jaurvo',
    seoDescription:
      'The same message written properly in Hindi, English or Urdu. For the audience that actually reads it.',
    h1: 'Your message, in the language they read.',
    intro:
      'Translation is not writing. A message written properly in Hindi, English or Urdu reads naturally because it was thought in that language. We create content directly in each language: same message, native phrasing, correct script. For audiences that switch between languages, we handle the mix the way real people speak. Your message lands because it sounds like it belongs. That is the difference native writing makes.',
    points: [
      'Native writing, not translation',
      'Hindi, English and Urdu covered',
      'Correct scripts and grammar',
      'Natural code-mixing where it fits',
      'Consistent message across languages',
    ],
    faqs: [
      {
        q: 'Is this translation?',
        a: 'No. Translation converts words; we write the message fresh in each language. The result reads naturally instead of feeling converted.',
      },
      {
        q: 'Can you do Hinglish?',
        a: 'Yes. Hinglish is often the most effective choice for Indian audiences, and we write it the way people actually speak it.',
      },
      {
        q: 'What about Arabic?',
        a: 'Arabic content is available, particularly for Gulf-facing businesses and invitations.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.09 AI SERVICES
  {
    slug: 'website-ai-chatbot',
    categoryKey: 'ai',
    categoryCode: 'S.09',
    categoryName: 'AI Services',
    name: 'Website AI chatbot',
    seoTitle: 'AI Chatbot for Website | Jaurvo',
    seoDescription:
      'An AI assistant on your website that answers customer questions instantly, day and night, and hands you the enquiry.',
    h1: 'Answer every visitor, even at 2am.',
    intro:
      'Most website visitors have one question, and if it is not answered in a minute, they leave. An AI chatbot answers instantly, any hour: your timings, your prices, your services, trained on your actual business. When the question needs a human, it collects the enquiry and hands it to you neatly. It is like a receptionist who never sleeps, never forgets, and costs less than a month of ads.',
    points: [
      'Trained on your business details',
      'Answers instantly, 24/7',
      'Hands over enquiries to you',
      'Matches your website design',
      'You control what it knows',
    ],
    faqs: [
      {
        q: 'Will it give wrong answers?',
        a: 'It answers only from the information you approve. We train it on your FAQs, services and policies, and set clear boundaries for what it should not guess.',
      },
      {
        q: 'What happens when it cannot answer?',
        a: 'It says so honestly and collects the visitor\u2019s question and contact details for you. No making things up, ever.',
      },
      {
        q: 'Is my business data safe?',
        a: 'Yes. The chatbot uses only the public information you provide. Nothing private is connected unless you explicitly ask for it.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'whatsapp-auto-reply-bot',
    categoryKey: 'ai',
    categoryCode: 'S.09',
    categoryName: 'AI Services',
    name: 'WhatsApp auto-reply bot',
    seoTitle: 'WhatsApp Auto-Reply Bot | Jaurvo',
    seoDescription:
      'Automatic replies for your business WhatsApp. No customer waits, even outside business hours.',
    h1: 'No customer waits for a reply.',
    intro:
      'Customers message at all hours, and a slow reply often means a lost sale. An auto-reply bot answers instantly on your business WhatsApp: greetings, timings, prices, directions, the questions you answer fifty times a week. Complex queries get collected and passed to you. Your customers feel heard immediately, and you stop losing business to whoever replied first. Fast replies win customers; we make sure you are fastest.',
    points: [
      'Instant replies, day and night',
      'Answers your frequent questions',
      'Collects enquiries for follow-up',
      'Works with your business number',
      'You approve every reply',
    ],
    faqs: [
      {
        q: 'Will customers know it is a bot?',
        a: 'It introduces itself plainly. Customers prefer an instant honest bot over a human who replies tomorrow.',
      },
      {
        q: 'Can it take orders or bookings?',
        a: 'It can collect order and booking details and pass them to you structured. Full automated ordering depends on your setup; we advise honestly on what fits.',
      },
      {
        q: 'Does this violate WhatsApp rules?',
        a: 'We build on proper WhatsApp Business tools and approved flows. No spam, no bans, no shortcuts that risk your number.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  // ------------------------------------------------ S.10 DASHBOARDS & BUSINESS TOOLS
  {
    slug: 'business-analytics-dashboard',
    categoryKey: 'dashboards',
    categoryCode: 'S.10',
    categoryName: 'Dashboards & Business Tools',
    name: 'Business analytics dashboard',
    seoTitle: 'Business Analytics Dashboard | Jaurvo',
    seoDescription:
      'Your sales, expenses and trends in clear charts. A PowerBI dashboard built around how your business actually works.',
    h1: 'See your business clearly.',
    intro:
      'Most small businesses run on gut feeling because their numbers live in scattered sheets. We build dashboards that pull your sales, expenses and trends into clear charts you can read in minutes. Built in PowerBI around your actual data and the questions you ask every month. The result is simple: you stop guessing and start seeing. Clarity like this changes how you run the business.',
    points: [
      'Sales, expenses and trends in one view',
      'Built in PowerBI around your data',
      'Charts you can read in minutes',
      'Monthly and comparative views',
      'Training so you can use it',
    ],
    faqs: [
      {
        q: 'What data do you need from me?',
        a: 'Whatever you have: sales records, expense sheets, even rough Excel files. We work with real, messy data and shape it into something clear.',
      },
      {
        q: 'Do I need PowerBI licences?',
        a: 'We advise on the cheapest setup that fits. Many small businesses manage with minimal licensing; we will tell you exactly what you need.',
      },
      {
        q: 'Will I understand it without training?',
        a: 'We include a walkthrough session. Dashboards are built for owners, not analysts, and we keep them that way.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'custom-admin-panel',
    categoryKey: 'dashboards',
    categoryCode: 'S.10',
    categoryName: 'Dashboards & Business Tools',
    name: 'Custom admin panel',
    seoTitle: 'Custom Admin Panel Development | Jaurvo',
    seoDescription:
      'Your own control panel to manage website content, enquiries and orders. No code, no developer needed for daily tasks.',
    h1: 'Run your site without touching code.',
    intro:
      'Calling a developer for every small change is slow and expensive. A custom admin panel gives you a simple control room for your website: update content, see enquiries, manage orders, all without code. We build it around your actual workflow, showing you what you need and hiding what you do not. Your team learns it in one sitting. Control without complexity, built for real daily use.',
    points: [
      'Update site content yourself',
      'Enquiries and orders in one place',
      'Built around your workflow',
      'Simple enough for non-technical staff',
      'Secure login and roles',
    ],
    faqs: [
      {
        q: 'How is this different from WordPress admin?',
        a: 'WordPress gives you everything, including things you will never use and might break accidentally. A custom panel shows only your business needs, which makes it simpler and safer.',
      },
      {
        q: 'Can different staff have different access?',
        a: 'Yes. Roles and permissions are standard: owners see everything, staff see their area.',
      },
      {
        q: 'What if I need new features later?',
        a: 'We build panels to grow. New sections can be added as your needs evolve, quoted fairly as separate work.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
  {
    slug: 'billing-invoice-system',
    categoryKey: 'dashboards',
    categoryCode: 'S.10',
    categoryName: 'Dashboards & Business Tools',
    name: 'Billing & invoice system',
    seoTitle: 'Billing & Invoice System | Jaurvo',
    seoDescription:
      'Simple billing and invoices for small businesses. Built around how you actually work, not generic software.',
    h1: 'Billing that fits your business.',
    intro:
      'Generic billing software forces your business into its boxes. We build simple billing systems around how you actually work: your items, your taxes, your invoice format, your follow-ups. Create invoices in seconds, track who paid, remind who did not. It is the boring software that quietly saves hours every week. Simple to use, accurate every time, and built for Indian billing needs including GST.',
    points: [
      'Invoices in your format',
      'Tax handling as per your needs',
      'Payment tracking and reminders',
      'Customer and item records',
      'Simple reports',
    ],
    faqs: [
      {
        q: 'Does it handle GST?',
        a: 'Yes. GST fields, rates and invoice formats as per Indian requirements. We set it up for your registration type.',
      },
      {
        q: 'Can I use it from my phone?',
        a: 'Yes. It is built mobile-friendly because billing often happens on the shop floor, not at a desk.',
      },
      {
        q: 'What about my existing records?',
        a: 'We import your customer and item lists to get you started. You do not begin from zero.',
      },
    ],
    priceHint: STANDARD_PRICE,
  },
];

export function servicePageBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}
