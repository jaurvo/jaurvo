// Static site content. This is also the offline fallback: when Supabase is
// not connected yet, the whole public site runs on this data alone.

export const PHONE_NUMBER = '+919936786415';
export const PHONE_DISPLAY = '+91 99367 86415';
export const EMAIL = 'jaurvo@gmail.com';
export const SITE_URL = 'https://jaurvo.vercel.app';

// SOCIAL LINKS, verified handles, one place: change these lines only
// and every page (footer, contact, home) picks them up automatically.
export const INSTAGRAM_URL = 'https://www.instagram.com/jaurvo_/';
export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCWWLRUuVi4ylpMzb32BQsgA';
export const SOCIAL_HANDLE = '@jaurvo_';

export const CURRENCY_NOTE =
  'Converted prices are approximate, your final written quote is fixed before payment.';

export type ServiceAccent = 'brass' | 'green';

export interface SubService {
  name: string;
  blurb: string;
  image?: string;
}

export interface ServiceItem {
  key: string;
  code: string;
  name: string;
  icon: string;
  image: string;
  accent: ServiceAccent;
  short: string;
  description: string;
  includes: string[];
  subServices: SubService[];
  whoFor: string;
  priceNote: string;
  /** Base price in USD. Null = priced on request (never a converted number). */
  priceUsd: number | null;
}

