import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Die Together Guide',
    short_name: 'DT Guide',
    description:
      'Independent source-checked field guide for Last Pirates: Die Together.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071014',
    theme_color: '#071014',
    lang: 'en',
    icons: [
      {
        src: '/brand/field-guide-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
