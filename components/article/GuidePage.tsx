import Image from 'next/image';
import Link from 'next/link';

import type { GuidePageData } from '../../content';
import { buildGuideSchemas } from '../../lib/seo/schema';
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

export function GuidePage({ page }: { page: GuidePageData }) {
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

          <EvidenceBanner confidence={page.confidence} context={page.buildContext}>
            Build-sensitive details are labeled. Pending fields are not rendered as affirmative answers.
          </EvidenceBanner>

          <div className="article-layout">
            <div className="article-body">
              {page.sections.map((section) => (
                <section id={section.id} key={section.id}>
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
                        <a href={link.href} key={link.href} rel="noopener noreferrer">
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
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
                </section>
              ))}

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
              <div>
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
            </aside>
          </div>

          <RelatedGuides items={page.related} />
        </Container>
      </article>
    </>
  );
}
