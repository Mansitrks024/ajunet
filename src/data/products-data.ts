// import {
//   Layers,
//   Factory,
//   Globe,
//   Zap,
//   Wrench,
//   Wifi,
//   LayoutGrid,
//   ChevronRight,
//   Search,
// } from "lucide-react";

// import { LucideIcon } from "lucide-react";

// export interface Category {
//   id: string;
//   label: string;
//   icon: LucideIcon;
//   subcategories: string[];
// }

// export interface Product {
//   id: number;
//   category: string;
//   sub: string;
//   name: string;
//   ports: string;
//   power: string;
//   standard: string;
//   badge: string | null;
//   tag: string;
// }

//  export const categories: Category[] = [
//     {
//       id: "poe-switch",
//       label: "Commercial PoE Switch",
//       icon: Layers,
//       subcategories: ["PoE Switch", "Hi-PoE Switch", "Cloud PoE Switch", "Reverse PoE Switch", "L2 Managed PoE Switch", "L3 Managed PoE Switch"],
//     },
//     {
//       id: "industrial-poe",
//       label: "Industrial PoE Switch",
//       icon: Factory,
//       subcategories: ["Industrial PoE Switch", "M12 Industrial PoE Switch", "L2+ Managed IND PoE Switch", "Bypass Industrial PoE Switch", "2.5G/10G Managed IND PoE Switch", "IP66/68 Managed IND PoE Switch"],
//     },
//     {
//       id: "ethernet",
//       label: "Ethernet Switch",
//       icon: Globe,
//       subcategories: ["Ethernet Switch", "Desktop Switch", "1000M Fiber Switch", "Managed Ethernet Switch", "Industrial Ethernet Switch", "2.5G/10G Ethernet Switch"],
//     },
//     {
//       id: "poe-injector",
//       label: "PoE Injector",
//       icon: Zap,
//       subcategories: ["DC PoE Injector", "100M PoE Injector", "1000M PoE Injector", "BT 60W PoE Injector", "BT 90W PoE Injector"],
//     },
//     {
//       id: "accessories",
//       label: "Accessories",
//       icon: Wrench,
//       subcategories: ["PoE Splitter", "PoE Extender", "Power Supply", "SFP Module", "Media Converter"],
//     },
//     {
//       id: "wifi",
//       label: "WiFi",
//       icon: Wifi,
//       subcategories: ["Wireless AP", "Router", "CPE"],
//     },
//   ];

