'use client';

import { usePathname } from 'next/navigation';

import { AdDebugPanel } from './AdDebugPanel';
import { AdsterraGlobals } from './AdsterraGlobals';

export function MonetizationRuntime() {
  const pathname = usePathname();

  return (
    <>
      <AdsterraGlobals pathname={pathname} />
      <AdDebugPanel pathname={pathname} />
    </>
  );
}
