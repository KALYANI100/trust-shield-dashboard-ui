
// import { useState, useEffect } from "react";
// import { Shield, CreditCard, Smartphone, Lock, CheckCircle, AlertTriangle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verificationStep, setVerificationStep] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');

//   const verificationSteps = [
//     "Analyzing transaction patterns...",
//     "Running AI fraud detection...",
//     "Verifying payment security...",
//     "Transaction approved ✅"
//   ];

//   const handlePayment = async () => {
//     setIsVerifying(true);
    
//     for (let i = 0; i < verificationSteps.length; i++) {
//       setVerificationStep(i);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }
    
//     toast.success("Payment successful! Your order is secured by blockchain.");
//     navigate('/customer-dashboard');
//     setIsVerifying(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Shield className="h-8 w-8 text-blue-600" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
//                 <p className="text-sm text-gray-600">Your payment is protected</p>
//               </div>
//             </div>
//             <Badge variant="secondary" className="bg-green-100 text-green-800">
//               <Lock className="h-3 w-3 mr-1" />
//               256-bit SSL Encryption
//             </Badge>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Payment Methods */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
//                   Payment Method
//                 </CardTitle>
//                 <CardDescription>
//                   All payment methods are secured by Walmart AI
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 gap-3">
//                   <Card 
//                     className={`cursor-pointer border-2 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
//                     onClick={() => setPaymentMethod('card')}
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                           <CreditCard className="h-6 w-6 text-gray-600" />
//                           <div>
//                             <p className="font-medium">Credit/Debit Card</p>
//                             <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
//                           </div>
//                         </div>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">
//                           <Shield className="h-3 w-3 mr-1" />
//                           AI Secured
//                         </Badge>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card 
//                     className={`cursor-pointer border-2 ${paymentMethod === 'apple' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
//                     onClick={() => setPaymentMethod('apple')}
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                           <Smartphone className="h-6 w-6 text-gray-600" />
//                           <div>
//                             <p className="font-medium">Apple Pay</p>
//                             <p className="text-sm text-gray-500">Touch ID / Face ID</p>
//                           </div>
//                         </div>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">
//                           <Shield className="h-3 w-3 mr-1" />
//                           Biometric
//                         </Badge>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card 
//                     className={`cursor-pointer border-2 ${paymentMethod === 'google' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
//                     onClick={() => setPaymentMethod('google')}
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                           <Smartphone className="h-6 w-6 text-gray-600" />
//                           <div>
//                             <p className="font-medium">Google Pay</p>
//                             <p className="text-sm text-gray-500">Fingerprint / PIN</p>
//                           </div>
//                         </div>
//                         <Badge variant="secondary" className="bg-green-100 text-green-800">
//                           <Shield className="h-3 w-3 mr-1" />
//                           Secured
//                         </Badge>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Security Features */}
//             <Card className="border-green-200 bg-green-50">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-green-800">
//                   <Shield className="h-5 w-5 mr-2" />
//                   Your Payment is Protected
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3 text-sm text-green-700">
//                   <div className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     AI-powered fraud detection active
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Blockchain transaction verification
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     End-to-end encryption (256-bit SSL)
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Real-time security monitoring
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Order Summary */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span>iPhone 15 Pro</span>
//                     <span>$999.00</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>AirPods Pro</span>
//                     <span>$249.00</span>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>Tax</span>
//                     <span>$99.84</span>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>Shipping</span>
//                     <span className="text-green-600">FREE</span>
//                   </div>
//                   <div className="border-t pt-3">
//                     <div className="flex justify-between font-bold text-lg">
//                       <span>Total</span>
//                       <span>$1,347.84</span>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Verification Status */}
//             {isVerifying && (
//               <Card className="border-blue-200 bg-blue-50">
//                 <CardContent className="p-6">
//                   <div className="text-center space-y-4">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//                     <p className="font-medium text-blue-800">
//                       {verificationSteps[verificationStep]}
//                     </p>
//                     <Progress value={(verificationStep + 1) * 25} className="h-2" />
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             <Button 
//               className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
//               onClick={handlePayment}
//               disabled={isVerifying}
//             >
//               {isVerifying ? (
//                 "Processing Payment..."
//               ) : (
//                 <>
//                   <Lock className="h-5 w-5 mr-2" />
//                   Complete Secure Payment
//                 </>
//               )}
//             </Button>

