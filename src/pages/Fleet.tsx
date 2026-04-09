import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Radar, Truck, Ruler, Weight, Thermometer } from "lucide-react";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import fleetImg from "@/assets/fleet-trucks.jpg";

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {vehicles.map((t: any) => (
              <div key={t.id} className="group p-7 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-primary/20 transition-all duration-500">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-bold">{t.unit_number}</h3>
                    <p className="text-sm text-muted-foreground">{t.vehicle_type}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> {t.status}
                  </div>
                </div>
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-card to-muted/30 flex items-center justify-center mb-5 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500">
                  <Truck className="h-16 w-16 text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-500" />
                </div>
                <div className="space-y-3">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f: any) => {
              const Icon = getIcon(f.icon);
              return (
                <div key={f.id} className="group text-center p-7 rounded-2xl border border-border/30 bg-card/30 hover:bg-card/60 hover:border-secondary/20 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/15 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
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