export const SERVICES: ServiceItem[] = [
  {
    key: 'websites',
    code: 'S.01',
    name: 'Websites',
    icon: 'globe',
    image: 'assets/gen/service-websites-new.webp',
    accent: 'brass',
    short:
      'Business, restaurant and portfolio websites that load fast, look right on every phone, and bring you enquiries. Bilingual English / Arabic-ready, with menus, galleries, Google Maps and reviews built in.',
    description:
      'Business, restaurant and portfolio websites that load fast, look right on every phone, and get people to message you. Built mobile-first, with your menu, gallery, location and reviews where customers expect to find them.',
    includes: [
      'Custom design matched to your brand, never a copied template',
      'Menu, gallery and services sections (restaurant plans)',
      'Google Maps location + customer reviews',
      'Bilingual-ready, English with full Arabic (RTL) support',
      'Domain (.com/.in), first year included, bought in your own name',
      'Hosting + SSL, first year included',
    ],
    subServices: [
      { name: 'Business website', blurb: 'A complete website for your company, with services, about, gallery and contact pages, designed to bring you enquiries.' , image: 'assets/services/business-website.webp' },
      { name: 'Shop/store website', blurb: 'Your products and offers presented clearly, with direct ordering so customers can buy without a complicated checkout.' , image: 'assets/services/shop-store-website.webp' },
      { name: 'Restaurant & cafe website', blurb: 'Menus, photos, table booking and direct ordering for restaurants and cafés, bilingual English / Arabic ready.' , image: 'assets/services/restaurant-cafe-website.webp' },
      { name: 'Landing page', blurb: 'One focused page for a single offer, campaign or launch, built to get one clear action from every visitor.' , image: 'assets/services/landing-page.webp' },
      { name: 'Portfolio website', blurb: 'A clean showcase of your work and story for professionals, creators and freelancers who win clients on first impressions.' , image: 'assets/services/portfolio-website.webp' },
      { name: 'Salon/beauty parlour website', blurb: 'Services, prices and photo galleries in an elegant design that matches the experience your clients walk in for.' , image: 'assets/services/salon-beauty-parlour-website.webp' },
      { name: 'Travel/tourism website', blurb: 'Trips, packages and services laid out clearly, with enquiry flows that bring bookings straight to you.' , image: 'assets/services/travel-tourism-website.webp' },
      { name: 'Event website', blurb: 'Dates, venue, schedule and guest information in one shareable link your guests can open anywhere.' , image: 'assets/services/event-website.webp' },
      { name: 'Website redesign', blurb: 'Your existing website rebuilt with a fresh, modern design, keeping what works, fixing what holds you back.' , image: 'assets/services/website-redesign.webp' },
      { name: 'Payment gateway integration', blurb: 'UPI, cards and netbanking added to your website, so customers can pay you directly online.' , image: 'assets/services/payment-gateway-integration.webp' },
      { name: 'Website speed optimization', blurb: 'A slow website made fast, so visitors stay longer and Google ranks you better.' , image: 'assets/services/website-speed-optimization.webp' },
      { name: 'Website care plan', blurb: 'Your website looked after every month, updates, backups and security handled for you.' , image: 'assets/services/website-care-plan.webp' },
    ],
    whoFor:
      'Restaurants, cafés, shops, salons, travel businesses and professionals who need customers to find them, trust them and message them.',
    priceNote: 'Website plans, starting from',
    priceUsd: 300,
  },
  {
    key: 'logo',
    code: 'S.02',
    name: 'Logo & Branding',
    icon: 'palette',
    image: 'assets/gen/service-logo-new.webp',
    accent: 'brass',
    short:
      'A clean, memorable logo with a mini brand kit, colours, fonts and files for web, print and social.',
    description:
      'A clean, memorable logo that works everywhere: on your shop board, your website and your social profiles. Plus a mini brand kit, so everything you print or post stays consistent.',
    includes: [
      'A custom logo designed around your business name and style',
      'Mini brand kit, your colours and fonts, written down',
      'Files for web, print and social media',
      'Light and dark versions, so it reads on any background',
    ],
    subServices: [
      { name: 'Business logo', blurb: 'A clean, memorable logo designed around your business name, trade and the customers you serve.' , image: 'assets/services/business-logo.webp' },
      { name: 'Restaurant/shop logo', blurb: 'A logo that reads clearly on a shop board, a menu and a delivery app, designed for food and retail businesses.' , image: 'assets/services/restaurant-shop-logo.webp' },
      { name: 'Personal brand logo', blurb: 'A signature-style logo for creators, consultants and professionals building a name of their own.' , image: 'assets/services/personal-brand-logo.webp' },
      { name: 'Instagram profile logo', blurb: 'A version of your mark sized and sharpened for profile pictures, so your page looks professional at a glance.' , image: 'assets/services/instagram-profile-logo.webp' },
      { name: 'Complete basic brand identity', blurb: 'Logo, colours, fonts and the everyday files together, a complete starter identity for a new business.' , image: 'assets/services/complete-basic-brand-identity.webp' },
      { name: 'Visiting/business card', blurb: 'A visiting card designed to match your logo and colours, print-ready files for any printer.' , image: 'assets/services/visiting-business-card.webp' },
      { name: 'Letterhead', blurb: 'A clean letterhead for invoices, letters and quotations that keeps every document on-brand.' , image: 'assets/services/letterhead.webp' },
      { name: 'Brand colour & font selection', blurb: "Your brand's colours and fonts chosen and written down, so every design you order stays consistent." , image: 'assets/services/brand-colour-font-selection.webp' },
    ],
    whoFor:
      'New businesses launching properly, and existing businesses whose logo no longer matches their quality.',
    priceNote: 'Starting from',
    priceUsd: 32,
  },
  {
    key: 'invitations',
    code: 'S.03',
    name: 'Invitation Websites',
    icon: 'heart',
    image: 'assets/gen/service-invitations-new.webp',
    accent: 'brass',
    short:
      'Wedding & birthday invitation websites with your story, countdown, venue map and RSVP, shared like a digital card.',
    description:
      "A digital invitation that lives in every guest's inbox and phone. Designed in your printed card's own colours and style, it opens like a celebration and carries everything a card cannot: countdown, maps and one-tap RSVP.",
    includes: [
      "Design matched to your card's colours and style",
      'A curtain-opening welcome screen guests remember',
      'Live countdown to the big day',
      'Venue on Google Maps, one tap to directions',
      'One-tap RSVP for guests',
    ],
    subServices: [
      { name: 'Wedding/Nikah invitation', blurb: "A wedding invitation website in your card's own colours, story, countdown, venue map and RSVP in one link." , image: 'assets/services/wedding-nikah-invitation.webp' },
      { name: 'Couple story + gallery + venue + countdown invitation', blurb: 'The full experience, how you met, your favourite photos, a live countdown, the venue map and RSVP together.' , image: 'assets/services/couple-story-gallery-venue-countdown-invitation.webp' },
      { name: 'Engagement invitation', blurb: 'Announce your engagement beautifully, with event details and a link guests can save and share.' , image: 'assets/services/engagement-invitation.webp' },
      { name: 'Birthday invitation', blurb: 'A fun, personal birthday invitation page with the venue, timing and RSVP, ready to forward to guests.' , image: 'assets/services/birthday-invitation.webp' },
      { name: 'Anniversary invitation', blurb: 'Celebrate the milestone with your story, photos and celebration details in one elegant page.' , image: 'assets/services/anniversary-invitation.webp' },
      { name: 'Baby shower invitation', blurb: 'A warm invitation for your baby shower, with venue details and guest RSVP made simple.' , image: 'assets/services/baby-shower-invitation.webp' },
      { name: 'Housewarming invitation', blurb: 'Invite family and friends to your new home with the address on a map and one-tap directions.' , image: 'assets/services/housewarming-invitation.webp' },
      { name: 'Corporate event invitation', blurb: 'A professional invitation page for launches, conferences and company events, with schedule and registration details.' , image: 'assets/services/corporate-event-invitation.webp' },
      { name: 'RSVP invitation website', blurb: 'An invitation built around replies, guest confirmations collected neatly in one place, no chasing phone calls.' , image: 'assets/services/rsvp-invitation-website.webp' },
      { name: 'Digital invitation card design', blurb: 'A designed digital card image, ready to send to guests and share on social media.' , image: 'assets/services/digital-invitation-card-design.webp' },
      { name: 'Printable wedding invitation', blurb: 'A print-ready invitation card design your printer can produce exactly as designed.' , image: 'assets/services/printable-wedding-invitation.webp' },
      { name: 'Invitation poster', blurb: 'A poster version of your invitation for displays, status updates and sharing beyond the guest list.' , image: 'assets/services/invitation-poster.webp' },
    ],
    whoFor:
      'Weddings and Nikah ceremonies, engagements and birthdays, any celebration where the invitation itself should feel special.',
    priceNote: 'Starting from',
    priceUsd: 53,
  },
  {
    key: 'uiux',
    code: 'S.04',
    name: 'UI/UX Design',
    icon: 'pen-line',
    image: 'assets/gen/service-uiux-new.webp',
    accent: 'brass',
    short:
      'Professional screen designs in Figma before a line of code, so you see exactly what you are getting.',
    description:
      'Good software starts on the drawing board. We design your website or app screens in Figma, clean layouts you can click through and approve, before any development begins. Design only, development is a separate step.',
    includes: [
      'Screens designed in Figma',
      'Clickable prototype to review',
      'Clean, professional layouts',
      'Design files ready for developers',
      'Two revision rounds',
    ],
    subServices: [
      { name: 'Website UI/UX design', blurb: 'Complete website screens designed in Figma, with a clickable prototype. Design only, development is separate.' , image: 'assets/services/website-ui-ux-design.webp' },
      { name: 'Mobile app UI design', blurb: 'Clean app screens designed for Android and iOS, ready for your developer to build.' , image: 'assets/services/mobile-app-ui-design.webp' },
    ],
    whoFor:
      'Businesses and founders who want their website or app designed properly before spending on development.',
    priceNote: 'Priced on request',
    priceUsd: null,
  },  {
    key: 'seo',
    code: 'S.05',
    name: 'SEO & Growth',
    icon: 'search',
    image: 'assets/gen/service-seo-new.webp',
    accent: 'green',
    short:
      'Get found on Google. Local search ranking and a proper business listing, so nearby customers find you first.',
    description:
      'Being on Google is not enough, you have to show up first. We set up your business listing properly and improve your ranking for the searches your customers actually type, especially near-me searches.',
    includes: [
      'Google Business Profile setup',
      'Local search ranking',
      'Search-friendly page titles',
      'Review guidance',
      'Progress check on care plans',
    ],
    subServices: [
      { name: 'Local SEO', blurb: 'Rank higher on Google for the searches your nearby customers type, including near-me searches.' , image: 'assets/services/local-seo.webp' },
      { name: 'Google business profile setup', blurb: 'Your business properly listed on Google Maps and Search, with photos, hours and details customers trust.' , image: 'assets/services/google-business-profile-setup.webp' },
    ],
    whoFor:
      'Local shops, restaurants, salons and services that live on nearby customers finding them.',
    priceNote: 'Priced on request',
    priceUsd: null,
  },
  {
    key: 'social',
    code: 'S.06',
    name: 'Social Media Designs',
    icon: 'share-2',
    image: 'assets/gen/service-social-new.webp',
    accent: 'brass',
    short:
      'Posts, reel covers and festive creatives in one consistent style for your page, so your feed reads like a brand, not a notice board.',
    description:
      "Posts, reel covers and festive creatives in one consistent style for your page, so your feed looks like a brand, not a notice board.",
    includes: [
      'A pack of 10 designed posts in one consistent style',
      'Reel covers that match your feed',
      'Festive and offer creatives for your big days',
      'Sized correctly for Instagram and messaging apps',
    ],
    subServices: [
      { name: 'Instagram post design', blurb: 'Single posts designed in your brand style, offers, announcements and everyday content that looks professional.' , image: 'assets/services/instagram-post-design.webp' },
      { name: 'Carousel post', blurb: 'Multi-slide carousels that tell a story or explain a service, slide by slide, in one consistent design.' , image: 'assets/services/carousel-post.webp' },
      { name: 'Reel cover/thumbnail', blurb: 'Covers that make your reels look like a series worth watching, before anyone presses play.' , image: 'assets/services/reel-cover-thumbnail.webp' },
      { name: 'Story design', blurb: "Vertical story designs for daily updates, offers and polls that match your feed's look." , image: 'assets/services/story-design.webp' },
      { name: 'Festival greeting post', blurb: "Festival and occasion greeting posts in your brand's colours, ready before the day arrives." , image: 'assets/services/festival-greeting-post.webp' },
      { name: 'Messaging promotional creative', blurb: 'Creatives sized for messaging status and broadcasts, where most of your customers will actually see them.' , image: 'assets/services/messaging-promotional-creative.webp' },
      { name: 'YouTube thumbnail', blurb: 'Bold, readable thumbnails designed to earn the click on any screen size.' , image: 'assets/services/youtube-thumbnail.webp' },
      { name: 'Facebook cover/banner', blurb: 'Cover images sized correctly for Facebook pages, designed around your latest offer or season.' , image: 'assets/services/facebook-cover-banner.webp' },
      { name: 'Instagram highlight covers', blurb: 'Matching highlight cover icons that make your profile look organised and complete.' , image: 'assets/services/instagram-highlight-covers.webp' },
      { name: 'Monthly social-media design package', blurb: 'A month of posts, stories and covers planned and designed together, so your page never goes quiet.' , image: 'assets/services/monthly-social-media-design-package.webp' },
      { name: 'Profile setup & page optimization', blurb: 'Your profile photo, bio and highlights set up properly, so a first-time visitor understands your business instantly.' , image: 'assets/services/profile-setup-page-optimization.webp' },
    ],
    whoFor:
      'Businesses that post regularly and want every post to look like it came from the same, serious brand.',
    priceNote: 'Pack of 10 posts',
    priceUsd: 26,
  },
  {
    key: 'posters',
    code: 'S.07',
    name: 'Posters & Banners',
    icon: 'image',
    image: 'assets/gen/service-posters-new.webp',
    accent: 'green',
    short:
      'Offer posters, shop banners and event creatives that get noticed, print-ready and social-ready files.',
    description:
      'Offer posters, shop banners and event creatives that get noticed from across the street, and look just as sharp when forwarded to customers.',
    includes: [
      'Offer, opening and event poster designs',
      'Shop banners and menu designs',
      'Print-ready files for your printer',
      'Social-ready versions for messaging and Instagram',
    ],
    subServices: [
      { name: 'Business promotional poster', blurb: 'A poster that promotes your business, an offer or a new service, designed to be read in seconds.' , image: 'assets/services/business-promotional-poster.webp' },
      { name: 'Sale/discount creative', blurb: 'Sale and discount designs that create urgency without looking cheap, for print and social media.' , image: 'assets/services/sale-discount-creative.webp' },
      { name: 'Festival offer poster', blurb: 'Festival-season offers and greetings designed for your shop, ready for print and sharing.' , image: 'assets/services/festival-offer-poster.webp' },
      { name: 'Restaurant offer poster', blurb: 'Food offers and combo deals presented so appetisingly that customers message to order.' , image: 'assets/services/restaurant-offer-poster.webp' },
      { name: 'Event poster', blurb: 'Posters for events, programmes and gatherings with the details guests and attendees need first.' , image: 'assets/services/event-poster.webp' },
      { name: 'Shop-opening poster', blurb: 'Grand-opening designs that announce your new shop with the date, address and opening offers up front.' , image: 'assets/services/shop-opening-poster.webp' },
      { name: 'Flex/banner design', blurb: 'Large-format banner designs for your shop front or event, delivered print-ready at the exact size.' , image: 'assets/services/flex-banner-design.webp' },
      { name: 'Flyer/pamphlet', blurb: 'Single and folded flyers that explain your services clearly and survive the journey from hand to home.' , image: 'assets/services/flyer-pamphlet.webp' },
      { name: 'Brochure', blurb: 'Multi-page brochures that present your business, services and prices in a polished, structured way.' , image: 'assets/services/brochure.webp' },
      { name: 'Restaurant menu design', blurb: 'Menus designed to be read easily and ordered from confidently, for print, display and sharing.' , image: 'assets/services/restaurant-menu-design.webp' },
    ],
    whoFor:
      'Shops, restaurants and event organisers running an offer, an opening or a season push.',
    priceNote: 'Starting from',
    priceUsd: 5,
  },
  {
    key: 'content',
    code: 'S.08',
    name: 'Content Writing',
    icon: 'pen-line',
    image: 'assets/gen/service-content-new.webp',
    accent: 'brass',
    short:
      'Website copy, captions and product descriptions in clean, professional English, with Arabic support available for Gulf audiences.',
    description:
      "The words matter as much as the design. Clean, professional writing for your website and social pages, and invitation wording that sounds like your family, in the language your guests read.",
    includes: [
      'Website copy, home, about and service pages',
      'Captions and product descriptions',
      'Invitation wording in English, Hindi and Urdu',
      'Arabic support available for Gulf audiences',
    ],
    subServices: [
      { name: 'Website content', blurb: 'Home, about and service page writing that explains what you do clearly and sounds like a real business.' , image: 'assets/services/website-content.webp' },
      { name: 'Product descriptions', blurb: 'Descriptions that sell the benefit, not the feature list, so customers get why they should buy.' , image: 'assets/services/product-descriptions.webp' },
      { name: 'Business introduction/profile', blurb: 'A polished introduction of your business for proposals, directories and partner enquiries.' , image: 'assets/services/business-introduction-profile.webp' },
      { name: 'Instagram captions', blurb: "Captions written to be read, saved and acted on, in your brand's voice, not generic filler." , image: 'assets/services/instagram-captions.webp' },
      { name: 'Restaurant menu content', blurb: 'Dish names and descriptions written to sound as good as the food tastes, in English, with Arabic support.' , image: 'assets/services/restaurant-menu-content.webp' },
      { name: 'Poster/banner text', blurb: 'Short, sharp poster wording, headline, offer and call to action that fit the design and get read.' , image: 'assets/services/poster-banner-text.webp' },
      { name: 'Wedding invitation wording', blurb: 'Invitation wording that sounds like your family, respectful, warm and correct in every detail.' , image: 'assets/services/wedding-invitation-wording.webp' },
      { name: 'Birthday invitation wording', blurb: "Birthday invitation lines that match the mood, from a child's first birthday to a milestone celebration." , image: 'assets/services/birthday-invitation-wording.webp' },
      { name: 'Hindi, English & Urdu content', blurb: 'The same message written properly in Hindi, English or Urdu, for the audience that actually reads it.' , image: 'assets/services/hindi-english-urdu-content.webp' },
    ],
    whoFor:
      "Businesses whose website or page looks fine but doesn't say the right things, and families who want their invitation wording to be perfect.",
    priceNote: 'Pricing',
    priceUsd: null,
  },
  {
    key: 'ai',
    code: 'S.09',
    name: 'AI Services',
    icon: 'message-circle',
    image: 'assets/gen/service-ai-new.webp',
    accent: 'green',
    short:
      'AI chatbots that answer your customers day and night, on your website and on WhatsApp, trained on your own business details.',
    description:
      'An AI assistant for your business that never sleeps. We set it up on your website and WhatsApp, trained on your services, prices and timings, so customers get instant answers and you get the enquiry.',
    includes: [
      'Chatbot on your website',
      'WhatsApp auto-reply setup',
      'Trained on your business details',
      'Enquiry handover straight to you',
      'Simple guidance to manage it',
    ],
    subServices: [
      { name: 'Website AI chatbot', blurb: 'An AI assistant on your website that answers customer questions instantly, day and night, and passes you the enquiry.' , image: 'assets/services/website-ai-chatbot.webp' },
      { name: 'WhatsApp auto-reply bot', blurb: 'Automatic replies for your business WhatsApp, so no customer waits, even outside business hours.' , image: 'assets/services/whatsapp-auto-reply-bot.webp' },
    ],
    whoFor:
      'Businesses that get the same questions on calls and WhatsApp every day and want every enquiry answered instantly.',
    priceNote: 'Priced on request',
    priceUsd: null,
  },
  {
    key: 'dashboards',
    code: 'S.10',
    name: 'Dashboards & Business Tools',
    icon: 'layout-dashboard',
    image: 'assets/gen/service-dashboards-new.webp',
    accent: 'brass',
    short:
      'Clear dashboards and simple business tools, your sales, expenses and work in one screen you can actually read.',
    description:
      'Your business numbers, finally easy to see. We build dashboards and small tools around your work, sales and expense tracking, billing, and a control panel for your website, so decisions stop being guesswork.',
    includes: [
      'Dashboard matched to your business',
      'Sales, expense and trend views',
      'Billing and invoice system',
      'Admin panel for your website',
      'Guidance to use it every day',
    ],
    subServices: [
      { name: 'Business analytics dashboard', blurb: 'Your sales, expenses and trends in clear charts, built in PowerBI around your business.' , image: 'assets/services/business-analytics-dashboard.webp' },
      { name: 'Custom admin panel', blurb: 'Your own control panel to manage website content, enquiries and orders without touching code.' , image: 'assets/services/custom-admin-panel.webp' },
      { name: 'Billing & invoice system', blurb: 'Simple billing and invoices for small businesses, built around how you actually work.' , image: 'assets/services/billing-invoice-system.webp' },
    ],
    whoFor:
      'Shop owners, restaurants and growing businesses that want their numbers clear and their work organised.',
    priceNote: 'Priced on request',
    priceUsd: null,
  },

];

