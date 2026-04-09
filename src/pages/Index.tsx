import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Phone, ChevronRight, Star, CheckCircle2,
} from "lucide-react";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import heroImg from "@/assets/hero-truck.jpg";
import fleetImg from "@/assets/fleet-trucks.jpg";

const Index = () => {
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: publicApi.getServices });
  const { data: stats = [] } = useQuery({ queryKey: ["stats"], queryFn: publicApi.getStats });
  const { data: reasons = [] } = useQuery({ queryKey: ["whyChooseUs"], queryFn: publicApi.getWhyChooseUs });
  const { data: testimonials = [] } = useQuery({ queryKey: ["testimonials"], queryFn: publicApi.getTestimonials });
  const { data: hero = [] } = useQuery({ queryKey: ["hero"], queryFn: publicApi.getHero });

  const heroData = hero[0];
  const featuredServices = services.filter((s: any) => s.is_featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="dark relative min-h-[100vh] flex items-center overflow-hidden bg-[#0B0F19] text-white">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Semi truck on highway at dusk" className="w-full h-full object-cover scale-105" width={1920} height={1080} />
          <div className="absolute inset-0 hero-overlay-x" />
          <div className="absolute inset-0 hero-overlay-y" />
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-primary text-sm font-medium mb-8 animate-fade-up">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Licensed & Insured Carrier
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 animate-fade-up animation-delay-200">
              {heroData ? (
                <>
                  {heroData.title.split("Across the USA")[0]}
                  <br className="hidden sm:block" />
                  <span className="text-gradient">Across the USA</span>
                </>
              ) : (
                <>Reliable Trucking <br className="hidden sm:block" />Services <span className="text-gradient">Across the USA</span></>
              )}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed animate-fade-up animation-delay-400">
              {heroData?.subtitle || "Fast, safe, and on-time freight delivery you can trust. Davr Group LLC — your dependable partner for interstate logistics."}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-600">
              <Link to="/quote">
                <Button size="lg" className="gap-2 h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  {heroData?.button_text || "Get a Free Quote"} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base border-white/20 text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" /> Contact Us
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-12 animate-fade-up animation-delay-800">
              {["Licensed & Insured", "GPS Tracked Fleet", "48 State Coverage"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 hero-bottom-fade" />
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s: any, i: number) => {
              const Icon = getIcon(s.icon);
              return (
                <div key={s.id} className={`relative p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl text-center group hover:border-primary/30 transition-all duration-500 animate-fade-up animation-delay-${(i + 1) * 100}`}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{s.value}{s.suffix}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              What We Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Our <span className="text-gradient">Services</span></h2>
            <p className="text-muted-foreground text-lg">From full truckloads to expedited shipping — we move your freight safely and on time.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((s: any) => {
              const Icon = getIcon(s.icon);
              return (
                <div key={s.id} className="group relative p-7 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-primary/5 to-transparent" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" className="gap-2 border-border/50 hover:border-primary/30 hover:bg-primary/5">
                View All Services <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
              Why Davr Group
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Why Choose <span className="text-gradient-blue">Us</span></h2>
            <p className="text-muted-foreground text-lg">We may be small, but our commitment to quality and reliability is second to none.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r: any) => {
              const Icon = getIcon(r.icon);
              return (
                <div key={r.id} className="group text-center p-8 rounded-2xl border border-border/30 bg-card/30 hover:bg-card/60 hover:border-secondary/20 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/15 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-secondary mb-1">{r.stat_value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-4">{r.stat_label}</div>
                  <h3 className="font-bold text-lg mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">Our Fleet</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Well-Maintained <span className="text-gradient">Equipment</span></h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                Our fleet of trucks is regularly serviced and equipped with GPS tracking for real-time shipment visibility. Every vehicle meets the highest safety standards.
              </p>
              <div className="space-y-4 mb-10">
                {["Well-maintained trucks", "GPS tracking on all vehicles", "Regular maintenance schedule", "DOT compliant equipment"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/fleet">
                <Button variant="outline" className="gap-2 border-border/50 hover:border-primary/30">View Our Fleet <ChevronRight className="h-4 w-4" /></Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/50">
                <img src={fleetImg} alt="Davr Group fleet of trucks" className="w-full h-auto" loading="lazy" width={1280} height={720} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-background/60" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium border border-primary/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> GPS Tracked
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 backdrop-blur-sm text-secondary text-xs font-medium border border-secondary/30">
                      DOT Compliant
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">Trusted by Partners</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-5">What Our <span className="text-gradient">Partners</span> Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.slice(0, 2).map((t: any) => (
                <div key={t.id} className="p-8 rounded-2xl border border-border/50 bg-card/50">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}{t.company ? `, ${t.company}` : ""}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Ready to <span className="text-gradient">Ship?</span></h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">Get a free quote today. We'll get your freight moving quickly, safely, and at a competitive rate.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" className="gap-2 h-12 px-8 text-base shadow-lg shadow-primary/25">
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base border-border hover:bg-muted/50">Contact Us</Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-6">No obligation. We typically respond within 2 hours during business hours.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
