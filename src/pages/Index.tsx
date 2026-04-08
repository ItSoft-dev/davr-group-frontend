import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Clock, Shield, Users, MapPin, ArrowRight, Package, Zap, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-truck.jpg";
import fleetImg from "@/assets/fleet-trucks.jpg";

const services = [
  { icon: Package, title: "Full Truckload (FTL)", desc: "Dedicated truck for your full-size shipments across all 48 states." },
  { icon: Truck, title: "Less Than Truckload", desc: "Cost-effective shipping for smaller freight that doesn't fill a full trailer." },
  { icon: Zap, title: "Expedited Shipping", desc: "Time-sensitive deliveries with priority handling and faster transit times." },
  { icon: MapPin, title: "Interstate Freight", desc: "Reliable point-to-point freight transportation across the United States." },
];

const reasons = [
  { icon: Clock, title: "On-Time Delivery", desc: "We understand deadlines matter. Our track record speaks for itself." },
  { icon: Users, title: "Experienced Drivers", desc: "5 professional drivers with extensive knowledge of US highways." },
  { icon: Shield, title: "Safe Transportation", desc: "Well-maintained equipment and strict safety protocols on every haul." },
  { icon: Truck, title: "Customer-Focused", desc: "Personalized service and direct communication — no runaround." },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Semi truck on highway at dusk" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Truck className="h-4 w-4" /> USDOT #3371810 — Licensed Carrier
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-up animation-delay-200">
            Reliable Trucking Services{" "}
            <span className="text-gradient">Across the USA</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up animation-delay-400">
            Fast, safe, and on-time freight delivery you can trust. Davr Group LLC — your dependable partner in logistics.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-600">
            <Link to="/quote">
              <Button size="lg" className="gap-2">
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="gap-2 border-muted-foreground/30">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground">From full truckloads to expedited shipping — we move your freight safely and on time.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:glow-green transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services">
            <Button variant="outline" className="gap-2 border-muted-foreground/30">
              View All Services <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-20 md:py-28 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-2">Why Davr Group</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground">We may be small, but our commitment to quality and reliability is second to none.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <r.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Fleet Preview */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Our Fleet</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Well-Maintained Equipment</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our fleet of 3 trucks is regularly serviced and equipped with GPS tracking for real-time shipment visibility. Every vehicle meets the highest safety standards.
            </p>
            <ul className="space-y-3 mb-8">
              {["3 well-maintained trucks", "GPS tracking on all vehicles", "Regular maintenance schedule", "DOT compliant equipment"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/fleet">
              <Button variant="outline" className="gap-2 border-muted-foreground/30">
                View Our Fleet <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <img src={fleetImg} alt="Davr Group fleet of trucks" className="w-full h-auto" loading="lazy" width={1280} height={720} />
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ship?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          Get a free quote today. We'll get your freight moving quickly and safely.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/quote">
            <Button size="lg" className="gap-2">Get a Free Quote <ArrowRight className="h-4 w-4" /></Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="gap-2 border-muted-foreground/30">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
