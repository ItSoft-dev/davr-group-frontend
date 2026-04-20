import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, ArrowRight, ExternalLink } from "lucide-react";
import { publicApi } from "@/lib/api";
import { formatPhoneDisplay } from "@/lib/utils";

interface Section {
  heading: string;
  content: string;
}

const fallbackSections: Section[] = [
  {
    heading: "",
    content:
      'These Terms of Service ("Terms") govern your access to and use of the website operated by Davr Group Logistics LLC ("Company," "we," or "us") at https://davrgroup.com. By using this website, you agree to these Terms.',
  },
  {
    heading: "Use of the Website",
    content:
      "You may use this website only for lawful purposes and in accordance with these Terms. You agree not to misuse the site, attempt unauthorized access, interfere with security features, or use automated means to scrape or overload our systems without permission.",
  },
  {
    heading: "Not Legal or Professional Advice",
    content:
      "Content on this site is for general information about our freight and logistics services. It does not constitute legal, financial, or other professional advice. Carrier authority, insurance, and operational details should be confirmed directly with us or through official regulatory sources (e.g., FMCSA) as applicable.",
  },
  {
    heading: "Quotes and Communications",
    content:
      "Information submitted through contact forms does not create a binding contract until confirmed in writing by authorized representatives of the Company. Rates, capacity, and service terms are subject to agreement on a shipment-by-shipment or contract basis.",
  },
  {
    heading: "Intellectual Property",
    content:
      "The website, branding, logos, text, graphics, and layout are owned by the Company or its licensors and are protected by applicable intellectual property laws. You may not copy, modify, or distribute our materials without prior written consent, except as allowed by law for personal, non-commercial use.",
  },
  {
    heading: "Disclaimer of Warranties",
    content:
      'The website is provided "as is" and "as available." To the fullest extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant uninterrupted or error-free operation of the site.',
  },
  {
    heading: "Limitation of Liability",
    content:
      "To the fullest extent permitted by applicable law, the Company and its officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising from your use of the website. Our total liability for claims arising from the site shall not exceed the greater of one hundred U.S. dollars (USD $100) or the amount you paid us (if any) for access to the specific service giving rise to the claim in the twelve (12) months preceding the claim.",
  },
  {
    heading: "Indemnification",
    content:
      "You agree to indemnify and hold harmless the Company from claims, damages, losses, and expenses (including reasonable attorneys' fees) arising from your violation of these Terms or misuse of the website, to the extent permitted by law.",
  },
  {
    heading: "Governing Law",
    content:
      "These Terms are governed by the laws of the State of Missouri, United States, without regard to conflict-of-law principles, except where preempted by federal law. You agree to submit to the exclusive jurisdiction of the state and federal courts located in Missouri for disputes relating to these Terms or the website, where permitted.",
  },
  {
    heading: "Changes",
    content:
      'We may modify these Terms at any time. The "Last Updated" date reflects the current version. Your continued use of the website after changes constitutes acceptance of the revised Terms, where permitted by law.',
  },
  {
    heading: "SMS Terms of Service",
    content:
      "By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Davr Group Logistics LLC. This includes SMS messages for shipment updates, appointment scheduling, delivery notifications, and billing notifications. Message frequency varies. Message and data rates may apply. Message HELP for help. Reply STOP to any message to opt out.",
  },
];

const TermsOfService = () => {
  const { data: companyInfo = [] } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: publicApi.getCompanyInfo,
  });
  const { data: page } = useQuery({
    queryKey: ["legal", "terms"],
    queryFn: () => publicApi.getLegalPage("terms"),
    retry: false,
  });

  const getInfo = (key: string) =>
    companyInfo.find((c: any) => c.key === key)?.value || "";

  const title = page?.title || "Terms of Service";
  const lastUpdated = page?.last_updated || "April 16, 2026";
  let sections: Section[] = fallbackSections;
  try {
    if (page?.sections) sections = JSON.parse(page.sections);
  } catch {
    /* use fallback */
  }

  const phone = formatPhoneDisplay(getInfo("phone"));
  const email = getInfo("email") || "info@davrgroup.com";
  const address = getInfo("address") || "Saint Louis, Missouri, United States";

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
            {/* Last Updated Badge */}
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-border/50">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Last Updated: {lastUpdated}
              </span>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 rounded-full bg-primary" />
                      {section.heading}
                    </h2>
                  )}
                  <div className="text-muted-foreground leading-relaxed space-y-3 pl-3">
                    {section.content.split("\n\n").map((paragraph, j) => {
                      if (paragraph.startsWith("• ")) {
                        return (
                          <div key={j} className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                            <p>
                              {paragraph.slice(2).includes(": ") ? (
                                <>
                                  <span className="font-medium text-foreground">
                                    {paragraph.slice(2).split(": ")[0]}:
                                  </span>{" "}
                                  {paragraph
                                    .slice(2)
                                    .split(": ")
                                    .slice(1)
                                    .join(": ")}
                                </>
                              ) : (
                                paragraph.slice(2)
                              )}
                            </p>
                          </div>
                        );
                      }
                      return <p key={j}>{paragraph}</p>;
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Card */}
            <div className="mt-12 p-6 md:p-8 rounded-2xl border border-border/50 bg-card/30">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-primary" />
                Contact Us
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                If you have any questions or concerns about these Terms of
                Service, please contact us at:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border/30 bg-background/50">
                  <p className="font-semibold text-sm mb-1">
                    Davr Group Logistics LLC
                  </p>
                  <p className="text-muted-foreground text-sm">{address}</p>
                </div>
                <div className="p-4 rounded-xl border border-border/30 bg-background/50 space-y-2">
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    {phone}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Privacy Link */}
            <div className="mt-8 flex items-center justify-between p-5 rounded-xl border border-border/30 bg-card/20">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Also review our Privacy Policy
                </span>
              </div>
              <Link
                to="/privacy"
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
