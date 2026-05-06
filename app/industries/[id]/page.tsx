import IndustryDetail from "@/src/components/screens/Industries/Industrydetail";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const allIndustryIds = [
  "telecom",
  "manufacturing",
  "transportation",
  "smartcities",
  "retail",
  "energy",
];

export default async function IndustryDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!allIndustryIds.includes(id)) {
    notFound();
  }

  return <IndustryDetail industryId={id} />;
}
