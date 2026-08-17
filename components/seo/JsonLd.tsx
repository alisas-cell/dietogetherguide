import type { JsonLdObject } from '../../lib/seo/schema';

function serialize(schema: JsonLdObject): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

export function JsonLd({ schemas }: { schemas: JsonLdObject[] }) {
  return schemas.map((schema, index) => (
    <script
      dangerouslySetInnerHTML={{ __html: serialize(schema) }}
      key={`${String(schema['@type'])}-${index}`}
      type="application/ld+json"
    />
  ));
}