export type BadgeKind = 'live' | 'sample' | 'product';

export interface Project {
  key: string;
  title: string;
  category: string;
  badge: BadgeKind;
  badgeText: string;
  featured?: boolean;
  image: string;
  alt: string;
  liveUrl: string;
  meta: string;
  description: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    key: 'toos',
    title: 'Toos Kitchen & Zaffran',
    category: 'Restaurant Websites',
    badge: 'live',
    badgeText: 'Live Client Project',
    featured: true,
    image: 'assets/shots/toos.jpg',
    alt: 'Screenshot of the Toos Kitchen × Zaffran restaurant website homepage',
    liveUrl: 'https://toos-kitchen-zaffran.vercel.app',
    meta: 'Restaurant website in Saihat, Saudi Arabia',
    description:
      'A bilingual (English / Arabic) website for two sister restaurants in Saihat, Saudi Arabia, a complete 362-dish menu with categories and search, a cart that sends the order straight to the restaurant, a photo gallery and table booking.',
    tags: ['Bilingual EN / AR', '362-dish menu', 'Direct ordering', 'Gallery & booking'],
  },
  {
    key: 'tipsy',
    title: "Tipsy Topsy Baker's & Restaurant",
    category: 'Restaurant Websites',
    badge: 'sample',
    badgeText: 'Sample Design',
    image: 'assets/shots/tipsy.jpg',
    alt: "Screenshot of the Tipsy Topsy Baker's & Restaurant website homepage",
    liveUrl: 'https://tipsy-topsy-baker-s-restaurant.vercel.app',
    meta: 'Restaurant website, studio sample from Azamgarh',
    description:
      'A studio sample website for a pure-veg family restaurant and eggless bakery in Azamgarh, menu-first layout, Google ratings up front and one-tap direct ordering. Built to show exactly what a restaurant site from Jaurvo looks like.',
    tags: ['Sample design', 'Restaurant website', 'Menu & ratings', 'Direct ordering'],
  },
  {
    key: 'hamza',
    title: 'Hamza Travels',
    category: 'Business Websites',
    badge: 'live',
    badgeText: 'Live Client Project',
    featured: true,
    image: 'assets/shots/hamza.jpg',
    alt: 'Screenshot of the Hamza Travels website homepage',
    liveUrl: 'https://hamza-travels-ruddy.vercel.app',
    meta: 'Travel business website in India',
    description:
      'A website for a travel documents and ticketing business, 46+ services organised into clear pages, an easy enquiry flow and customer reviews, designed to bring in enquiries.',
    tags: ['Business website', '46+ services', 'Enquiry flow', 'Customer reviews'],
  },
  {
    key: 'jaurtools',
    title: 'JaurTools',
    category: 'Business Websites',
    badge: 'product',
    badgeText: 'Our Product',
    image: 'assets/shots/jaurtools.jpg',
    alt: 'Screenshot of the JaurTools free online tools website homepage',
    liveUrl: 'https://jaurtools.vercel.app',
    meta: 'Free online tools website, built by the founder',
    description:
      "600+ free online tools that run entirely in the visitor's browser, no sign-up, no database, nothing uploaded to a server. Designed, built and maintained by our founder.",
    tags: ['600+ tools', 'Browser-only', 'No sign-up', 'Free for everyone'],
  },
  {
    key: 'azka',
    title: 'Azka & Sajid, Nikah Invitation',
    category: 'Invitation Websites',
    badge: 'live',
    badgeText: 'Live Client Project',
    featured: true,
    image: 'assets/shots/azka.jpg',
    alt: 'Screenshot of the Azka & Sajid wedding invitation website opening screen',
    liveUrl: 'https://azka-sajid-invitation.vercel.app',
    meta: 'Wedding invitation website in Bilariyaganj, India',
    description:
      "A wedding invitation website designed in the printed card's own deep maroon and gold style, a curtain-opening welcome, a live countdown to the Nikah on Monday, 16 November 2026 at Sangam Marriage Hall, Bilariyaganj, the venue on Google Maps and one-tap RSVP for guests.",
    tags: ['Wedding invitation', 'Live countdown', 'Venue map', 'One-tap RSVP'],
  },
  {
    key: 'parlor',
    title: 'Bride Herbal Beauty Parlour',
    category: 'Beauty & Salon Websites',
    badge: 'live',
    badgeText: 'Live Client Project',
    image: 'assets/shots/parlor.jpg',
    alt: 'Screenshot of the Bride Herbal Beauty Parlour website homepage',
    liveUrl: 'https://bride-herbal-beauty-parlorrr.vercel.app/',
    meta: 'Beauty parlour website in Bilariyaganj, India',
    description:
      'A website for a beauty parlour with 20 years of trusted care, facials, bridal makeup and henna services with a tap-to-add booking cart, curated bridal and glow combo packages, a photo gallery, beauty tips journal and appointment booking.',
    tags: ['Salon website', 'Booking cart', 'Bridal packages', 'Gallery & blog'],
  },
];

