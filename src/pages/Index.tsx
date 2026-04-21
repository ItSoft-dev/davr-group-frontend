import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Phone, ChevronRight, Star, CheckCircle2,
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import { formatPhoneDisplay, formatPhoneHref } from "@/lib/utils";
import heroImg from "@/assets/hero-truck.jpg";

const fleetPreviewImage = "https://t4.ftcdn.net/jpg/08/28/48/99/360_F_828489997_RRqV41sukqs6K7LzMVlD1nYhl7xvaAtC.jpg";

const serviceVisuals = [
  "https://i.pinimg.com/originals/c4/7f/87/c47f87544d5f38f31dd12e1b93223b06.jpg?nii=t",
  "https://www.i2290.com/wp-content/uploads/2023/03/trucking-lease-agreement-scaled.jpeg",
  "https://t3.ftcdn.net/jpg/11/26/72/54/360_F_1126725414_NJ2NOn4tP6Y5stMqYONRwqJfGDtRZ6Ua.jpg",
  "https://www.freightwaves.com/wp-content/uploads/2020/05/USA_Truck_earnings_050720_1-1.jpg",
];

const metricStyles = [
  {
    panel: "from-emerald-500/12 via-emerald-500/4 to-transparent dark:from-emerald-500/14 dark:via-emerald-500/5 dark:to-transparent",
    glow: "bg-emerald-400/14 dark:bg-emerald-400/18",
    icon: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/15 dark:bg-emerald-400/12 dark:text-emerald-300 dark:ring-emerald-400/15",
    value: "text-emerald-600 dark:text-emerald-300",
    note: "Fleet ready today",
  },
  {
    panel: "from-sky-500/12 via-sky-500/4 to-transparent dark:from-sky-500/14 dark:via-sky-500/5 dark:to-transparent",
    glow: "bg-sky-400/14 dark:bg-sky-400/18",
    icon: "bg-sky-500/10 text-sky-600 ring-sky-500/15 dark:bg-sky-400/12 dark:text-sky-300 dark:ring-sky-400/15",
    value: "text-sky-600 dark:text-sky-300",
    note: "Experienced operators",
  },
  {
    panel: "from-cyan-500/12 via-cyan-500/4 to-transparent dark:from-cyan-500/14 dark:via-cyan-500/5 dark:to-transparent",
    glow: "bg-cyan-400/14 dark:bg-cyan-400/18",
    icon: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/15 dark:bg-cyan-400/12 dark:text-cyan-300 dark:ring-cyan-400/15",
    value: "text-cyan-600 dark:text-cyan-300",
    note: "Nationwide reach",
  },
  {
    panel: "from-violet-500/12 via-violet-500/4 to-transparent dark:from-violet-500/14 dark:via-violet-500/5 dark:to-transparent",
    glow: "bg-violet-400/14 dark:bg-violet-400/18",
    icon: "bg-violet-500/10 text-violet-600 ring-violet-500/15 dark:bg-violet-400/12 dark:text-violet-300 dark:ring-violet-400/15",
    value: "text-violet-600 dark:text-violet-300",
    note: "Reliability tracked",
  },
];

const fallbackTestimonials = [
  { id: "fallback-1", name: "Michael Chen", role: "Logistics Manager", company: "Pacific Logistics", content: "Davr Group has been our go-to carrier for the past year.", rating: 5 },
  { id: "fallback-2", name: "Sarah Williams", role: "Operations Director", company: "Midwest Distributors", content: "Working with Davr Group has streamlined our shipping operations.", rating: 5 },
  { id: "fallback-3", name: "Daniel Carter", role: "Freight Coordinator", company: "RouteSpan Inc.", content: "They communicate clearly, show up on schedule, and keep every load moving.", rating: 5 },
  { id: "fallback-4", name: "Olivia Brooks", role: "Supply Chain Lead", company: "Heartland Foods", content: "Fast response times and dependable service made them easy to trust quickly.", rating: 5 },
  { id: "fallback-5", name: "James Walker", role: "Shipping Supervisor", company: "Blue Ridge Supply", content: "Their team handles urgent shipments calmly and professionally every single time.", rating: 5 },
  { id: "fallback-6", name: "Emily Foster", role: "Warehouse Manager", company: "NorthPoint Retail", content: "Reliable pickups and clean communication helped us reduce delivery stress.", rating: 5 },
  { id: "fallback-7", name: "Kevin Mitchell", role: "Dispatch Partner", company: "InterState Cargo", content: "Davr Group feels like an extension of our own operations team.", rating: 5 },
  { id: "fallback-8", name: "Rachel Adams", role: "Procurement Manager", company: "Summit Wholesale", content: "Consistent performance and courteous drivers made a strong impression on our team.", rating: 5 },
];

