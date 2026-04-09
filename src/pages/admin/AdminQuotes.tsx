import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, MapPin, Package, Calendar } from "lucide-react";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500",
  reviewed: "bg-yellow-500/10 text-yellow-500",
  quoted: "bg-purple-500/10 text-purple-500",
  accepted: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500",
};

const AdminQuotes = () => {
  const queryClient = useQueryClient();
  const { data: quotes = [] } = useQuery({ queryKey: ["admin-quotes"], queryFn: adminApi.getQuotes });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => adminApi.updateQuote(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-quotes"] }); toast.success("Updated"); },
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteQuote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-quotes"] }); toast.success("Deleted"); },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quote Requests</h1>
      <div className="space-y-4">
        {quotes.map((q: any) => (
          <div key={q.id} className={`p-6 rounded-xl border ${q.is_read ? "border-border/50 bg-card/30" : "border-primary/30 bg-primary/5"}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{q.full_name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[q.status] || statusColors.new}`}>{q.status}</span>
                </div>
                <div className="text-sm text-muted-foreground">{q.email} {q.phone && `• ${q.phone}`} {q.company && `• ${q.company}`}</div>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue={q.status} onValueChange={(val) => updateMutation.mutate({ id: q.id, data: { status: val, is_read: true } })}>
                  <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(q.id); }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {q.pickup_location || "-"} → {q.delivery_location || "-"}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-3.5 w-3.5" /> {q.weight ? `${q.weight} lbs` : "-"} • {q.freight_type || "-"} • {q.service_type || "-"}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {q.pickup_date || "-"}
              </div>
            </div>
            {q.notes && <p className="text-sm text-muted-foreground mt-2 italic">{q.notes}</p>}
            <div className="text-xs text-muted-foreground mt-2">{new Date(q.created_at).toLocaleString()}</div>
          </div>
        ))}
        {quotes.length === 0 && <p className="text-center text-muted-foreground py-8">No quote requests yet</p>}
      </div>
    </div>
  );
};

export default AdminQuotes;
