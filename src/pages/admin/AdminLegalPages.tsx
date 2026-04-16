import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  GripVertical,
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
} from "lucide-react";
import { adminApi } from "@/lib/api";

interface Section {
  heading: string;
  content: string;
}

interface LegalPage {
  id: number;
  slug: string;
  title: string;
  sections: string;
  last_updated: string;
}

const AdminLegalPages = () => {
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
  const [lastUpdated, setLastUpdated] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      editing
        ? adminApi.updateLegalPage(editing.id, data)
        : adminApi.createLegalPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLegalPages"] });
      toast.success(editing ? "Updated successfully" : "Created successfully");
      cancel();
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteLegalPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLegalPages"] });
      toast.success("Deleted successfully");
    },
    onError: () => toast.error("Failed to delete"),
  });

  const startCreate = () => {
    setSlug("");
    setTitle("");
    setLastUpdated(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setSections([{ heading: "", content: "" }]);
    setCreating(true);
    setEditing(null);
    setExpandedIdx(0);
  };

  const startEdit = (page: LegalPage) => {
    setSlug(page.slug);
    setTitle(page.title);
    setLastUpdated(page.last_updated);
    try {
      setSections(JSON.parse(page.sections));
    } catch {
      setSections([]);
    }
    setEditing(page);
    setCreating(false);
    setExpandedIdx(null);
  };

  const cancel = () => {
    setEditing(null);
    setCreating(false);
    setSections([]);
    setExpandedIdx(null);
  };

  const handleSave = () => {
    if (!slug || !title) {
      toast.error("Slug and title are required");
      return;
    }
    saveMutation.mutate({
      slug,
      title,
      sections: JSON.stringify(sections),
      last_updated: lastUpdated,
    });
  };

  const addSection = () => {
    setSections([...sections, { heading: "", content: "" }]);
    setExpandedIdx(sections.length);
  };

  const removeSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
    if (expandedIdx === idx) setExpandedIdx(null);
  };

  const updateSection = (idx: number, field: keyof Section, value: string) => {
    const updated = [...sections];
    updated[idx] = { ...updated[idx], [field]: value };
    setSections(updated);
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= sections.length) return;
    const updated = [...sections];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    setSections(updated);
    setExpandedIdx(newIdx);
  };

  const slugIcon = (s: string) =>
    s === "privacy" ? (
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
        <Button onClick={startCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Page
        </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Slug *</Label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="privacy or terms"
                  className="mt-1.5"
                  disabled={!!editing}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL: /{ slug || "slug" }
                </p>
              </div>
              <div>
                <Label>Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Privacy Policy"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Last Updated</Label>
                <Input
                  value={lastUpdated}
                  onChange={(e) => setLastUpdated(e.target.value)}
                  placeholder="April 16, 2026"
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* Sections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">
                  Sections ({sections.length})
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSection}
                  className="gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Section
                </Button>
              </div>

              <div className="space-y-2">
                {sections.map((section, idx) => {
                  const isExpanded = expandedIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-border/50 rounded-lg overflow-hidden bg-background/50"
                    >
                      {/* Section Header */}
                      <div
                        className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-muted/30"
                        onClick={() =>
                          setExpandedIdx(isExpanded ? null : idx)
                        }
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                        <span className="text-xs font-medium text-muted-foreground w-6">
                          #{idx + 1}
                        </span>
                        <span className="flex-1 text-sm font-medium truncate">
                          {section.heading || "(Introduction)"}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveSection(idx, -1);
                            }}
                            disabled={idx === 0}
                          >
                            <ChevronUp className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveSection(idx, 1);
                            }}
                            disabled={idx === sections.length - 1}
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSection(idx);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {/* Section Body */}
                      {isExpanded && (
                        <div className="p-4 pt-0 space-y-3 border-t border-border/30">
                          <div>
                            <Label className="text-xs">Section Heading</Label>
                            <Input
                              value={section.heading}
                              onChange={(e) =>
                                updateSection(idx, "heading", e.target.value)
                              }
                              placeholder="Leave empty for introduction paragraph"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Content</Label>
                            <Textarea
                              value={section.content}
                              onChange={(e) =>
                                updateSection(idx, "content", e.target.value)
                              }
                              placeholder="Section content. Use bullet points with • at the start of a line. Separate paragraphs with empty lines."
                              className="mt-1 min-h-[120px] font-mono text-sm"
                              rows={6}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Tip: Start lines with "• " for bullet points.
                              Separate paragraphs with an empty line.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

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
        </div>
      )}

      {/* Pages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => {
          let sectionCount = 0;
          try {
            sectionCount = JSON.parse(page.sections).length;
          } catch {
            /* ignore */
          }
          return (
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
                      /{page.slug} &middot; {sectionCount} sections
                    </p>
                  </div>
                </div>
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
                        deleteMutation.mutate(page.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              {page.last_updated && (
                <p className="text-xs text-muted-foreground mt-3">
                  Last updated: {page.last_updated}
                </p>
              )}
            </div>
          );
        })}
        {pages.length === 0 && !creating && (
          <div className="md:col-span-2 p-12 text-center rounded-xl border border-dashed border-border/50">
            <FileText className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground mb-3">
              No legal pages yet. Create Privacy Policy and Terms of Service.
            </p>
            <Button onClick={startCreate} className="gap-2">
              <Plus className="h-4 w-4" /> Create First Page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLegalPages;