export interface WorkCategory {
  name: string;
  emptyTitle?: string;
  emptyText?: string;
  emptyMessage?: string;
}

export const WORK_CATEGORIES: WorkCategory[] = [
  { name: 'Restaurant Websites' },
  { name: 'Business Websites' },
  { name: 'Invitation Websites' },
  { name: 'Beauty & Salon Websites' },
  {
    name: 'Logos & Branding',
    emptyTitle: 'Logo samples, on request',
    emptyText:
      "Logo and branding work is delivered to clients as files, so this gallery is kept for live project links. Send an enquiry and we will share recent logo and branding work directly.",
    emptyMessage: 'Hi Jaurvo, please share your logo and branding samples.',
  },
  {
    name: 'Posters & Banners',
    emptyTitle: 'Poster samples, on request',
    emptyText:
      'Offer posters, shop banners and menu designs are delivered to clients as print files, so this gallery is being prepared. Send an enquiry and we will share recent poster and banner work directly.',
    emptyMessage: 'Hi Jaurvo, please share your poster and banner samples.',
  },
  {
    name: 'Social Media Designs',
    emptyTitle: 'Social media samples, on request',
    emptyText:
      'Social media packs are designed per client and posted on their pages. Send an enquiry and we will share recent post, reel-cover and festive creative samples directly.',
    emptyMessage: 'Hi Jaurvo, please share your social media design samples.',
  },
];

