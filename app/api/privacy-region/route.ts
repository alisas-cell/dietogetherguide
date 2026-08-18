import { requiresAdvertisingConsent } from '../../../lib/privacy/region';

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  return Response.json(
    {
      requiresConsent: requiresAdvertisingConsent(
        request.headers.get('x-vercel-ip-country'),
      ),
    },
    {
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        Vary: 'X-Vercel-IP-Country',
      },
    },
  );
}
