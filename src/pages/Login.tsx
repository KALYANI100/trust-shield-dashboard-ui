import { useState } from "react";
import { Badge, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaValue) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login successful! Welcome to Walmart Secure Shopping");
      navigate('/shop');
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await googleLogin(credentialResponse.credential);
    } else {
      toast.error("Google credential not received");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google authentication failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Walmart Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/walmart-icon.ico" 
                alt="Walmart Logo"
                className="h-10 w-10"
              />
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Walmart</h1>
            </div>
            <p className="text-sm text-gray-600">Secure Shopping Platform</p>
          </div>
          {/* <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm">
            <img 
              src="/walmart-icon.ico" 
              alt="Security Badge"
              className="h-3 w-3 mr-1"
            />
            Bank-Level Security
          </Badge> */}
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl sm:text-2xl">Sign In</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Access your secure Walmart account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                shape="rectangular"
                size="medium"
                width="100%"
                useOneTap
              />
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Id"
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="h-10 sm:h-11 text-sm sm:text-base pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex justify-center transform scale-90 sm:scale-100">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaValue}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 h-10 sm:h-11 text-sm sm:text-base"
                disabled={isLoading || !recaptchaValue}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">New to Walmart?</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-10 sm:h-11"
                onClick={() => navigate('/signup')}
              >
                <span className="text-sm sm:text-base">Create your Walmart account</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs sm:text-sm text-gray-600 mt-4">
          By continuing, you agree to Walmart's{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-xs sm:text-sm text-blue-600 hover:text-blue-800"
          >
            Conditions of Use
          </Button>{" "}
          and{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-xs sm:text-sm text-blue-600 hover:text-blue-800"
          >
            Privacy Notice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;