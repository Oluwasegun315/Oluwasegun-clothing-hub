import type { Product } from "@/types/database";

/** Deterministic UUIDs for seed + client (matches `supabase/seed_marketplace.sql`). */
export function marketplaceProductId(index: number): string {
  const n = index + 1;
  const p2 = n.toString(16).padStart(4, "0");
  const p4 = n.toString(16).padStart(12, "0");
  return `11111111-${p2}-4000-8000-${p4}`;
}

/** Curated Unsplash fashion imagery — primary + hover pairs rotate by index. */
const ADULT_IMG = [
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=85",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85",
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&q=85",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=85",
  "https://images.unsplash.com/photo-1541099649102-fbd7dacb814f?w=1200&q=85",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=85",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=85",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=85",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=85",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=85",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=85",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=85",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=85",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85",
  "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1200&q=85",
  "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=85",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=85",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85",
  "https://images.unsplash.com/photo-1532453288672-3a27e9be903f?w=1200&q=85",
] as const;

const KIDS_IMG = [
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=85",
  "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=1200&q=85",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=85",
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=85",
  "https://images.unsplash.com/photo-1503944585463-7d2a37d7e609?w=1200&q=85",
  "https://images.unsplash.com/photo-1519238263530-99bdd9a45d21?w=1200&q=85",
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=85",
  "https://images.unsplash.com/photo-1540471019594-61c19375e37b?w=1200&q=85",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=85",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=85",
  "https://images.unsplash.com/photo-1601515507322-07c4465536e4?w=1200&q=85",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=85",
] as const;

function adultImages(i: number) {
  const primary = ADULT_IMG[i % ADULT_IMG.length];
  const hover = ADULT_IMG[(i + 7) % ADULT_IMG.length];
  return { image_url: primary, image_hover_url: hover };
}

function kidsImages(i: number) {
  const primary = KIDS_IMG[i % KIDS_IMG.length];
  const hover = KIDS_IMG[(i + 5) % KIDS_IMG.length];
  return { image_url: primary, image_hover_url: hover };
}

type SeedCore = {
  name: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  rating: number;
  is_trending: boolean;
  badge?: string;
};

type Seed = SeedCore & {
  age_group: "adult" | "kids";
  image_url: string;
  image_hover_url: string;
};

function toProduct(s: Seed, index: number): Product {
  const now = new Date();
  now.setDate(now.getDate() - (index % 21));
  const sizes =
    s.age_group === "kids" ? "2Y,3Y,4Y,5Y,6Y,7Y,8Y,10Y,12Y" : "XS,S,M,L,XL,XXL";
  return {
    id: marketplaceProductId(index),
    name: s.name,
    description: s.description,
    image_url: s.image_url,
    image_hover_url: s.image_hover_url,
    price: s.price,
    category: s.category,
    gender: s.gender,
    age_group: s.age_group,
    rating: s.rating,
    is_trending: s.is_trending,
    badge: s.badge ?? null,
    color_name: null,
    sizes_available: sizes,
    created_at: now.toISOString(),
  };
}