const Index = () => {
  const [testimonialApi, setTestimonialApi] = useState<CarouselApi>();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: publicApi.getServices });
  const { data: stats = [] } = useQuery({ queryKey: ["stats"], queryFn: publicApi.getStats });
  const { data: reasons = [] } = useQuery({ queryKey: ["whyChooseUs"], queryFn: publicApi.getWhyChooseUs });
  const { data: testimonials = [] } = useQuery({ queryKey: ["testimonials"], queryFn: publicApi.getTestimonials });
  const { data: hero = [] } = useQuery({ queryKey: ["hero"], queryFn: publicApi.getHero });
  const { data: companyInfo = [] } = useQuery({ queryKey: ["companyInfo"], queryFn: publicApi.getCompanyInfo });

  const heroData = hero[0];
  const featuredServices = services.filter((s: any) => s.is_featured).slice(0, 4);
  const rawPhone = companyInfo.find((item: any) => item.key === "phone")?.value;
  const phone = formatPhoneDisplay(rawPhone);
  const phoneHref = formatPhoneHref(rawPhone);
  const testimonialItems = [...testimonials, ...fallbackTestimonials].slice(0, Math.max(8, testimonials.length));

  useEffect(() => {
    if (!testimonialApi) {
      return;
    }

    const handleSelect = () => {
      setTestimonialIndex(testimonialApi.selectedScrollSnap());
    };

    handleSelect();
    testimonialApi.on("select", handleSelect);
    testimonialApi.on("reInit", handleSelect);

    return () => {
      testimonialApi.off("select", handleSelect);
    };
  }, [testimonialApi]);

  useEffect(() => {
    if (!testimonialApi || isTestimonialPaused) {
      return;
    }

    const autoplay = window.setInterval(() => {
      testimonialApi.scrollNext();
    }, 2800);

    return () => {
      window.clearInterval(autoplay);
    };
  }, [testimonialApi, isTestimonialPaused]);

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
              {heroData?.subtitle || "Fast, safe, and on-time freight delivery you can trust. DAVR GROUP LLC — your dependable partner for interstate logistics."}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-600">
              <Link to="/quote">
                <Button size="lg" className="gap-2 h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  <Phone className="h-4 w-4" /> Get a Quote
                </Button>
              </Link>
              <a href={`tel:${phoneHref}`}>
                <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base border-white/20 text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" /> {phone}
                </Button>
              </a>
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
                  <h3 className="mt-5 max-w-md text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 dark:text-white">Built for visible momentum, not just numbers on a card.</h3>
                  <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-slate-600 dark:text-white/65">These metrics show what the operation looks like in motion: available equipment, driver depth, service footprint, and delivery consistency.</p>
                  <div className="mt-8 grid grid-cols-2 gap-3 max-w-sm">
                    {[
                      "Dispatch ready",
                      "DOT aligned",
                      "48-state lanes",
                      "Tracked service",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60 dark:shadow-none">
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
                      <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl ${style.glow}`} />
                      <div className="absolute right-4 top-3 text-[72px] font-black leading-none text-slate-900/[0.05] transition-transform duration-500 group-hover:scale-110 dark:text-white/[0.04]">0{i + 1}</div>
                      <div className="relative">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${style.icon}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className={`mt-10 text-4xl md:text-5xl font-bold leading-none ${style.value}`}>{s.value}{s.suffix}</div>
                        <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">{s.label}</div>
                        <div className="mt-6 h-px w-full bg-gradient-to-r from-slate-300 to-transparent dark:from-white/10" />
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-white/62">{style.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-16 lg:gap-x-8 lg:gap-y-20">
            {featuredServices.map((s: any, index: number) => {
              const Icon = getIcon(s.icon);
              const image = serviceVisuals[index % serviceVisuals.length];
              return (
                <div key={s.id} className="group relative pt-32 md:pt-36 transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute right-2 top-7 z-20 w-[64%] min-w-[270px] max-w-[420px] -translate-y-1 rotate-[2deg] transition-transform duration-500 group-hover:-translate-y-5 group-hover:rotate-0 md:right-4 md:top-8">
                    <div className="overflow-hidden rounded-[26px] border border-white/15 bg-white/5 p-2 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                      <img src={image} alt={s.title} className="h-64 w-full rounded-[20px] object-cover md:h-72 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                  </div>
                  <div className="absolute inset-x-6 top-16 h-28 rounded-[32px] bg-primary/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative rounded-[32px] border border-border/50 bg-card/50 p-7 pt-36 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 md:p-8 md:pt-40">
                    <div className="absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                    <div className="relative flex min-h-[280px] flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-[20px] bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="font-bold text-xl md:text-[1.4rem] mb-2 tracking-tight">{s.title}</h3>
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-md pr-6">{s.description}</p>
                      </div>
                      <div className="mt-8 flex items-center justify-between gap-4 rounded-[22px] border border-border/40 bg-background/50 px-4 py-3 backdrop-blur-sm">
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">USA Freight</div>
                          <div className="text-sm font-medium text-foreground">48-state coverage</div>
                        </div>
                        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-wide uppercase">
                          Learn more <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
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
                <img src={fleetPreviewImage} alt="Davr Group fleet of trucks" className="w-full h-auto" loading="lazy" width={1280} height={720} />
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
      <section className="py-24 md:py-32 relative overflow-visible">
        <div className="absolute inset-0 section-gradient" />
        <div className="w-[90%] mx-auto relative">
          <div className="w-full max-w-none mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">Trusted by Partners</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-5">What Our <span className="text-gradient">Partners</span> Say</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg">Swipe through a broader mix of partner feedback from daily freight coordination, dispatch, and retail logistics teams.</p>
            </div>

            <Carousel
              setApi={setTestimonialApi}
              opts={{ align: "start", loop: true }}
              className="px-2 pt-3 pb-8 md:px-14"
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
            >
              <CarouselContent className="pt-2 pb-4">
                {testimonialItems.map((t: any) => (
                  <CarouselItem key={t.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="group flex h-full min-h-[330px] flex-col rounded-[28px] border border-border/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex gap-1.5">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">Verified</span>
                      </div>
                      <div className="mb-4 h-px w-full bg-gradient-to-r from-primary/20 via-border/50 to-transparent" />
                      <p className="flex-1 text-[15px] leading-7 text-muted-foreground italic">"{t.content}"</p>
                      <div className="mt-6 rounded-[20px] border border-border/40 bg-background/40 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm ring-1 ring-primary/10">
                          {t.name[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-sm leading-tight">{t.name}</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">{t.role}{t.company ? `, ${t.company}` : ""}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 top-[44%] hidden h-11 w-11 border-border/60 bg-background/85 backdrop-blur md:flex" />
              <CarouselNext className="right-0 top-[44%] hidden h-11 w-11 border-border/60 bg-background/85 backdrop-blur md:flex" />
            </Carousel>

            <div className="mt-8 flex items-center justify-center gap-2">
              {testimonialItems.map((_, index) => (
                <button
                  key={`testimonial-dot-${index}`}
                  type="button"
                  onClick={() => testimonialApi?.scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all ${testimonialIndex === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/40"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
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