//             <p className="text-xs text-gray-500 text-center">
//               By completing this purchase, you agree to our Terms of Service. 
//               Your payment information is encrypted and secure.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import { useState } from "react";
import { 
  Shield, CreditCard, Smartphone, Lock, CheckCircle, 
  ArrowLeft, ShoppingCart, LogOut, Mail, Wallet 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Checkout = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google' | 'walmart'>('card');
  const [showCardForm, setShowCardForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const verificationSteps = [
    "Analyzing transaction patterns...",
    "Running AI fraud detection...",
    "Verifying payment security...",
    "Transaction approved ✅"
  ];

  const handlePayment = async () => {
    if (paymentMethod === 'walmart' && !otp) {
      toast.error("Please verify with OTP first");
      return;
    }

    setIsVerifying(true);
    
    for (let i = 0; i < verificationSteps.length; i++) {
      setVerificationStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    toast.success("Payment successful! Your order is secured by blockchain.");
    navigate('/customer-dashboard');
    setIsVerifying(false);
  };

  const handleSendOtp = () => {
    if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
      toast.error("Please fill all card details");
      return;
    }
    toast.success("OTP sent to your registered email");
    setOtpSent(true);
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="p-2 text-gray-700 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-600/10">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Secure Checkout</h1>
                  <p className="text-sm text-gray-500">Your payment is protected</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleContinueShopping}
                className="text-gray-700 border-gray-300"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Lock className="h-3 w-3 mr-1" />
                256-bit SSL
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 text-blue-600 mr-2" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Choose your preferred secure payment option
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Credit Card */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setPaymentMethod('card');
                      setShowCardForm(false);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <CreditCard className="h-6 w-6 text-gray-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Credit/Debit Card</h3>
                        <p className="text-sm text-gray-500 mt-1">Visa, Mastercard, Amex</p>
                        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Secured
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Walmart Pay */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'walmart' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setPaymentMethod('walmart');
                      setShowCardForm(true);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <CreditCard className="h-6 w-6 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Walmart Pay</h3>
                        <p className="text-sm text-gray-500 mt-1">Fast & secure checkout</p>
                        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                          <Lock className="h-3 w-3 mr-1" />
                          Most Secure
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Apple Pay */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'apple' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setPaymentMethod('apple');
                      setShowCardForm(false);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <Smartphone className="h-6 w-6 text-gray-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Apple Pay</h3>
                        <p className="text-sm text-gray-500 mt-1">Touch ID / Face ID</p>
                        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Biometric
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Google Pay */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'google' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setPaymentMethod('google');
                      setShowCardForm(false);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <Smartphone className="h-6 w-6 text-gray-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Google Pay</h3>
                        <p className="text-sm text-gray-500 mt-1">Fingerprint / PIN</p>
                        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Protected
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Walmart Pay Form */}
                {paymentMethod === 'walmart' && showCardForm && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-medium flex items-center">
                      <CreditCard className="h-5 w-5 text-green-600 mr-2" />
                      Enter Card Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            maxLength={3}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          />
                        </div>
                      </div>

                      {otpSent ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="otp">Enter OTP</Label>
                            <div className="flex space-x-2">
                              <Input
                                id="otp"
                                placeholder="6-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                              />
                              <Button 
                                variant="outline"
                                onClick={handleSendOtp}
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Resend
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          className="w-full mt-2"
                          onClick={handleSendOtp}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send OTP Verification
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="border-b border-green-200">
                <CardTitle className="flex items-center text-green-800">
                  <Shield className="h-5 w-5 mr-2" />
                  Payment Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800">AI Fraud Detection</h4>
                      <p className="text-sm text-green-700">Real-time machine learning analyzes every transaction</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800">End-to-End Encryption</h4>
                      <p className="text-sm text-green-700">Your data is secured with 256-bit SSL encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800">Blockchain Verification</h4>
                      <p className="text-sm text-green-700">Transaction records stored on secure blockchain</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">iPhone 15 Pro</p>
                      <p className="text-sm text-gray-500">128GB, Space Gray</p>
                    </div>
                    <p className="font-medium">$999.00</p>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">AirPods Pro</p>
                      <p className="text-sm text-gray-500">2nd Generation</p>
                    </div>
                    <p className="font-medium">$249.00</p>
                  </div>
                  <div className="flex justify-between py-3 text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>$1,248.00</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm text-gray-600">
                    <span>Tax</span>
                    <span>$99.84</span>
                  </div>
                  <div className="flex justify-between py-3 text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$1,347.84</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            {isVerifying && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="font-medium text-blue-800">
                      {verificationSteps[verificationStep]}
                    </p>
                    <Progress value={(verificationStep + 1) * 25} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg shadow-md"
              onClick={handlePayment}
              disabled={isVerifying || (paymentMethod === 'walmart' && !otp)}
            >
              {isVerifying ? (
                "Processing Payment..."
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Complete Secure Payment
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center px-4">
              By completing this purchase, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>. 
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
