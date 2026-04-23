import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import aboutHeroImage from "@/assets/2.png";

const valuesPanelImage =
  "https://www.cittimagazine.co.uk/wp-content/uploads/2023/09/image-039-4.jpg";

const metricStyles = [
  {
    panel:
      "from-emerald-500/12 via-emerald-500/4 to-transparent dark:from-emerald-500/14 dark:via-emerald-500/5 dark:to-transparent",
    glow: "bg-emerald-400/14 dark:bg-emerald-400/18",
    icon: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/15 dark:bg-emerald-400/12 dark:text-emerald-300 dark:ring-emerald-400/15",
    value: "text-emerald-600 dark:text-emerald-300",
    note: "Fleet ready today",
  },
  {
    panel:
      "from-sky-500/12 via-sky-500/4 to-transparent dark:from-sky-500/14 dark:via-sky-500/5 dark:to-transparent",
    glow: "bg-sky-400/14 dark:bg-sky-400/18",
    icon: "bg-sky-500/10 text-sky-600 ring-sky-500/15 dark:bg-sky-400/12 dark:text-sky-300 dark:ring-sky-400/15",
    value: "text-sky-600 dark:text-sky-300",
    note: "Experienced operators",
  },
  {
    panel:
      "from-cyan-500/12 via-cyan-500/4 to-transparent dark:from-cyan-500/14 dark:via-cyan-500/5 dark:to-transparent",
    glow: "bg-cyan-400/14 dark:bg-cyan-400/18",
    icon: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/15 dark:bg-cyan-400/12 dark:text-cyan-300 dark:ring-cyan-400/15",
    value: "text-cyan-600 dark:text-cyan-300",
    note: "Nationwide reach",
  },
  {
    panel:
      "from-violet-500/12 via-violet-500/4 to-transparent dark:from-violet-500/14 dark:via-violet-500/5 dark:to-transparent",
    glow: "bg-violet-400/14 dark:bg-violet-400/18",
    icon: "bg-violet-500/10 text-violet-600 ring-violet-500/15 dark:bg-violet-400/12 dark:text-violet-300 dark:ring-violet-400/15",
    value: "text-violet-600 dark:text-violet-300",
    note: "Reliability tracked",
  },
];

const valueCardStyles = [
  {
    border: "border-emerald-500/20 dark:border-emerald-400/15",
    glow: "bg-emerald-400/14 dark:bg-emerald-400/18",
    icon: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20 dark:bg-emerald-400/12 dark:text-emerald-300 dark:ring-emerald-400/20",
    badge: "text-emerald-600 dark:text-emerald-300",
  },
  {
    border: "border-sky-500/20 dark:border-sky-400/15",
    glow: "bg-sky-400/14 dark:bg-sky-400/18",
    icon: "bg-sky-500/10 text-sky-500 ring-sky-500/20 dark:bg-sky-400/12 dark:text-sky-300 dark:ring-sky-400/20",
    badge: "text-sky-600 dark:text-sky-300",
  },
  {
    border: "border-cyan-500/20 dark:border-cyan-400/15",
    glow: "bg-cyan-400/14 dark:bg-cyan-400/18",
    icon: "bg-cyan-500/10 text-cyan-500 ring-cyan-500/20 dark:bg-cyan-400/12 dark:text-cyan-300 dark:ring-cyan-400/20",
    badge: "text-cyan-600 dark:text-cyan-300",
  },
  {
    border: "border-violet-500/20 dark:border-violet-400/15",
    glow: "bg-violet-400/14 dark:bg-violet-400/18",
    icon: "bg-violet-500/10 text-violet-500 ring-violet-500/20 dark:bg-violet-400/12 dark:text-violet-300 dark:ring-violet-400/20",
    badge: "text-violet-600 dark:text-violet-300",
  },
];

