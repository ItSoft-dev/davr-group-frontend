import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MapPin, Send, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { publicApi } from "@/lib/api";
import { DEFAULT_ADDRESS, DEFAULT_PHONE, formatPhoneDisplay, formatPhoneHref } from "@/lib/utils";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { data: companyInfo = [] } = useQuery({ queryKey: ["companyInfo"], queryFn: publicApi.getCompanyInfo });

  const getInfo = (key: string) => companyInfo.find((c: any) => c.key === key)?.value || "";
  const phoneValue = DEFAULT_PHONE;

  const contactCards = [
    { icon: MapPin, label: "Address", value: DEFAULT_ADDRESS, sub: "Serving all 48 contiguous states", color: "primary" },
    { icon: Phone, label: "Phone", value: formatPhoneDisplay(phoneValue), sub: "Mon-Fri 7:00 AM - 7:00 PM CST", color: "secondary", href: `tel:${formatPhoneHref(phoneValue)}` },
    { icon: Mail, label: "Email", value: getInfo("email") || "info@davrgroup.com", sub: "We respond within 2 hours", color: "primary", href: `mailto:${getInfo("email")}` },
    { icon: Clock, label: "Business Hours", value: getInfo("hours") || "Mon — Fri: 7 AM - 7 PM", sub: getInfo("emergency") || "Emergency dispatch available 24/7", color: "secondary" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      await publicApi.submitContact(data);
      toast.success("Message sent! We'll get back to you shortly.");
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">Contact Us</div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Get in <span className="text-gradient">Touch</span></h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Have questions or need a quote? We'd love to hear from you.</p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {contactCards.map((c) => {
              const Wrapper = c.href ? "a" : "div";
              return (
                <Wrapper key={c.label} {...(c.href ? { href: c.href } : {})} className={`group flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 transition-all duration-500 ${c.color === "primary" ? "hover:border-primary/20" : "hover:border-secondary/20"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ${c.color === "primary" ? "bg-primary/10" : "bg-secondary/10"}`}>
                    <c.icon className={`h-5 w-5 ${c.color === "primary" ? "text-primary" : "text-secondary"}`} />
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{c.label}</p>
                  <p className="font-semibold text-sm mb-1">{c.value}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{c.sub}</p>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div>
              <form onSubmit={handleSubmit} className="space-y-5 p-8 md:p-10 rounded-2xl border border-border/50 bg-card/30">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Send Us a Message</h3>
                  <p className="text-sm text-muted-foreground">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" placeholder="John Doe" required className="mt-1.5 bg-background/50" /></div>
                  <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="john@example.com" required className="mt-1.5 bg-background/50" /></div>
                </div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" placeholder="(405) 885-9080" className="mt-1.5 bg-background/50" /></div>
                <div><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" placeholder="How can we help?" className="mt-1.5 bg-background/50" /></div>
                <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" placeholder="Tell us about your freight needs..." rows={5} required className="mt-1.5 bg-background/50" /></div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree"
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(v === true)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor="agree"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer select-none"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      className="text-primary font-medium hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      target="_blank"
                      className="text-primary font-medium hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    , including consent to receive SMS communications. Message
                    &amp; data rates may apply. Reply STOP to opt out.
                  </label>
                </div>
                <Button type="submit" className="w-full gap-2 h-11 shadow-lg shadow-primary/20" disabled={loading || !agreed}>
                  {loading ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
                </Button>
                <p className="text-xs text-center text-muted-foreground">We typically respond within 2 hours during business hours.</p>
              </form>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden border border-border/50 h-80 lg:h-[400px]">
                <iframe title="Davr Group Location" src="https://www.google.com/maps?q=707+Lepere+Ave+Apt+H,+Saint+Louis,+MO+63132,+USA&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/30 to-secondary/5">
                <h3 className="text-xl font-bold mb-3">Need a Quick Quote?</h3>
                <p className="text-muted-foreground text-sm mb-5">Use our quote form to get a competitive rate for your shipment.</p>
                <Link to="/quote"><Button className="gap-2 shadow-lg shadow-primary/20">Get a Free Quote <ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
