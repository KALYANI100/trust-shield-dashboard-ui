// import { useState } from "react";
// import { Shield, Users, Activity, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { useNavigate } from "react-router-dom";
// import WalmartLogo from '../Images/wlogo.png';

// const Index = () => {
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState<'customer' | 'admin' | null>(null);

//   const handleRoleSelection = (role: 'customer' | 'admin') => {
//     setUserType(role);
//     if (role === 'customer') {
//       navigate('/customer-dashboard');
//     } else {
//       navigate('/admin-dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <img 
//                 src={WalmartLogo} 
//                 alt="Walmart Logo" 
//                 className="h-8 w-8 object-contain" 
//               />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Walmart</h1>
//                 {/* <p className="text-sm text-gray-600">Cybersecurity Trust Platform</p> */}
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Badge variant="secondary" className="bg-green-100 text-green-800">
//                 <CheckCircle className="h-3 w-3 mr-1" />
//                 All Systems Secure
//               </Badge>
//               <Button 
//                 variant="outline"
//                 onClick={() => navigate('/login')}
//               >
//                 Sign In
//               </Button>
//               <Button 
//                 onClick={() => navigate('/shop')}
//                 className="bg-blue-600 hover:bg-blue-700"
//               >
//                 Start Shopping
//                 <ArrowRight className="h-4 w-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Enterprise-Grade Security Platform
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Advanced threat detection, real-time monitoring, and AI-powered fraud prevention 
//             to protect your business and customers.
//           </p>
//         </div>

//         {/* Platform Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//           <Card className="text-center">
//             <CardContent className="pt-6">
//               <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
//               <div className="text-2xl font-bold text-gray-900">99.9%</div>
//               <div className="text-sm text-gray-600">Threat Detection Rate</div>
//             </CardContent>
//           </Card>
          
//           <Card className="text-center">
//             <CardContent className="pt-6">
//               <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
//               <div className="text-2xl font-bold text-gray-900">24/7</div>
//               <div className="text-sm text-gray-600">Real-time Monitoring</div>
//             </CardContent>
//           </Card>
          
//           <Card className="text-center">
//             <CardContent className="pt-6">
//               <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
//               <div className="text-2xl font-bold text-gray-900">2.3M</div>
//               <div className="text-sm text-gray-600">Events Processed Daily</div>
//             </CardContent>
//           </Card>
          
//           <Card className="text-center">
//             <CardContent className="pt-6">
//               <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
//               <div className="text-2xl font-bold text-gray-900">50K+</div>
//               <div className="text-sm text-gray-600">Protected Users</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Shopping CTA */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-12 text-white text-center">
//           <h3 className="text-2xl font-bold mb-4">Experience Secure Shopping</h3>
//           <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
//             Shop with confidence knowing every transaction is protected by AI-powered security, 
//             blockchain verification, and real-time fraud detection.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <Button 
//               size="lg"
//               variant="secondary"
//               onClick={() => navigate('/shop')}
//               className="bg-white text-blue-600 hover:bg-blue-50"
//             >
//               <Shield className="h-5 w-5 mr-2" />
//               Start Secure Shopping
//             </Button>
//             <Button 
//               size="lg"
//               variant="outline"
//               onClick={() => navigate('/login')}
//               className="bg-white text-blue-600 hover:bg-blue-50"
//             >
//               Sign In to Account
//             </Button>
//           </div>
//         </div>

