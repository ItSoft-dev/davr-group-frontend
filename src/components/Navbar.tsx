import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Truck, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Fleet" },
  { to: "/contact", label: "Contact" },
];

const EMAIL_ADDRESS = "info@davrgroup.com";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className={isHome ? "dark" : ""}>
      {/* Top bar */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          isHome
            ? "bg-[#0B0F19] border-white/10"
            : scrolled
              ? "bg-background/80 backdrop-blur-2xl border-border/40"
              : "bg-primary/10 border-primary/20"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-8 text-xs">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>Licensed Carrier</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href="tel:+13145550123"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone className="h-3 w-3" />
              +1 (314) 555-0123
            </a>
            <span className="w-1 h-1 rounded-full bg-primary/50" />
            <span>Saint Louis, MO</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isHome
              ? "md:top-0 top-0 bg-[#0B0F19] border-b border-white/10 shadow-lg shadow-black/30"
              : "md:top-0 top-0 bg-background/80 backdrop-blur-2xl border-b border-border/40 shadow-lg shadow-black/20"
            : isHome
              ? "md:top-8 top-0 bg-[#0B0F19]"
              : "md:top-8 top-0 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                <Truck className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground leading-none">
                Davr Group
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-primary/80 uppercase">
                Logistics LLC
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === l.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {location.pathname === l.to && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            <ThemeToggle />
            <a href={`mailto:${EMAIL_ADDRESS}`} className="ml-2">
              <Button
                size="sm"
                className="gap-2 bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all"
              >
                <Mail className="h-4 w-4" />
                Our Email
              </Button>
            </a>
            <Link to="/quote" className="ml-2">
              <Button
                size="sm"
                className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              >
                Drive With Us
              </Button>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-border/50 bg-card/50 text-foreground"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/30 animate-fade-in">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                    location.pathname === l.to
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/quote" onClick={() => setOpen(false)} className="mt-3">
                <Button className="w-full shadow-lg shadow-primary/20">
                  Drive With Us
                </Button>
              </Link>
              <a href={`mailto:${EMAIL_ADDRESS}`} className="mt-3">
                <Button className="w-full bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500">
                  <Mail className="h-4 w-4" /> Our Email
                </Button>
              </a>
              <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3 w-3 text-primary" />
                +1 (314) 555-0123
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
