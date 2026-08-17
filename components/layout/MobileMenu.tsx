'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { primaryNavigation, utilityNavigation } from './navigation';

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="menu-trigger"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <span>Menu</span>
        <span className="menu-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <div className="mobile-menu-backdrop" onMouseDown={() => setOpen(false)}>
          <div
            id="mobile-navigation"
            ref={dialogRef}
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mobile-menu-head">
              <p>
                <span>Expedition index</span>
                <strong>Die Together Guide</strong>
              </p>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Primary mobile navigation">
              <p className="nav-group-label">Field guide</p>
              {primaryNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
              <p className="nav-group-label">Briefing room</p>
              {utilityNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
            <p className="mobile-menu-note">Independent, source-checked fan field guide.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