/** Fifty distinct adult SKUs — no repeated titles; quiet luxury + premium street mix. */
const ADULT_CORE: SeedCore[] = [
  { name: "Meridian Shadow Hoodie", description: "Brushed-back fleece, dropped shoulder, tonal cords. Quiet luxury weight with street volume.", price: 148, category: "Streetwear", gender: "Unisex", rating: 4.9, is_trending: true, badge: "Trending" },
  { name: "Volt Runner Tech Shell", description: "Packable hood, taped seams, matte zip. Commute-to-track layering.", price: 198, category: "Active", gender: "Men", rating: 4.7, is_trending: true },
  { name: "Nocturne Wool Car Coat", description: "Double-face wool feel, hidden placket, raglan ease. Boardroom dusk silhouette.", price: 428, category: "Outerwear", gender: "Women", rating: 4.9, is_trending: false, badge: "Editor's pick" },
  { name: "Graphite Wide-Leg Denim", description: "Rigid denim hand, high rise, pressed crease. Elevated wide silhouette.", price: 138, category: "Denim", gender: "Women", rating: 4.6, is_trending: true },
  { name: "Phantom Low Court Leather", description: "Cupsole, full-grain upper, tonal laces. Clean court minimalism.", price: 165, category: "Footwear", gender: "Unisex", rating: 4.7, is_trending: false },
  { name: "Drift Parachute Cargo", description: "Paper-touch nylon, articulated knees, matte hardware. Cargo systems trend.", price: 158, category: "Streetwear", gender: "Men", rating: 4.8, is_trending: true },
  { name: "Lunar Silk Bias Slip", description: "Bias-cut liquid drape, barely-there straps. Evening negative space.", price: 218, category: "Evening", gender: "Women", rating: 4.8, is_trending: false },
  { name: "Signal Boxy Heavy Tee", description: "220gsm cotton, dropped armhole, garment pigment. Elevated basics rotation.", price: 52, category: "Streetwear", gender: "Unisex", rating: 4.5, is_trending: true, badge: "Best seller" },
  { name: "Obsidian Puffer Block", description: "Matte shell, channel quilting, storm cuffs. High-volume cold weather.", price: 368, category: "Outerwear", gender: "Unisex", rating: 4.9, is_trending: true },
  { name: "Echo Merino Rib Polo", description: "Compact rib collar, side-slit hem, merino blend. Country-club quiet luxury.", price: 118, category: "Knitwear", gender: "Men", rating: 4.6, is_trending: false },
  { name: "Ridge Trail Hybrid Sneaker", description: "Trail tread, rope lace, mixed matte panels. Gorpcore meets city polish.", price: 192, category: "Footwear", gender: "Men", rating: 4.7, is_trending: false },
  { name: "Studio Soft-Shoulder Blazer", description: "Single-breasted, pressed crease trouser pairing energy. Soft structure tailoring.", price: 224, category: "Formal", gender: "Women", rating: 4.7, is_trending: false },
  { name: "Carbon Tech Anorak", description: "Half-zip shell, packable pocket, iridescent hit. Future-active outer layer.", price: 176, category: "Active", gender: "Unisex", rating: 4.5, is_trending: true },
  { name: "Ivory Lounge Terry Set", description: "Hoodie + tapered jogger, French terry hand. Matching set discipline.", price: 168, category: "Knitwear", gender: "Women", rating: 4.8, is_trending: true },
  { name: "Cipher Bridle Leather Belt", description: "Matte roller buckle, Italian leather, debossed tip. Micro-luxury finish.", price: 78, category: "Accessories", gender: "Men", rating: 4.4, is_trending: false },
  { name: "Velvet Drape Long Cardigan", description: "Shawl collar, silk-wool hand, floor-skimming. Layering sculpture.", price: 132, category: "Knitwear", gender: "Women", rating: 4.5, is_trending: false },
  { name: "Steel Cargo Short System", description: "Above-knee, multi-pocket layout, matte snaps. Summer street uniform.", price: 88, category: "Streetwear", gender: "Men", rating: 4.3, is_trending: false },
  { name: "Zenith High-Top Archive", description: "Padded collar, gum cupsole, vintage basketball lines.", price: 178, category: "Footwear", gender: "Unisex", rating: 4.6, is_trending: false },
  { name: "Linea Pleated Wide Trouser", description: "High waist, pressed pleat, fluid drape. Tailoring with tension.", price: 148, category: "Formal", gender: "Women", rating: 4.8, is_trending: false },
  { name: "Terra Waxed Field Jacket", description: "Corduroy collar, four-pocket layout, weathered wax. Heritage workwear reboot.", price: 278, category: "Outerwear", gender: "Men", rating: 4.7, is_trending: false },
  { name: "Flux Rib Racer Tank", description: "Compact rib, tonal stitch, racer back. Heatwave layering hero.", price: 42, category: "Streetwear", gender: "Women", rating: 4.2, is_trending: true },
  { name: "Monolith Structured Tote", description: "Architectural panels, magnetic hush closure, shoulder drop.", price: 310, category: "Accessories", gender: "Women", rating: 4.8, is_trending: false },
  { name: "Pulse Laser Run Short", description: "Liner brief, laser perforation, split hem. Motion-first training.", price: 62, category: "Active", gender: "Men", rating: 4.5, is_trending: false },
  { name: "Ash Cropped Wind Shirt", description: "Crisp poplin, boxy crop, concealed placket. Summer tailoring hybrid.", price: 96, category: "Streetwear", gender: "Women", rating: 4.5, is_trending: false },
  { name: "Nimbus Oversized Crew", description: "Brushed fleece, side zip vent, extended cuff. Oversized essentials DNA.", price: 98, category: "Streetwear", gender: "Unisex", rating: 4.7, is_trending: false },
  { name: "Eclipse Trucker Denim Jacket", description: "Black rinse, contrast stitch, boxy trucker. Denim reboot.", price: 158, category: "Denim", gender: "Unisex", rating: 4.6, is_trending: false },
  { name: "Meridian Track Stripe Pant", description: "Satin stripe, tapered leg, zip ankle. Retro sport polish.", price: 112, category: "Active", gender: "Women", rating: 4.4, is_trending: true },
  { name: "Harbor Linen Relaxed Shirt", description: "Air-spun linen blend, camp collar, dropped hem. Resort quiet luxury.", price: 108, category: "Streetwear", gender: "Men", rating: 4.5, is_trending: false },
  { name: "Cinder Wool Beanie", description: "Double-layer knit, rib tension, tonal patch. Cold commutes.", price: 38, category: "Accessories", gender: "Unisex", rating: 4.3, is_trending: false },
  { name: "Solstice Satin Bomber", description: "Iridescent shell, ribbed hem, minimal zip. Night-out volume.", price: 228, category: "Outerwear", gender: "Men", rating: 4.7, is_trending: true },
  { name: "Opal Wrap Midi Skirt", description: "Asymmetric wrap, pressed drape, hidden closure. Editorial skirt.", price: 124, category: "Evening", gender: "Women", rating: 4.6, is_trending: false },
  { name: "Raven Zip Mock Neck", description: "Compact knit mock, quarter zip, shoulder articulation.", price: 92, category: "Knitwear", gender: "Men", rating: 4.4, is_trending: false },
  { name: "Glacier Insulated Parka", description: "Baffle down feel, faux fur optional hood, storm flap.", price: 398, category: "Outerwear", gender: "Unisex", rating: 4.9, is_trending: true, badge: "New" },
  { name: "Sable Chelsea Suede Boot", description: "Crepe wedge, elastic gusset, weather-treated suede.", price: 245, category: "Footwear", gender: "Men", rating: 4.7, is_trending: false },
  { name: "Lotus Pleated Knit Dress", description: "Fine-gauge pleat knit, built-in slip, midi length.", price: 168, category: "Knitwear", gender: "Women", rating: 4.7, is_trending: false },
  { name: "Brass Link Chain Necklace", description: "Weighty links, lobster clasp, mirror polish. Jewelry as hardware.", price: 86, category: "Accessories", gender: "Women", rating: 4.5, is_trending: false },
  { name: "Onyx Relaxed Taper Denim", description: "Stretch comfort, vintage wash, cropped taper.", price: 128, category: "Denim", gender: "Men", rating: 4.5, is_trending: true },
  { name: "Vapor Mesh Runner", description: "Open mesh upper, featherweight midsole, reflective laces.", price: 154, category: "Footwear", gender: "Women", rating: 4.6, is_trending: true },
  { name: "Cobalt Swim Short", description: "Quick-dry shell, inner brief, zip pocket. Resort capsule.", price: 64, category: "Active", gender: "Men", rating: 4.2, is_trending: false },
  { name: "Mist Duster Lightweight Coat", description: "Fluid duster length, tie belt, silk-touch hand.", price: 198, category: "Outerwear", gender: "Women", rating: 4.6, is_trending: false },
  { name: "Forge Utility Vest", description: "Multi-pocket nylon vest, D-ring detail, packable hood.", price: 142, category: "Streetwear", gender: "Men", rating: 4.5, is_trending: false },
  { name: "Halo Cashmere Scarf", description: "Featherweight cashmere, eyelash fringe, oversized wrap.", price: 118, category: "Accessories", gender: "Unisex", rating: 4.8, is_trending: false },
  { name: "Jetstream Moto Pant", description: "Slim moto seam, stretch sateen, zip pockets.", price: 138, category: "Streetwear", gender: "Women", rating: 4.5, is_trending: false },
  { name: "Quartz Minimal Watch Mesh", description: "Sapphire glass story, mesh band, sunray dial.", price: 198, category: "Accessories", gender: "Unisex", rating: 4.4, is_trending: false },
  { name: "Summit Fleece Quarter-Zip", description: "Grid fleece interior, contrast zip, stand collar.", price: 108, category: "Active", gender: "Men", rating: 4.5, is_trending: false },
  { name: "Petal Organza Blouse", description: "Sheer organza layer, pearl button, puff sleeve.", price: 132, category: "Evening", gender: "Women", rating: 4.6, is_trending: false },
  { name: "Granite Overshirt Jacket", description: "Heavy twill overshirt, patch pockets, workwear drape.", price: 148, category: "Outerwear", gender: "Men", rating: 4.6, is_trending: true },
  { name: "Ripple Rib Midi Skirt", description: "Vertical rib knit, side slit, elastic waist.", price: 88, category: "Knitwear", gender: "Women", rating: 4.4, is_trending: false },
  { name: "Stride Knit Runner", description: "Sock-fit collar, knit upper, cushioned ride.", price: 168, category: "Footwear", gender: "Unisex", rating: 4.7, is_trending: true },
  { name: "Atlas Leather Weekender", description: "Weekender volume, detachable strap, brass feet.", price: 348, category: "Accessories", gender: "Men", rating: 4.8, is_trending: false },
];

