import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";

const Services = () => {
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: publicApi.getServices });

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">Our Services</div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Freight Solutions That <span className="text-gradient">Deliver</span></h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Whether you need a full truckload or expedited delivery, Davr Group LLC has the service to match your needs.</p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="space-y-8 max-w-5xl mx-auto">
            {services.map((s: any, i: number) => {
              const Icon = getIcon(s.icon);
              const color = i % 2 === 0 ? "primary" : "secondary";
              let features: string[] = [];
              try { features = JSON.parse(s.features || "[]"); } catch { features = []; }
              return (
                <div key={s.id} className={`group relative flex flex-col md:flex-row gap-8 p-8 md:p-10 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 transition-all duration-500 hover:border-${color}/30`}>
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-${color}/5 to-transparent`} />
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 bg-${color}/10 group-hover:bg-${color}/15`}>
                      <Icon className={`h-8 w-8 text-${color}`} />
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">{s.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {features.map((f: string) => (
                        <div key={f} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 className={`h-4 w-4 flex-shrink-0 text-${color}`} />
                          <span className="text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Need a Custom Solution?</h2>
            <p className="text-muted-foreground text-lg mb-8">Every shipment is unique. Let's discuss your specific requirements and find the best solution for your freight.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote"><Button size="lg" className="gap-2 h-12 px-8 shadow-lg shadow-primary/25">Get a Quote <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline" className="gap-2 h-12 px-8 border-border/50">Talk to Us</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
