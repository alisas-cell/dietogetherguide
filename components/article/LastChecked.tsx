export function LastChecked({
  date = 'Aug 17, 2026',
  context = 'Pre-Early Access evidence',
}: {
  date?: string;
  context?: string;
}) {
  return (
    <p className="last-checked">
      <span aria-hidden="true" className="status-pulse" />
      Last checked {date} <span aria-hidden="true">·</span> {context}
    </p>
  );
}
