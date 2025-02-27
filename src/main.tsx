import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components
import { Business, Dentist, Home, Patient } from "./components/Home";
import { Shop } from "./components/Shop";
import { Community } from "./components/Community";
import { Contact } from "./components/Contact";
import { Blog, Post } from "./components/Blog";
import { Blog as BlogDashboard } from "./components/Dashboard/Blog";
import {
  Dashboard,
  Inbox,
  Overview,
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
  InventoryProvider,
  CategoriesProvider,
  DiscountsProvider,
  SuppliersProvider,
  PreOrdersProvider,
  BlogProvider,
} from "./contexts";
import { ShopProvider } from "./contexts/ShopContext";
import { ProductDetails } from "./components/Shop/ProductDetails";
import { Cart } from "./components/Shop/Cart";
import { Catalog } from "./components/Shop/Catalog";
import { Checkout } from "./components/Shop/Checkout";
import { OrderProvider } from "./contexts/OrderContext";
import { Suppliers } from "./components/Dashboard/Suppliers";
import { Categories } from "./components/Dashboard/Categories";
import { Discounts } from "./components/Dashboard/Discounts";
import { PreOrders } from "./components/Dashboard/PreOrders";
import { Inventory } from "./components/Dashboard/Inventory";
import { BackgroundTaskProvider } from "./contexts/BackgroundTaskContext";

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
              <Route path="catalog/:category" element={<Catalog />} />
              <Route
                path="catalog/:category/:subcategory"
                element={<Catalog />}
              />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="checkout"
                element={
                  <OrderProvider>
                    <Checkout />
                  </OrderProvider>
                }
              />
            </Route>
            <Route path="community" element={<Community />} />
            <Route
              path="blog"
              element={
                <BlogProvider>
                  <Blog />
                </BlogProvider>
              }
            />
            <Route
              path="blog/:id"
              element={
                <BlogProvider>
                  <Post />
                </BlogProvider>
              }
            />
            <Route path="contact" element={<Contact />} />
            <Route path="patient" element={<Patient />} />
            <Route path="dentist" element={<Dentist />} />
            <Route path="business" element={<Business />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route
                path="overview"
                element={
                  <BackgroundTaskProvider>
                    <Overview />
                  </BackgroundTaskProvider>
                }
              />
              <Route path="inbox" element={<Inbox />} />
              <Route
                path="blog"
                element={
                  <BlogProvider>
                    <BlogDashboard />
                  </BlogProvider>
                }
              />
              <Route
                path="shop/products"
                element={
                  <ProductsProvider>
                    <CategoriesProvider>
                      <Products />
                    </CategoriesProvider>
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
              <Route
                path="shop/suppliers"
                element={
                  <SuppliersProvider>
                    <Suppliers />
                  </SuppliersProvider>
                }
              />
              <Route
                path="shop/categories"
                element={
                  <CategoriesProvider>
                    <Categories />
                  </CategoriesProvider>
                }
              />
              <Route
                path="shop/discounts"
                element={
                  <DiscountsProvider>
                    <Discounts />
                  </DiscountsProvider>
                }
              />
              <Route
                path="shop/inventory"
                element={
                  <InventoryProvider>
                    <ProductsProvider>
                      <Inventory />
                    </ProductsProvider>
                  </InventoryProvider>
                }
              />
              <Route
                path="shop/pre-orders"
                element={
                  <PreOrdersProvider>
                    <PreOrders />
                  </PreOrdersProvider>
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
