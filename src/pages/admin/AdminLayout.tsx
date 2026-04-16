import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { authApi } from "@/lib/api";
import {
  LayoutDashboard, Truck, Package, MessageSquare, FileText,
  Users, Settings, LogOut, Menu, X, Star, BarChart3, Globe, Clock, Shield, Zap, Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/services", icon: Package, label: "Services" },
  { to: "/admin/fleet", icon: Truck, label: "Fleet" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
  { to: "/admin/quotes", icon: FileText, label: "Quotes" },
  { to: "/admin/stats", icon: BarChart3, label: "Stats" },
  { to: "/admin/company", icon: Globe, label: "Company Info" },
  { to: "/admin/timeline", icon: Clock, label: "Timeline" },
  { to: "/admin/values", icon: Shield, label: "Values" },
  { to: "/admin/why-us", icon: Zap, label: "Why Choose Us" },
  { to: "/admin/hero", icon: Settings, label: "Hero Section" },
  { to: "/admin/legal", icon: Scale, label: "Legal Pages" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { navigate("/admin/login"); return; }
    authApi.me().then(setAdmin).catch(() => {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
    });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/50">
        <h1 className="font-bold text-lg">Davr Admin</h1>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border/50 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6 border-b border-border/50">
            <h1 className="font-bold text-xl">Davr Group</h1>
            <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {admin.full_name?.[0] || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{admin.full_name || admin.username}</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/" className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs">View Site</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="text-xs gap-1">
                <LogOut className="h-3 w-3" /> Exit
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
