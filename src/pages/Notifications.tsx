import { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  to_user_id: string;
  type: string;
  title: string;
  description: string;
  isNew: boolean;
  action: string;
  isRead: boolean;
  created_at: string;
  updated_at: string;
}

export default function Notifications() {
  const markAllRead = async () => {
    await supabase
      .from("notifications")
      .update({ isRead: true })
      .eq("isRead", false)
      .then((response) => {
        if (response.error) {
          console.error("Error marking notifications as read:", response.error);
          toast.error("Failed to mark notifications as read");
        } else {
          setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({
              ...notification,
              isRead: true,
            }))
          );
        }
      });
    toast.success("All notifications marked as read");
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    let { data: notifications, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("Error fetching notifications:", error);
    else setNotifications(notifications);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-20">
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
                  <CardTitle>Recent Notifications</CardTitle>
                  {notifications.filter((i) => i.isNew).length > 0 && (
                    <Badge className="bg-primary">
                      {notifications.filter((i) => i.isNew).length} New
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  You have {notifications.filter((i) => !i.isRead).length}{" "}
                  unread notifications
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {notifications
                  .filter((i) => !i.isRead)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-primary/5 p-4 rounded-lg border border-primary/20"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "message" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            {notification.type === "appointment" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "care" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "offer" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                Shop Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <Separator />

                {notifications
                  .filter((i) => i.isRead)
                  .map((notification) => (
                    <div key={notification.id} className="p-4 rounded-lg">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "general" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                            >
                              {notification.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                {notifications
                  .filter((i) => !i.isRead && i.type === "appointment")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-primary/5 p-4 rounded-lg border border-primary/20"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "message" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            {notification.type === "appointment" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "care" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "offer" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                Shop Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <Separator />

                {notifications
                  .filter((i) => i.isRead && i.type === "appointment")
                  .map((notification) => (
                    <div key={notification.id} className="p-4 rounded-lg">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "general" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                            >
                              {notification.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                {notifications
                  .filter((i) => !i.isRead && i.type === "care")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-primary/5 p-4 rounded-lg border border-primary/20"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "message" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            {notification.type === "appointment" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "care" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "offer" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                Shop Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <Separator />

                {notifications
                  .filter((i) => i.isRead && i.type === "care")
                  .map((notification) => (
                    <div key={notification.id} className="p-4 rounded-lg">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "general" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                            >
                              {notification.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                {notifications
                  .filter((i) => !i.isRead && i.type === "offer")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-primary/5 p-4 rounded-lg border border-primary/20"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                          )}
                          {notification.type === "message" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            {notification.type === "appointment" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "care" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                View
                              </Button>
                            )}
                            {notification.type === "offer" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                Shop Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <Separator />

                {notifications
                  .filter((i) => i.isRead && i.type === "offer")
                  .map((notification) => (
                    <div key={notification.id} className="p-4 rounded-lg">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {notification.type === "appointment" && (
                            <Calendar className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "care" && (
                            <Heart className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "offer" && (
                            <ShoppingBag className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                          {notification.type === "general" && (
                            <Mail className="h-10 w-10 p-2 bg-muted text-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.created_at).toDateString()}
                              &nbsp;&mdash;&nbsp;
                              {new Date(notification.created_at).toTimeString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                            >
                              {notification.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
}
