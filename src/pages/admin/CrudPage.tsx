import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox";
  placeholder?: string;
  defaultValue?: any;
}

interface CrudPageProps {
  title: string;
  queryKey: string;
  fetchFn: () => Promise<any[]>;
  createFn: (data: any) => Promise<any>;
  updateFn: (id: number, data: any) => Promise<any>;
  deleteFn: (id: number) => Promise<any>;
  fields: Field[];
  displayFields?: string[];
}

const CrudPage = ({ title, queryKey, fetchFn, createFn, updateFn, deleteFn, fields, displayFields }: CrudPageProps) => {
  const queryClient = useQueryClient();
  const { data: items = [] } = useQuery({ queryKey: [queryKey], queryFn: fetchFn });
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [queryKey] }); toast.success("Created successfully"); setCreating(false); setFormData({}); },
    onError: () => toast.error("Failed to create"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateFn(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [queryKey] }); toast.success("Updated successfully"); setEditing(null); setFormData({}); },
    onError: () => toast.error("Failed to update"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [queryKey] }); toast.success("Deleted successfully"); },
    onError: () => toast.error("Failed to delete"),
  });

  const startCreate = () => {
    const defaults: any = {};
    fields.forEach(f => { defaults[f.name] = f.defaultValue ?? (f.type === "number" ? 0 : f.type === "checkbox" ? false : ""); });
    setFormData(defaults);
    setCreating(true);
    setEditing(null);
  };

  const startEdit = (item: any) => {
    setFormData({ ...item });
    setEditing(item);
    setCreating(false);
  };

  const handleSave = () => {
    if (creating) createMutation.mutate(formData);
    else if (editing) updateMutation.mutate({ id: editing.id, data: formData });
  };

  const cancel = () => { setEditing(null); setCreating(false); setFormData({}); };

  const showFields = displayFields || fields.filter(f => f.name !== "features" && f.name !== "description" && f.type !== "textarea").slice(0, 4).map(f => f.name);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={startCreate} className="gap-2"><Plus className="h-4 w-4" /> Add New</Button>
      </div>

      {/* Form */}
      {(creating || editing) && (
        <div className="mb-6 p-6 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">{creating ? "Create New" : "Edit"}</h2>
            <Button variant="ghost" size="icon" onClick={cancel}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea value={formData[field.name] || ""} onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })} placeholder={field.placeholder} className="mt-1.5" rows={3} />
                ) : field.type === "checkbox" ? (
                  <div className="mt-1.5">
                    <input type="checkbox" checked={formData[field.name] || false} onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })} className="rounded" />
                  </div>
                ) : (
                  <Input type={field.type || "text"} value={formData[field.name] ?? ""} onChange={(e) => setFormData({ ...formData, [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value })} placeholder={field.placeholder} className="mt-1.5" />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} className="gap-2" disabled={createMutation.isPending || updateMutation.isPending}>
              <Save className="h-4 w-4" /> {creating ? "Create" : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={cancel}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
                {showFields.map((f) => (
                  <th key={f} className="px-4 py-3 text-left font-medium text-muted-foreground capitalize">{f.replace(/_/g, " ")}</th>
                ))}
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="px-4 py-3 text-muted-foreground">{item.id}</td>
                  {showFields.map((f) => (
                    <td key={f} className="px-4 py-3 max-w-[200px] truncate">
                      {typeof item[f] === "boolean" ? (item[f] ? "Yes" : "No") : String(item[f] || "-")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => { if (confirm("Delete this item?")) deleteMutation.mutate(item.id); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={showFields.length + 2} className="px-4 py-8 text-center text-muted-foreground">No items yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrudPage;