export interface ProcessStep {
  when: string;
  title: string;
  text: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    when: 'Same day',
    title: 'Send your requirement',
    text: 'Tell us what you need. We confirm the scope and a fixed price in writing, usually within a few hours, with no obligation and no pressure.',
  },
  {
    when: 'Day 1',
    title: '50% advance',
    text: 'Work starts on a 50% advance by bank transfer, UPI or Wise. The balance is due only when you approve the final delivery.',
  },
  {
    when: 'Days 2 to 3',
    title: 'Preview & revisions',
    text: 'You receive a live preview link, check everything on your own phone, and we polish it through two full revision rounds with your feedback.',
  },
  {
    when: 'Day 4 to 7',
    title: 'Launch & handover',
    text: 'Final payment, your project goes live, and we hand over everything with simple guidance you can actually follow.',
  },
];

export interface Plan {
  name: string;
  tagline: string;
  priceUsd: number;
  features: string[];
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Starter Website',
    tagline: 'For new businesses that need a sharp online presence, fast.',
    priceUsd: 300,
    features: [
      'Up to 5 pages',
      'Mobile-first design',
      'Enquiry button',
      'Contact details & Google Maps',
      'Domain (.com/.in), first year included, bought in your own name',
      'Hosting + SSL, first year included',
      'Delivery in 7 days',
    ],
  },
  {
    name: 'Business Website',
    tagline: 'For restaurants & growing businesses that sell through their website.',
    priceUsd: 450,
    features: [
      'Everything in Starter',
      'Menu, gallery & services sections',
      'Google Maps + customer reviews',
      'Bilingual-ready (English / Arabic)',
      'Domain (.com/.in), first year included, bought in your own name',
      'Hosting + SSL, first year included',
      'Priority delivery',
    ],
    featured: true,
  },
  {
    name: 'Premium Website',
    tagline: 'For brands that want a fully custom, standout online presence.',
    priceUsd: 750,
    features: [
      'Everything in Business',
      'Fully custom design',
      'Invitation / extra pages included',
      'Advanced sections & animations',
      'Domain (.com/.in), first year included, bought in your own name',
      'Hosting + SSL, first year included',
      '1 month free support',
    ],
  },
];

