import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  FileText,
  Shield,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminApi } from "@/lib/api";

interface LegalPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const SLUG_OPTIONS = [
  { value: "privacy-policy", label: "Privacy Policy" },
  { value: "terms-of-service", label: "Terms of Service" },
];

const AdminLegalPages = () => {
  const role = localStorage.getItem("admin_role");
  const isSuperAdmin = role === "super_admin";
  const queryClient = useQueryClient();
  const { data: pages = [] } = useQuery<LegalPage[]>({
    queryKey: ["adminLegalPages"],
    queryFn: adminApi.getLegalPages,
  });

  const [editing, setEditing] = useState<LegalPage | null>(null);
  const [creating, setCreating] = useState(false);

  // Form state
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const existingSlugs = pages.map((p) => p.slug);

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      editing
        ? adminApi.updateLegalPage(editing.slug, { title: data.title, content: data.content })
        : adminApi.createLegalPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLegalPages"] });
      toast.success(editing ? "Updated successfully" : "Created successfully");
      cancel();
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => adminApi.deleteLegalPage(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLegalPages"] });
      toast.success("Deleted successfully");
    },
    onError: () => toast.error("Failed to delete"),
  });

  const startCreate = () => {
    if (!isSuperAdmin) return;
    setSlug("");
    setTitle("");
    setContent("");
    setCreating(true);
    setEditing(null);
  };

  const startEdit = (page: LegalPage) => {
    if (!isSuperAdmin) return;
    setSlug(page.slug);
    setTitle(page.title);
    setContent(page.content || "");
    setEditing(page);
    setCreating(false);
  };

  const cancel = () => {
    setEditing(null);
    setCreating(false);
    setSlug("");
    setTitle("");
    setContent("");
  };

  const handleSave = () => {
    if (!isSuperAdmin) return;
    if (!slug || !title) {
      toast.error("Slug and title are required");
      return;
    }
    saveMutation.mutate({ slug, title, content });
  };

  const slugIcon = (s: string) =>
    s === "privacy-policy" ? (
      <Shield className="h-4 w-4" />
    ) : (
      <FileText className="h-4 w-4" />
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Legal Pages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage Privacy Policy and Terms of Service content
          </p>
        </div>
        {isSuperAdmin && (
        <Button onClick={startCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Page
        </Button>
        )}
      </div>

      {/* Editor */}
      {(creating || editing) && (
        <div className="mb-6 rounded-xl border border-border/50 bg-card/50 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h2 className="font-bold text-lg">
              {creating ? "Create Legal Page" : `Edit: ${title}`}
            </h2>
            <Button variant="ghost" size="icon" onClick={cancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-5 space-y-5">
            {/* Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Slug *</Label>
                {creating ? (
                  <Select value={slug} onValueChange={(val) => {
                    setSlug(val);
                    const opt = SLUG_OPTIONS.find((o) => o.value === val);
                    if (opt && !title) setTitle(opt.label);
                  }}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select page type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SLUG_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          disabled={existingSlugs.includes(opt.value)}
                        >
                          {opt.label} {existingSlugs.includes(opt.value) ? "(exists)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={slug} disabled className="mt-1.5" />
                )}
              </div>
              <div>
                <Label>Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Privacy Policy"
                  className="mt-1.5"
                  disabled={!isSuperAdmin}
                />
              </div>
            </div>

            {/* Content HTML */}
            <div>
              <Label>Content (HTML)</Label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="<div><h1>Privacy Policy</h1><p>Content here...</p></div>"
                className="mt-1.5 w-full rounded-lg border border-border bg-[#1a1a2e] text-[#e0e0e0] p-3 font-mono text-sm resize-y"
                style={{ minHeight: "400px" }}
                disabled={!isSuperAdmin}
              />
            </div>
          </div>

          {isSuperAdmin && (
          <div className="flex gap-2 p-5 border-t border-border/50 bg-muted/10">
            <Button
              onClick={handleSave}
              className="gap-2"
              disabled={saveMutation.isPending}
            >
              <Save className="h-4 w-4" />{" "}
              {creating ? "Create Page" : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={cancel}>
              Cancel
            </Button>
          </div>
          )}
        </div>
      )}

      {/* Pages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className="p-5 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  {slugIcon(page.slug)}
                </div>
                <div>
                  <h3 className="font-bold">{page.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    /{page.slug}
                  </p>
                </div>
              </div>
              {isSuperAdmin && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => startEdit(page)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                    onClick={() => {
                      if (confirm("Delete this legal page?"))
                        deleteMutation.mutate(page.slug);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
            {page.updated_at && (
              <p className="text-xs text-muted-foreground mt-3">
                Last updated: {new Date(page.updated_at).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
        {pages.length === 0 && !creating && (
          <div className="md:col-span-2 p-12 text-center rounded-xl border border-dashed border-border/50">
            <FileText className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground mb-3">
              No legal pages yet. Create Privacy Policy and Terms of Service.
            </p>
            {isSuperAdmin && (
            <Button onClick={startCreate} className="gap-2">
              <Plus className="h-4 w-4" /> Create First Page
            </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLegalPages;
