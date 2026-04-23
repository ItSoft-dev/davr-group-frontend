import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Shield, ArrowRight, ExternalLink } from "lucide-react";
import { publicApi } from "@/lib/api";
import { DEFAULT_ADDRESS, formatPhoneDisplay, formatPhoneHref } from "@/lib/utils";

interface Section {
  heading: string;
  content: string;
}

const fallbackSections: Section[] = [
  {
    heading: "",
    content:
      'Davr Group Logistics LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and protect your information when you visit our website, https://davrgroup.com ("Website"), or interact with us in any other manner.',
  },
  {
    heading: "Information We Collect",
    content:
      "We may collect the following types of information from you:\n\n• Personal Information: When you contact us through our Website, phone, or email, we may collect personal information that you provide, including your full name, phone number, email address, and mailing address.\n\n• Automatically Collected Information: When you visit our Website, we may automatically collect certain information about your device and usage, including IP address, browser type, operating system, referring URLs, and pages viewed.",
  },
  {
    heading: "How We Use Your Information",
    content:
      "We use the information we collect for the following purposes:\n\n• To Communicate with You: We use your contact information to respond to your inquiries, provide logistics services, send administrative information, and keep you informed about your shipments or our services.\n\n• Marketing and Promotional Communications: With your consent, we may use your information to send you updates, newsletters, or marketing communications via email, phone, or text message. You can opt out of receiving these communications at any time by following the instructions provided in the communication or contacting us directly.\n\n• Legal Compliance: We may use your information to comply with applicable laws, regulations, or legal obligations, including responding to subpoenas, court orders, or legal requests.",
  },
  {
    heading: "Consent to Receive Text Messages",
    content:
      "You are not required to consent to receiving text messages from Davr Group Logistics LLC. By providing your phone number and opting in, you consent to receive text messages from Davr Group Logistics LLC regarding your inquiry, our services, or related logistics matters. Message and data rates may apply. You can opt out of receiving text messages at any time by replying STOP to any message or by contacting us directly. Please note that opting out may limit our ability to communicate with you regarding your shipments or services.",
  },
  {
    heading: "Information Sharing and Disclosure",
    content:
      "We do not sell or rent your personal information to third parties. We do not sell, rent, release, or transfer your SMS consent or phone number to any third party for any third-party marketing purposes. We may share your information in the following circumstances:\n\n• Service Providers: We may share your information with our service providers who perform services on our behalf, such as marketing, customer services, or technical support. These service providers are contractually obligated to protect your information and use it only for services they provide.\n\n• Legal Requirements: We may disclose your information if required by law, regulation, or legal process, or if we believe disclosure is necessary to protect our rights, property, or the safety of our users or others.",
  },
  {
    heading: "Data Security",
    content:
      "We implement reasonable security measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "Your Rights and Choices",
    content:
      "• Opting Out: You may opt out of receiving marketing communications from us by following the instructions in those communications or contacting us directly. If you opt out, we may still send you non-promotional communications related to your logistics services or our ongoing business relationship.\n\n• Access and Update Information: You have the right to access, update, or correct your personal information. To do so, please contact us using the information provided below.",
  },
  {
    heading: "Third-Party Websites",
    content:
      "Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party websites you visit.",
  },
  {
    heading: "SMS Message Communication",
    content:
      "We may send any Davr Group Logistics LLC Text (SMS) Message, either directly or via a third-party agent or authorized service provider, through your communication service provider in order to deliver it to you. You agree that your communication services provider is acting as your agent in this capacity. No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. This includes affiliate or business partners — the opt-in is not transferable to another party involved in their process.",
  },
  {
    heading: "Children's Privacy",
    content:
      "Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete such information.",
  },
  {
    heading: "Changes to This Privacy Policy",
    content:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically for any updates.',
  },
];

const PrivacyPolicy = () => {
  const { data: companyInfo = [] } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: publicApi.getCompanyInfo,
  });
  const { data: page } = useQuery({
    queryKey: ["legal", "privacy"],
    queryFn: () => publicApi.getLegalPage("privacy"),
    retry: false,
  });

  const getInfo = (key: string) =>
    companyInfo.find((c: any) => c.key === key)?.value || "";

  const title = page?.title || "Privacy Policy";
  const lastUpdated = page?.last_updated || "April 16, 2026";
  let sections: Section[] = fallbackSections;
  try {
    if (page?.sections) sections = JSON.parse(page.sections);
  } catch {
    /* use fallback */
  }

  const phone = formatPhoneDisplay();
  const phoneHref = formatPhoneHref();
  const email = getInfo("email") || "info@davrgroup.com";
  const address = DEFAULT_ADDRESS;

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Shield className="h-3.5 w-3.5" />
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {title.includes(" ") ? (
              <>
                {title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gradient">
                  {title.split(" ").slice(-1)}
                </span>
              </>
            ) : (
              <span className="text-gradient">{title}</span>
            )}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters to us. Learn how Davr Group Logistics LLC
            collects, uses, and protects your information.
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
                If you have any questions or concerns about this Privacy Policy
                or our privacy practices, please contact us at:
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
                    href={`tel:${phoneHref}`}
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

            {/* Terms Link */}
            <div className="mt-8 flex items-center justify-between p-5 rounded-xl border border-border/30 bg-card/20">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Also review our Terms of Service
                </span>
              </div>
              <Link
                to="/terms"
                className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"
              >
                Terms of Service <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
