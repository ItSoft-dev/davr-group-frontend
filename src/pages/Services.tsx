import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Truck, Zap, MapPin, ArrowRight, Box } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Full Truckload (FTL)",
    desc: "When you have enough freight to fill an entire trailer, our FTL service delivers your cargo directly from pickup to destination — no stops, no delays. Ideal for large shipments requiring dedicated transport.",
  },
  {
    icon: Box,
    title: "Less Than Truckload (LTL)",
    desc: "Don't have enough to fill a full truck? Our LTL service lets you share trailer space with other shipments, giving you a cost-effective solution without sacrificing reliability.",
  },
  {
    icon: MapPin,
    title: "Interstate Freight Transportation",
    desc: "We specialize in moving freight across state lines. Our drivers know the routes, regulations, and best practices for interstate hauling across all 48 contiguous states.",
  },
  {
    icon: Zap,
    title: "Expedited Shipping",
    desc: "When time is critical, our expedited service gets your freight moving fast. Priority handling, optimized routing, and dedicated communication throughout the journey.",
  },
  {
    icon: Truck,
    title: "General Freight Delivery",
    desc: "From palletized goods to dry van cargo, we handle a wide range of general freight. Reliable pickup and delivery with professional handling every step of the way.",
  },
];

const Services = () => (
  <div>
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Our Services</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Freight Solutions That Deliver</h1>
          <p className="text-muted-foreground text-lg">
            Whether you need a full truckload or expedited delivery, Davr Group LLC has the service to match your needs.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-muted-foreground mb-6">Need a custom solution? Let's talk.</p>
          <Link to="/quote">
            <Button size="lg" className="gap-2">Get a Quote <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Services;
