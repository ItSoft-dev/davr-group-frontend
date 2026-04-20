import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Radar, Truck, Ruler, Weight, Thermometer } from "lucide-react";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import fleetImg from "@/assets/fleet-trucks.jpg";

const vehicleImages = [
  "https://www.cittimagazine.co.uk/wp-content/uploads/2023/09/image-039-4.jpg",
  "https://www.freightwaves.com/wp-content/uploads/2020/05/USA_Truck_earnings_050720_1-1.jpg",
  "https://t3.ftcdn.net/jpg/11/26/72/54/360_F_1126725414_NJ2NOn4tP6Y5stMqYONRwqJfGDtRZ6Ua.jpg",
  "https://i.pinimg.com/originals/c4/7f/87/c47f87544d5f38f31dd12e1b93223b06.jpg?nii=t",
];

const featureCardStyles = [
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

const Fleet = () => {
  const { data: vehicles = [] } = useQuery({ queryKey: ["vehicles"], queryFn: publicApi.getVehicles });
  const { data: features = [] } = useQuery({ queryKey: ["fleetFeatures"], queryFn: publicApi.getFleetFeatures });

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">Our Fleet</div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Built for the <span className="text-gradient">Road</span></h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {vehicles.length} trucks. Every vehicle maintained to the highest standards for safe, reliable freight delivery.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden border border-border/50">
              <img src={fleetImg} alt="Davr Group fleet" className="w-full h-auto" loading="lazy" width={1280} height={720} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-background/80" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium border border-primary/30">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> All Units Active
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 backdrop-blur-sm text-foreground text-sm font-medium border border-foreground/20">
                    <Shield className="h-3.5 w-3.5" /> DOT Compliant
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-sm text-secondary text-sm font-medium border border-secondary/30">
                    <Radar className="h-3.5 w-3.5" /> GPS Tracked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Truck Cards */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-gradient">Vehicles</span></h2>
            <p className="text-muted-foreground">Each truck in our fleet is regularly inspected, maintained, and equipped with modern technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vehicles.map((t: any, i: number) => (
              <div key={t.id} className="group overflow-hidden rounded-[28px] border border-border/50 bg-card/30 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/60 hover:shadow-[0_22px_50px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="p-7 pb-0">
                    <h3 className="text-xl font-bold">{t.unit_number}</h3>
                    <p className="text-sm text-muted-foreground">{t.vehicle_type}</p>
                  </div>
                  <div className="p-7 pb-0">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> {t.status}
                    </div>
                  </div>
                </div>
                <div className="px-7 pt-5">
                  <div className="relative overflow-hidden rounded-[24px] border border-border/50 bg-background/40">
                    <img src={vehicleImages[i % vehicleImages.length]} alt={t.unit_number} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </div>
                <div className="space-y-3 p-7">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Ruler className="h-4 w-4 text-primary/60" /> Length</div>
                    <span className="font-medium">53 ft</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Weight className="h-4 w-4 text-primary/60" /> Capacity</div>
                    <span className="font-medium">{t.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Thermometer className="h-4 w-4 text-primary/60" /> Type</div>
                    <span className="font-medium">Dry Van</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Radar className="h-4 w-4 text-primary/60" /> Tracking</div>
                    <span className="font-medium">GPS Enabled</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 section-gradient" />
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Fleet Features</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our Fleet <span className="text-gradient-blue">Stands Out</span></h2>
          </div>
          <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto sm:pb-10">
            {features.map((f: any, i: number) => {
              const Icon = getIcon(f.icon);
              const style = featureCardStyles[i % featureCardStyles.length];
              return (
                <div
                  key={f.id}
                  className={`group relative overflow-hidden rounded-[28px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(0,0,0,0.18)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] ${style.border} ${i % 2 === 1 ? "sm:translate-y-10" : ""}`}
                >
                  <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl ${style.glow}`} />
                  <div className="absolute right-5 top-4 text-[64px] font-black leading-none text-white/[0.04] transition-transform duration-500 group-hover:scale-110">0{i + 1}</div>
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${style.icon}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${style.badge}`}>Fleet Feature</div>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold tracking-tight text-foreground">{f.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.description}</p>
                    </div>
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                    <div className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/80">Maintained for every mile</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-2xl mx-auto p-10 md:p-14 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Interested in Working With Us?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Whether you're a broker or a business, we're ready to haul your freight reliably and safely.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote"><Button size="lg" className="gap-2 h-12 px-8 shadow-lg shadow-primary/25">Request a Quote <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline" className="gap-2 h-12 px-8 border-border/50">Contact Us</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
