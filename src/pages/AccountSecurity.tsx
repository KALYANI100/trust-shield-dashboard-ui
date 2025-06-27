
import { useState } from "react";
import { Shield, Fingerprint, Smartphone, Key, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AccountSecurity = () => {
  const navigate = useNavigate();
  const [securityScore, setSecurityScore] = useState(92);
  
  const securityFactors = [
    { name: "Password Strength", status: "strong", score: 95 },
    { name: "Two-Factor Authentication", status: "enabled", score: 100 },
    { name: "Biometric Login", status: "setup", score: 100 },
    { name: "Device Recognition", status: "active", score: 88 },
    { name: "Login Alerts", status: "enabled", score: 100 }
  ];

  const activeSessions = [
    { device: "iPhone 15 Pro", location: "New York, NY", lastActive: "Active now", current: true },
    { device: "MacBook Air", location: "New York, NY", lastActive: "2 hours ago", current: false },
    { device: "iPad Pro", location: "New York, NY", lastActive: "1 day ago", current: false }
  ];

  const handleSetupBiometric = () => {
    toast.success("Face ID setup initiated. Please follow the prompts on your device.");
  };

  const handleTerminateSession = (device: string) => {
    toast.success(`Session on ${device} has been terminated.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/customer-dashboard')}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Account Security</h1>
                  <p className="text-sm text-gray-600">Manage your security settings</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Highly Secure
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              Security Score
            </CardTitle>
            <CardDescription>
              Your overall account security rating
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">{securityScore}/100</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Excellent
                </Badge>
              </div>
              <Progress value={securityScore} className="h-3" />
              <p className="text-sm text-gray-600">
                Your account has strong security measures in place. Keep up the good work!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Factors */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Security Factors</CardTitle>
            <CardDescription>
              Detailed breakdown of your security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{factor.name}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={factor.score} className="h-2 w-24" />
                      <span className="text-sm text-gray-600">{factor.score}%</span>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={
                      factor.status === 'strong' || factor.status === 'enabled' || factor.status === 'setup' || factor.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {factor.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Biometric Setup */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Fingerprint className="h-5 w-5 mr-2" />
              Enhanced Security Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-800">Add Face ID for faster checkout</p>
                <p className="text-sm text-blue-700">
                  Enable biometric authentication for one-tap secure payments
                </p>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSetupBiometric}
              >
                <Fingerprint className="h-4 w-4 mr-2" />
                Setup Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-5 w-5 text-gray-600 mr-2" />
              Active Sessions
            </CardTitle>
            <CardDescription>
              Monitor and manage your logged-in devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${session.current ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-gray-600">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.current && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Current
                      </Badge>
                    )}
                    {!session.current && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTerminateSession(session.device)}
                      >
                        Terminate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSecurity;
