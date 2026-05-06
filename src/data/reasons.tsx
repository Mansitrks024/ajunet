import React from "react";

export interface Reason {
  title: string;
  desc: string;
  icon: React.ReactNode;
  number: string;
}

export const reasons: Reason[] = [
  {
    title: "Exclusive Partnership",
    desc: "Authorized national distributor for eWind Technology products in India.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M13 3L4 7.5V13c0 5.5 3.8 10.6 9 12 5.2-1.4 9-6.5 9-12V7.5L13 3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 13l3 3 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    number: "01",
  },
  {
    title: "Pan-India Reach",
    desc: "Strong supply chain and logistics network ensuring timely delivery.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle
          cx="13"
          cy="13"
          r="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M13 3C13 3 9 8.5 9 13s4 10 4 10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M13 3C13 3 17 8.5 17 13s-4 10-4 10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M3 13h20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M4.5 8.5h17M4.5 17.5h17"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
      </svg>
    ),
    number: "02",
  },
  {
    title: "Technical Expertise",
    desc: "Pre-sales and post-sales support by experienced professionals.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect
          x="3"
          y="5"
          width="20"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 23h8M13 19v4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M8 11l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 14h4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    number: "03",
  },
  {
    title: "Competitive Pricing",
    desc: "Best-in-class pricing with value-driven solutions.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle
          cx="13"
          cy="13"
          r="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M13 7v2M13 17v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10 10.5C10 9.4 11.3 9 13 9s3 .7 3 2c0 1.2-1.2 1.8-3 2-1.8.2-3 .8-3 2.1 0 1.2 1.3 1.9 3 1.9s3-.6 3-1.9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    number: "04",
  },
  {
    title: "Channel Support",
    desc: "Dedicated support for distributors, resellers, and system integrators.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle
          cx="10"
          cy="9"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="19"
          cy="8"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3 20c0-3.9 3.1-7 7-7s7 3.1 7 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M19 13c2.2.4 4 2.3 4 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    number: "05",
  },
];
