"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Zap,
  Globe,
  Shield,
  Layers,
  CheckCircle2,
  ImageOff,
  Tag,
  Info,
  FileText,
  Cpu,
  Thermometer,
  Package,
  Settings,
  Wifi,
  Star,
  Ruler,
  Box,
  MapPin,
} from "lucide-react";
import {
  Product,
  products,
  SPEC_GROUPS,
  GROUP_ICONS,
} from "@/src/data/products-data";
import { Button } from "@/src/components/ui/button";
import { Tab } from "@/src/components/common/Tab";
import ProductSlider from "@/src/components/common/ProductSlider";

// ── IMAGE GALLERY ────
function ImageGallery({
  images = [],
  title = "",
}: {
  images?: string[];
  title?: string;
}) {
  const validImages = images.filter(Boolean);
  const [active, setActive] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-300 gap-3 border border-slate-100">
        <ImageOff size={40} strokeWidth={1} />
        <span className="text-sm text-slate-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 via-white to-blue-50/20 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center relative group">
        <img
          src={validImages[active]}
          alt={title}
          key={active}
          className="object-contain transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-3"
          style={{ display: "none" }}
        >
          <ImageOff size={40} strokeWidth={1} />
          <span className="text-sm text-slate-400">Image not available</span>
        </div>
        {validImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100">
            {active + 1} / {validImages.length}
          </div>
        )}
      </div>
      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {validImages.slice(0, 8).map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white relative ${active === i
                  ? "border-blue-500 shadow-md shadow-blue-100 scale-105"
                  : "border-slate-100 hover:border-slate-300 hover:scale-105"
                }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-slate-300"
                style={{ display: "none" }}
              >
                <ImageOff size={20} strokeWidth={1} />
              </div>
            </button>
          ))}
          {validImages.length > 8 && (
            <div className="w-14 h-14 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400 font-bold">
              +{validImages.length - 8}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── ICON MAPPER ──
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers size={13} className="text-blue-500" />,
    Cpu: <Cpu size={13} className="text-violet-500" />,
    Zap: <Zap size={13} className="text-amber-500" />,
    Globe: <Globe size={13} className="text-sky-500" />,
    Package: <Package size={13} className="text-slate-500" />,
    Thermometer: <Thermometer size={13} className="text-orange-500" />,
    Shield: <Shield size={13} className="text-emerald-500" />,
    Settings: <Settings size={13} className="text-indigo-500" />,
  };
  return iconMap[iconName] || <Settings size={13} className="text-slate-400" />;
};

