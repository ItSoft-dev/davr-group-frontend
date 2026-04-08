import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Fleet" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <Truck className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Davr Group <span className="text-primary">LLC</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/quote">
            <Button size="sm" className="ml-4">
              Get a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === l.to
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/quote" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2">Get a Quote</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