/** Fifty distinct kids SKUs — playful names, premium kidswear positioning. */
const KIDS_CORE: SeedCore[] = [
  { name: "Sprout Cloud Fleece Hoodie", description: "Ultra-soft fleece, reinforced seams, tagless neck. Playground warmth.", price: 54, category: "Streetwear", gender: "Unisex", rating: 4.9, is_trending: true, badge: "Trending" },
  { name: "Little Monarch Varsity Jacket", description: "Wool-blend body, faux leather sleeves, chenille crest.", price: 86, category: "Outerwear", gender: "Boys", rating: 4.8, is_trending: true },
  { name: "Petite Drift Cargo Pant", description: "Stretch twill, elastic waist, mini utility pockets.", price: 48, category: "Streetwear", gender: "Girls", rating: 4.7, is_trending: false, badge: "New" },
  { name: "Tiny Volt Velcro Sneaker", description: "Dual straps, cushioned footbed, reflective heel tab.", price: 62, category: "Footwear", gender: "Unisex", rating: 4.8, is_trending: true },
  { name: "Blossom Tulle Party Skirt", description: "Layered soft tulle, satin waistband, movement-friendly lining.", price: 44, category: "Evening", gender: "Girls", rating: 4.7, is_trending: false },
  { name: "Rookie Track Warm-Up Set", description: "Tricot jacket + pant, contrast piping, zip pockets.", price: 58, category: "Active", gender: "Boys", rating: 4.6, is_trending: true },
  { name: "Glimmer Knit Cardigan", description: "Coconut buttons, cloud yarn, gentle structure.", price: 46, category: "Knitwear", gender: "Girls", rating: 4.5, is_trending: false },
  { name: "Explorer Puffer Coat Mini", description: "Channel quilt, faux fur trim hood, storm cuffs.", price: 92, category: "Outerwear", gender: "Unisex", rating: 4.9, is_trending: true, badge: "Best seller" },
  { name: "Grom Heavyweight Tee Duo", description: "Two-pack mineral tees, reinforced shoulder, soft hand.", price: 32, category: "Streetwear", gender: "Boys", rating: 4.4, is_trending: false },
  { name: "Sunbeam UV Swim Set", description: "Rashguard + short, UPF-minded fabric story, quick-dry.", price: 42, category: "Active", gender: "Unisex", rating: 4.6, is_trending: true },
  { name: "Petite Line Denim Jacket", description: "Stretch panels, smile pockets, trucker proportions scaled.", price: 58, category: "Denim", gender: "Girls", rating: 4.6, is_trending: false },
  { name: "Champion Kids Windbreaker", description: "Mesh lining, packable hood, color-block sleeves.", price: 52, category: "Outerwear", gender: "Boys", rating: 4.5, is_trending: false },
  { name: "Glitter Court Low Sneaker", description: "Metallic panel, cushioned insole, scuff-resistant toe.", price: 58, category: "Footwear", gender: "Girls", rating: 4.6, is_trending: false },
  { name: "Sprout Fleece Zip Hoodie", description: "Full zip, chin guard, color-block arms.", price: 56, category: "Knitwear", gender: "Boys", rating: 4.7, is_trending: false },
  { name: "Petite Pleated Skort", description: "Tennis pleat, built-in short, stretch waist.", price: 38, category: "Active", gender: "Girls", rating: 4.4, is_trending: false },
  { name: "Mini Monochrome Terry Set", description: "Hoodie + jogger, tonal texture, soft hand.", price: 64, category: "Streetwear", gender: "Unisex", rating: 4.8, is_trending: true },
  { name: "Puddle Rain Boot", description: "Matte rubber, pull tabs, deep tread for splash days.", price: 46, category: "Footwear", gender: "Unisex", rating: 4.5, is_trending: false },
  { name: "Little Lunar Knit Dress", description: "Rib tank dress, side slit for play, breathable knit.", price: 44, category: "Knitwear", gender: "Girls", rating: 4.6, is_trending: false },
  { name: "Snack-Time Mini Backpack", description: "Ripstop shell, carabiner clip, bottle pocket.", price: 36, category: "Accessories", gender: "Unisex", rating: 4.5, is_trending: false },
  { name: "Sprout Rib Legging", description: "High-rise rib knit, gusset for movement, soft recovery.", price: 28, category: "Active", gender: "Girls", rating: 4.3, is_trending: false },
  { name: "Tiny Line Baseball Cap", description: "Cotton twill, adjustable strap, curved brim.", price: 22, category: "Accessories", gender: "Unisex", rating: 4.2, is_trending: false },
  { name: "Blossom Satin Bow Headband", description: "Padded satin bow, soft elastic, event-ready.", price: 16, category: "Accessories", gender: "Girls", rating: 4.4, is_trending: false },
  { name: "Rookie Mesh Practice Short", description: "Mesh side panel, inner brief, drawcord waist.", price: 26, category: "Active", gender: "Boys", rating: 4.3, is_trending: false },
  { name: "Petite Corduroy Overall", description: "Stretch cord, adjustable strap, wood buttons.", price: 54, category: "Streetwear", gender: "Girls", rating: 4.7, is_trending: false },
  { name: "Mini Field Chore Coat", description: "Cotton canvas, patch pockets, corduroy collar.", price: 68, category: "Outerwear", gender: "Boys", rating: 4.6, is_trending: false },
  { name: "Glimmer Ballet Wrap Top", description: "Soft wrap, stretch mesh sleeve, dance-class polish.", price: 34, category: "Knitwear", gender: "Girls", rating: 4.5, is_trending: false },
  { name: "Tiny Trek Sandal", description: "Hook-loop straps, contoured footbed, river-day grip.", price: 40, category: "Footwear", gender: "Unisex", rating: 4.4, is_trending: false },
  { name: "Sprout Sherpa Zip Gilet", description: "Sherpa body, zip front, binding trim.", price: 48, category: "Outerwear", gender: "Girls", rating: 4.6, is_trending: true },
  { name: "Little Line Swim Trunk", description: "Mesh brief, drawcord, quick-dry microfiber.", price: 28, category: "Active", gender: "Boys", rating: 4.2, is_trending: false },
  { name: "Petite Sparkle Party Flat", description: "Cushioned insole, glitter upper, secure strap.", price: 36, category: "Footwear", gender: "Girls", rating: 4.5, is_trending: false },
  { name: "Explorer Bucket Hat", description: "Wide brim, chin strap, packable cotton.", price: 24, category: "Accessories", gender: "Unisex", rating: 4.3, is_trending: false },
  { name: "Mini Quiet Luxury Tee", description: "Supima-feel cotton, bound collar, minimal stitch.", price: 26, category: "Streetwear", gender: "Unisex", rating: 4.6, is_trending: false },
  { name: "Blossom Eyelet Summer Dress", description: "Eyelet cotton, lined bodice, twirl-friendly skirt.", price: 52, category: "Evening", gender: "Girls", rating: 4.7, is_trending: false },
  { name: "Rookie Fleece Jogger", description: "Tapered leg, rib cuff, side stripe detail.", price: 34, category: "Active", gender: "Boys", rating: 4.5, is_trending: false },
  { name: "Petite Quilted Liner Jacket", description: "Lightweight quilt, snap front, layering piece.", price: 56, category: "Outerwear", gender: "Girls", rating: 4.6, is_trending: false },
  { name: "Tiny Court Canvas Sneaker", description: "Lace-up canvas, rubber toe bumper, playground staple.", price: 44, category: "Footwear", gender: "Boys", rating: 4.4, is_trending: false },
  { name: "Sprout Rib Beanie", description: "Double cuff rib, soft acrylic blend, winter recess.", price: 18, category: "Accessories", gender: "Unisex", rating: 4.2, is_trending: false },
  { name: "Little Line Chino Short", description: "Stretch chino, adjustable inner waist, clean hem.", price: 32, category: "Streetwear", gender: "Boys", rating: 4.4, is_trending: false },
  { name: "Glimmer Tutu Leotard", description: "Attached tutu, scoop back, dance-class favorite.", price: 38, category: "Active", gender: "Girls", rating: 4.6, is_trending: false },
  { name: "Mini Alpine Snow Bib", description: "Water-resistant bib, reinforced knee, grow cuff.", price: 78, category: "Outerwear", gender: "Unisex", rating: 4.7, is_trending: true },
  { name: "Petite Floral Romper", description: "Snap inseam, flutter sleeve, breathable poplin.", price: 40, category: "Knitwear", gender: "Girls", rating: 4.5, is_trending: false },
  { name: "Rookie Soccer Training Top", description: "Breathable mesh panel, raglan sleeve, club colors.", price: 30, category: "Active", gender: "Boys", rating: 4.3, is_trending: false },
  { name: "Tiny Drape Cardigan", description: "Lightweight drape front, patch pockets, soft modal blend.", price: 42, category: "Knitwear", gender: "Girls", rating: 4.5, is_trending: false },
  { name: "Explorer Utility Short", description: "Cargo pocket short, stretch waist, reinforced seat.", price: 30, category: "Streetwear", gender: "Boys", rating: 4.3, is_trending: false },
  { name: "Sprout Pastel Crew Set", description: "Two crewneck tees, pastel pack, soft hand.", price: 28, category: "Streetwear", gender: "Unisex", rating: 4.4, is_trending: false },
  { name: "Little Line Denim Short", description: "Soft stretch denim, rolled hem, adjustable waist.", price: 34, category: "Denim", gender: "Girls", rating: 4.5, is_trending: false },
  { name: "Mini Polar Fleece Pullover", description: "Quarter-zip polar fleece, chin guard, color pop.", price: 40, category: "Active", gender: "Unisex", rating: 4.5, is_trending: false },
  { name: "Petite Bow Mary Jane", description: "Patent upper, cushioned footbed, secure buckle.", price: 42, category: "Footwear", gender: "Girls", rating: 4.5, is_trending: false },
  { name: "Rookie Thermal Base Layer", description: "Heat-retaining knit, flatlock seams, ski-day base.", price: 32, category: "Active", gender: "Boys", rating: 4.4, is_trending: false },
  { name: "Tiny Peacoat Wool Blend", description: "Double-breasted mini peacoat, anchor buttons.", price: 72, category: "Outerwear", gender: "Girls", rating: 4.7, is_trending: false },
];

