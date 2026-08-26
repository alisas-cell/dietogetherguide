import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import type { GuidePageData } from '../../content';
import { formatLastModified } from '../../lib/seo/routes';
import { buildGuideSchemas } from '../../lib/seo/schema';
import { routeHasPlacement, type AdPlacement } from '../ads/ad-config';
import { AdSlot } from '../ads/AdSlot';
import { JsonLd } from '../seo/JsonLd';
import { Container } from '../ui/Container';
import { Breadcrumbs } from './Breadcrumbs';
import { Callout } from './Callout';
import { EvidenceBanner } from './EvidenceBanner';
import { FaqList } from './FaqList';
import { RelatedGuides } from './RelatedGuides';
import { ResponsiveTable } from './ResponsiveTable';
import { SourceList } from './SourceList';

const calloutVariants = {
  'field-note': 'note',
  'build-check': 'build',
  danger: 'danger',
} as const;

const inlinePlacementBySection: Partial<Record<number, AdPlacement>> = {
  0: 'native_primary',
  1: 'smartlink_primary',
  2: 'rectangle_300',
  3: 'horizontal_468',
};

export function GuidePage({ page }: { page: GuidePageData }) {
  const hasLongSidebar = routeHasPlacement(page.route, 'sidebar_160x600');
  const hasShortSidebar = routeHasPlacement(page.route, 'sidebar_160x300');

  return (
    <>
      <JsonLd schemas={buildGuideSchemas(page)} />
      <article className="article-page">
        <Container>
          <header className="article-hero">
            <div className="article-hero-copy">
              <Breadcrumbs items={page.breadcrumbs} />
              <p className="section-kicker">{page.eyebrow}</p>
              <h1>{page.h1}</h1>
              <div className="article-direct-answer">
                {page.directAnswer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            {page.heroImage ? (
              <figure className="article-hero-image">
                <Image
                  alt={page.heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 38vw"
                  src={page.heroImage.src}
                />
                <figcaption>Official media · locally hosted · source registered</figcaption>
              </figure>
            ) : null}
          </header>

          <EvidenceBanner
            confidence={page.confidence}
            context={page.buildContext}
            date={formatLastModified(page.route)}
          >
            Build-sensitive details are labeled. Pending fields are not rendered as affirmative answers.
          </EvidenceBanner>

          {routeHasPlacement(page.route, 'early_responsive') ? (
            <AdSlot pathname={page.route} placement="early_responsive" />
          ) : null}

          <div className="article-layout">
            <div className="article-body">
              {page.sections.map((section, index) => {
                const inlinePlacement = inlinePlacementBySection[index];
                return (
                  <Fragment key={section.id}>
                    <section id={section.id}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.links ? (
                      <div className="article-link-row">
                        {section.links.map((link) => (
                          <Link href={link.href} key={link.href}>
                            {link.label} <span aria-hidden="true">↗</span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                    {section.table ? (
                      <ResponsiveTable caption={section.heading}>
                        <thead>
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} scope="col">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rowIndex) => (
                            <tr key={`${section.id}-${rowIndex}`}>
                              {row.map((cell, cellIndex) =>
                                cellIndex === 0 ? (
                                  <th key={cell} scope="row">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={`${cell}-${cellIndex}`}>{cell}</td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </ResponsiveTable>
                    ) : null}
                    {section.callout ? (
                      <Callout
                        title={section.callout.title}
                        variant={calloutVariants[section.callout.type]}
                      >
                        <p>{section.callout.body}</p>
                      </Callout>
                    ) : null}
                    {section.image ? (
                      <figure className="article-section-image">
                        <Image
                          alt={section.image.alt}
                          height={900}
                          loading="lazy"
                          sizes="(max-width: 900px) 100vw, 760px"
                          src={section.image.src}
                          width={1200}
                        />
                        <figcaption>{section.image.caption}</figcaption>
                      </figure>
                    ) : null}
                    </section>
                    {inlinePlacement && routeHasPlacement(page.route, inlinePlacement) ? (
                      <AdSlot
                        key={`${inlinePlacement}:${page.route}`}
                        pathname={page.route}
                        placement={inlinePlacement}
                      />
                    ) : null}
                  </Fragment>
                );
              })}

              {page.faqs.length > 0 ? (
                <section id="faq">
                  <p className="section-kicker">Direct answers</p>
                  <h2>Frequently asked questions</h2>
                  <FaqList items={page.faqs} />
                </section>
              ) : null}

              <SourceList sourceIds={page.sourceIds} />
            </div>

            <aside className="article-sidebar" aria-label="Page contents">
              {hasLongSidebar ? (
                <AdSlot pathname={page.route} placement="sidebar_160x600" />
              ) : hasShortSidebar ? (
                <AdSlot pathname={page.route} placement="sidebar_160x300" />
              ) : null}
              <div className="article-toc">
                <p className="section-kicker">On this page</p>
                <nav>
                  {page.sections.map((section, index) => (
                    <Link href={`#${section.id}`} key={section.id}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {section.heading}
                    </Link>
                  ))}
                  {page.faqs.length > 0 ? <Link href="#faq">FAQ</Link> : null}
                </nav>
              </div>
              {hasLongSidebar && hasShortSidebar ? (
                <AdSlot pathname={page.route} placement="sidebar_160x300" />
              ) : null}
            </aside>
          </div>

          <RelatedGuides items={page.related} />
        </Container>
      </article>
    </>
  );
}
