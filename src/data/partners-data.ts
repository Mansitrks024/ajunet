export interface Benefit {
  title: string;
  desc: string;
  icon: string;
  stat: string;
  statLabel: string;
}

export const benefits: Benefit[] = [
  {
    title: "Strong Backend Support",
    desc: "Dedicated account managers and escalation teams ready to back you at every stage of the sales cycle.",
    icon: "support",
    stat: "24/7",
    statLabel: "Support Access",
  },
  {
    title: "Best Pricing",
    desc: "Competitive distributor margins, volume-based incentives, and exclusive pricing tiers for loyal partners.",
    icon: "pricing",
    stat: "30%+",
    statLabel: "Avg. Margin",
  },
  {
    title: "Fast Delivery",
    desc: "Pan-India warehousing ensures same-day dispatch and reliable last-mile delivery to your doorstep.",
    icon: "delivery",
    stat: "48hr",
    statLabel: "Delivery SLA",
  },
  {
    title: "Technical Assistance",
    desc: "Pre-sales consultation, product training, and post-deployment support from our certified engineers.",
    icon: "technical",
    stat: "100+",
    statLabel: "Certified Engineers",
  },
];

export const brands = [
  { name: "eWind PoE Switches", abbr: "Ps", category: "Networking Hardware" },
  { name: "eWind Industrial Switches", abbr: "Is", category: "Industrial Networking" },
  { name: "eWind Ethernet Switches", abbr: "Es", category: "Enterprise Networking" },
  { name: "eWind Wireless Devices", abbr: "Wd", category: "Wireless Solutions" },
  { name: "eWind Fiber Solutions", abbr: "Fs", category: "Fiber Optics" },
  { name: "eWind PoE Accessories", abbr: "Pa", category: "PoE Devices" },
  { name: "eWind SFP Modules", abbr: "Sf", category: "Fiber Components" },
  { name: "eWind Media Converters", abbr: "Mc", category: "Network Conversion" }
];

export const brandColors = [
  "bg-blue-900 text-blue-100",
  "bg-blue-700 text-blue-100",
  "bg-blue-800 text-blue-100",
  "bg-slate-800 text-slate-100",
  "bg-blue-600 text-white",
  "bg-slate-700 text-slate-100",
  "bg-blue-900 text-blue-200",
  "bg-slate-900 text-slate-100",
];