const About = () => {
  const { data: values = [] } = useQuery({
    queryKey: ["values"],
    queryFn: publicApi.getValues,
  });
  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: publicApi.getStats,
  });
  const { data: timeline = [] } = useQuery({
    queryKey: ["timeline"],
    queryFn: publicApi.getTimeline,
  });
  const { data: companyInfo = [] } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: publicApi.getCompanyInfo,
  });

  const getInfo = (key: string) =>
    companyInfo.find((c: any) => c.key === key)?.value || "";

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                About Us
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
                A Small Company With{" "}
                <span className="text-gradient">Big Reliability</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
                {getInfo("about_description") ||
                  "DAVR GROUP LLC is a trucking company based at 707 Lepere Ave Apt H, Saint Louis, MO 63132, USA, specializing in interstate freight transportation across the United States."}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {getInfo("about_mission") ||
                  "Our mission is to be the most reliable trucking partner for businesses across America."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/quote">
                  <Button className="gap-2 h-11 px-6 shadow-lg shadow-primary/20">
                    Request a Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="gap-2 h-11 px-6 border-border/50"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/50">
                <img
                  src={aboutHeroImage}
                  alt="Truck on highway"
                  className="w-full h-auto object-cover scale-110"
                  loading="lazy"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 section-gradient" />
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
              Our Values
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              What <span className="text-gradient-blue">Drives</span> Us
            </h2>
            <p className="text-muted-foreground text-lg">
              Our core values shape every delivery we make and every
              relationship we build.
            </p>
          </div>
          <div className="max-w-5xl mx-auto mb-12 md:mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-stretch rounded-[32px] border border-border/50 bg-card/30 overflow-hidden">
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Built On Trust
                  </div>
                  <h3 className="mt-5 text-2xl md:text-3xl font-bold leading-tight max-w-md">
                    Every load reflects the standards we expect from our own
                    team.
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                    From driver communication to equipment readiness and on-time
                    performance, we focus on the details that make freight
                    partnerships last.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
                  {[
                    "Driver-focused service",
                    "Clear communication",
                    "Reliable execution",
                    "Nationwide coverage",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border/50 bg-background/40 px-4 py-3 text-sm font-medium text-foreground/90 backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 md:p-6 lg:p-7">
                <div className="relative min-h-[300px] h-full overflow-hidden rounded-[28px] border border-border/50 bg-background/40">
                  <img
                    src={valuesPanelImage}
                    alt="Truck driving on the highway"
                    className="h-full w-full object-cover scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-10 md:gap-12 max-w-[90rem] mx-auto sm:pb-12">
            {values.map((v: any, i: number) => {
              const Icon = getIcon(v.icon);
              const style = valueCardStyles[i % valueCardStyles.length];
              const cardMotionClass =
                i % 2 === 1
                  ? "sm:translate-y-12 sm:hover:translate-y-7"
                  : "hover:-translate-y-4";
              return (
                <div
                  key={v.id}
                  className={`group relative overflow-hidden rounded-[28px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 transition-all duration-500 ${cardMotionClass} hover:shadow-[0_20px_44px_rgba(0,0,0,0.18)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] ${style.border}`}
                >
                  <div
                    className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl ${style.glow}`}
                  />
                  <div className="absolute right-5 top-4 text-[64px] font-black leading-none text-white/[0.04] transition-transform duration-500 group-hover:scale-110">
                    0{i + 1}
                  </div>
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${style.icon}`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <div
                        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${style.badge}`}
                      >
                        Core Value
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold tracking-tight text-foreground">
                        {v.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {v.description}
                      </p>
                    </div>
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                    <div className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
                      Trusted in every shipment
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Our <span className="text-gradient">Story</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((t: any, i: number) => (
              <div key={t.id} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                    {t.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,251,0.96))] shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,40,0.96),rgba(10,16,30,0.96))] dark:shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative overflow-hidden border-b border-slate-200/80 p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10 dark:border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_32%)]" />
                <div className="absolute -right-16 top-10 h-40 w-40 rounded-full border border-slate-200/70 dark:border-white/10" />
                <div className="absolute -right-8 top-18 h-24 w-24 rounded-full border border-slate-200/70 dark:border-white/10" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Live Metrics
                  </div>
                  <h3 className="mt-5 max-w-md text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 dark:text-white">
                    Built on performance. Proven by results.
                  </h3>
                  <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-slate-600 dark:text-white/65">
                    Our numbers reflect real operational strength: fleet
                    readiness, driver capacity, coverage reach, and on-time
                    delivery consistency.
                  </p>
                  <div className="mt-8 grid max-w-sm grid-cols-2 gap-3">
                    {[
                      "Dispatch ready",
                      "DOT aligned",
                      "48-state lanes",
                      "Tracked service",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60 dark:shadow-none"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-2 md:p-5 lg:p-6">
                {stats.map((s: any, i: number) => {
                  const Icon = getIcon(s.icon);
                  const style = metricStyles[i % metricStyles.length];
                  return (
                    <div
                      key={s.id}
                      className={`group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br ${style.panel} bg-white/70 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-transparent dark:shadow-none dark:hover:border-white/15 dark:hover:shadow-2xl`}
                    >
                      <div
                        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl ${style.glow}`}
                      />
                      <div className="absolute right-4 top-3 text-[72px] font-black leading-none text-slate-900/[0.05] transition-transform duration-500 group-hover:scale-110 dark:text-white/[0.04]">
                        0{i + 1}
                      </div>
                      <div className="relative">
                        <div
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${style.icon}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div
                          className={`mt-10 text-4xl md:text-5xl font-bold leading-none ${style.value}`}
                        >
                          {s.value}
                          {s.suffix}
                        </div>
                        <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
                          {s.label}
                        </div>
                        <div className="mt-6 h-px w-full bg-gradient-to-r from-slate-300 to-transparent dark:from-white/10" />
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-white/62">
                          {style.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


