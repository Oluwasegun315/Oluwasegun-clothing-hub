export type StoreCollection = "men" | "kids" | "streetwear";

export const MEN_PRODUCT_NAMES: Record<string, string> = {
  "cghxjjx.jpg": "Classic Cotton Hoodie",
  "chghgcyj.jpg": "Slim Fit Chinos",
  "fcjjcj.jpg": "Plain White T-Shirt",
  "fgjgcyytcj.jpg": "Blue Denim Jacket",
  "fxgdrj.jpg": "Casual Polo Shirt",
  "gccjc.jpg": "Ankara Print Shirt",
  "gchc.jpg": "Navy Blazer",
  "ghdthrxth.jpg": "Striped Long Sleeve Shirt",
  "hcgnfn.jpg": "Black Jogger Pants",
  "hdgjyj.jpg": "Smart Trouser Set",
  "hfhfry.jpg": "Grey Sweatshirt",
  "hxfrjxtr.jpg": "Cargo Pants",
  "jxjcg.jpg": "Senator Outfit",
  "kchkckh.jpg": "Agbada Complete Set",
  "tdufgyrd.jpg": "Linen Button Shirt",
  "tfnxt.jpg": "White Running Sneakers",
  "tycghcty.jpg": "Urban Bomber Jacket",
  "utrxzetyjr.jpg": "Kaftan Top",
  "x fngfxng.jpg": "Two Piece Tracksuit",
  "xfjdhjgn.jpg": "Formal Office Shirt",
  "xtdyxh yytxr.jpg": "Ripped Denim Jeans",
  "yf hfxrgctug.jpg": "Knit Pullover Sweater",
  "ytxtyjc.jpg": "Summer Shorts",
  "yxjyjxrtx.jpg": "Crossbody Bag Combo",
  "ztz.jpg": "Streetwear Cap & Tee",
};

export const KIDS_PRODUCT_NAMES: Record<string, string> = {
  "2d7db460c14effeeb2b92eb621c96b84.jp.jpg": "Kids School Polo",
  "95b3e24ed8b7f2b7aced95a9c82d2274.jpg": "Kids Denim Dungarees",
  "578d4045ed02ed67b63c17957ec008ed.jpg": "Kids Zip Hoodie",
  "731bfff8ba59b9eebf900ed7acf1f37b.jpg": "Kids Party Dress",
  "770f292ef1f9fe9e9c8831b69f8e957b.jpg": "Kids Rain Jacket",
  "2954b1879a9e6a74c9dd172c050ff9f3.jpg": "Kids Cotton T-Shirt",
  "3636e6edbab63a10b08934fc28b48363.jpg": "Kids Shorts Set",
  "64700c4842945a29cbf542342fcc6740.jpg": "Kids Canvas Sneakers",
  "7266178338bf112984121d1e86a4b23a.jpg": "Kids Ankara Top",
  "b6b3c15caaaeb67873738921e5d6cdb6.jpg": "Kids Jumpsuit",
  "cb948db1e4f15a89fa68d408b2a16492.jpg": "Kids Knit Cardigan",
  "d85445117bb17cf005c24cb4377eb968hejb.jpg": "Kids Stretch Leggings",
  "dad04654f7c5767145eb6f06b8f8a2ce.jpg": "Kids Sun Hat Outfit",
  "e2fde880e44357cadc8a693f56c10663.jpg": "Kids Striped Shirt",
  "f0fd235444b41483c4b896df197ef3e8.jpg": "Kids Padded Coat",
  "f2eb394f0421d85d69eff8efb9d95f65.jpg": "Kids Tutu Dress",
  "hgjgcgj.jpg": "Kids Playwear Set",
  "hh jjhhk.jpg": "Kids Velcro Sandals",
  "hkvcf.jpg": "Kids School Backpack Set",
  "jcycxrt.jpg": "Kids Cotton Romper",
  "ryufgu.jpg": "Kids Track Pants",
  "udrxyrd.jpg": "Kids Birthday Outfit",
  "utdtyxryf.jpg": "Kids Pyjama Set",
  "utfty ydr.jpg": "Kids Floral Dress",
};

export const STREETWEAR_PRODUCT_NAMES: Record<string, string> = {
  "Cloth.jpg": "Premium Cloth Tee",
  "Cople.jpg": "Couple Match Set",
  "Coupel.jpg": "Couple Street Set",
  "Couple.jpg": "Couple Urban Outfit",
  "Couple2.jpg": "Couple Style Pack 2",
  "Couple3.jpg": "Couple Style Pack 3",
  "Couple4.jpg": "Couple Style Pack 4",
  "Couple7.jpg": "Couple Edition 7",
  "Couple9.jpg": "Couple Edition 9",
  "Dior.jpg": "Designer Inspired Tee",
  "Fam.jpg": "Family Pack Outfit",
  "Fam2.jpg": "Family Pack 2",
  "Fam3.jpg": "Family Pack 3",
  "Fashion.jpg": "Fashion Forward Hoodie",
  "hung cloth.jpg": "Hung Cloth Layered Look",
  "L.jpg": "Monogram L Street Tee",
  "lv.jpg": "Luxury Street Crossbody Look",
  "socks.jpg": "Street Socks & Shorts Set",
  "Steeze.jpg": "Steeze Oversized Tee",
  "Street.jpg": "Core Street Hoodie",
  "Tiger.4jpg.jpg": "Tiger Print Street 4",
  "Tiger.jpg": "Tiger Graphic Tee",
  "Tiger2.jpg": "Tiger Graphic Tee 2",
  "Tiger3.jpg": "Tiger Graphic Tee 3",
  "trending.jpg": "Trending Drop #1",
  "Trending5.jpg": "Trending Drop #5",
  "Trendring6.jpg": "Trending Drop #6",
  "Trn.jpg": "Train Street Joggers",
  "Trnddring1.jpg": "Trending Street Set 1",
  "Trndring.jpg": "Trending Street Set",
  "white.jpg": "Clean White Street Tee",
};

export function getProductDisplayName(
  collection: StoreCollection,
  filename: string,
  index: number
): string {
  const map =
    collection === "men"
      ? MEN_PRODUCT_NAMES
      : collection === "kids"
        ? KIDS_PRODUCT_NAMES
        : STREETWEAR_PRODUCT_NAMES;
  if (map[filename]) return map[filename];

  const base = filename.replace(/\.[^.]+$/i, "").replace(/\s+/g, " ").trim();
  if (base.length > 0 && base.length <= 24) {
    return base
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  if (collection === "streetwear") return `Trending Streetwear ${index + 1}`;
  return collection === "men" ? `Men's Outfit ${index + 1}` : `Kids Outfit ${index + 1}`;
}
