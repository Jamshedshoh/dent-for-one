import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components
import { Business, Dentist, Home, Patient } from "./components/Home";
import { Shop } from "./components/Shop";
import { Community } from "./components/Community";
import { Contact } from "./components/Contact";
import { Blog } from "./components/Blog";
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
  Products,
  Orders,
  Payments,
} from "./components/Dashboard";
import { LoginPage, RegisterPage } from "./components/Auth";
import {
  AuthProvider,
  OrdersProvider,
  PaymentsProvider,
  ProductsProvider,
} from "./contexts";
import { ShopProvider } from "./contexts/ShopContext";
import { ProductDetails } from "./components/Shop/ProductDetails";
import { Cart } from "./components/Shop/Cart";
import { Catalog } from "./components/Shop/Catalog";
import { Checkout } from "./components/Shop/Checkout";
import { OrderProvider } from "./contexts/OrderContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ShopProvider>
        <Router basename="dent">
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="shop">
              <Route index element={<Shop />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} /> 
              <Route path="checkout" element={
                <OrderProvider>
                  <Checkout />
                </OrderProvider>
                } />
            </Route>
            <Route path="community" element={<Community />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="patient" element={<Patient />} />
            <Route path="dentist" element={<Dentist />} />
            <Route path="business" element={<Business />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="overview" element={<Overview />} />
              <Route path="inbox" element={<Inbox />} />
              <Route
                path="shop/products"
                element={
                  <ProductsProvider>
                    <Products />
                  </ProductsProvider>
                }
              />
              <Route
                path="shop/orders"
                element={
                  <OrdersProvider>
                    <Orders />
                  </OrdersProvider>
                }
              />
              <Route
                path="shop/payments"
                element={
                  <PaymentsProvider>
                    <Payments />
                  </PaymentsProvider>
                }
              />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </ShopProvider>
    </AuthProvider>
  </StrictMode>
);
