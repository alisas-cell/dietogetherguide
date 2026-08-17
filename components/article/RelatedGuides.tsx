import Link from 'next/link';

export interface RelatedGuide {
  href: string;
  label: string;
  description: string;
}

export function RelatedGuides({ items }: { items: RelatedGuide[] }) {
  return (
    <nav className="related-guides" aria-label="Related guides">
      <p className="section-kicker">Continue the field guide</p>
      <div className="related-grid">
        {items.map((item) => (
          <Link href={item.href} key={item.href}>
            <strong>{item.label}</strong>
            <span>{item.description}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