function SpecTable({ specs = {} }: { specs?: Record<string, string> }) {
  const entries = Object.entries(specs).filter(
    ([, v]) => v && String(v).trim(),
  );
  if (entries.length === 0)
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
          <FileText size={20} className="text-slate-300" />
        </div>
        <p className="text-slate-400 text-sm">No specifications available</p>
        <p className="text-slate-300 text-xs mt-1">
          Download the datasheet for full details
        </p>
      </div>
    );

  const used = new Set<string>();
  const grouped = Object.entries(SPEC_GROUPS)
    .map(([groupName, keys]) => {
      const rows = entries.filter(([k]) =>
        keys.some((gk) => k.toLowerCase().includes(gk.toLowerCase())),
      );
      rows.forEach(([k]) => used.add(k));
      return { groupName, rows };
    })
    .filter(({ rows }) => rows.length > 0);

  const remaining = entries.filter(([k]) => !used.has(k));
  if (remaining.length > 0)
    grouped.push({ groupName: "Additional Specifications", rows: remaining });

  // State for accordion - first section open by default
  const [openSection, setOpenSection] = useState<string>(grouped[0]?.groupName || "");

  const toggleSection = (groupName: string) => {
    setOpenSection(openSection === groupName ? "" : groupName);
  };

  return (
    <div className="space-y-4">
      {grouped.map(({ groupName, rows }) => {
        const isOpen = openSection === groupName;
        return (
          <div key={groupName} className="border border-slate-100 rounded-2xl overflow-hidden">
            {/* Clickable header */}
            <button
              onClick={() => toggleSection(groupName)}
              className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                {getIconComponent(GROUP_ICONS[groupName] || "Settings")}
                <h4 className="text-sm font-semibold text-slate-700">
                  {groupName}
                </h4>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                  {rows.length}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Collapsible content */}
            <div
              className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
              <div className="border-t border-slate-100">
                <table className="w-full text-sm">
                  <tbody>
                    {rows.map(([key, value], i) => (
                      <tr
                        key={key}
                        className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                      >
                        <td className="py-3 px-5 font-medium text-slate-500 w-2/5 align-top border-r border-slate-100/80 text-xs leading-relaxed">
                          {key.replace(/\s+/g, " ").trim()}
                        </td>
                        <td className="py-3 px-5 text-slate-700 align-top text-xs leading-relaxed">
                          {String(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── FEATURES ───
function FeaturesSection({ text = "" }: { text?: string }) {
  if (!text) return null;

  const sections = text
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const header = sections[0]?.toLowerCase().startsWith("feature")
    ? null
    : sections[0];
  const rest = header ? sections.slice(1) : sections;

  const features: { title: string; desc: string }[] = [];
  for (let i = 0; i < rest.length; i += 2) {
    if (rest[i + 1] !== undefined) {
      features.push({ title: rest[i], desc: rest[i + 1] });
    } else {
      features.push({ title: "", desc: rest[i] });
    }
  }

  const ICONS = [
    <Wifi size={16} className="text-blue-500" />,
    <Shield size={16} className="text-emerald-500" />,
    <Zap size={16} className="text-amber-500" />,
    <Globe size={16} className="text-sky-500" />,
    <Settings size={16} className="text-violet-500" />,
    <Star size={16} className="text-orange-500" />,
  ];

  return (
    <div className="space-y-5">
      {header && (
        <p className="text-sm text-slate-600 leading-relaxed">{header}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-sm transition-all duration-200"
          >
            {f.title && (
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                  {ICONS[i % ICONS.length]}
                </div>
                <h4 className="text-sm font-semibold text-slate-800 leading-tight mt-1">
                  {f.title}
                </h4>
              </div>
            )}
            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DESCRIPTION ──
function DescriptionSection({ description = "" }: { description?: string }) {
  if (!description)
    return (
      <div className="flex flex-col items-center py-16 text-slate-400">
        <Info size={32} strokeWidth={1} className="mb-3 text-slate-200" />
        <p className="text-sm">No description available</p>
      </div>
    );

  const bullets = description
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  if (bullets.length <= 1) {
    return (
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    );
  }

  const intro = bullets[0];
  const points = bullets.slice(1);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600 leading-relaxed">{intro}</p>
      <div className="space-y-3">
        {points.map((pt, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 size={12} className="text-blue-500" />
            </div>
            <span className="text-sm text-slate-600 leading-relaxed">{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DIMENSIONS SECTION ────
function DimensionsSection({
  images = [],
  text = "",
}: {
  images?: string[];
  text?: string;
}) {
  const validImages = images.filter(Boolean);
  if (validImages.length === 0 && !text) return null;

  return (
    <div className="space-y-5">
      {text && <p className="text-sm text-slate-600 leading-relaxed">{text}</p>}
      {validImages.length > 0 && (
        <div className="grid gap-4">
          {validImages.map((img, i) => (
            <div
              key={i}
              className="max-w-lg bg-gradient-to-br from-slate-50 via-white to-blue-50/20 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center relative group"
            >
              <img
                src={img}
                alt={`Dimension diagram ${i + 1}`}
                referrerPolicy="no-referrer"
                className="object-contain transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-3"
                style={{ display: "none" }}
              >
                <Ruler size={40} strokeWidth={1} />
                <span className="text-sm text-slate-400">
                  Image not available
                </span>
              </div>
              {validImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100">
                  {i + 1} / {validImages.length}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {validImages.length === 0 && !text && (
        <div className="aspect-square max-w-sm bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-300 gap-3 border border-slate-100">
          <Ruler size={40} strokeWidth={1} />
          <span className="text-sm text-slate-400">
            No dimension data available
          </span>
        </div>
      )}
    </div>
  );
}

// ── ORDER INFO SECTION ────
function OrderInfoSection({
  items = [],
}: {
  items?: { content: string; qty: string; unit: string }[];
}) {
  if (!items || items.length === 0)
    return (
      <div className="flex flex-col items-center py-16 text-slate-400">
        <Box size={32} strokeWidth={1} className="mb-3 text-slate-200" />
        <p className="text-sm">No package information available</p>
      </div>
    );
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Package Contents
      </p>
      <div className="rounded-2xl border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-3 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-8">
                #
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Item
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-20">
                Qty
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-20">
                Unit
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="py-3 px-4 text-xs text-slate-400 font-mono">
                  {i + 1}
                </td>
                <td className="py-3 px-4 text-xs text-slate-700 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      size={12}
                      className="text-emerald-400 mt-0.5 shrink-0"
                    />
                    {item.content}
                  </div>
                </td>
                <td className="py-3 px-4 text-xs text-slate-600 font-semibold text-center">
                  {item.qty}
                </td>
                <td className="py-3 px-4 text-xs text-slate-500 text-center">
                  {item.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── APPLICATIONS SECTION ────
function ApplicationsSection({
  text = "",
  images = [],
}: {
  text?: string;
  images?: string[];
}) {
  const validImages = images.filter(Boolean);
  if (!text && validImages.length === 0) return null;
  const bullets = text
    ? text
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      {bullets.length > 0 && (
        <div className="space-y-3">
          {bullets.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={11} className="text-blue-500" />
              </div>
              <span className="text-sm text-slate-600 leading-relaxed">
                {b}
              </span>
            </div>
          ))}
        </div>
      )}
      {validImages.length > 0 && (
        <div className="grid gap-4">
          {validImages.map((img, i) => (
            <div
              key={i}
              className="max-w-lg bg-gradient-to-br from-slate-50 via-white to-blue-50/20 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center relative group"
            >
              <img
                src={img}
                alt={`Application scenario ${i + 1}`}
                referrerPolicy="no-referrer"
                className="object-contain transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-3"
                style={{ display: "none" }}
              >
                <MapPin size={40} strokeWidth={1} />
                <span className="text-sm text-slate-400">
                  Image not available
                </span>
              </div>
              {validImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100">
                  {i + 1} / {validImages.length}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {validImages.length === 0 && bullets.length === 0 && (
        <div className="aspect-square max-w-sm bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-300 gap-3 border border-slate-100">
          <MapPin size={40} strokeWidth={1} />
          <span className="text-sm text-slate-400">
            No application data available
          </span>
        </div>
      )}
    </div>
  );
}

// ── QUICK SPEC CARD ────
function QuickSpec({
  icon,
  label,
  value,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-3 flex items-center gap-2.5 hover:border-slate-200 hover:shadow-sm transition-all duration-200">
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-[11px] text-slate-700 font-semibold leading-tight line-clamp-2">
          {value}
        </p>
      </div>
    </div>
  );
}

// ── RELATED PRODUCTS SECTION ──
function RelatedProductsSection({
  currentProduct,
}: {
  currentProduct: Product;
}) {
  const getRelatedProducts = (): Product[] => {
    // Filter products based on same main category or tag
    const related = products
      .filter(
        (p) =>
          p.product_id !== currentProduct.product_id &&
          (p.main_category === currentProduct.main_category ||
            p.tag === currentProduct.tag ||
            p.sub_categories.includes(
              currentProduct.sub_categories.split("|")[0]?.trim(),
            )),
      )
      .slice(0, 8); // Limit to 8 products

    // If no related products found, return some random products as fallback
    if (related.length === 0) {
      return products
        .filter((p) => p.product_id !== currentProduct.product_id)
        .slice(0, 6);
    }

    return related;
  };

  const relatedProducts = getRelatedProducts();

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <ProductSlider
        products={relatedProducts}
        title="Related Products"
        subtitle="Discover similar products that might interest you"
        slidesPerView={4}
        spaceBetween={24}
      />
    </div>
  );
}

// ── MAIN PRODUCT DETAIL ──
export default function ProductDetail({ product }: { product: Product }) {
  const [tab, setTab] = useState("overview");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Info size={24} className="text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">Product not found</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const specs = product.specs || {};
  const specCount = Object.keys(specs).length;
  const hasFeatures = !!product.features_text;
  const featureCount = hasFeatures
    ? product.features_text.split("|").filter(Boolean).length
    : 0;
  const galleryImages = Array.isArray(product.gallery_images)
    ? product.gallery_images
    : product.image_url
      ? [product.image_url]
      : [];

  const descriptionImages = Array.isArray(product.description_images)
    ? product.description_images
    : [];

  const dimensionImages = Array.isArray(product.dimension_images)
    ? product.dimension_images
    : [];
  const dimensionText = product.dimension_text || "";
  const hasDimensions = dimensionImages.length > 0 || !!dimensionText;

  const orderInfo = Array.isArray(product.order_info) ? product.order_info : [];
  const hasOrderInfo = orderInfo.length > 0;

  const applicationImages = Array.isArray(product.applications_images)
    ? product.applications_images
    : [];
  const applicationText = product.applications_text || "";
  const hasApplications = applicationImages.length > 0 || !!applicationText;

  const subCategories = (product.sub_categories || product.sub || "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  const tabs = [
    { id: "overview", label: "Overview" },
    ...(hasFeatures
      ? [
        {
          id: "features",
          label: "Features",
          count: Math.floor(featureCount / 2),
        },
      ]
      : []),
    ...(specCount > 0
      ? [{ id: "specs", label: "Specifications", count: specCount }]
      : []),
    ...(hasDimensions ? [{ id: "dimensions", label: "Dimensions" }] : []),
    ...(hasOrderInfo
      ? [{ id: "inbox", label: "Order Information", count: orderInfo.length }]
      : []),
    ...(hasApplications ? [{ id: "applications", label: "Applications" }] : []),
  ];

  return (
    <div className="min-h-screen">
      {/* bg-slate-50/50 */}
      {/* ── HEADER ─── */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md mt-4">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Products
          </Link>
          <ChevronRight size={13} className="text-muted-foreground/30" />
          {subCategories[0] && (
            <>
              <span className="text-sm text-muted-foreground/60 hidden sm:block">
                {subCategories[0]}
              </span>
              <ChevronRight
                size={13}
                className="text-muted-foreground/30 hidden sm:block"
              />
            </>
          )}
          <span className="text-sm text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
            {product.model || product.title}
          </span>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* ── TOP SECTION ─── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-10">
          {/* Gallery */}
          <div>
            <ImageGallery images={galleryImages} title={product.title} />
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-5">
            {/* Category badges */}
            <div className="flex flex-wrap gap-2">
              {subCategories.map((sub) => (
                <span
                  key={sub}
                  className="text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full"
                >
                  {sub}
                </span>
              ))}
            </div>

            {/* Title block */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {product.model && (
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                    {product.model}
                  </span>
                )}
                {product.sku && product.sku !== product.model && (
                  <span className="text-xs font-mono text-slate-400">
                    SKU: {product.sku}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {product.title || product.name}
              </h1>
            </div>

            {/* Quick spec grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {specs["Total PWR / Input Voltage"] && (
                <QuickSpec
                  icon={<Zap size={12} className="text-amber-500" />}
                  label="Power"
                  value={specs["Total PWR / Input Voltage"]}
                  colorClass="bg-amber-50"
                />
              )}
              {(specs["PoE Standard"] || specs["Network Protocol"]) && (
                <QuickSpec
                  icon={<Globe size={12} className="text-sky-500" />}
                  label="Standard"
                  value={specs["PoE Standard"] || "IEEE 802.3"}
                  colorClass="bg-sky-50"
                />
              )}
              {specs["Switching Capacity"] && (
                <QuickSpec
                  icon={<Cpu size={12} className="text-violet-500" />}
                  label="Switching"
                  value={specs["Switching Capacity"]}
                  colorClass="bg-violet-50"
                />
              )}
              {specs["Certification"] && (
                <QuickSpec
                  icon={<Shield size={12} className="text-emerald-500" />}
                  label="Certified"
                  value={specs["Certification"].split(";")[0].trim()}
                  colorClass="bg-emerald-50"
                />
              )}
              {specs["Warranty"] && (
                <QuickSpec
                  icon={<Tag size={12} className="text-violet-500" />}
                  label="Warranty"
                  value={specs["Warranty"].split(",")[0].trim()}
                  colorClass="bg-violet-50"
                />
              )}
            </div>
            {specs["Fixed Port"] && (
              <div className="col-span-2 bg-slate-900 rounded-xl p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers size={11} className="text-slate-400" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Port Configuration
                  </p>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {specs["Fixed Port"]}
                </p>
              </div>
            )}

            {/* Additional specs pills */}
            {(specs["MAC"] ||
              specs["Buffer Memory"] ||
              specs["Forwarding Rate"]) && (
                <div className="flex flex-wrap gap-2">
                  {specs["MAC"] && (
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
                      MAC: {specs["MAC"]}
                    </span>
                  )}
                  {specs["Buffer Memory"] && (
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
                      Buffer: {specs["Buffer Memory"]}
                    </span>
                  )}
                  {specs["Forwarding Rate"] && (
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
                      Fwd Rate: {specs["Forwarding Rate"]}
                    </span>
                  )}
                </div>
              )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {product.datasheet_url && (
                <Button asChild>
                  <a
                    href={product.datasheet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Download size={15} />
                    Download Datasheet
                  </a>
                </Button>
              )}
              {product.product_url && (
                <Button variant="outline" asChild>
                  <a
                    href={product.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={15} />
                    View on Site
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ── TAB SECTION ─── */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          {/* Tab bar */}
          <div className="border-b border-slate-100 px-6 flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <Tab
                key={t.id}
                active={tab === t.id}
                onClick={() => setTab(t.id)}
                label={t.label}
                count={"count" in t ? t.count : undefined}
              />
            ))}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {tab === "overview" && (
              <div className="space-y-8">
                <DescriptionSection description={product.description} />
                {descriptionImages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-4">
                      Product Images :
                    </h3>
                    <div className="flex gap-4">
                      {descriptionImages.map((img, i) => (
                        <div
                          key={i}
                          className="max-w-sm rounded-xl bg-white border border-slate-100 relative overflow-hidden"
                        >
                          <img
                            src={img}
                            alt={`Product image ${i + 1}`}
                            className="w-full h-auto object-contain p-2 block"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget
                                .nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          <div
                            className="absolute inset-0 flex items-center justify-center text-slate-300"
                            style={{ display: "none" }}
                          >
                            <ImageOff size={20} strokeWidth={1} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {tab === "features" && (
              <FeaturesSection text={product.features_text} />
            )}
            {tab === "specs" && <SpecTable specs={specs} />}
            {tab === "dimensions" && (
              <DimensionsSection
                images={dimensionImages}
                text={dimensionText}
              />
            )}
            {tab === "inbox" && <OrderInfoSection items={orderInfo} />}
            {tab === "applications" && (
              <ApplicationsSection
                text={applicationText}
                images={applicationImages}
              />
            )}
          </div>
        </div>

        {/* ── RELATED PRODUCTS ───*/}
        <RelatedProductsSection currentProduct={product} />
      </div>
    </div>
  );
}
