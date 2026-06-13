import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, getNextProject } from "@/lib/projects";
import { CaseStudy } from "@/components/CaseStudy";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const title = `${project.title} · Case study | Peter Sudai`;
  const description = project.outcome;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://petersudai.dev/work/${project.slug}`,
      images: [{ url: "https://petersudai.dev/og", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["https://petersudai.dev/og"] },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const next = getNextProject(params.slug);
  return (
    <main className="relative overflow-hidden">
      <CaseStudy project={project} next={next} />
    </main>
  );
}