//         {/* Role Selection */}
//         <div className="max-w-4xl mx-auto">
//           <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
//             Access Your Dashboard
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Customer Portal */}
//             <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
//               <CardHeader className="text-center">
//                 <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//                   <Shield className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <CardTitle className="text-xl">Customer Portal</CardTitle>
//                 <CardDescription>
//                   View your security status, transaction history, and manage your account protection
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600 mb-6">
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     Security Score Dashboard
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     Blockchain Transaction Verification
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     Fraud Alert Management
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     Automated Dispute Resolution
//                   </li>
//                 </ul>
//                 <Button 
//                   onClick={() => navigate('/login')}
//                   className="w-full bg-blue-600 hover:bg-blue-700"
//                 >
//                   Access Customer Portal
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Admin Dashboard */}
//             <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-red-200">
//               <CardHeader className="text-center">
//                 <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//                   <AlertTriangle className="h-8 w-8 text-red-600" />
//                 </div>
//                 <CardTitle className="text-xl">Admin Dashboard</CardTitle>
//                 <CardDescription>
//                   Monitor threats, manage security policies, and oversee platform operations
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600 mb-6">
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     Real-time Threat Monitoring
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     Zero-Trust Policy Management
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     AI Bot Defense Console
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                     Automated Response Workflows
//                   </li>
//                 </ul>
//                 <Button 
//                   onClick={() => navigate('/login')}
//                   className="w-full bg-red-600 hover:bg-red-700"
//                 >
//                   Access Admin Dashboard
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Security Features Preview */}
//         <div className="mt-16">
//           <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
//             Advanced Security Features
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
//                 <Shield className="h-6 w-6 text-green-600" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">AI Fraud Detection</h4>
//               <p className="text-sm text-gray-600">
//                 Machine learning algorithms detect suspicious patterns and prevent fraud in real-time
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
//                 <Activity className="h-6 w-6 text-purple-600" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Blockchain Verification</h4>
//               <p className="text-sm text-gray-600">
//                 Immutable transaction records with cryptographic proof of authenticity
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="mx-auto bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
//                 <TrendingUp className="h-6 w-6 text-orange-600" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Predictive Analytics</h4>
//               <p className="text-sm text-gray-600">
//                 Advanced threat intelligence to predict and prevent security incidents
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;

import { useState } from "react";
import {
  Shield,
  Users,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import WalmartLogo from "../Images/wlogo.png";

const Index = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"customer" | "admin" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <img
                src={WalmartLogo}
                alt="Walmart Logo"
                className="h-8 w-8 object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">Walmart</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                All Systems Secure
              </Badge>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/shop")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Enterprise-Grade Security Platform
          </h2>
          <p className="text-md sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced threat detection, real-time monitoring, and AI-powered fraud prevention
            to protect your business and customers.
          </p>
        </div>

        {/* Staggered Brand Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Shop Popular Brands
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[150px] sm:auto-rows-[200px]">
            {[
              { id: 1, span: "md:col-span-2 md:row-span-2", height: "h-[300px] sm:h-[400px]" },
              { id: 2, span: "", height: "h-[150px] sm:h-[200px]" },
              { id: 3, span: "", height: "h-[150px] sm:h-[200px]" },
              { id: 4, span: "md:row-span-2", height: "h-[300px] sm:h-[400px]" },
              { id: 5, span: "", height: "h-[150px] sm:h-[200px]" },
              { id: 6, span: "", height: "h-[150px] sm:h-[200px]" },
              { id: 7, span: "", height: "h-[150px] sm:h-[200px]" },
              { id: 8, span: "", height: "h-[150px] sm:h-[200px]" },
            ].map((item) => (
              <div
                key={item.id}
                className={`relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white ${item.span}`}
              >
                <img
                  src={`/images/brand${item.id}.png`}
                  alt={`Brand ${item.id}`}
                  className={`w-full ${item.height} object-cover transition-transform group-hover:scale-105 duration-300`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex items-end p-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Threat Detection Rate</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Real-time Monitoring</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2.3M</div>
              <div className="text-sm text-gray-600">Events Processed Daily</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Protected Users</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Experience Secure Shopping</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Shop with confidence knowing every transaction is protected by AI-powered security,
            blockchain verification, and real-time fraud detection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/shop")}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Shield className="h-5 w-5 mr-2" />
              Start Secure Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Sign In to Account
            </Button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Key Capability At Glance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Customer Portal */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Customer Portal</CardTitle>
                <CardDescription>
                  View your security status, transaction history, and manage your account protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Security Score Dashboard
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Blockchain Transaction Verification
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Fraud Alert Management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Automated Dispute Resolution
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Admin Dashboard */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-red-200">
              <CardHeader className="text-center">
                <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  Monitor threats, manage security policies, and oversee platform operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Real-time Threat Monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Zero-Trust Policy Management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    AI Bot Defense Console
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Automated Response Workflows
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-16 px-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Advanced Security Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Fraud Detection</h4>
              <p className="text-sm text-gray-600">
                Machine learning algorithms detect suspicious patterns and prevent fraud in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Blockchain Verification</h4>
              <p className="text-sm text-gray-600">
                Immutable transaction records with cryptographic proof of authenticity
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Predictive Analytics</h4>
              <p className="text-sm text-gray-600">
                Advanced threat intelligence to predict and prevent security incidents
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-24 w-full text-center md:text-left">
          {/* Your footer content remains the same */}
          {/* You can paste it here again if needed */}
        </footer>
      </div>
    </div>
  );
};

export default Index;
