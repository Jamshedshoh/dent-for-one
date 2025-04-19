
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarNavigation } from "@/components/SidebarNavigation";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen md:pl-16">
      <SidebarNavigation />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-secondary/20">
        <div className="text-9xl mb-4 text-primary">🦷</div>
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl text-muted-foreground mb-8 text-center">
          We couldn't find the page you're looking for.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          className="flex items-center"
        >
          <Home size={18} className="mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
