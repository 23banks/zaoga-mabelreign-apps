export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
      {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}
