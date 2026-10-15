export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-primary to-secondary text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 25%, rgba(201,151,43,0.35), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.14), transparent 38%)',
        }}
      />
      <div className="container relative py-14 md:py-20 text-center animate-fade-up">
        {eyebrow && (
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.22em] mb-3">{eyebrow}</p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <div className="mx-auto my-5 h-0.5 w-16 rounded bg-accent" />
        {description && <p className="text-white/80 max-w-2xl mx-auto text-lg">{description}</p>}
      </div>
    </section>
  );
}
