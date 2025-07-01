import { Lock, ShieldCheck, Fingerprint, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Security = () => {
  const navigate = useNavigate();
  const [biometrics, setBiometrics] = useState(true);
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/customer-dashboard')} className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Security Settings</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Protected
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="shadow-md border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <ShieldCheck className="h-5 w-5 mr-2" />
              Account Security
            </CardTitle>
            <CardDescription className="text-sm text-green-700">
              Manage your sign-in and authentication options
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-gray-600" />
                <div className="text-sm text-gray-800">Two-Factor Authentication</div>
              </div>
              <Switch checked={twoFA} onCheckedChange={setTwoFA} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Fingerprint className="h-4 w-4 text-gray-600" />
                <div className="text-sm text-gray-800">Fingerprint Sign-in</div>
              </div>
              <Switch checked={biometrics} onCheckedChange={setBiometrics} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;
