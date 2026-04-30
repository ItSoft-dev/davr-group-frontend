import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, ArrowRight, ExternalLink } from "lucide-react";
import { publicApi } from "@/lib/api";

const TermsOfService = () => {
  const { data: page, isLoading } = useQuery({
    queryKey: ["legal", "terms-of-service"],
    queryFn: () => publicApi.getLegalPage("terms-of-service"),
    retry: false,
  });

  const title = page?.title || "Terms of Service";

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <FileText className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using the Davr Group
            Logistics LLC website.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {isLoading && (
              <p className="text-center text-muted-foreground py-8">Loading...</p>
            )}

            {page?.content && (
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            )}

            {!isLoading && !page?.content && (
              <p className="text-center text-muted-foreground py-8">
                Terms of Service content is not available yet.
              </p>
            )}

            {/* Privacy Link */}
            <div className="mt-12 flex items-center justify-between p-5 rounded-xl border border-border/30 bg-card/20">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Also review our Privacy Policy
                </span>
              </div>
              <Link
                to="/privacy-policy"
                className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"
              >
                Privacy Policy <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
