import { AdsterraNative } from './AdsterraNative';
import { AdsterraResponsiveBanner } from './AdsterraResponsiveBanner';

export type AdPlacement = 'article_mid' | 'responsive_banner';

export function AdSlot({
  pathname,
  placement,
}: {
  pathname: string;
  placement: AdPlacement;
}) {
  return placement === 'article_mid' ? (
    <AdsterraNative pathname={pathname} />
  ) : (
    <AdsterraResponsiveBanner pathname={pathname} />
  );
}
