import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { MessageSquare, FileText, Package, Truck, Star, Mail } from "lucide-react";

const Dashboard = () => {
  const { data: stats } = useQuery({ queryKey: ["admin-dashboard"], queryFn: adminApi.getDashboard });

  const cards = [
    { label: "Total Contacts", value: stats?.total_contacts || 0, unread: stats?.unread_contacts || 0, icon: MessageSquare, color: "text-blue-500 bg-blue-500/10" },
    { label: "Quote Requests", value: stats?.total_quotes || 0, unread: stats?.unread_quotes || 0, icon: FileText, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Services", value: stats?.total_services || 0, icon: Package, color: "text-purple-500 bg-purple-500/10" },
    { label: "Vehicles", value: stats?.total_vehicles || 0, icon: Truck, color: "text-orange-500 bg-orange-500/10" },
    { label: "Testimonials", value: stats?.total_testimonials || 0, icon: Star, color: "text-yellow-500 bg-yellow-500/10" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="p-6 rounded-xl border border-border/50 bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
              {card.unread !== undefined && card.unread > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-medium">
                  {card.unread} new
                </span>
              )}
            </div>
            <div className="text-3xl font-bold">{card.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
