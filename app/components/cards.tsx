export type Metric = {
  label: string;
  value: string | number;
  helper: string;
  trend?: string;
};

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
  const renderIcon = () => {
    switch (metric.trend) {
      case "flame":
        return (
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        );
      case "trophy":
        return (
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case "chart":
        return (
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "book":
        return (
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "refresh":
        return (
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <article className="rounded-[2rem] border border-emerald-950/10 bg-white/75 p-6 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
      <div className="absolute top-6 right-6 opacity-20">{renderIcon()}</div>
      <p className="text-sm font-bold text-emerald-950/55">{metric.label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-emerald-950 flex items-center gap-2">
        {metric.value}
        {metric.trend && metric.trend.startsWith("Objectif") && (
          <span className="text-sm font-bold text-emerald-900/50 bg-emerald-50 px-2 py-1 rounded-lg ml-2">{metric.trend}</span>
        )}
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
