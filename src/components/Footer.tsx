import { Link } from "react-router-dom";
import { Truck, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Truck className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Davr Group <span className="text-primary">LLC</span></span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Reliable freight transportation across the United States. Safe, on-time deliveries you can count on.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["About", "Services", "Fleet", "Contact"].map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase()}`} className="hover:text-primary transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Full Truckload (FTL)", "Less Than Truckload", "Expedited Shipping", "General Freight"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Saint Louis, MO</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> (314) 555-0123</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@davrgroup.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Davr Group LLC. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">USDOT #3371810</p>
      </div>
    </div>
  </footer>
);

export default Footer;
