import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Award, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  emergency_contact: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    birthdate: "",
    emergency_contact: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile data on component mount
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfile({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            address: data.address || "",
            birthdate: data.birthdate || "",
            emergency_contact: data.emergency_contact || "",
          });
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  // Save profile changes
  const saveProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        birthdate: profile.birthdate,
        emergency_contact: profile.emergency_contact,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      <main className="container px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Profile Summary Card */}
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage
                  src={`https://i.pravatar.cc/150?u=${user?.id}`}
                  alt={profile.first_name}
                />
                <AvatarFallback>
                  {profile.first_name.charAt(0)}
                  {profile.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle>
                {profile.first_name} {profile.last_name}
              </CardTitle>
              <CardDescription>
                Member since{" "}
                {new Date(user?.created_at || "").toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-muted-foreground" />
                <span>
                  {profile.birthdate
                    ? new Date(profile.birthdate).toLocaleDateString()
                    : "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-muted-foreground" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-muted-foreground" />
                <span>{profile.phone || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-muted-foreground" />
                <span>{profile.address || "Not specified"}</span>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-sm">
                <Award size={16} className="text-primary" />
                <span>Gold Member</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-primary" />
                <span>Next appointment: May 15, 2025</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Dental History
              </Button>
            </CardFooter>
          </Card>

          {/* Edit Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={profile.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={profile.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={profile.birthdate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact">Emergency Contact</Label>
                <Input
                  id="emergency_contact"
                  value={profile.emergency_contact}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={saveProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
