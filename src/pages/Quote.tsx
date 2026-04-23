import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Clock, Shield, Phone } from "lucide-react";
import { toast } from "sonner";
import { publicApi } from "@/lib/api";
import { DEFAULT_PHONE, formatPhoneDisplay, formatPhoneHref } from "@/lib/utils";

const Quote = () => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [freightType, setFreightType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const phoneValue = DEFAULT_PHONE;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      full_name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      pickup_location: (form.elements.namedItem("pickup") as HTMLInputElement).value,
      delivery_location: (form.elements.namedItem("delivery") as HTMLInputElement).value,
      weight: (form.elements.namedItem("weight") as HTMLInputElement).value,
      freight_type: freightType,
      service_type: serviceType,
      pickup_date: (form.elements.namedItem("date") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };
    try {
      await publicApi.submitQuote(data);
      toast.success("Quote request received! We'll contact you within 24 hours.");
      form.reset();
      setFreightType("");
      setServiceType("");
    } catch {
      toast.error("Failed to submit quote request. Please try again.");
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">Free Quote</div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Get a Free <span className="text-gradient">Quote</span></h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Tell us about your shipment and we'll get back to you with a competitive rate. No obligation, no hidden fees.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-32 space-y-6">
                <div className="p-7 rounded-2xl border border-border/50 bg-card/30">
                  <h3 className="font-bold text-lg mb-4">Why Request a Quote?</h3>
                  <div className="space-y-4">
                    {[{ icon: Clock, text: "Response within 24 hours" }, { icon: Shield, text: "No obligation quote" }, { icon: Phone, text: "Personal follow-up call" }].map((b) => (
                      <div key={b.text} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><b.icon className="h-4.5 w-4.5 text-primary" /></div>
                        <span className="text-sm text-muted-foreground">{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/30 to-secondary/5">
                  <h3 className="font-bold text-lg mb-2">Prefer to call?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Speak directly with our dispatch team for immediate assistance.</p>
                  <a href={`tel:${formatPhoneHref(phoneValue)}`} className="flex items-center gap-2 text-primary font-semibold hover:underline">
                    <Phone className="h-4 w-4" /> {formatPhoneDisplay(phoneValue)}
                  </a>
                </div>
                <div className="p-7 rounded-2xl border border-border/50 bg-card/30">
                  <h3 className="font-bold mb-3">What happens next?</h3>
                  <div className="space-y-4">
                    {[{ step: "1", text: "Submit your shipment details" }, { step: "2", text: "Our team reviews your request" }, { step: "3", text: "Receive a competitive quote" }, { step: "4", text: "Confirm and schedule pickup" }].map((s) => (
                      <div key={s.step} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0"><span className="text-xs font-bold text-primary">{s.step}</span></div>
                        <span className="text-sm text-muted-foreground pt-0.5">{s.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-6 p-8 md:p-10 rounded-2xl border border-border/50 bg-card/30">
                <div className="mb-2">
                  <h3 className="text-2xl font-bold mb-2">Shipment Details</h3>
                  <p className="text-sm text-muted-foreground">Fill in the details below and we'll prepare your personalized quote.</p>
                </div>
                <div className="space-y-1.5"><h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Information</h4><div className="h-px bg-border/50" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><Label htmlFor="name">Full Name *</Label><Input id="name" name="name" placeholder="John Doe" required className="mt-1.5 bg-background/50" /></div>
                  <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" placeholder="john@example.com" required className="mt-1.5 bg-background/50" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" placeholder="(405) 885-9080" className="mt-1.5 bg-background/50" /></div>
                  <div><Label htmlFor="company">Company Name</Label><Input id="company" name="company" placeholder="Your Company" className="mt-1.5 bg-background/50" /></div>
                </div>
                <div className="space-y-1.5 pt-4"><h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Shipment Information</h4><div className="h-px bg-border/50" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><Label htmlFor="pickup">Pickup Location *</Label><Input id="pickup" name="pickup" placeholder="City, State" required className="mt-1.5 bg-background/50" /></div>
                  <div><Label htmlFor="delivery">Delivery Location *</Label><Input id="delivery" name="delivery" placeholder="City, State" required className="mt-1.5 bg-background/50" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div><Label htmlFor="weight">Estimated Weight (lbs)</Label><Input id="weight" name="weight" type="number" placeholder="e.g. 10000" className="mt-1.5 bg-background/50" /></div>
                  <div>
                    <Label>Freight Type</Label>
                    <Select value={freightType} onValueChange={setFreightType}>
                      <SelectTrigger className="mt-1.5 bg-background/50"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dry-van">Dry Van</SelectItem>
                        <SelectItem value="flatbed">Flatbed</SelectItem>
                        <SelectItem value="reefer">Reefer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Service Type</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger className="mt-1.5 bg-background/50"><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ftl">Full Truckload (FTL)</SelectItem>
                        <SelectItem value="ltl">Less Than Truckload (LTL)</SelectItem>
                        <SelectItem value="expedited">Expedited</SelectItem>
                        <SelectItem value="general">General Freight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label htmlFor="date">Preferred Pickup Date</Label><Input id="date" name="date" type="date" className="mt-1.5 bg-background/50" /></div>
                <div><Label htmlFor="notes">Additional Notes</Label><Textarea id="notes" name="notes" placeholder="Any special requirements..." rows={4} className="mt-1.5 bg-background/50" /></div>
                {/* Terms & Privacy Agreement */}
                <div className="rounded-xl border border-border/50 bg-background/30 p-5">
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
                </div>

                <Button type="submit" size="lg" className="w-full gap-2 h-12 shadow-lg shadow-primary/20" disabled={loading || !agreed}>
                  {loading ? "Submitting..." : <>Submit Quote Request <ArrowRight className="h-4 w-4" /></>}
                </Button>
                <div className="flex items-center justify-center gap-4 pt-2">
                  {["Free quote", "No obligation", "Fast response"].map((t) => (
                    <div key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="h-3 w-3 text-primary" />{t}</div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
