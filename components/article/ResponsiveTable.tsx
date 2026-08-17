import type { ReactNode } from 'react';

export function ResponsiveTable({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="table-shell" role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption>{caption}</caption>
        {children}
      </table>
    </div>
  );
}