export const PRICING_NOTE =
  'Domain & hosting renewal from year 2 is at actual cost, the domain is always registered in your name.';

export const RATE_CARD: { name: string; priceUsd: number; from: boolean }[] = [
  { name: 'Starter Website', priceUsd: 300, from: true },
  { name: 'Business Website', priceUsd: 450, from: true },
  { name: 'Invitation Website', priceUsd: 53, from: true },
  { name: 'Logo & Branding', priceUsd: 32, from: true },
  { name: 'Poster / Banner Design', priceUsd: 5, from: true },
  { name: 'Social Media Pack, 10 posts', priceUsd: 26, from: false },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'How long will my website take?',
    a: 'Most websites take 2 to 4 days once we have your details. Bigger ones can take up to 7. Invitation websites are usually ready in 1 to 2 days. Your exact timeline is confirmed in writing before you pay anything.',
  },
  {
    q: 'Can the price be negotiated?',
    a: 'Yes. Tell us your budget and we will adjust the scope to fit it: fewer pages, a simpler design, or phased delivery. What never changes is the written quote, with exactly what is included, the total price and the timeline. That price is fixed.',
  },
  {
    q: 'How does payment work?',
    a: '50% advance to start, 50% after you approve the final preview. Bank transfer and UPI in India, Wise for international clients. No hidden charges.',
  },
  {
    q: 'Is domain & hosting included?',
    a: 'Yes. Every website plan includes your domain (.com/.in) and hosting with SSL for the first year, registered in your own name. From year two, renewals are at actual cost.',
  },
  {
    q: 'How many revisions do I get?',
    a: 'Two full revision rounds at the preview stage, colours, text, photos and layout. Small updates after launch are quoted upfront at a small fee.',
  },
  {
    q: 'Can my website be in Arabic?',
    a: 'Yes, full Arabic (RTL) websites for Gulf clients, with proper right-to-left layout. Visitors switch language in one tap.',
  },
];

