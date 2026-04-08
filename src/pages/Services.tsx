import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Truck, Zap, MapPin, ArrowRight, Box, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Full Truckload (FTL)",
    desc: "When you have enough freight to fill an entire trailer, our FTL service delivers your cargo directly from pickup to destination — no stops, no delays. Ideal for large shipments requiring dedicated transport.",
    features: ["Direct door-to-door delivery", "Dedicated trailer", "Faster transit times", "Ideal for 10,000+ lbs"],
    color: "primary",
  },
  {
    icon: Box,
    title: "Less Than Truckload (LTL)",
    desc: "Don't have enough to fill a full truck? Our LTL service lets you share trailer space with other shipments, giving you a cost-effective solution without sacrificing reliability.",
    features: ["Cost-effective for smaller loads", "Shared trailer space", "Flexible scheduling", "Great for 100-10,000 lbs"],
    color: "secondary",
  },
  {
    icon: MapPin,
    title: "Interstate Freight Transportation",
    desc: "We specialize in moving freight across state lines. Our drivers know the routes, regulations, and best practices for interstate hauling across all 48 contiguous states.",
    features: ["48-state coverage", "Experienced route planning", "Regulatory compliance", "Cross-country capability"],
    color: "primary",
  },
  {
    icon: Zap,
    title: "Expedited Shipping",
    desc: "When time is critical, our expedited service gets your freight moving fast. Priority handling, optimized routing, and dedicated communication throughout the journey.",
    features: ["Priority handling", "Optimized routing", "Real-time updates", "Dedicated communication"],
    color: "secondary",
  },
  {
    icon: Truck,
    title: "General Freight Delivery",
    desc: "From palletized goods to dry van cargo, we handle a wide range of general freight. Reliable pickup and delivery with professional handling every step of the way.",
    features: ["Dry van cargo", "Palletized goods", "Professional handling", "Reliable scheduling"],
    color: "primary",
  },
];

const Services = () => (
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
            Whether you need a full truckload or expedited delivery, Davr Group LLC has the
            service to match your needs.
          </p>
        </div>
      </div>
    </section>

    {/* Services List */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="space-y-8 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`group relative flex flex-col md:flex-row gap-8 p-8 md:p-10 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 transition-all duration-500 ${
                i % 2 === 0 ? "hover:border-primary/30" : "hover:border-secondary/30"
              }`}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                s.color === "primary"
                  ? "bg-gradient-to-r from-primary/5 to-transparent"
                  : "bg-gradient-to-r from-secondary/5 to-transparent"
              }`} />

              <div className="relative flex-shrink-0">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                  s.color === "primary" ? "bg-primary/10 group-hover:bg-primary/15" : "bg-secondary/10 group-hover:bg-secondary/15"
                }`}>
                  <s.icon className={`h-8 w-8 ${s.color === "primary" ? "text-primary" : "text-secondary"}`} />
                </div>
              </div>

              <div className="relative flex-1">
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${s.color === "primary" ? "text-primary" : "text-secondary"}`} />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
            Every shipment is unique. Let's discuss your specific requirements and find the best solution for your freight.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/quote">
              <Button size="lg" className="gap-2 h-12 px-8 shadow-lg shadow-primary/25">
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 border-border/50">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Services;
