'use client';

import { usePrivacyConsent } from './ConsentProvider';

export function PrivacyChoices() {
  const { openChoices } = usePrivacyConsent();

  return (
    <button
      className="footer-privacy-button"
      onClick={(event) => openChoices(event.currentTarget)}
      type="button"
    >
      Privacy Choices
    </button>
  );
}
