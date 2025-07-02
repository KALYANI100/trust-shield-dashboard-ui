
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import CustomerDashboard from "./pages/CustomerDashboard";
import AccountSecurity from "./pages/AccountSecurity";
import AdminDashboard from "./pages/AdminDashboard";
import FraudReview from "./pages/FraudReview";
import PaymentSecurity from "./pages/PaymentSecurity";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import Dispute from "./pages/Dispute";
import Security from "./pages/Security";
//new route added
import SettingsPage from "./pages/SettingPage";


import PrivateRoute from "./components/ui/privateRoute";
import RoleBasedRoute from "./components/ui/RoleBasedRoute";


const queryClient = new QueryClient();
const clientId ="42747422440-mqf33ao1m9836i3m0lm1tes6q2josaim.apps.googleusercontent.com";


const App = () => (
 
  
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {/* <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/account-security" element={<AccountSecurity />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/fraud-review" element={<FraudReview />} />
              <Route path="/payment-security" element={<PaymentSecurity />} />
              <Route path="/dispute" element={<Dispute />} />
              <Route path="/secure" element={<Security />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes> */}
            <Routes>
  {/* ✅ Public Routes */}
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Register />} />

  {/* 🔒 Admin-Only Private Routes */}
  <Route
    path="/shop"
    element={
      <RoleBasedRoute allowedRoles={["admin","user"]}>
        <Shop />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/checkout"
    element={
      <RoleBasedRoute allowedRoles={["admin","user"]}>
        <Checkout />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/customer-dashboard"
    element={
      <RoleBasedRoute allowedRoles={["admin","user"]}>
        <CustomerDashboard />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/account-security"
    element={
      <RoleBasedRoute allowedRoles={["admin","user"]}>
        <AccountSecurity />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/admin-dashboard"
    element={
      <RoleBasedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/fraud-review"
    element={
      <RoleBasedRoute allowedRoles={["admin"]}>
        <FraudReview />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/payment-security"
    element={
      <RoleBasedRoute allowedRoles={["admin","user"]}>
        <PaymentSecurity />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/dispute"
    element={
      <RoleBasedRoute allowedRoles={["admin","user"]}>
        <Dispute />
      </RoleBasedRoute>
    }
  />
  <Route
    path="/secure"
    element={
      <RoleBasedRoute allowedRoles={["admin"]}>
        <Security />
      </RoleBasedRoute>
    }
  />

  {/* ❌ Fallback for unauthorized and unknown */}
  <Route path="/unauthorized" element={<p>Unauthorized access</p>} />
  <Route path="*" element={<NotFound />} />
</Routes>

          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

export default App;
