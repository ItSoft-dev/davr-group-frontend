import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import aboutImg from "@/assets/about-truck.jpg";

const values = [
  { title: "Safety First", desc: "Every load is handled with the highest safety standards and care." },
  { title: "Reliability", desc: "We deliver on our promises — on time, every time." },
  { title: "Transparency", desc: "Open communication and honest pricing with no hidden fees." },
  { title: "Partnership", desc: "We build long-term relationships, not just one-time transactions." },
];

const About = () => (
  <div>
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">About Us</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              A Small Company With <span className="text-gradient">Big Reliability</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Davr Group LLC is a Saint Louis–based trucking company specializing in interstate freight transportation across the United States. We may be a small fleet, but that's exactly what makes us agile, attentive, and dependable.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With 5 experienced drivers and 3 well-maintained trucks, we focus on what matters most — getting your freight where it needs to be, safely and on schedule. We work closely with brokers, logistics companies, and businesses who value personal service and consistent results.
            </p>
            <Link to="/quote">
              <Button className="gap-2">Request a Quote <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <img src={aboutImg} alt="Truck on highway" className="w-full h-auto" loading="lazy" width={1280} height={720} />
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-2">Our Values</p>
          <h2 className="text-3xl md:text-4xl font-bold">What Drives Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4 p-6 rounded-xl border border-border bg-card">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "3", label: "Trucks" },
            { num: "5", label: "Drivers" },
            { num: "48", label: "States Covered" },
            { num: "100%", label: "Commitment" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{s.num}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
