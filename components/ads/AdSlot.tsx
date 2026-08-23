import { isBannerPlacement, type AdPlacement } from './ad-config';
import { AdsterraBanner } from './AdsterraBanner';
import { AdsterraNative } from './AdsterraNative';
import { SponsoredSmartlink } from './SponsoredSmartlink';

export function AdSlot({
  pathname,
  placement,
}: {
  pathname: string;
  placement: AdPlacement;
}) {
  if (placement === 'native_primary') {
    return <AdsterraNative pathname={pathname} />;
  }
  if (placement === 'smartlink_primary') {
    return <SponsoredSmartlink pathname={pathname} />;
  }
  if (isBannerPlacement(placement)) {
    return <AdsterraBanner pathname={pathname} placement={placement} />;
  }
  return null;
}
