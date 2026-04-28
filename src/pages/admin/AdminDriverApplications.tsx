import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Eye, Mail, Phone, MapPin, Award, Clock } from "lucide-react";

const AdminDriverApplications = () => {
  const queryClient = useQueryClient();
  const { data: contacts = [] } = useQuery({ queryKey: ["admin-contacts"], queryFn: adminApi.getContacts });

  const driverApplications = contacts.filter((c: any) =>
    c.subject?.toLowerCase().includes("driver application")
  );

  const markReadMutation = useMutation({
    mutationFn: adminApi.markContactRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteContact,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }); toast.success("Deleted"); },
  });

  const parseApplication = (c: any) => {
    const subjectMatch = c.subject?.match(/\(([^)]+)\)/);
    const parts = subjectMatch?.[1]?.split(",").map((s: string) => s.trim()) || [];
    return {
      licenseType: parts[0] || "—",
      experience: parts[1] || "—",
    };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Driver Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {driverApplications.length} application{driverApplications.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {driverApplications.map((c: any) => {
          const { licenseType, experience } = parseApplication(c);
          return (
            <div key={c.id} className={`p-6 rounded-xl border ${c.is_read ? "border-border/50 bg-card/30" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg">{c.name}</span>
                    {!c.is_read && <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">New</span>}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> {c.email}
                    </span>
                    {c.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> {c.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium">
                      <Award className="h-3 w-3" /> {licenseType.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                      <Clock className="h-3 w-3" /> {experience} years exp
                    </span>
                  </div>

                  {c.message && (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{c.message}</p>
                  )}

                  <div className="text-xs text-muted-foreground mt-3">
                    {new Date(c.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-1 ml-4">
                  {!c.is_read && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markReadMutation.mutate(c.id)} title="Mark as read">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(`mailto:${c.email}`)} title="Send email">
                    <Mail className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => { if (confirm("Delete this application?")) deleteMutation.mutate(c.id); }} title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        {driverApplications.length === 0 && <p className="text-center text-muted-foreground py-8">No driver applications yet</p>}
      </div>
    </div>
  );
};

export default AdminDriverApplications;
