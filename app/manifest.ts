import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Die Together Wiki',
    short_name: 'DT Wiki',
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