// export const products: Product[] = [
//   { id: 1, category: "poe-switch", sub: "PoE Switch", name: "EW-S804P 8-Port 100M PoE Switch", ports: "8x 100M PoE + 2x Uplink", power: "120W Total PoE Budget", standard: "IEEE 802.3af/at", badge: "Best Seller", tag: "Commercial" },
//   { id: 2, category: "poe-switch", sub: "Hi-PoE Switch", name: "EW-S816HP Hi-PoE 16-Port Switch", ports: "16x Gigabit PoE + 2x SFP", power: "370W Total PoE Budget", standard: "IEEE 802.3bt", badge: "New", tag: "Hi-Power" },
//   { id: 3, category: "poe-switch", sub: "Cloud PoE Switch", name: "EW-C824P Cloud Managed 24-Port", ports: "24x Gigabit PoE + 4x SFP+", power: "400W Total PoE Budget", standard: "IEEE 802.3af/at", badge: null, tag: "Cloud" },
//   { id: 4, category: "poe-switch", sub: "L2 Managed PoE Switch", name: "EW-L208P L2 Managed 8-Port", ports: "8x Gigabit PoE + 2x SFP", power: "150W Total PoE Budget", standard: "IEEE 802.3af/at/bt", badge: null, tag: "Managed" },
//   { id: 5, category: "poe-switch", sub: "L3 Managed PoE Switch", name: "EW-L324P L3 Managed 24-Port", ports: "24x Gigabit PoE + 4x 10G SFP+", power: "600W Total PoE Budget", standard: "IEEE 802.3af/at/bt", badge: "Pro", tag: "Enterprise" },
//   { id: 6, category: "industrial-poe", sub: "Industrial PoE Switch", name: "EW-I508P Industrial 8-Port PoE", ports: "8x 100M PoE + 2x Gigabit", power: "120W Total PoE Budget", standard: "IEEE 802.3af/at", badge: "Rugged", tag: "Industrial" },
//   { id: 7, category: "industrial-poe", sub: "M12 Industrial PoE Switch", name: "EW-M12-6P M12 Connector Switch", ports: "4x M12 PoE + 2x SFP", power: "60W Total PoE Budget", standard: "IEEE 802.3af/at", badge: null, tag: "M12" },
//   { id: 8, category: "industrial-poe", sub: "IP66/68 Managed IND PoE Switch", name: "EW-I606P IP68 Waterproof Switch", ports: "6x Gigabit PoE + 2x SFP", power: "120W Total PoE Budget", standard: "IP68 Rated", badge: "IP68", tag: "Outdoor" },
//   { id: 9, category: "ethernet", sub: "Ethernet Switch", name: "EW-E508 5-Port Gigabit Switch", ports: "5x Gigabit Ethernet", power: "Passive (No PoE)", standard: "IEEE 802.3u/ab", badge: null, tag: "Unmanaged" },
//   { id: 10, category: "ethernet", sub: "Desktop Switch", name: "EW-D516 16-Port Desktop Switch", ports: "16x 100M Ethernet", power: "Passive (No PoE)", standard: "IEEE 802.3u", badge: null, tag: "Desktop" },
//   { id: 11, category: "ethernet", sub: "Managed Ethernet Switch", name: "EW-M524 24-Port Managed Switch", ports: "24x Gigabit + 4x SFP+", power: "Passive (No PoE)", standard: "IEEE 802.3ab", badge: "Popular", tag: "Managed" },
//   { id: 12, category: "poe-injector", sub: "1000M PoE Injector", name: "EW-J60W 60W Gigabit PoE Injector", ports: "1x Gigabit In + 1x PoE Out", power: "60W Output Power", standard: "IEEE 802.3at/bt", badge: null, tag: "Injector" },
//   { id: 13, category: "poe-injector", sub: "BT 90W PoE Injector", name: "EW-J90W 90W BT PoE Injector", ports: "1x Gigabit In + 1x PoE Out", power: "90W Output Power", standard: "IEEE 802.3bt", badge: "High Power", tag: "BT" },
//   { id: 14, category: "accessories", sub: "Media Converter", name: "EW-MC100 100M Media Converter", ports: "1x RJ45 + 1x SC Fiber", power: "Passive", standard: "IEEE 802.3u", badge: null, tag: "Fiber" },
//   { id: 15, category: "accessories", sub: "PoE Extender", name: "EW-EXT100 PoE Extender", ports: "1x PoE In + 2x PoE Out", power: "Extends up to 100m extra", standard: "IEEE 802.3af/at", badge: null, tag: "Extender" },
//   { id: 16, category: "wifi", sub: "Wireless AP", name: "EW-AP1200 Dual-Band Access Point", ports: "1x Gigabit PoE In", power: "PoE Powered (15.4W)", standard: "802.11a/b/g/n/ac", badge: "WiFi 5", tag: "Indoor" },
//   { id: 17, category: "wifi", sub: "Router", name: "EW-R1000 Gigabit VPN Router", ports: "4x LAN + 1x WAN Gigabit", power: "12V DC Adapter", standard: "802.11ac Wave2", badge: null, tag: "VPN" },
//   { id: 18, category: "wifi", sub: "CPE", name: "EW-CPE300 5.8GHz Outdoor CPE", ports: "1x PoE Gigabit", power: "PoE Powered (13W)", standard: "802.11a/n, 300Mbps", badge: "Outdoor", tag: "CPE" },
// ];

// export const tagColors: Record<string, string> = {
//   Commercial: "bg-blue-100 text-blue-700",
//   Industrial: "bg-orange-100 text-orange-700",
//   Enterprise: "bg-purple-100 text-purple-700",
//   Managed: "bg-teal-100 text-teal-700",
//   Outdoor: "bg-green-100 text-green-700",
//   Fiber: "bg-indigo-100 text-indigo-700",
//   default: "bg-slate-100 text-slate-600",
// };

// export const badgeColors: Record<string, string> = {
//   "Best Seller": "bg-amber-500 text-white",
//   New: "bg-emerald-500 text-white",
//   Pro: "bg-purple-600 text-white",
//   Popular: "bg-blue-600 text-white",
//   Rugged: "bg-orange-600 text-white",
//   IP68: "bg-cyan-600 text-white",
//   "High Power": "bg-red-500 text-white",
//   "WiFi 5": "bg-sky-500 text-white",
//   "Hi-Power": "bg-rose-500 text-white",
//   default: "bg-gray-700 text-white",
// };

import ewindProductsData from "./ewind_products.json";

export interface Category {
  id: string;
  label: string;
  icon: string;
  subcategories: string[];
}

export interface OrderInfoItem {
  content: string;
  qty: string;
  unit: string;
}

export interface Product {
  // JSON fields
  main_category: string;
  sub_categories: string;
  model: string;
  sku: string;
  product_id: string;
  title: string;
  product_url: string;
  image_url: string;
  description: string;
  content_type: string;
  features_text: string;
  description_images: string[];
  specs: Record<string, string>;
  dimension_images: string[];
  dimension_text: string;
  order_info: OrderInfoItem[];
  applications_text: string;
  applications_images: string[];
  datasheet_url: string;
  gallery_images: string[];

  // Computed fields for component compatibility
  id: string;
  category: string;
  sub: string;
  name: string;
  ports: string;
  power: string;
  standard: string;
  badge: string | null;
  tag: string;
}

