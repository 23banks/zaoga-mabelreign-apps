export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <p className="text-accent font-semibold text-xs uppercase tracking-[0.22em] mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-ink">{title}</h2>
      <div className="mx-auto my-4 h-0.5 w-14 rounded bg-accent" />
      {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}
