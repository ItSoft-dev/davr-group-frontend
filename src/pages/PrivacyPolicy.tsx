import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => (
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
          Privacy <span className="text-gradient">Policy</span>
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
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
          <p className="text-sm text-muted-foreground mb-10 border-b border-border/50 pb-4">
            Last Updated: April 16, 2026
          </p>

          <p>
            Davr Group Logistics LLC ("we," "our," or "us") is committed to
            protecting your privacy. This Privacy Policy describes how we
            collect, use, disclose, and protect your information when you visit
            our website,{" "}
            <a
              href="https://davrgroup.com"
              className="text-primary hover:underline"
            >
              https://davrgroup.com
            </a>{" "}
            ("Website"), or interact with us in any other manner.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect the following types of information from you:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> When you contact us through
              our Website, phone, or email, we may collect personal information
              that you provide, including your full name, phone number, email
              address, and mailing address.
            </li>
            <li>
              <strong>Automatically Collected Information:</strong> When you
              visit our Website, we may automatically collect certain information
              about your device and usage, including IP address, browser type,
              operating system, referring URLs, and pages viewed.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect for the following purposes:
          </p>
          <ul>
            <li>
              <strong>To Communicate with You:</strong> We use your contact
              information to respond to your inquiries, provide logistics
              services, send administrative information, and keep you informed
              about your shipments or our services.
            </li>
            <li>
              <strong>Marketing and Promotional Communications:</strong> With
              your consent, we may use your information to send you updates,
              newsletters, or marketing communications via email, phone, or text
              message. You can opt out of receiving these communications at any
              time by following the instructions provided in the communication or
              contacting us directly.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may use your information to
              comply with applicable laws, regulations, or legal obligations,
              including responding to subpoenas, court orders, or legal requests.
            </li>
          </ul>

          <h2>Consent to Receive Text Messages</h2>
          <p>
            You are not required to consent to receiving text messages from Davr
            Group Logistics LLC. By providing your phone number and opting in,
            you consent to receive text messages from Davr Group Logistics LLC
            regarding your inquiry, our services, or related logistics matters.
            Message and data rates may apply. You can opt out of receiving text
            messages at any time by replying STOP to any message or by contacting
            us directly. Please note that opting out may limit our ability to
            communicate with you regarding your shipments or services.
          </p>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We do not sell or rent your personal information to third parties. We
            do not sell, rent, release, or transfer your SMS consent or phone
            number to any third party for any third-party marketing purposes. We
            may share your information in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information
              with our service providers who perform services on our behalf, such
              as marketing, customer services, or technical support. These
              service providers are contractually obligated to protect your
              information and use it only for services they provide.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required by law, regulation, or legal process, or if
              we believe disclosure is necessary to protect our rights, property,
              or the safety of our users or others.
            </li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, use, disclosure, alteration, or
            destruction. However, no method of transmission over the internet or
            electronic storage is completely secure, and we cannot guarantee
            absolute security.
          </p>

          <h2>Your Rights and Choices</h2>
          <ul>
            <li>
              <strong>Opting Out:</strong> You may opt out of receiving marketing
              communications from us by following the instructions in those
              communications or contacting us directly. If you opt out, we may
              still send you non-promotional communications related to your
              logistics services or our ongoing business relationship.
            </li>
            <li>
              <strong>Access and Update Information:</strong> You have the right
              to access, update, or correct your personal information. To do so,
              please contact us using the information provided below.
            </li>
          </ul>

          <h2>Third-Party Websites</h2>
          <p>
            Our Website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these third-party
            sites. We encourage you to review the privacy policies of any
            third-party websites you visit.
          </p>

          <h2>SMS Message Communication</h2>
          <p>
            We may send any Davr Group Logistics LLC Text (SMS) Message, either
            directly or via a third-party agent or authorized service provider,
            through your communication service provider in order to deliver it to
            you. You agree that your communication services provider is acting as
            your agent in this capacity. No mobile information will be shared
            with third parties/affiliates for marketing/promotional purposes. All
            the above categories exclude text messaging originator opt-in data
            and consent; this information will not be shared with any third
            parties. This includes affiliate or business partners — the opt-in is
            not transferable to another party involved in their process.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13. If
            we become aware that we have inadvertently collected personal
            information from a child under 13, we will take steps to delete such
            information.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated "Last Updated" date. We
            encourage you to review this Privacy Policy periodically for any
            updates.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our privacy practices, please contact us at:
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
                to="/terms"
                className="text-primary hover:underline"
              >
                View our Terms of Service →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