// Helper function to generate categories from JSON data
const generateCategories = (): Category[] => {
  const categoryMap = new Map<string, Set<string>>();
  const iconMap: Record<string, string> = {
    "Commercial PoE Switch": "Layers",
    "Industrial PoE Switch": "Factory",
    "Ethernet Switch": "Globe",
    "PoE Injector": "Zap",
    Accessories: "Wrench",
    WiFi: "Wifi",
  };

  // Extract unique main categories and their subcategories
  ewindProductsData.forEach((product: any) => {
    const mainCat = product.main_category;
    const subCats = product.sub_categories
      .split("|")
      .map((s: string) => s.trim());

    if (!categoryMap.has(mainCat)) {
      categoryMap.set(mainCat, new Set());
    }
    subCats.forEach((sub: string) => {
      categoryMap.get(mainCat)!.add(sub);
    });
  });

  // Convert to Category array
  const categories: Category[] = [];
  let idCounter = 1;

  categoryMap.forEach((subcategories, label) => {
    categories.push({
      id: label.toLowerCase().replace(/\s+/g, "-"),
      label,
      icon: iconMap[label] || "LayoutGrid",
      subcategories: Array.from(subcategories),
    });
  });

  return categories;
};

export const categories: Category[] = generateCategories();

// Helper function to transform JSON data to Product interface with computed fields
const transformProduct = (jsonProduct: any): Product => {
  const subCategories = jsonProduct.sub_categories
    .split("|")
    .map((s: string) => s.trim());
  const mainCat = jsonProduct.main_category;

  // Generate a category ID from main_category
  const categoryId = mainCat.toLowerCase().replace(/\s+/g, "-");

  // Extract ports, power, and standard from specs if available
  const specs = jsonProduct.specs || {};
  const ports =
    specs["Fixed Port"] || specs["Ethernet Port"] || jsonProduct.model || "N/A";
  const power =
    specs["Total PWR / Input Voltage"] || specs["Power Consumption"] || "N/A";
  const standard = specs["PoE Standard"] || specs["Network Protocol"] || "N/A";

  // Generate tag from main_category
  const tagMap: Record<string, string> = {
    "Commercial PoE Switch": "Commercial",
    "Industrial PoE Switch": "Industrial",
    "Ethernet Switch": "Ethernet",
    "PoE Injector": "Injector",
    Accessories: "Accessory",
    WiFi: "WiFi",
  };

  return {
    // Original JSON fields
    main_category: jsonProduct.main_category,
    sub_categories: jsonProduct.sub_categories,
    model: jsonProduct.model,
    sku: jsonProduct.sku,
    product_id: jsonProduct.product_id,
    title: jsonProduct.title,
    product_url: jsonProduct.product_url,
    image_url: jsonProduct.image_url,
    description: jsonProduct.description,
    content_type: jsonProduct.content_type,
    features_text: jsonProduct.features_text,
    description_images: jsonProduct.description_images || [],
    specs: jsonProduct.specs,
    dimension_images: jsonProduct.dimension_images || [],
    dimension_text: jsonProduct.dimension_text || "",
    order_info: jsonProduct.order_info || [],
    applications_text: jsonProduct.applications_text || "",
    applications_images: jsonProduct.applications_images || [],
    datasheet_url: jsonProduct.datasheet_url,
    gallery_images: jsonProduct.gallery_images || [],

    // Computed fields for component compatibility
    id: jsonProduct.product_id, // Using product_id as unique identifier
    category: categoryId,
    sub: subCategories[0] || jsonProduct.sub_categories,
    name: jsonProduct.title,
    ports: ports,
    power: power,
    standard: standard,
    badge: null, // Can be customized based on your needs
    tag: tagMap[mainCat] || "General",
  };
};

export const products: Product[] = ewindProductsData.map(transformProduct);

export const tagColors: Record<string, string> = {
  Commercial: "bg-blue-100 text-blue-700",
  Industrial: "bg-orange-100 text-orange-700",
  Enterprise: "bg-purple-100 text-purple-700",
  Managed: "bg-teal-100 text-teal-700",
  Outdoor: "bg-green-100 text-green-700",
  Fiber: "bg-indigo-100 text-indigo-700",
  default: "bg-slate-100 text-slate-600",
};

export const badgeColors: Record<string, string> = {
  "Best Seller": "bg-amber-500 text-white",
  New: "bg-emerald-500 text-white",
  Pro: "bg-purple-600 text-white",
  Popular: "bg-blue-600 text-white",
  Rugged: "bg-orange-600 text-white",
  IP68: "bg-cyan-600 text-white",
  "High Power": "bg-red-500 text-white",
  "WiFi 5": "bg-sky-500 text-white",
  "Hi-Power": "bg-rose-500 text-white",
  default: "bg-gray-700 text-white",
};
