import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Quote = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Quote request received! We'll contact you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Free Quote</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Get a Free Quote</h1>
            <p className="text-muted-foreground text-lg">
              Tell us about your shipment and we'll get back to you with a competitive rate.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-6 md:p-10 rounded-xl border border-border bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required className="mt-1.5" />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="(314) 555-0000" className="mt-1.5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input id="pickup" placeholder="City, State" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="delivery">Delivery Location</Label>
                <Input id="delivery" placeholder="City, State" required className="mt-1.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="weight">Estimated Weight (lbs)</Label>
                <Input id="weight" type="number" placeholder="e.g. 10000" className="mt-1.5" />
              </div>
              <div>
                <Label>Freight Type</Label>
                <Select>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry-van">Dry Van</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="reefer">Reefer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any special requirements or details..." rows={4} className="mt-1.5" />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
              {loading ? "Submitting..." : <>Submit Quote Request <ArrowRight className="h-4 w-4" /></>}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              We typically respond within 24 hours. Your information is kept confidential.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Quote;
