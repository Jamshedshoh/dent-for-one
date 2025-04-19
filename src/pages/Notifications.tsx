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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Heart, ShoppingBag, Mail, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Notifications() {
  const markAllRead = () => {
    toast.success("All notifications marked as read");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      <main className="container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Notifications</h2>
          </div>
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="care">Care</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    Recent Notifications
                  </CardTitle>
                  <Badge className="bg-primary">3 New</Badge>
                </div>
                <CardDescription>
                  You have 9 unread notifications
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Calendar className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">
                          Appointment Reminder
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your dental checkup is scheduled for tomorrow at 2:30 PM
                        with Dr. Sarah Johnson.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          Today, 9:42 AM
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Heart className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">Care Reminder</h4>
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Time to replace your toothbrush! It's been 3 months
                        since your last replacement.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          Yesterday, 2:15 PM
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <ShoppingBag className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">Special Offer</h4>
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        20% off on all electric toothbrushes this week! Use code
                        SMILE20 at checkout.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          2 days ago
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Shop
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="p-4 rounded-lg">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        Treatment Plan Updated
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Dr. Johnson has updated your treatment plan. Please
                        review the changes.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          1 week ago
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Calendar className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        Appointment Completed
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your cleaning appointment with Dr. Sarah Johnson has
                        been completed.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          2 weeks ago
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="link">View All Notifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Notifications</CardTitle>
                <CardDescription>
                  Updates about your upcoming and past appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Calendar className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">
                          Appointment Reminder
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your dental checkup is scheduled for tomorrow at 2:30 PM
                        with Dr. Sarah Johnson.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          Today, 9:42 AM
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Calendar className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        Appointment Completed
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your cleaning appointment with Dr. Sarah Johnson has
                        been completed.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          2 weeks ago
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Care Notifications</CardTitle>
                <CardDescription>
                  Reminders and tips for your dental health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Heart className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">Care Reminder</h4>
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Time to replace your toothbrush! It's been 3 months
                        since your last replacement.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          Yesterday, 2:15 PM
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Heart className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Flossing Reminder</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Don't forget to floss daily for optimal gum health and
                        to prevent cavities between teeth.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          3 days ago
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Tips
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Offers & Promotions</CardTitle>
                <CardDescription>
                  Special deals and offers for dental products and services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <ShoppingBag className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">Special Offer</h4>
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        20% off on all electric toothbrushes this week! Use code
                        SMILE20 at checkout.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          2 days ago
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Shop
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <ShoppingBag className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Whitening Special</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Book a teeth whitening treatment this month and get a
                        free take-home kit!
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          1 week ago
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
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
