import React from "react";

export interface Product {
  name: string;
  desc: string;
}

export interface Industry {
  id: string;
  number: string;
  title: string;
  tagline: string;
  short: string;
  tags: string[];
  icon: React.ReactNode;
  gradient: string;
  accent: string;
  stat: string;
  statLabel: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  products: Product[];
}

export const industries: Industry[] = [
  {
    id: "telecom",
    number: "01",
    title: "Telecom & ISP",
    tagline: "Backbone of India's Connectivity",
    short:
      "High-throughput routing, carrier-grade switching, and last-mile infrastructure for ISPs and telecom operators.",
    tags: ["Core Routing", "GPON/XPON", "Carrier Ethernet", "Network Backhaul"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
        />
      </svg>
    ),
    gradient: "from-blue-900 to-blue-700",
    accent: "bg-blue-500",
    stat: "10Gbps+",
    statLabel: "Throughput Support",
    overview:
      "India's telecom and ISP sector is the backbone of digital connectivity. Ajunet India, as the exclusive distributor of eWind Technology, equips telecom operators and internet service providers with carrier-grade networking infrastructure that can scale to meet the demands of millions of end users.",
    challenges: [
      "High-density subscriber management",
      "Last-mile fiber deployment complexity",
      "Carrier-grade reliability requirements",
      "Bandwidth scalability for 5G readiness",
    ],
    solutions: [
      "eWind GPON/XPON OLT systems for fiber broadband rollout",
      "Core routing platforms with 10G/100G interfaces",
      "Carrier Ethernet switches with MPLS/VPLS support",
      "Network management platforms for multi-site NOC operations",
    ],
    products: [
      {
        name: "OLT Series",
        desc: "Fiber broadband headend for 256–1024 subscribers",
      },
      {
        name: "Core Routers",
        desc: "High-throughput backbone routing with 10G/100G",
      },
      {
        name: "Carrier Switches",
        desc: "MPLS/VPLS capable carrier Ethernet switches",
      },
      {
        name: "NMS Platform",
        desc: "Unified network management for multi-site NOC",
      },
    ],
  },
  {
    id: "manufacturing",
    number: "02",
    title: "Manufacturing & Industrial Automation",
    tagline: "Ruggedised Networks for Harsh Environments",
    short:
      "Industrial-grade switches and routers built for factory floors, PLCs, SCADA systems, and OT/IT convergence.",
    tags: [
      "Industrial Switches",
      "SCADA Networking",
      "OT/IT Integration",
      "DIN Rail Devices",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    gradient: "from-slate-900 to-slate-700",
    accent: "bg-orange-500",
    stat: "IP67",
    statLabel: "Rated Hardware",
    overview:
      "Modern manufacturing relies on seamless OT/IT convergence. From PLC-to-server communication to real-time SCADA data, Ajunet's industrial networking portfolio keeps factory floors connected, monitored, and productive — even in the harshest conditions.",
    challenges: [
      "Extreme temperature and vibration environments",
      "Legacy protocol integration (Modbus, PROFINET)",
      "Zero-downtime requirements on production lines",
      "Cybersecurity in OT environments",
    ],
    solutions: [
      "DIN-rail mounted industrial switches rated IP67/IP40",
      "Managed switches with PROFINET/EtherNet-IP support",
      "Redundant ring topology with <20ms recovery",
      "Industrial-grade firewalls for OT/IT segmentation",
    ],
    products: [
      {
        name: "Industrial Switches",
        desc: "DIN-rail managed switches for factory environments",
      },
      {
        name: "DIN Rail Routers",
        desc: "Industrial routers for SCADA and remote access",
      },
      {
        name: "OT Firewalls",
        desc: "Purpose-built firewalls for OT/IT network boundary",
      },
      {
        name: "Media Converters",
        desc: "Copper-to-fiber converters for plant networks",
      },
    ],
  },
  {
    id: "transportation",
    number: "03",
    title: "Transportation & Logistics",
    tagline: "Always Connected, Always Moving",
    short:
      "Mobile and trackside networking for fleet management, rail, ports, and logistics hubs requiring non-stop uptime.",
    tags: [
      "Vehicle Routers",
      "Fleet Telematics",
      "Port Networking",
      "Redundant Links",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    ),
    gradient: "from-blue-800 to-cyan-700",
    accent: "bg-cyan-400",
    stat: "99.99%",
    statLabel: "Uptime SLA",
    overview:
      "Logistics and transportation demand always-on connectivity across moving vehicles, rail networks, seaports, and distribution centres. Ajunet delivers ruggedised mobile routers and high-availability switching that ensures fleet visibility and cargo tracking at all times.",
    challenges: [
      "Connectivity in mobile and remote environments",
      "Multi-WAN failover across cellular, Wi-Fi, and satellite",
      "Port and yard automation networking",
      "Regulatory compliance for fleet data",
    ],
    solutions: [
      "Vehicle-mounted 4G/5G routers with multi-WAN failover",
      "Rail-certified managed switches for trackside and onboard use",
      "Port automation switches with ring redundancy",
      "Cloud-managed fleet connectivity dashboards",
    ],
    products: [
      {
        name: "Vehicle Routers",
        desc: "4G/5G multi-WAN routers for fleet vehicles",
      },
      {
        name: "Rail Switches",
        desc: "EN 50155 certified switches for rail applications",
      },
      {
        name: "Port Switches",
        desc: "Industrial switches for port yard automation",
      },
      {
        name: "SD-WAN Gateways",
        desc: "Cloud-managed WAN for logistics hubs",
      },
    ],
  },
  {
    id: "smartcities",
    number: "04",
    title: "Smart Cities & Surveillance",
    tagline: "Intelligent Infrastructure at Scale",
    short:
      "PoE switches, fiber backbones, and wireless mesh for city-wide surveillance, traffic systems, and public Wi-Fi.",
    tags: [
      "PoE+ Switches",
      "CCTV Networking",
      "Traffic Management",
      "Public Wi-Fi",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    gradient: "from-blue-900 to-indigo-800",
    accent: "bg-indigo-400",
    stat: "128ch",
    statLabel: "Camera Support",
    overview:
      "Smart city deployments require a rock-solid network foundation. From IP surveillance cameras to adaptive traffic lights and public Wi-Fi hotspots, Ajunet's PoE and fiber solutions power intelligent urban infrastructure at city scale.",
    challenges: [
      "High camera density requiring PoE power budgets",
      "Outdoor deployment in varying weather conditions",
      "Low-latency video transmission for real-time analytics",
      "Scalable management across thousands of endpoints",
    ],
    solutions: [
      "PoE++ switches delivering up to 90W per port for PTZ cameras",
      "Outdoor hardened switches for traffic junctions",
      "Fiber backbone switches with ring redundancy",
      "Centralised NMS for city-wide monitoring",
    ],
    products: [
      {
        name: "PoE++ Switches",
        desc: "Up to 90W per port for PTZ and IR cameras",
      },
      {
        name: "Outdoor Switches",
        desc: "IP66-rated switches for roadside cabinets",
      },
      {
        name: "Fiber Aggregation",
        desc: "Multi-gigabit fiber aggregation switches",
      },
      {
        name: "NVR Switches",
        desc: "Optimised switches for NVR video storage",
      },
    ],
  },
  {
    id: "retail",
    number: "05",
    title: "Retail & Enterprise IT",
    tagline: "Reliable Networks That Drive Commerce",
    short:
      "Managed switches, access points, and SD-WAN solutions for retail chains, offices, and enterprise campuses.",
    tags: ["SD-WAN", "Managed Wi-Fi", "Campus Switching", "POS Connectivity"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
        />
      </svg>
    ),
    gradient: "from-slate-800 to-blue-800",
    accent: "bg-blue-400",
    stat: "500+",
    statLabel: "Store Deployments",
    overview:
      "Modern retail demands unified, secure, and scalable networking across every branch, store, and warehouse. Ajunet empowers retail IT teams with managed switching, enterprise Wi-Fi, and SD-WAN that keeps POS systems, inventory, and cloud applications running without interruption.",
    challenges: [
      "Consistent connectivity across hundreds of store locations",
      "PCI-DSS compliant network segmentation for POS",
      "Seasonal traffic spikes requiring elastic bandwidth",
      "Remote branch management without on-site IT staff",
    ],
    solutions: [
      "Cloud-managed switches for zero-touch branch deployment",
      "Enterprise Wi-Fi 6 access points for high-density stores",
      "SD-WAN with application-aware routing for SaaS performance",
      "VLAN segmentation for POS, guest, and corporate traffic",
    ],
    products: [
      {
        name: "Cloud Switches",
        desc: "Zero-touch deployment via cloud dashboard",
      },
      {
        name: "Wi-Fi 6 APs",
        desc: "High-density access points for retail floors",
      },
      {
        name: "SD-WAN Routers",
        desc: "Application-aware WAN for branch connectivity",
      },
      {
        name: "PoE Switches",
        desc: "Power-over-Ethernet for IP phones and APs",
      },
    ],
  },
  {
    id: "energy",
    number: "06",
    title: "Energy & Utilities",
    tagline: "Mission-Critical Uptime, Every Second",
    short:
      "Hardened networking for substations, oil & gas, wind farms, and utility grids demanding zero-downtime reliability.",
    tags: [
      "Substation Switches",
      "IEC 61850",
      "Wide-temp Devices",
      "Redundancy Protocols",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    gradient: "from-blue-900 to-blue-600",
    accent: "bg-yellow-400",
    stat: "-40°C",
    statLabel: "Operating Temp",
    overview:
      "Power generation and utility infrastructure can't afford a moment of downtime. Ajunet's IEC 61850-compliant hardened switches and wide-temperature routers are purpose-built for substations, wind farms, solar plants, and oil & gas facilities where failure is not an option.",
    challenges: [
      "Extreme temperature operation (-40°C to +85°C)",
      "IEC 61850 and DNP3 protocol compliance",
      "EMI and surge protection in high-voltage environments",
      "Regulatory and grid security mandates",
    ],
    solutions: [
      "IEC 61850-3 compliant substation switches",
      "Wide-temperature managed switches with conformal coating",
      "Redundant power input switches with <20ms ring recovery",
      "Hardened routers for SCADA/OT remote access",
    ],
    products: [
      {
        name: "Substation Switches",
        desc: "IEC 61850-3 compliant for HV environments",
      },
      {
        name: "Wide-Temp Routers",
        desc: "-40°C to +85°C operating range routers",
      },
      {
        name: "Redundant Switches",
        desc: "Dual-power input with ERPS ring recovery",
      },
      {
        name: "Hardened Converters",
        desc: "Surge-protected fiber media converters",
      },
    ],
  },
];


