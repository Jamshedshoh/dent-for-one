import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LifeBuoy,
  MessageCircle,
  Phone,
  Mail,
  MessageSquare,
  HelpCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

export default function Support() {
  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      <main className="container px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <LifeBuoy className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Help & Support</h2>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="docs">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>Chat with our support team</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="link"
                    className="p-0 h-auto flex items-center gap-1"
                  >
                    Start Chat <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Call Support
                  </CardTitle>
                  <CardDescription>Speak to a representative</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="link"
                    className="p-0 h-auto flex items-center gap-1"
                  >
                    Call Now <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email Support
                  </CardTitle>
                  <CardDescription>Send us an email</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="link"
                    className="p-0 h-auto flex items-center gap-1"
                  >
                    Email Us <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I book an appointment?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        You can book an appointment through the "Booking"
                        section of the app. Simply select your preferred
                        dentist, choose an available date and time slot, and
                        confirm your booking. You'll receive a confirmation
                        notification and email with the details of your
                        appointment.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How do I connect my smart toothbrush?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        To connect your smart toothbrush, go to the "Connect
                        Devices" section. Ensure your toothbrush is turned on
                        and in pairing mode (refer to your device manual for
                        specific instructions). Click "Scan for Devices" and
                        select your toothbrush from the list of detected
                        devices. Follow the on-screen instructions to complete
                        the pairing process.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Can I change or cancel my appointment?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Yes, you can change or cancel your appointment through
                        the "Booking" section. Find your upcoming appointment,
                        click on "Manage Appointment" and select either
                        "Reschedule" or "Cancel". Please note that cancellations
                        made less than 24 hours before your appointment time may
                        incur a fee.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      How do I view my dental records?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Your dental records can be accessed through your Profile
                        page. Click on the "View Dental History" button to see
                        your treatment history, x-rays, prescriptions, and other
                        dental documentation. If you have trouble accessing
                        certain records, please contact your dental office as
                        some information may require additional authorization.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How secure is my personal information?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        We take your privacy and data security very seriously.
                        All personal and medical information is encrypted and
                        stored securely according to healthcare industry
                        standards. We never share your information with third
                        parties without your explicit consent. You can review
                        and adjust your privacy settings in the "Settings"
                        section under "Privacy".
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      How do I order dental products?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        To order dental products, navigate to the "Shop" section
                        of the app. Browse through categories or use the search
                        function to find specific items. Add products to your
                        cart and proceed to checkout. You can choose your
                        preferred payment method and delivery option. Your order
                        history and tracking information will be available in
                        the "Orders" section of your profile.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="link">View More FAQs</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitContactForm} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex-col space-y-4 items-start">
                <div className="w-full border-t pt-4">
                  <p className="text-sm font-medium mb-2">
                    Other Ways to Reach Us
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>support@dentalapp.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Available 24/7</span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentation & Resources
                </CardTitle>
                <CardDescription>Helpful guides and documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-border">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">User Guide</CardTitle>
                      <CardDescription>
                        Complete app usage instructions
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button variant="outline" className="w-full">
                        Download PDF
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">
                        Device Compatibility
                      </CardTitle>
                      <CardDescription>
                        List of compatible smart devices
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button variant="outline" className="w-full">
                        View List
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">
                        Privacy Policy
                      </CardTitle>
                      <CardDescription>How we handle your data</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button variant="outline" className="w-full">
                        Read Policy
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">
                        Terms of Service
                      </CardTitle>
                      <CardDescription>
                        App usage terms and conditions
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button variant="outline" className="w-full">
                        Read Terms
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">
                        Insurance Information
                      </CardTitle>
                      <CardDescription>
                        Supported insurance providers
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button variant="outline" className="w-full">
                        View Providers
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">
                        Emergency Procedures
                      </CardTitle>
                      <CardDescription>
                        What to do in dental emergencies
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button variant="outline" className="w-full">
                        View Guide
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
}