if (ADULT_CORE.length !== 50 || KIDS_CORE.length !== 50) {
  throw new Error(`Catalog must be 50 adult + 50 kids (got ${ADULT_CORE.length} / ${KIDS_CORE.length})`);
}

const ADULT: Seed[] = ADULT_CORE.map((core, i) => ({
  ...core,
  age_group: "adult" as const,
  ...adultImages(i),
}));

const KIDS: Seed[] = KIDS_CORE.map((core, i) => ({
  ...core,
  age_group: "kids" as const,
  ...kidsImages(i),
}));

export type CatalogProductFilters = {
  q?: string;
  category?: string;
  gender?: string;
  age_group?: string;
  trending_only?: boolean;
  limit?: number;
};

/** Full static marketplace: 50 adult + 50 kids unique SKUs. Merged with Supabase in `getProducts`. */
export const MARKETPLACE_CATALOG: Product[] = [
  ...ADULT.map((s, i) => toProduct(s, i)),
  ...KIDS.map((s, i) => toProduct(s, ADULT.length + i)),
];

export function filterCatalog(products: Product[], filters: CatalogProductFilters): Product[] {
  let list = [...products];
  if (filters.q?.trim()) {
    const t = filters.q.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        (p.description ?? "").toLowerCase().includes(t) ||
        (p.category ?? "").toLowerCase().includes(t)
    );
  }
  if (filters.category && filters.category !== "all") {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters.gender && filters.gender !== "all") {
    if (filters.gender === "Kids") {
      list = list.filter((p) => p.age_group === "kids");
    } else {
      list = list.filter((p) => p.gender === filters.gender);
    }
  }
  if (filters.age_group && filters.age_group !== "all") {
    list = list.filter((p) => (p.age_group ?? "adult") === filters.age_group);
    if (filters.age_group === "adult") {
      list = list.filter((p) => p.category !== "Streetwear");
    }
  }
  if (filters.trending_only) {
    list = list.filter((p) => p.is_trending);
  }
  return list;
}

export function applyProductLimit(products: Product[], limit?: number) {
  if (!limit) return products;
  return products.slice(0, limit);
}
