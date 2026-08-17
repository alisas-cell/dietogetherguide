export interface FaqEntry {
  question: string;
  answer: string;
}

export function FaqList({ items }: { items: FaqEntry[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
