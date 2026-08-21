'use client';

import { useSyncExternalStore } from 'react';

import { isIntentionalAdQaSession, isMonetizedPublicRoute } from './ad-config';

function subscribeToQaSession() {
  return () => undefined;
}

export function useIntentionalAdQaSession(pathname: string): boolean {
  return useSyncExternalStore(
    subscribeToQaSession,
    () =>
      isIntentionalAdQaSession(document.cookie) && isMonetizedPublicRoute(pathname),
    () => false,
  );
}
