import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BellRing,
  Moon,
  Globe,
  Lock,
  Bell,
  Shield,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      <main className="container px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellRing className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="appointment_reminders">
                      Appointment Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming appointments
                    </p>
                  </div>
                  <Switch id="appointment_reminders" defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="treatment_updates">Treatment Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notifications about your treatment plan
                    </p>
                  </div>
                  <Switch id="treatment_updates" defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="product_recommendations">
                      Product Recommendations
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive personalized product recommendations
                    </p>
                  </div>
                  <Switch id="product_recommendations" defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dental_tips">Dental Care Tips</Label>
                    <p className="text-sm text-muted-foreground">
                      Get weekly dental hygiene tips and reminders
                    </p>
                  </div>
                  <Switch id="dental_tips" defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email_notifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch id="email_notifications" defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push_notifications">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch id="push_notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize how the application looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark_mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch id="dark_mode" />
                </div>
                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="text_size">Text Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="text_size">
                      <SelectValue placeholder="Select text size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language Settings
                </CardTitle>
                <CardDescription>
                  Change your preferred language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="language">Application Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Manage your privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data_collection">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect usage data to improve services
                    </p>
                  </div>
                  <Switch id="data_collection" defaultChecked />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="third_party_sharing">
                      Third-Party Sharing
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow sharing data with trusted partners
                    </p>
                  </div>
                  <Switch id="third_party_sharing" />
                </div>
                <Separator />

                <div>
                  <Button variant="outline" className="w-full">
                    View Privacy Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full">
                  Connected Apps
                </Button>
                <Separator />
                <Button
                  variant="destructive"
                  className="w-full flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={saveSettings}>Save All Settings</Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
