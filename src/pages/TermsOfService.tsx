import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const TermsOfService = () => (
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
          Please read these terms carefully before using the Davr Group Logistics
          LLC website.
        </p>
      </div>
    </section>

    {/* Content */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
          <p className="text-sm text-muted-foreground mb-10 border-b border-border/50 pb-4">
            Last Updated: April 16, 2026
          </p>

          <p>
            These Terms of Service ("Terms") govern your access to and use of the
            website operated by Davr Group Logistics LLC ("Company," "we," or
            "us") at{" "}
            <a
              href="https://davrgroup.com"
              className="text-primary hover:underline"
            >
              https://davrgroup.com
            </a>
            . By using this website, you agree to these Terms.
          </p>

          <h2>Use of the Website</h2>
          <p>
            You may use this website only for lawful purposes and in accordance
            with these Terms. You agree not to misuse the site, attempt
            unauthorized access, interfere with security features, or use
            automated means to scrape or overload our systems without permission.
          </p>

          <h2>Not Legal or Professional Advice</h2>
          <p>
            Content on this site is for general information about our freight and
            logistics services. It does not constitute legal, financial, or other
            professional advice. Carrier authority, insurance, and operational
            details should be confirmed directly with us or through official
            regulatory sources (e.g., FMCSA) as applicable.
          </p>

          <h2>Quotes and Communications</h2>
          <p>
            Information submitted through contact forms does not create a binding
            contract until confirmed in writing by authorized representatives of
            the Company. Rates, capacity, and service terms are subject to
            agreement on a shipment-by-shipment or contract basis.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The website, branding, logos, text, graphics, and layout are owned by
            the Company or its licensors and are protected by applicable
            intellectual property laws. You may not copy, modify, or distribute
            our materials without prior written consent, except as allowed by law
            for personal, non-commercial use.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The website is provided "as is" and "as available." To the fullest
            extent permitted by law, we disclaim all warranties, express or
            implied, including merchantability, fitness for a particular purpose,
            and non-infringement. We do not warrant uninterrupted or error-free
            operation of the site.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, the Company and
            its officers, employees, and agents shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or
            any loss of profits or data, arising from your use of the website.
            Our total liability for claims arising from the site shall not exceed
            the greater of one hundred U.S. dollars (USD $100) or the amount you
            paid us (if any) for access to the specific service giving rise to
            the claim in the twelve (12) months preceding the claim.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless the Company from claims,
            damages, losses, and expenses (including reasonable attorneys' fees)
            arising from your violation of these Terms or misuse of the website,
            to the extent permitted by law.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Missouri, United
            States, without regard to conflict-of-law principles, except where
            preempted by federal law. You agree to submit to the exclusive
            jurisdiction of the state and federal courts located in Missouri for
            disputes relating to these Terms or the website, where permitted.
          </p>

          <h2>Changes</h2>
          <p>
            We may modify these Terms at any time. The "Last Updated" date
            reflects the current version. Your continued use of the website after
            changes constitutes acceptance of the revised Terms, where permitted
            by law.
          </p>

          <h2>SMS Terms of Service</h2>
          <p>
            By opting into SMS from a web form or other medium, you are agreeing
            to receive SMS messages from Davr Group Logistics LLC. This includes
            SMS messages for shipment updates, appointment scheduling, delivery
            notifications, and billing notifications. Message frequency varies.
            Message and data rates may apply. See our{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            . Message HELP for help. Reply STOP to any message to opt out.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms of Service,
            please contact us at:
          </p>
          <div className="bg-card/50 border border-border/50 rounded-lg p-6 not-prose">
            <p className="font-semibold text-foreground mb-2">
              Davr Group Logistics LLC
            </p>
            <p className="text-muted-foreground text-sm">
              Saint Louis, Missouri, United States
            </p>
            <p className="text-muted-foreground text-sm">
              Phone:{" "}
              <a
                href="tel:+13145550123"
                className="text-primary hover:underline"
              >
                (314) 555-0123
              </a>
            </p>
            <p className="text-muted-foreground text-sm">
              Email:{" "}
              <a
                href="mailto:info@davrgroup.com"
                className="text-primary hover:underline"
              >
                info@davrgroup.com
              </a>
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-border/50 text-sm">
            <p>
              <Link
                to="/privacy"
                className="text-primary hover:underline"
              >
                View our Privacy Policy →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default TermsOfService;
