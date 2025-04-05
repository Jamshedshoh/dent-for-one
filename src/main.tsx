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
import {
  Account as ShopAccount,
  Messages as ShopAccountMessages,
  Orders as ShopAccountOrders,
  Payments as ShopAccountPayments,
  Receipts as ShopAccountReceipts,
  Favorites as ShopAccountFavorites,
  Settings as ShopAccountSettings,
} from "./components/Shop/Account";
import {
  Account as BookingAccount,
  Messages as BookingAccountMessages,
  Appointments as BookingAccountAppointments,
  Documents as BookingAccountDocuments,
  Treatment as BookingAccountTreatment,
  PaymentHistory as BookingAccountPaymentHistory,
  Feedback as BookingAccountFeedback,
  Settings as BookingAccountSettings,
} from "./components/Booking/Account";
import {
  Account as CareAccount,
  Messages as CareAccountMessages,
  Planner as CareAccountPlanner,
  Progress as CareAccountProgress,
  Programs as CareAccountPrograms,
  Resources as CareAccountResources,
} from "./components/Care/Account";
import {
  Account as SocialShareAccount,
  Messages as SocialShareAccountMessages,
  ContentPool as SocialShareAccountContentPool,
  Schedule as SocialShareAccountSchedule,
  ContentCreator as SocialShareAccountContentCreator,
  Resources as SocialShareAccountResources,
} from "./components/SocialShare/Account";
import { NotFoundPage } from "./components/NotFound";
import { Booking, Calendar, Dentists } from "./components/Booking";
import { Care, Consultation } from "./components/Care";
import { SocialShare, Explore } from "./components/SocialShare";
import {
  Manage,
  Users as ManageUsers,
  Messages as ManageMessages,
  Shop as ManageShop,
  Booking as ManageBooking,
  SocialShare as ManageSocialShare,
  Care as ManageCare,
} from "./components/Manage";

export const Providers = ({ children }: any) => (
  <AuthProvider>
    <ShopProvider>
      <BackgroundTaskProvider>
        <BlogProvider>
          <OrderProvider>
            <InventoryProvider>
              <ProductsProvider>
                <CategoriesProvider>
                  <SuppliersProvider>
                    <OrdersProvider>
                      <PaymentsProvider>
                        <DiscountsProvider>
                          <PreOrdersProvider>{children}</PreOrdersProvider>
                        </DiscountsProvider>
                      </PaymentsProvider>
                    </OrdersProvider>
                  </SuppliersProvider>
                </CategoriesProvider>
              </ProductsProvider>
            </InventoryProvider>
          </OrderProvider>
        </BlogProvider>
      </BackgroundTaskProvider>
    </ShopProvider>
  </AuthProvider>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
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
            <Route path="checkout" element={<Checkout />} />
            <Route path="account">
              <Route index element={<ShopAccount />} />
              <Route path="messages" element={<ShopAccountMessages />} />
              <Route path="orders" element={<ShopAccountOrders />} />
              <Route path="payments" element={<ShopAccountPayments />} />
              <Route path="receipts" element={<ShopAccountReceipts />} />
              <Route path="favorites" element={<ShopAccountFavorites />} />
              <Route path="settings" element={<ShopAccountSettings />} />
            </Route>
          </Route>
          <Route path="booking">
            <Route index element={<Booking />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="dentists" element={<Dentists />} />
            <Route path="account">
              <Route index element={<BookingAccount />} />
              <Route path="messages" element={<BookingAccountMessages />} />
              <Route
                path="appointments"
                element={<BookingAccountAppointments />}
              />
              <Route path="documents" element={<BookingAccountDocuments />} />
              <Route path="treatment" element={<BookingAccountTreatment />} />
              <Route
                path="payment-history"
                element={<BookingAccountPaymentHistory />}
              />
              <Route path="feedback" element={<BookingAccountFeedback />} />
              <Route path="settings" element={<BookingAccountSettings />} />
            </Route>
          </Route>
          <Route path="care">
            <Route index element={<Care />} />
            <Route path="consultation" element={<Consultation />} />
            <Route path="account">
              <Route index element={<CareAccount />} />
              <Route path="messages" element={<CareAccountMessages />} />
              <Route path="planner" element={<CareAccountPlanner />} />
              <Route path="progress" element={<CareAccountProgress />} />
              <Route path="programs" element={<CareAccountPrograms />} />
              <Route path="resources" element={<CareAccountResources />} />
              <Route path="settings" element={<BookingAccountSettings />} />
            </Route>
          </Route>
          <Route path="social-share">
            <Route index element={<SocialShare />} />
            <Route path="explore" element={<Explore />} />
            <Route path="account">
              <Route index element={<SocialShareAccount />} />
              <Route path="messages" element={<SocialShareAccountMessages />} />
              <Route
                path="content-pool"
                element={<SocialShareAccountContentPool />}
              />
              <Route path="schedule" element={<SocialShareAccountSchedule />} />
              <Route
                path="content-creator"
                element={<SocialShareAccountContentCreator />}
              />
              <Route
                path="resources"
                element={<SocialShareAccountResources />}
              />
              <Route path="settings" element={<BookingAccountSettings />} />
            </Route>
          </Route>
          <Route path="manage">
            <Route index element={<Manage />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="shop" element={<ManageShop />} />
            <Route path="booking" element={<ManageBooking />} />
            <Route path="social-share" element={<ManageSocialShare />} />
            <Route path="care" element={<ManageCare />} />
          </Route>
          <Route path="community" element={<Community />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<Post />} />
          <Route path="contact" element={<Contact />} />
          <Route path="patient" element={<Patient />} />
          <Route path="dentist" element={<Dentist />} />
          <Route path="business" element={<Business />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="overview" element={<Overview />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="blog" element={<BlogDashboard />} />
            <Route path="shop/products" element={<Products />} />
            <Route path="shop/orders" element={<Orders />} />
            <Route path="shop/payments" element={<Payments />} />
            <Route path="shop/suppliers" element={<Suppliers />} />
            <Route path="shop/categories" element={<Categories />} />
            <Route path="shop/discounts" element={<Discounts />} />
            <Route path="shop/inventory" element={<Inventory />} />
            <Route path="shop/pre-orders" element={<PreOrders />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />{" "}
        </Routes>
      </Router>
    </Providers>
  </StrictMode>
);
