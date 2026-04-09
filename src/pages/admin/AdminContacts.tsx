import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Eye, Mail } from "lucide-react";

const AdminContacts = () => {
  const queryClient = useQueryClient();
  const { data: contacts = [] } = useQuery({ queryKey: ["admin-contacts"], queryFn: adminApi.getContacts });

  const markReadMutation = useMutation({
    mutationFn: adminApi.markContactRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteContact,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }); toast.success("Deleted"); },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Submissions</h1>
      <div className="space-y-4">
        {contacts.map((c: any) => (
          <div key={c.id} className={`p-6 rounded-xl border ${c.is_read ? "border-border/50 bg-card/30" : "border-primary/30 bg-primary/5"}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{c.name}</span>
                  {!c.is_read && <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">New</span>}
                </div>
                <div className="text-sm text-muted-foreground mb-1">{c.email} {c.phone && `• ${c.phone}`}</div>
                {c.subject && <div className="text-sm font-medium mb-2">{c.subject}</div>}
                <p className="text-sm text-muted-foreground">{c.message}</p>
                <div className="text-xs text-muted-foreground mt-2">{new Date(c.created_at).toLocaleString()}</div>
              </div>
              <div className="flex gap-1 ml-4">
                {!c.is_read && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markReadMutation.mutate(c.id)}>
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(`mailto:${c.email}`)}>
                  <Mail className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(c.id); }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-center text-muted-foreground py-8">No contact submissions yet</p>}
      </div>
    </div>
  );
};

export default AdminContacts;
