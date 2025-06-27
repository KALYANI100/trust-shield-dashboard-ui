
import { useState, useEffect } from "react";
import { Shield, CreditCard, Smartphone, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');

  const verificationSteps = [
    "Analyzing transaction patterns...",
    "Running AI fraud detection...",
    "Verifying payment security...",
    "Transaction approved ✅"
  ];

  const handlePayment = async () => {
    setIsVerifying(true);
    
    for (let i = 0; i < verificationSteps.length; i++) {
      setVerificationStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    toast.success("Payment successful! Your order is secured by blockchain.");
    navigate('/customer-dashboard');
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
                <p className="text-sm text-gray-600">Your payment is protected</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Lock className="h-3 w-3 mr-1" />
              256-bit SSL Encryption
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  All payment methods are secured by Walmart AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Card 
                    className={`cursor-pointer border-2 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          AI Secured
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer border-2 ${paymentMethod === 'apple' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('apple')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-6 w-6 text-gray-600" />
                          <div>
                            <p className="font-medium">Apple Pay</p>
                            <p className="text-sm text-gray-500">Touch ID / Face ID</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Biometric
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer border-2 ${paymentMethod === 'google' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('google')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-6 w-6 text-gray-600" />
                          <div>
                            <p className="font-medium">Google Pay</p>
                            <p className="text-sm text-gray-500">Fingerprint / PIN</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Secured
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Shield className="h-5 w-5 mr-2" />
                  Your Payment is Protected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-green-700">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    AI-powered fraud detection active
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Blockchain transaction verification
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    End-to-end encryption (256-bit SSL)
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Real-time security monitoring
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>iPhone 15 Pro</span>
                    <span>$999.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AirPods Pro</span>
                    <span>$249.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>$99.84</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3">
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
              className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
              onClick={handlePayment}
              disabled={isVerifying}
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

            <p className="text-xs text-gray-500 text-center">
              By completing this purchase, you agree to our Terms of Service. 
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
