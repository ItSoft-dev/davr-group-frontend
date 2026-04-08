import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Wrench, Radar } from "lucide-react";
import fleetImg from "@/assets/fleet-trucks.jpg";

const features = [
  { icon: Wrench, title: "Regular Maintenance", desc: "Every truck follows a strict maintenance schedule to ensure peak performance and safety." },
  { icon: Radar, title: "GPS Tracking", desc: "Real-time GPS on all vehicles so you always know where your freight is." },
  { icon: MapPin, title: "Nationwide Coverage", desc: "Our fleet operates across all 48 contiguous states for door-to-door delivery." },
];

const Fleet = () => (
  <div>
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Our Fleet</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Built for the Road</h1>
          <p className="text-muted-foreground text-lg">
            3 trucks. 5 drivers. Every vehicle maintained to the highest standards.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-border mb-16">
          <img src={fleetImg} alt="Davr Group fleet" className="w-full h-auto" loading="lazy" width={1280} height={720} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((f) => (
            <div key={f.title} className="text-center p-6 rounded-xl border border-border bg-card">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Working With Us?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Whether you're a broker or a business, we're ready to haul your freight reliably and safely.
          </p>
          <Link to="/quote">
            <Button size="lg" className="gap-2">Request a Quote <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Fleet;