export const BENEFITS: { title: string; text: string }[] = [
  {
    title: 'Full team under one roof',
    text: 'Design, development, content, data and AI, all under one roof. Your project never waits on an outside freelancer, and there is one studio answerable for it all.',
  },
  {
    title: 'Founder-led by a Software Engineer',
    text: 'Jaurvo is founded and led by Jauhar Ayyub, a Software Engineer who builds business software for a living, so your website is engineered properly: fast, secure, and built around your business, not pieced together from a template.',
  },
  {
    title: 'Domain & hosting handled, in your name',
    text: 'Your domain (.com/.in) and hosting with SSL for the first year come with every website plan, and we set it all up. The domain stays in your name, so the website is yours from day one.',
  },
  {
    title: 'Fixed price in writing, 50/50 payment',
    text: 'You get the scope and a fixed price in writing before we start. 50% to begin, the rest after you approve the final preview. No hidden charges, ever.',
  },
  {
    title: 'Bilingual English/Arabic, Hindi/Urdu team',
    text: 'We work in English and Hindi/Urdu every day, and we build English websites with full Arabic (RTL) support for Gulf clients. Nothing gets lost in translation.',
  },
  {
    title: 'Fast delivery, real support',
    text: 'Most websites go live in 2 to 4 days, invitations in 1 to 2. Premium plans include a month of free support, and small updates after launch are always quoted upfront.',
  },
];

