import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, googleLogin, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/walmart-icon.ico" 
                alt="Walmart Logo"
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Walmart</h1>
            </div>
            <p className="text-sm text-gray-600">Secure Shopping Platform</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm">
            <img 
              src="/walmart-icon.ico" 
              alt="Security Badge"
              className="h-3 w-3 mr-1"
            />
            Bank-Level Security
          </Badge>
        </div>

        {/* Registration Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl sm:text-2xl">Create Account</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Join our secure Walmart shopping platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center w-full">
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signup_with"
                  shape="rectangular"
                  size="medium"
                  width="100%"
                />
              </div>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or register with email</span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1">
                {/* <Select
                  value={formData.role}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user" className="text-sm sm:text-base">User</SelectItem>
                    <SelectItem value="admin" className="text-sm sm:text-base">Administrator</SelectItem>
                  </SelectContent>
                </Select> */}
                <Select
  value={formData.role}
  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
>
  <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
    <SelectValue placeholder="Select account type">
      {formData.role!=='' && "Select account type"}
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="user">User</SelectItem>
    <SelectItem value="admin">Administrator</SelectItem>
  </SelectContent>
</Select>
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password (min 8 characters)"
                    required
                    minLength={8}
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

              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                    className="h-10 sm:h-11 text-sm sm:text-base pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex justify-center w-full transform scale-[0.85] sm:scale-100 origin-center">
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-10 sm:h-11"
                onClick={() => navigate('/login')}
              >
                <LogIn className="h-4 w-4 mr-2" />
                <span className="text-sm sm:text-base">Sign In Instead</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs sm:text-sm text-gray-600 mt-4">
          By registering, you agree to our{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-xs sm:text-sm text-blue-600 hover:text-blue-800"
          >
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-xs sm:text-sm text-blue-600 hover:text-blue-800"
          >
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;