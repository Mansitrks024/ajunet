export interface ProductIcon {
  type: 'svg';
  width: number;
  height: number;
  viewBox: string;
  elements: Array<{
    type: 'rect' | 'circle' | 'path';
    attrs: Record<string, any>;
  }>;
}

export interface Product {
  title: string;
  desc: string;
  tag: string;
  accent: string;
  featured: boolean;
  icon: ProductIcon;
}

export const products: Product[] = [
  {
    title: "Managed & Unmanaged Switches",
    desc: "Layer 2 & Layer 3 switches built for high-density environments — from SMBs to enterprise data centres.",
    tag: "Switching",
    accent: "from-primary/10 to-primary/5",
    featured: true,
    icon: {
      type: "svg",
      width: 28,
      height: 28,
      viewBox: "0 0 28 28",
      elements: [
        {
          type: "rect",
          attrs: {
            x: 2,
            y: 9,
            width: 24,
            height: 10,
            rx: 2,
            stroke: "currentColor",
            strokeWidth: 1.8
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 6,
            cy: 14,
            r: 1.5,
            fill: "currentColor"
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 10,
            cy: 14,
            r: 1.5,
            fill: "currentColor"
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 14,
            cy: 14,
            r: 1.5,
            fill: "currentColor"
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 18,
            cy: 14,
            r: 1.5,
            fill: "currentColor"
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 22,
            cy: 14,
            r: 1.5,
            fill: "currentColor"
          }
        },
        {
          type: "path",
          attrs: {
            d: "M6 9V6M10 9V6M14 9V6M18 9V6M22 9V6",
            stroke: "currentColor",
            strokeWidth: 1.6,
            strokeLinecap: "round"
          }
        }
      ]
    }
  },
  {
    title: "Enterprise Networking Solutions",
    desc: "Scalable core and distribution layer solutions engineered for mission-critical uptime and throughput.",
    tag: "Enterprise",
    accent: "from-primary/10 to-primary/5",
    featured: false,
    icon: {
      type: "svg",
      width: 28,
      height: 28,
      viewBox: "0 0 28 28",
      elements: [
        {
          type: "circle",
          attrs: {
            cx: 14,
            cy: 14,
            r: 4,
            stroke: "currentColor",
            strokeWidth: 1.8
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 5,
            cy: 8,
            r: 2.5,
            stroke: "currentColor",
            strokeWidth: 1.6
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 23,
            cy: 8,
            r: 2.5,
            stroke: "currentColor",
            strokeWidth: 1.6
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 5,
            cy: 20,
            r: 2.5,
            stroke: "currentColor",
            strokeWidth: 1.6
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 23,
            cy: 20,
            r: 2.5,
            stroke: "currentColor",
            strokeWidth: 1.6
          }
        },
        {
          type: "path",
          attrs: {
            d: "M10 11.5L7 9.5M18 11.5L21 9.5M10 16.5L7 18.5M18 16.5L21 18.5",
            stroke: "currentColor",
            strokeWidth: 1.4,
            strokeLinecap: "round"
          }
        }
      ]
    }
  },
  {
    title: "Industrial Ethernet Routers",
    desc: "DIN-rail routers hardened for factory floors, substations, and outdoor deployments with wide temperature tolerance.",
    tag: "Industrial",
    accent: "from-primary/10 to-primary/5",
    featured: false,
    icon: {
      type: "svg",
      width: 28,
      height: 28,
      viewBox: "0 0 28 28",
      elements: [
        {
          type: "rect",
          attrs: {
            x: 4,
            y: 7,
            width: 20,
            height: 14,
            rx: 2,
            stroke: "currentColor",
            strokeWidth: 1.8
          }
        },
        {
          type: "path",
          attrs: {
            d: "M9 7V5M14 7V4M19 7V5",
            stroke: "currentColor",
            strokeWidth: 1.6,
            strokeLinecap: "round"
          }
        },
        {
          type: "path",
          attrs: {
            d: "M8 13h3M17 13h3M13 13h2",
            stroke: "currentColor",
            strokeWidth: 1.8,
            strokeLinecap: "round"
          }
        },
        {
          type: "path",
          attrs: {
            d: "M8 17h12",
            stroke: "currentColor",
            strokeWidth: 1.4,
            strokeLinecap: "round",
            strokeOpacity: 0.5
          }
        }
      ]
    }
  },
  {
    title: "4G/5G Wireless Routers",
    desc: "Multi-WAN cellular routers with failover support — ideal for mobile deployments, retail branches, and field operations.",
    tag: "Wireless",
    accent: "from-primary/10 to-primary/5",
    featured: true,
    icon: {
      type: "svg",
      width: 28,
      height: 28,
      viewBox: "0 0 28 28",
      elements: [
        {
          type: "path",
          attrs: {
            d: "M14 20v-6",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round"
          }
        },
        {
          type: "path",
          attrs: {
            d: "M10 16.5C10 16.5 11.5 15 14 15s4 1.5 4 1.5",
            stroke: "currentColor",
            strokeWidth: 1.7,
            strokeLinecap: "round"
          }
        },
        {
          type: "path",
          attrs: {
            d: "M7 13C7 13 9.8 10 14 10s7 3 7 3",
            stroke: "currentColor",
            strokeWidth: 1.7,
            strokeLinecap: "round"
          }
        },
        {
          type: "path",
          attrs: {
            d: "M4 9.5C4 9.5 8.1 5 14 5s10 4.5 10 4.5",
            stroke: "currentColor",
            strokeWidth: 1.7,
            strokeLinecap: "round"
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 14,
            cy: 22,
            r: 1.5,
            fill: "currentColor"
          }
        }
      ]
    }
  },
  {
    title: "IoT Connectivity Devices",
    desc: "Compact gateways and edge devices that connect sensors, PLCs, and smart assets to cloud platforms seamlessly.",
    tag: "IoT",
    accent: "from-primary/10 to-primary/5",
    featured: false,
    icon: {
      type: "svg",
      width: 28,
      height: 28,
      viewBox: "0 0 28 28",
      elements: [
        {
          type: "rect",
          attrs: {
            x: 10,
            y: 10,
            width: 8,
            height: 8,
            rx: 1.5,
            stroke: "currentColor",
            strokeWidth: 1.8
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 4,
            cy: 6,
            r: 2,
            stroke: "currentColor",
            strokeWidth: 1.5
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 24,
            cy: 6,
            r: 2,
            stroke: "currentColor",
            strokeWidth: 1.5
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 4,
            cy: 22,
            r: 2,
            stroke: "currentColor",
            strokeWidth: 1.5
          }
        },
        {
          type: "circle",
          attrs: {
            cx: 24,
            cy: 22,
            r: 2,
            stroke: "currentColor",
            strokeWidth: 1.5
          }
        },
        {
          type: "path",
          attrs: {
            d: "M6 6.5L10 10M22 6.5L18 10M6 21.5L10 18M22 21.5L18 18",
            stroke: "currentColor",
            strokeWidth: 1.3,
            strokeLinecap: "round"
          }
        }
      ]
    }
  },
  {
    title: "Network Security & Firewall Solutions",
    desc: "Next-generation firewalls and UTM appliances that protect networks from intrusions, malware, and zero-day threats.",
    tag: "Security",
    accent: "from-primary/10 to-primary/5",
    featured: false,
    icon: {
      type: "svg",
      width: 28,
      height: 28,
      viewBox: "0 0 28 28",
      elements: [
        {
          type: "path",
          attrs: {
            d: "M14 3L4 7v7c0 6 4.5 11 10 12 5.5-1 10-6 10-12V7L14 3z",
            stroke: "currentColor",
            strokeWidth: 1.8,
            strokeLinejoin: "round"
          }
        },
        {
          type: "path",
          attrs: {
            d: "M10 14l3 3 5-5",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        }
      ]
    }
  }
];
