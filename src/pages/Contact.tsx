import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Contact Us</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have questions or need a quote? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="space-y-6 mb-10">
                {[
                  { icon: MapPin, label: "Address", value: "Saint Louis, Missouri, USA" },
                  { icon: Phone, label: "Phone", value: "(314) 555-0123" },
                  { icon: Mail, label: "Email", value: "info@davrgroup.com" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{c.label}</p>
                      <p className="font-medium">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl overflow-hidden border border-border h-64">
                <iframe
                  title="Davr Group Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d398516.35!2d-90.50!3d38.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b4a9faed8ef9%3A0xbe39eaca22bbe05b!2sSt.%20Louis%2C%20MO!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8 rounded-xl border border-border bg-card">
              <h3 className="text-xl font-semibold mb-2">Send Us a Message</h3>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="(314) 555-0000" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" rows={4} required className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
