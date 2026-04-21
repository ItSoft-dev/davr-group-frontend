import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { publicApi } from "@/lib/api";
import { getIcon } from "@/lib/icons";

const serviceVisuals = [
  "https://i.pinimg.com/originals/c4/7f/87/c47f87544d5f38f31dd12e1b93223b06.jpg?nii=t",
  "https://www.i2290.com/wp-content/uploads/2023/03/trucking-lease-agreement-scaled.jpeg",
  "https://www.cittimagazine.co.uk/wp-content/uploads/2023/09/image-039-4.jpg",
  "https://www.freightwaves.com/wp-content/uploads/2020/05/USA_Truck_earnings_050720_1-1.jpg",
];

const servicesHeroImage = "https://imgproxy.divecdn.com/lj2LpQ06LZtyVcc_5_UZnf1sWuxwDXF-hGuaQuSOoew/g:ce/rs:fill:1600:900:1/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy0xODQ4Mzc3ODkwLmpwZw==.webp";

const Services = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: publicApi.getServices,
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              Our Services
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
              Freight Solutions That{" "}
              <span className="text-gradient">Deliver</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Whether you need a full truckload or expedited delivery,<br /> DAVR
              GROUP LLC has the service to match your needs.
            </p>

            <div className="relative mt-14 max-w-5xl mx-auto">
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-border/50 bg-card/30 p-3 md:p-4">
                <img
                  src={servicesHeroImage}
                  alt="Davr Group freight service truck"
                  className="h-[280px] md:h-[420px] w-full rounded-[26px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-center gap-3 md:inset-x-8 md:bottom-8">
                  <div className="rounded-full border border-white/15 bg-[#0b1220]/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    Nationwide freight coverage
                  </div>
                  <div className="rounded-full border border-primary/20 bg-primary/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-md">
                    Dispatch ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 section-gradient" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-16 lg:gap-x-8 lg:gap-y-20 max-w-6xl mx-auto relative">
            {services.map((s: any, i: number) => {
              const Icon = getIcon(s.icon);
              const image = serviceVisuals[i % serviceVisuals.length];
              let features: string[] = [];
              try {
                features = JSON.parse(s.features || "[]");
              } catch {
                features = [];
              }
              return (
                <div
                  key={s.id}
                  className="group relative pt-32 md:pt-36 transition-all duration-500 hover:-translate-y-1"
                >
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
                          <div className="text-sm font-medium text-foreground">{features[0] || "48-state coverage"}</div>
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

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Every shipment is unique. Let's discuss your specific requirements
              and find the best solution for your freight.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote">
                <Button
                  size="lg"
                  className="gap-2 h-12 px-8 shadow-lg shadow-primary/25"
                >
                  Drive With Us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 h-12 px-8 border-border/50"
                >
                  Talk to Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
