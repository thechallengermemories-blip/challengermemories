import { CrewBiography } from "@/components/CrewBiography";

// Note: crew list for static params generation now lives in the DB rather
// than a static array, so this route renders dynamically per-request.
// (If you want these pre-rendered at build time again, fetch the slug list
// from MongoDB here inside an async generateStaticParams instead.)

type Params = Promise<{ slug: string }>;

export default async function CrewMemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  return <CrewBiography slug={slug} />;
}