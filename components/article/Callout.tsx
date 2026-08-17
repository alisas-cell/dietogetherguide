import type { ReactNode } from 'react';

const labels = {
  note: 'Field note',
  build: 'Build check',
  danger: 'Danger',
};

export function Callout({
  variant = 'note',
  title,
  children,
}: {
  variant?: keyof typeof labels;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="callout" data-variant={variant}>
      <p className="callout-label">{title ?? labels[variant]}</p>
      <div>{children}</div>
    </aside>
  );
}