export interface ComparisonRow {
  aspect: string;
  jaur: string;
  freelancer: string;
  agency: string;
}

export const COMPARISON: ComparisonRow[] = [
  {
    aspect: 'Who builds it',
    jaur: 'A full team, led by the founder',
    freelancer: 'One person doing every job alone',
    agency: 'A rotating team you never meet',
  },
  {
    aspect: 'Price transparency',
    jaur: 'Fixed price in writing before work begins',
    freelancer: 'Often vague, changes mid-project',
    agency: 'High quotes, padded overheads',
  },
  {
    aspect: 'Domain ownership',
    jaur: 'Always registered in your own name',
    freelancer: 'Sometimes registered in their name',
    agency: 'Often held on agency accounts',
  },
  {
    aspect: 'Delivery time',
    jaur: 'Most websites in 2 to 4 days',
    freelancer: 'Depends on one person\u2019s schedule',
    agency: 'Weeks of meetings before work starts',
  },
  {
    aspect: 'After-launch support',
    jaur: 'Real guidance, 1 month free on Premium',
    freelancer: 'May be unreachable after delivery',
    agency: 'Support sold as a costly retainer',
  },
  {
    aspect: 'Languages',
    jaur: 'English/Arabic sites; Hindi/Urdu spoken',
    freelancer: 'Usually one language only',
    agency: 'Translation outsourced, costs extra',
  },
];

export const COMMITMENTS: string[] = [
  'The price quoted is the price paid, no hidden charges.',
  'Your domain is always registered in your own name.',
  'Two full revision rounds are included on every project.',
  'If we cannot deliver what was confirmed in writing, your advance is refunded.',
];

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  portfolioUrl?: string;
}

export const TEAM: TeamMember[] = [
  { name: 'Jauhar Ayyub', role: 'Founder, Software Engineer', initials: 'JA', portfolioUrl: 'https://jaur-supra-me-portfolio.vercel.app/' },
  { name: 'Obaidullah', role: 'AI Engineer', initials: 'O' },
  { name: 'Hassan', role: 'Full Stack Developer', initials: 'H' },
  { name: 'Bilal Shah', role: 'Data Science, Charts and PowerBI', initials: 'BS' },
];

export const DISCIPLINES: string[] = [
  'Frontend',
  'Backend',
  'Database',
  'Design',
  'AI Engineering',
  'Prompt Engineering',
  'Data & Charts',
];

export const ENQUIRY_STATUSES = [
  'New',
  'Contacted',
  'Advance Received',
  'In Progress',
  'Delivered',
] as const;

export const PROJECT_STATUSES = [
  'Advance Received',
  'In Progress',
  'Delivered',
  'On Hold',
] as const;

export interface Review {
  name: string;
  service: string;
  text: string;
  rating: number;
}

// Approved client reviews, shown on the home and about pages. The admin
// panel can later approve Supabase reviews, which override this list.
export const REVIEWS: Review[] = [
  {
    name: 'Mohd Ibrah',
    service: 'Business Website',
    text: 'My business finally has a website that works as hard as I do. Customers find us on their phones and message us straight from the site. Enquiries have gone up since launch, and the team handled everything.',
    rating: 5,
  },
  {
    name: 'Mariyam Saffa',
    service: 'Logo & Brand Identity',
    text: 'I wanted a logo that felt like my brand, not a generic template, and that is exactly what I got. Colours, fonts and print-ready files all arrived organised. It finally looks as professional as the work behind it.',
    rating: 5,
  },
  {
    name: 'Mazen Gassar',
    service: 'Posters & Social Media Designs',
    text: 'The posters and social designs changed how my page looks completely. Every post follows the same style, customers recognise us instantly, and festive creatives always arrive before the occasion.',
    rating: 5,
  },
  {
    name: 'Cloe Corn',
    service: 'Invitation Website',
    text: 'Our invitation website was the loveliest surprise of the celebration. Guests opened one link and found everything, our story, the countdown, the venue map and a quick RSVP.',
    rating: 5,
  },
  {
    name: 'Sajid',
    service: 'Invitation Website',
    text: 'I worried a digital invitation would feel less special than a printed card, but this felt even better. The design matched our card, and guests confirmed with one tap instead of phone calls.',
    rating: 5,
  },
];
