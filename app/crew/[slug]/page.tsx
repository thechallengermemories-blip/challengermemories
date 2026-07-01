import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CREW, getCrewMember } from "@/lib/crew-data";
import { CrewBiography } from "@/components/CrewBiography";

// Pre-render one page per crew member at build time.
export function generateStaticParams() {
  return CREW.map((c) => ({ slug: c.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getCrewMember(slug);
  if (!member) return {};
  return {
    title: `${member.name} — Challenger Memories`,
    description: member.shortBio,
  };
}

export default async function CrewMemberPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const member = getCrewMember(slug);
  if (!member) notFound();

  return <CrewBiography member={member} />;
}