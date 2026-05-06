export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
  sub: string;
  href: string | null;
}

export const contactDetails: ContactDetail[] = [
  {
    icon: "phone",
    label: "Phone",
    value: "+91 98765 43210",
    sub: "Mon–Sat, 9am–6pm IST",
    href: "tel:+919876543210",
  },
  {
    icon: "email",
    label: "Email",
    value: "info@ajunetindia.com",
    sub: "We reply within 24 hours",
    href: "mailto:info@ajunetindia.com",
  },
  {
    icon: "location",
    label: "Office Address",
    value: "Ajunet India Pvt. Ltd.",
    sub: "123, Business Hub, Andheri East, Mumbai – 400069, Maharashtra",
    href: "https://maps.google.com",
  },
  {
    icon: "clock",
    label: "Business Hours",
    value: "Mon – Saturday",
    sub: "9:00 AM – 6:00 PM IST",
    href: null,
  },
];

export interface SocialLink {
  label: string;
  icon: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    icon: "in",
    color: "hover:bg-blue-700",
  },
  {
    label: "Twitter",
    icon: "𝕏",
    color: "hover:bg-gray-900",
  },
  {
    label: "WhatsApp",
    icon: "W",
    color: "hover:bg-green-600",
  },
];
