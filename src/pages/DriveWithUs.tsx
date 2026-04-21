import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { publicApi } from "@/lib/api";
import { toast } from "sonner";

const DriveWithUs = () => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [licenseType, setLicenseType] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!licenseType || !experience) {
      toast.error("Please select your CDL license and driving experience.");
      return;
    }

    setLoading(true);
    const form = e.target as HTMLFormElement;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const about = (form.elements.namedItem("about") as HTMLTextAreaElement).value;

    const payload = {
      name: fullName,
      email,
      phone,
      subject: `Driver application (${licenseType}, ${experience})`,
      message: [
        "New driver application:",
        `Full name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `CDL license type: ${licenseType}`,
        `Years of driving experience: ${experience}`,
        "",
        "About applicant:",
        about || "-",
      ].join("\n"),
    };

    try {
      await publicApi.submitContact(payload);
      toast.success("Application submitted successfully. We will contact you soon.");
      form.reset();
      setAgreed(false);
      setLicenseType("");
      setExperience("");
    } catch {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-100/60 dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-3xl border border-border/40 bg-background p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Career Form</p>
            <h1 className="text-3xl sm:text-4xl font-bold">Drive With Us</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Join our team of professional drivers. Fill out the application and our recruiting team will reach out.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Your full name"
                  className="mt-2 h-11"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="mt-2 h-11"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (___) ___-__-__"
                  className="mt-2 h-11"
                />
              </div>

              <div>
                <Label>CDL License Type</Label>
                <Select value={licenseType} onValueChange={setLicenseType}>
                  <SelectTrigger className="mt-2 h-11">
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdl-a">CDL A</SelectItem>
                    <SelectItem value="cdl-b">CDL B</SelectItem>
                    <SelectItem value="cdl-a-hazmat">CDL A + Hazmat</SelectItem>
                    <SelectItem value="cdl-b-hazmat">CDL B + Hazmat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Years of Driving Experience</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="mt-2 h-11">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 year</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="about">Tell Us About Yourself</Label>
              <Textarea
                id="about"
                name="about"
                rows={5}
                placeholder="Any additional information you'd like to share..."
                className="mt-2"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="agreement"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="agreement" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link to="/privacy" target="_blank" className="text-primary font-medium hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/terms" target="_blank" className="text-primary font-medium hover:underline">
                  Terms of Service
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base gap-2 shadow-lg shadow-primary/20"
              disabled={loading || !agreed}
            >
              {loading ? "Submitting..." : <>Submit Application <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DriveWithUs;
