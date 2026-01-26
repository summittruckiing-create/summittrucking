import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Upload, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadToCloudinary } from "@/utils/cloudinary";
import emailjs from "@emailjs/browser";



const ApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [licenseFrontName, setLicenseFrontName] = useState("");
  const [licenseBackName, setLicenseBackName] = useState("");
  const [ssnFileName, setSsnFileName] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    ssn: "",
    licenseFront: null as File | null,
    licenseBack: null as File | null,
    ssnCard: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLicenseFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFrontName(file.name);
      setFormData(prev => ({ ...prev, licenseFront: file }));
    }
  };

  const handleLicenseBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseBackName(file.name);
      setFormData(prev => ({ ...prev, licenseBack: file }));
    }
  };

  const handleSsnCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSsnFileName(file.name);
      setFormData(prev => ({ ...prev, ssnCard: file }));
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let licenseFrontUrl = "";
      let licenseBackUrl = "";
      let ssnCardUrl = "";

      // Upload files to Cloudinary first
      if (formData.licenseFront) {
        try {
          licenseFrontUrl = await uploadToCloudinary(formData.licenseFront);
        } catch (error) {
          console.error("License Front upload failed:", error);
          throw new Error("Failed to upload driver's license (Front). Please try again.");
        }
      }

      if (formData.licenseBack) {
        try {
          licenseBackUrl = await uploadToCloudinary(formData.licenseBack);
        } catch (error) {
          console.error("License Back upload failed:", error);
          throw new Error("Failed to upload driver's license (Back). Please try again.");
        }
      }

      if (formData.ssnCard) {
        try {
          // toast({ title: "Uploading SSN Card...", description: "Please wait." });
          ssnCardUrl = await uploadToCloudinary(formData.ssnCard);
        } catch (error) {
          console.error("SSN card upload failed:", error);
          throw new Error("Failed to upload SSN card. Please try again.");
        }
      }

      // Prepare template parameters for EmailJS
      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        ssn: formData.ssn,
        license_url: `Front: ${licenseFrontUrl} \n Back: ${licenseBackUrl}`,
        license_front_url: licenseFrontUrl || "Not uploaded",
        license_back_url: licenseBackUrl || "Not uploaded",
        ssn_card_url: ssnCardUrl || "Not uploaded",
      };

      // Send via EmailJS
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setIsSubmitted(true);
        toast({
          title: "Application Submitted!",
          description: "We'll review your application and contact you soon.",
        });
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="application-form" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-2 border-accent/30 bg-card">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4">
                Application Received!
              </h3>
              <p className="text-muted-foreground text-lg">
                Thank you for your interest in joining our team. We'll review your application and get back to you within 2-3 business days.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="application-form" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Driver Application Form
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to join our team? Fill out the form below and take the first step toward a rewarding career.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-2 border-primary/10 shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-xl font-bold text-center">
              Start Your Application
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground font-medium">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="John"
                    className="border-input focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground font-medium">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Doe"
                    className="border-input focus:border-accent"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john.doe@email.com"
                    className="border-input focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    placeholder="(123) 456-7890"
                    className="border-input focus:border-accent"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground font-medium">
                  Full Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Street Address, City, State, ZIP Code"
                  rows={3}
                  className="border-input focus:border-accent resize-none"
                />
              </div>

              {/* SSN */}
              <div className="space-y-2">
                <Label htmlFor="ssn" className="text-foreground font-medium">
                  Social Security Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ssn"
                  name="ssn"
                  type="password"
                  value={formData.ssn}
                  onChange={handleInputChange}
                  required
                  placeholder="•••-••-••••"
                  className="border-input focus:border-accent"
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Your information is encrypted and secure</span>
                </div>
              </div>

              {/* Driver's License Upload (Front) */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Driver's License Photo (Front) <span className="text-destructive">*</span>
                </Label>
                <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    id="licenseFront"
                    accept="image/*,.pdf"
                    onChange={handleLicenseFrontChange}
                    required
                    className="hidden"
                  />
                  <label htmlFor="licenseFront" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-foreground font-medium mb-1">
                      {licenseFrontName || "Upload Driver's License (Front)"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to browse • JPG, PNG, or PDF
                    </p>
                  </label>
                </div>
              </div>

              {/* Driver's License Upload (Back) */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Driver's License Photo (Back) <span className="text-destructive">*</span>
                </Label>
                <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    id="licenseBack"
                    accept="image/*,.pdf"
                    onChange={handleLicenseBackChange}
                    required
                    className="hidden"
                  />
                  <label htmlFor="licenseBack" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-foreground font-medium mb-1">
                      {licenseBackName || "Upload Driver's License (Back)"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to browse • JPG, PNG, or PDF
                    </p>
                  </label>
                </div>
              </div>

              {/* SSN Card Upload */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Social Security Card Photo <span className="text-destructive">*</span>
                </Label>
                <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    id="ssnCard"
                    accept="image/*,.pdf"
                    onChange={handleSsnCardChange}
                    required
                    className="hidden"
                  />
                  <label htmlFor="ssnCard" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-foreground font-medium mb-1">
                      {ssnFileName || "Upload Photo of Social Security Card"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to browse • JPG, PNG, or PDF
                    </p>
                  </label>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Your documents are encrypted and securely stored</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to our terms of service and privacy policy.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ApplicationForm;
