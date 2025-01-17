import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components
import { Business, Dentist, Home, Patient } from "./Home";
import { Shop } from "./Shop";
import { Community } from "./Community";
import { Contact } from "./Contact";
import { Blog } from "./Blog";
import {
  Appointments,
  Billing,
  Dashboard,
  DatabaseManagement,
  Inbox,
  Inventory,
  Overview,
  PatientManagement,
  Marketing,
  Reports,
  Settings,
} from "./Dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="dent">
      <Routes>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="community" element={<Community />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="patient" element={<Patient />} />
        <Route path="dentist" element={<Dentist />} />
        <Route path="business" element={<Business />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="billing" element={<Billing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="database" element={<DatabaseManagement />} />
          <Route path="patients" element={<PatientManagement />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
