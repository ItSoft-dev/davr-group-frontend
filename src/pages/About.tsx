import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import aboutHeroImage from "@/assets/about-img.jpg";

const About = () => {
  const { data: values = [] } = useQuery({ queryKey: ["values"], queryFn: publicApi.getValues });
  const { data: stats = [] } = useQuery({ queryKey: ["stats"], queryFn: publicApi.getStats });
  const { data: timeline = [] } = useQuery({ queryKey: ["timeline"], queryFn: publicApi.getTimeline });
  const { data: companyInfo = [] } = useQuery({ queryKey: ["companyInfo"], queryFn: publicApi.getCompanyInfo });

  const getInfo = (key: string) => companyInfo.find((c: any) => c.key === key)?.value || "";

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">About Us</div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
                A Small Company With <span className="text-gradient">Big Reliability</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
                {getInfo("about_description") || "Davr Group LLC is a Saint Louis–based trucking company specializing in interstate freight transportation across the United States."}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {getInfo("about_mission") || "Our mission is to be the most reliable trucking partner for businesses across America."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/quote"><Button className="gap-2 h-11 px-6 shadow-lg shadow-primary/20">Request a Quote <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link to="/contact"><Button variant="outline" className="gap-2 h-11 px-6 border-border/50">Contact Us</Button></Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/50">
                <img src={aboutHeroImage} alt="Truck on highway" className="w-full h-auto object-cover scale-110" loading="lazy" width={1280} height={720} />
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Our Values</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">What <span className="text-gradient-blue">Drives</span> Us</h2>
            <p className="text-muted-foreground text-lg">Our core values shape every delivery we make and every relationship we build.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v: any, i: number) => {
              const Icon = getIcon(v.icon);
              const color = i % 2 === 0 ? "primary" : "secondary";
              return (
                <div key={v.id} className="group flex gap-5 p-7 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-primary/20 transition-all duration-500">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 bg-${color}/10 group-hover:bg-${color}/15`}>
                    <Icon className={`h-7 w-7 text-${color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">Our Journey</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Our <span className="text-gradient">Story</span></h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((t: any, i: number) => (
              <div key={t.id} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent mt-2" />}
                </div>
                <div className="pb-8">
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{t.year}</div>
                  <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.description}</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s: any) => {
              const Icon = getIcon(s.icon);
              return (
                <div key={s.id} className="group text-center p-8 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-primary/20 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-1">{s.value}{s.suffix}</div>
                  <div className="text-sm font-semibold mb-1">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
