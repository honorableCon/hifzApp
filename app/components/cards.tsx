import type { Metric } from "../data";

export function SectionTitle({
  kicker,
  title,
  description,
  inverted = false,
}: {
  kicker: string;
  title: string;
  description?: string;
  inverted?: boolean;
}) {
  return (
    <div className="mb-8">
      <p
        className={`text-sm font-black uppercase tracking-[0.28em] ${
          inverted ? "text-amber-300" : "text-amber-700"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`mt-3 text-3xl font-black tracking-tight md:text-4xl ${
          inverted ? "text-emerald-50" : "text-emerald-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 max-w-2xl text-base leading-7 ${
            inverted ? "text-emerald-50/70" : "text-emerald-950/65"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="rounded-[2rem] border border-emerald-950/10 bg-white/75 p-6 shadow-xl shadow-emerald-950/5">
      <p className="text-sm font-bold text-emerald-950/55">{metric.label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
        {metric.value}
      </p>
      <p className="mt-2 text-sm font-medium text-emerald-800">
        {metric.helper}
      </p>
    </article>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[2rem] border border-emerald-950/10 bg-white/70 p-6 shadow-xl shadow-emerald-950/5 transition hover:-translate-y-1 hover:bg-white">
      <span className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-2xl">
        {icon}
      </span>
      <h3 className="mt-5 text-xl font-black text-emerald-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-emerald-950/65">
        {description}
      </p>
    </article>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[2rem] border border-emerald-950/10 bg-white/75 p-6 shadow-xl shadow-emerald-950/5 ${className}`}
    >
      {children}
    </section>
  );
}
