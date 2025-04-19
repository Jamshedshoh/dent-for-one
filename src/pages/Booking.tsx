
import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { Calendar as CalendarIcon, Clock, MapPin, Video, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  date: string;
  time: string;
  type: string;
  provider: string;
  location: string;
  isVirtual?: boolean;
};

type DentistProvider = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  available: boolean;
};

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
}

export default function Booking() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Sample data - in a real app, this would come from an API
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "June 12, 2025",
      time: "2:30 PM",
      type: "Regular Checkup",
      provider: "Dr. Jennifer Wilson",
      location: "Smile Well Dental Clinic",
    },
    {
      id: "2",
      date: "August 5, 2025",
      time: "10:00 AM",
      type: "Teeth Cleaning",
      provider: "Dr. Michael Chen",
      location: "Downtown Dental",
      isVirtual: true,
    },
  ];
  
  const providers: DentistProvider[] = [
    {
      id: "1",
      name: "Dr. Jennifer Wilson",
      specialty: "General Dentist",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2342&auto=format&fit=crop",
      available: true,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Orthodontist",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2344&auto=format&fit=crop",
      available: true,
    },
    {
      id: "3",
      name: "Dr. Sarah Johnson",
      specialty: "Periodontist",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2348&auto=format&fit=crop",
      available: false,
    },
  ];
  
  const dates = ["Jun 10", "Jun 11", "Jun 12", "Jun 13", "Jun 14"];
  
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "9:00 AM", available: true },
    { id: "2", time: "10:30 AM", available: true },
    { id: "3", time: "1:00 PM", available: false },
    { id: "4", time: "2:30 PM", available: true },
    { id: "5", time: "4:00 PM", available: true },
  ];
  
  // Function to handle booking completion
  const completeBooking = () => {
    alert("Appointment booked successfully!");
    setBookingStep(0);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-16">
      <SidebarNavigation />
      <Header title="Booking" />
      
      <main className="container px-4 py-6">
        {bookingStep === 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Appointments</h2>
              <button 
                onClick={() => setBookingStep(1)}
                className="flex items-center text-sm px-3 py-1.5 bg-primary text-white rounded-lg"
              >
                <Plus size={16} className="mr-1" />
                Book New
              </button>
            </div>
            
            <div className="flex border-b border-border mb-6">
              <button
                className={`flex-1 pb-2 text-center font-medium text-sm ${
                  activeTab === "upcoming" 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`flex-1 pb-2 text-center font-medium text-sm ${
                  activeTab === "past" 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("past")}
              >
                Past
              </button>
            </div>
            
            {appointments.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">🦷</div>
                <h3 className="text-lg font-medium mb-2">No appointments</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You don't have any {activeTab} appointments.
                </p>
                <button 
                  onClick={() => setBookingStep(1)}
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Book Your First Appointment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="bg-card rounded-xl shadow-sm p-4 animate-fade-in"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium mb-1">{appointment.type}</h3>
                        <p className="text-sm text-muted-foreground">with {appointment.provider}</p>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        appointment.isVirtual ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      )}>
                        {appointment.isVirtual ? "Virtual" : "In-Person"}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm">
                        <CalendarIcon size={16} className="text-primary mr-2" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock size={16} className="text-primary mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        {appointment.isVirtual ? (
                          <Video size={16} className="text-primary mr-2" />
                        ) : (
                          <MapPin size={16} className="text-primary mr-2" />
                        )}
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg">
                        Reschedule
                      </button>
                      {appointment.isVirtual && (
                        <button className="flex-1 py-2 bg-primary text-white text-sm font-medium rounded-lg">
                          Join Call
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => bookingStep > 1 ? setBookingStep(bookingStep - 1) : setBookingStep(0)}
                className="p-1 mr-2 rounded-full hover:bg-muted"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold">
                {bookingStep === 1 && "Select Provider"}
                {bookingStep === 2 && "Select Date & Time"}
                {bookingStep === 3 && "Appointment Details"}
              </h2>
            </div>
            
            {bookingStep === 1 && (
              <div className="space-y-4">
                <div className="flex space-x-2 overflow-x-auto py-2 -mx-4 px-4">
                  <button className="px-3 py-1.5 bg-primary text-white rounded-full text-sm whitespace-nowrap">
                    All Providers
                  </button>
                  <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm whitespace-nowrap">
                    General Dentists
                  </button>
                  <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm whitespace-nowrap">
                    Orthodontists
                  </button>
                  <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm whitespace-nowrap">
                    Periodontists
                  </button>
                </div>
                
                {providers.map((provider) => (
                  <div 
                    key={provider.id}
                    className={cn(
                      "bg-card rounded-xl shadow-sm p-4 flex items-center",
                      !provider.available && "opacity-60"
                    )}
                  >
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{provider.name}</h3>
                      <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-xs ${i < Math.floor(provider.rating) ? "text-amber-500" : "text-muted"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs ml-1">{provider.rating}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => provider.available && setBookingStep(2)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium ml-4",
                        provider.available 
                          ? "bg-primary text-white" 
                          : "bg-secondary text-muted-foreground cursor-not-allowed"
                      )}
                      disabled={!provider.available}
                    >
                      {provider.available ? "Select" : "Unavailable"}
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {bookingStep === 2 && (
              <div>
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Select Date</h3>
                  <div className="flex space-x-2 overflow-x-auto -mx-4 px-4 py-2">
                    {dates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "w-16 h-16 rounded-xl flex flex-col items-center justify-center",
                          selectedDate === date 
                            ? "bg-primary text-white" 
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        <span className="text-xs mb-1">{date.split(" ")[0]}</span>
                        <span className="font-medium">{date.split(" ")[1]}</span>
                      </button>
                    ))}
                    <button className="w-12 h-16 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Select Time</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                        disabled={!slot.available}
                        className={cn(
                          "py-3 rounded-lg text-sm font-medium",
                          !slot.available && "opacity-50 cursor-not-allowed",
                          selectedTimeSlot === slot.time 
                            ? "bg-primary text-white" 
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setBookingStep(3)}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className={cn(
                    "w-full py-3 rounded-lg text-white text-sm font-medium",
                    (!selectedDate || !selectedTimeSlot) 
                      ? "bg-primary/50 cursor-not-allowed" 
                      : "bg-primary"
                  )}
                >
                  Continue
                </button>
              </div>
            )}
            
            {bookingStep === 3 && (
              <div>
                <div className="bg-card rounded-xl shadow-sm p-4 mb-6">
                  <h3 className="font-medium mb-4">Appointment Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Provider</span>
                      <span className="text-sm font-medium">Dr. Jennifer Wilson</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Service</span>
                      <span className="text-sm font-medium">Regular Checkup</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="text-sm font-medium">{selectedDate || "Jun 12"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time</span>
                      <span className="text-sm font-medium">{selectedTimeSlot || "2:30 PM"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="text-sm font-medium">In-Person</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm font-medium">Smile Well Dental Clinic</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl shadow-sm p-4 mb-6">
                  <h3 className="font-medium mb-2">Special Requests</h3>
                  <textarea 
                    placeholder="Any special requests or concerns for your appointment..."
                    className="w-full p-3 border border-border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <button
                  onClick={completeBooking}
                  className="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium"
                >
                  Confirm Booking
                </button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  You can reschedule or cancel up to 24 hours before your appointment.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
}
