import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GuidePage } from '../../components/article/GuidePage';
import { guidePageByRoute, guidePages } from '../../content';
import { buildGuideMetadata } from '../../lib/seo/metadata';

export function generateStaticParams() {
  return guidePages.map((page) => ({
    slug: page.route.slice(1).split('/'),
  }));
}

function routeFromSlug(slug: string[]): string {
  return `/${slug.join('/')}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = guidePageByRoute.get(routeFromSlug(slug));
  return page ? buildGuideMetadata(page) : {};
}

export default async function ContentRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = guidePageByRoute.get(routeFromSlug(slug));
  if (!page) notFound();

  return <GuidePage page={page} />;
}
