
import { useState } from "react";
import { Shield, Globe, CreditCard, AlertTriangle, Settings, ArrowLeft, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PaymentSecurity = () => {
  const navigate = useNavigate();
  const [securitySettings, setSecuritySettings] = useState({
    blockHighRiskCountries: true,
    enableVelocityChecks: true,
    requireStrongAuth: true,
    enableDeviceFingerprinting: true,
    blockVpnTor: true,
    enableGeoBlocking: false
  });

  const blockedCountries = [
    { name: 'High Risk Region A', code: 'HR1', blocked: true, transactions: 234 },
    { name: 'High Risk Region B', code: 'HR2', blocked: true, transactions: 156 },
    { name: 'Sanctioned Country C', code: 'SC1', blocked: true, transactions: 89 },
    { name: 'Medium Risk Region D', code: 'MR1', blocked: false, transactions: 445 }
  ];

  const paymentMethods = [
    { name: 'Credit/Debit Cards', enabled: true, riskLevel: 'medium', dailyLimit: '$10,000' },
    { name: 'Apple Pay', enabled: true, riskLevel: 'low', dailyLimit: '$5,000' },
    { name: 'Google Pay', enabled: true, riskLevel: 'low', dailyLimit: '$5,000' },
    { name: 'PayPal', enabled: false, riskLevel: 'medium', dailyLimit: '$7,500' },
    { name: 'Cryptocurrency', enabled: false, riskLevel: 'high', dailyLimit: '$2,500' }
  ];

  const handleSettingToggle = (setting: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.success(`${setting} ${securitySettings[setting] ? 'disabled' : 'enabled'}`);
  };

  const handleCountryBlock = (countryCode: string, block: boolean) => {
    toast.success(`${countryCode} ${block ? 'blocked' : 'unblocked'} successfully`);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/admin-dashboard')}
                className="p-2 text-white hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8 text-blue-500" />
                <div>
                  <h1 className="text-xl font-bold">Payment Security Configuration</h1>
                  <p className="text-sm text-gray-400">Manage payment security policies</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-600">
              <Shield className="h-3 w-3 mr-1" />
              Security Active
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Settings */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Settings className="h-5 w-5 text-blue-500 mr-2" />
              Global Security Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configure system-wide payment security policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-white">Block High-Risk Countries</p>
                  <p className="text-sm text-gray-400">Automatically block payments from high-risk regions</p>
                </div>
                <Switch 
                  checked={securitySettings.blockHighRiskCountries}
                  onCheckedChange={() => handleSettingToggle('blockHighRiskCountries')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-white">Velocity Checks</p>
                  <p className="text-sm text-gray-400">Monitor transaction frequency and amounts</p>
                </div>
                <Switch 
                  checked={securitySettings.enableVelocityChecks}
                  onCheckedChange={() => handleSettingToggle('enableVelocityChecks')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-white">Strong Authentication</p>
                  <p className="text-sm text-gray-400">Require 2FA for high-value transactions</p>
                </div>
                <Switch 
                  checked={securitySettings.requireStrongAuth}
                  onCheckedChange={() => handleSettingToggle('requireStrongAuth')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-white">Device Fingerprinting</p>
                  <p className="text-sm text-gray-400">Track and analyze device characteristics</p>
                </div>
                <Switch 
                  checked={securitySettings.enableDeviceFingerprinting}
                  onCheckedChange={() => handleSettingToggle('enableDeviceFingerprinting')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-white">Block VPN/Tor</p>
                  <p className="text-sm text-gray-400">Prevent payments from anonymized networks</p>
                </div>
                <Switch 
                  checked={securitySettings.blockVpnTor}
                  onCheckedChange={() => handleSettingToggle('blockVpnTor')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="font-medium text-white">Geo-blocking</p>
                  <p className="text-sm text-gray-400">Location-based payment restrictions</p>
                </div>
                <Switch 
                  checked={securitySettings.enableGeoBlocking}
                  onCheckedChange={() => handleSettingToggle('enableGeoBlocking')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Country Management */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Globe className="h-5 w-5 text-orange-500 mr-2" />
              Country Risk Management
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage payment restrictions by country/region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blockedCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${country.blocked ? 'bg-red-500' : 'bg-green-500'}`} />
                    <div>
                      <p className="font-medium text-white">{country.name}</p>
                      <p className="text-sm text-gray-400">
                        {country.transactions} transactions blocked this month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant="secondary" 
                      className={country.blocked ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}
                    >
                      {country.blocked ? 'Blocked' : 'Allowed'}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant={country.blocked ? "outline" : "destructive"}
                      onClick={() => handleCountryBlock(country.code, !country.blocked)}
                    >
                      {country.blocked ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Unblock
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 mr-1" />
                          Block
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Configuration */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <CreditCard className="h-5 w-5 text-green-500 mr-2" />
              Payment Method Security
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configure security settings for each payment method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-white">{method.name}</p>
                      <p className="text-sm text-gray-400">Daily limit: {method.dailyLimit}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className={getRiskColor(method.riskLevel)}>
                      {method.riskLevel} risk
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={method.enabled ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}
                    >
                      {method.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                    <Button size="sm" variant="outline" className="text-gray-400 border-gray-600">
                      Configure
                    </Button>
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

export default PaymentSecurity;
