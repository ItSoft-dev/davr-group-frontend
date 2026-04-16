import { Link } from "react-router-dom";
import { Truck, Phone, Mail, MapPin, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50">
    {/* CTA Strip */}
    <div className="border-b border-border/30">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">
            Ready to move your freight?
          </h3>
          <p className="text-muted-foreground text-sm">
            Get a competitive quote in minutes. No obligation.
          </p>
        </div>
        <Link to="/quote">
          <Button className="gap-2 h-11 px-6 shadow-lg shadow-primary/20">
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>

    {/* Main Footer */}
    <div className="container mx-auto px-4 py-14 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none">Davr Group</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-primary/80 uppercase">
                Logistics LLC
              </span>
            </div>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Reliable freight transportation across the United States. Safe,
            on-time deliveries you can count on.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-foreground">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Our Services", to: "/services" },
              { label: "Our Fleet", to: "/fleet" },
              { label: "Contact", to: "/contact" },
              { label: "Drive With Us", to: "/quote" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-foreground">
            Our Services
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              "Full Truckload (FTL)",
              "Less Than Truckload (LTL)",
              "Interstate Freight",
              "Expedited Shipping",
              "General Freight Delivery",
            ].map((s) => (
              <li
                key={s}
                className="text-muted-foreground flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-secondary/40" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-foreground">
            Contact Info
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Saint Louis, Missouri</p>
                  <p className="text-muted-foreground text-xs">United States</p>
                </div>
              </div>
            </li>
            <li>
              <a
                href="tel:+13145550123"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                (314) 555-0123
              </a>
            </li>
            <li>
              <a
                href="mailto:info@davrgroup.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                info@davrgroup.com
              </a>
            </li>
            <li>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                Mon-Fri: 7 AM - 7 PM CST
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-border/30">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Davr Group LLC. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <Link
            to="/privacy"
            className="hover:text-primary transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <span className="w-1 h-1 rounded-full bg-border" />
          <Link
            to="/terms"
            className="hover:text-primary transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Entity Type: Carrier</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Saint Louis, MO</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
