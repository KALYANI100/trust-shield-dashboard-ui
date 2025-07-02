

// import { useState } from "react";
// import { Shield, Globe, CreditCard, AlertTriangle, Settings, ArrowLeft, CheckCircle, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const PaymentSecurity = () => {
//   const navigate = useNavigate();
//   const [securitySettings, setSecuritySettings] = useState({
//     blockHighRiskCountries: true,
//     enableVelocityChecks: true,
//     requireStrongAuth: true,
//     enableDeviceFingerprinting: true,
//     blockVpnTor: true,
//     enableGeoBlocking: false
//   });

//   const blockedCountries = [
//     { name: 'High Risk Region A', code: 'HR1', blocked: true, transactions: 234 },
//     { name: 'High Risk Region B', code: 'HR2', blocked: true, transactions: 156 },
//     { name: 'Sanctioned Country C', code: 'SC1', blocked: true, transactions: 89 },
//     { name: 'Medium Risk Region D', code: 'MR1', blocked: false, transactions: 445 }
//   ];

//   const paymentMethods = [
//     { name: 'Credit/Debit Cards', enabled: true, riskLevel: 'medium', dailyLimit: '$10,000' },
//     { name: 'Apple Pay', enabled: true, riskLevel: 'low', dailyLimit: '$5,000' },
//     { name: 'Google Pay', enabled: true, riskLevel: 'low', dailyLimit: '$5,000' },
//     { name: 'PayPal', enabled: false, riskLevel: 'medium', dailyLimit: '$7,500' },
//     { name: 'Cryptocurrency', enabled: false, riskLevel: 'high', dailyLimit: '$2,500' }
//   ];

//   const handleSettingToggle = (setting: keyof typeof securitySettings) => {
//     setSecuritySettings(prev => ({
//       ...prev,
//       [setting]: !prev[setting]
//     }));
//     toast.success(`${setting} ${securitySettings[setting] ? 'disabled' : 'enabled'}`);
//   };

//   const handleCountryBlock = (countryCode: string, block: boolean) => {
//     toast.success(`${countryCode} ${block ? 'blocked' : 'unblocked'} successfully`);
//   };

//   const getRiskColor = (level: string) => {
//     switch (level) {
//       case 'low': return 'bg-green-100 text-green-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'high': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       {/* Header */}
//       <header className="bg-white shadow border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 variant="ghost" 
//                 onClick={() => navigate('/admin-dashboard')}
//                 className="p-2 text-gray-700 hover:bg-gray-100"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//               <div className="flex items-center space-x-3">
//                 <CreditCard className="h-8 w-8 text-blue-600" />
//                 <div>
//                   <h1 className="text-xl font-bold text-gray-900">Payment Security Configuration</h1>
//                   <p className="text-sm text-gray-500">Manage payment security policies</p>
//                 </div>
//               </div>
//             </div>
//             <Badge variant="secondary" className="bg-green-100 text-green-800">
//               <Shield className="h-3 w-3 mr-1" />
//               Security Active
//             </Badge>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Security Settings */}
//         <Card className="bg-white border border-gray-200 mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center text-gray-900">
//               <Settings className="h-5 w-5 text-blue-600 mr-2" />
//               Global Security Settings
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Configure system-wide payment security policies
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 { label: "Block High-Risk Countries", key: 'blockHighRiskCountries', desc: "Automatically block payments from high-risk regions" },
//                 { label: "Velocity Checks", key: 'enableVelocityChecks', desc: "Monitor transaction frequency and amounts" },
//                 { label: "Strong Authentication", key: 'requireStrongAuth', desc: "Require 2FA for high-value transactions" },
//                 { label: "Device Fingerprinting", key: 'enableDeviceFingerprinting', desc: "Track and analyze device characteristics" },
//                 { label: "Block VPN/Tor", key: 'blockVpnTor', desc: "Prevent payments from anonymized networks" },
//                 { label: "Geo-blocking", key: 'enableGeoBlocking', desc: "Location-based payment restrictions" }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <div>
//                     <p className="font-medium text-gray-800">{item.label}</p>
//                     <p className="text-sm text-gray-500">{item.desc}</p>
//                   </div>
//                   <Switch 
//                     checked={securitySettings[item.key as keyof typeof securitySettings]}
//                     onCheckedChange={() => handleSettingToggle(item.key as keyof typeof securitySettings)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Country Management */}
//         <Card className="bg-white border border-gray-200 mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center text-gray-900">
//               <Globe className="h-5 w-5 text-orange-500 mr-2" />
//               Country Risk Management
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Manage payment restrictions by country/region
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {blockedCountries.map((country, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="flex items-center space-x-4">
//                     <div className={`w-3 h-3 rounded-full ${country.blocked ? 'bg-red-500' : 'bg-green-500'}`} />
//                     <div>
//                       <p className="font-medium text-gray-800">{country.name}</p>
//                       <p className="text-sm text-gray-500">
//                         {country.transactions} transactions blocked this month
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Badge 
//                       variant="secondary" 
//                       className={country.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
//                     >
//                       {country.blocked ? 'Blocked' : 'Allowed'}
//                     </Badge>
//                     <Button 
//                       size="sm" 
//                       variant={country.blocked ? "outline" : "destructive"}
//                       onClick={() => handleCountryBlock(country.code, !country.blocked)}
//                     >
//                       {country.blocked ? (
//                         <>
//                           <CheckCircle className="h-4 w-4 mr-1" />
//                           Unblock
//                         </>
//                       ) : (
//                         <>
//                           <X className="h-4 w-4 mr-1" />
//                           Block
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Payment Method Configuration */}
//         <Card className="bg-white border border-gray-200">
//           <CardHeader>
//             <CardTitle className="flex items-center text-gray-900">
//               <CreditCard className="h-5 w-5 text-green-600 mr-2" />
//               Payment Method Security
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Configure security settings for each payment method
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {paymentMethods.map((method, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="flex items-center space-x-4">
//                     <CreditCard className="h-6 w-6 text-gray-500" />
//                     <div>
//                       <p className="font-medium text-gray-800">{method.name}</p>
//                       <p className="text-sm text-gray-500">Daily limit: {method.dailyLimit}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Badge variant="secondary" className={getRiskColor(method.riskLevel)}>
//                       {method.riskLevel} risk
//                     </Badge>
//                     <Badge 
//                       variant="secondary" 
//                       className={method.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
//                     >
//                       {method.enabled ? 'Enabled' : 'Disabled'}
//                     </Badge>
//                     <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
//                       Configure
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PaymentSecurity;

import { useState } from "react";
import { Shield, Globe, CreditCard, AlertTriangle, Settings, ArrowLeft, CheckCircle, X, Lock, Fingerprint, Cpu, BarChart2, ShieldCheck, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentSecurity = () => {
  const navigate = useNavigate();
  const [securitySettings, setSecuritySettings] = useState({
    aiFraudDetection: true,
    blockHighRiskCountries: true,
    enableVelocityChecks: true,
    requireStrongAuth: true,
    enableDeviceFingerprinting: true,
    blockVpnTor: true,
    enableGeoBlocking: false,
    tokenization: true,
    behavioralBiometrics: false
  });

  const blockedCountries = [
    { name: 'High Risk Region A', code: 'HR1', blocked: true, transactions: 234, threatLevel: 'high' },
    { name: 'High Risk Region B', code: 'HR2', blocked: true, transactions: 156, threatLevel: 'high' },
    { name: 'Sanctioned Country C', code: 'SC1', blocked: true, transactions: 89, threatLevel: 'critical' },
    { name: 'Medium Risk Region D', code: 'MR1', blocked: false, transactions: 445, threatLevel: 'medium' }
  ];

  const paymentMethods = [
    { name: 'Credit/Debit Cards', enabled: true, riskLevel: 'medium', dailyLimit: '$10,000', protection: ['Tokenization', '3D Secure'] },
    { name: 'Apple Pay', enabled: true, riskLevel: 'low', dailyLimit: '$5,000', protection: ['Biometric Auth', 'Device Binding'] },
    { name: 'Google Pay', enabled: true, riskLevel: 'low', dailyLimit: '$5,000', protection: ['Biometric Auth', 'Device Binding'] },
    { name: 'PayPal', enabled: false, riskLevel: 'medium', dailyLimit: '$7,500', protection: ['Email Verification', '2FA'] },
    { name: 'Cryptocurrency', enabled: false, riskLevel: 'high', dailyLimit: '$2,500', protection: ['Blockchain Verification'] }
  ];

  const securityStats = [
    { label: 'Fraud Attempts Blocked', value: '12,482', change: '+5.2%', trend: 'up' },
    { label: 'Real-time AI Detections', value: '1.2M', change: '98.7% accuracy', trend: 'neutral' },
    { label: 'Customer Trust Score', value: '9.4/10', change: '+0.3', trend: 'up' },
    { label: 'False Positives', value: '0.8%', change: '-0.2%', trend: 'down' }
  ];

  const handleSettingToggle = (setting: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.success(`Security ${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${securitySettings[setting] ? 'disabled' : 'enabled'}`);
  };

  const handleCountryBlock = (countryCode: string, block: boolean) => {
    toast.success(`${countryCode} ${block ? 'blocked' : 'unblocked'} successfully`);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'critical': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getThreatLevelIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'critical': return <ShieldCheck className="h-4 w-4 text-purple-500" />;
      case 'medium': return <BarChart2 className="h-4 w-4 text-amber-500" />;
      default: return <BarChart2 className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/admin-dashboard')}
                className="p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-blue-600/10 dark:bg-blue-400/10">
                  <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TrustShield Security Center</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered cybersecurity for retail transactions</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4 mr-1.5" />
              Protection Active
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {securityStats.map((stat, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 
                      stat.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  {stat.trend === 'up' && (
                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                  {stat.trend === 'down' && (
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="security" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security Settings</span>
            </TabsTrigger>
            <TabsTrigger value="countries" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Geo Protection</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="security">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  AI-Powered Security Controls
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Configure advanced fraud prevention systems powered by machine learning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "AI Fraud Detection", key: 'aiFraudDetection', desc: "Real-time machine learning to identify fraudulent patterns", icon: <Cpu className="h-4 w-4 mr-2 text-blue-500" /> },
                    { label: "Behavioral Biometrics", key: 'behavioralBiometrics', desc: "Analyze user behavior for anomalies", icon: <Fingerprint className="h-4 w-4 mr-2 text-purple-500" /> },
                    { label: "Tokenization", key: 'tokenization', desc: "Replace sensitive data with unique tokens", icon: <EyeOff className="h-4 w-4 mr-2 text-green-500" /> },
                    { label: "Block High-Risk Countries", key: 'blockHighRiskCountries', desc: "Automatically block payments from high-risk regions", icon: <Globe className="h-4 w-4 mr-2 text-orange-500" /> },
                    { label: "Velocity Checks", key: 'enableVelocityChecks', desc: "Monitor transaction frequency and amounts", icon: <BarChart2 className="h-4 w-4 mr-2 text-amber-500" /> },
                    { label: "Strong Authentication", key: 'requireStrongAuth', desc: "Require 2FA for high-value transactions", icon: <Lock className="h-4 w-4 mr-2 text-red-500" /> },
                    { label: "Device Fingerprinting", key: 'enableDeviceFingerprinting', desc: "Track and analyze device characteristics", icon: <Fingerprint className="h-4 w-4 mr-2 text-indigo-500" /> },
                    { label: "Block VPN/Tor", key: 'blockVpnTor', desc: "Prevent payments from anonymized networks", icon: <Shield className="h-4 w-4 mr-2 text-gray-500" /> }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="flex items-center">
                          {item.icon}
                          <p className="font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 ml-6">{item.desc}</p>
                      </div>
                      <Switch 
                        checked={securitySettings[item.key as keyof typeof securitySettings]}
                        onCheckedChange={() => handleSettingToggle(item.key as keyof typeof securitySettings)}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="countries">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Globe className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2" />
                  Global Threat Protection
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Manage regional restrictions based on real-time threat intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockedCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          {getThreatLevelIcon(country.threatLevel)}
                          <span className="text-xs mt-1 text-gray-500">{country.code}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{country.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {country.transactions} fraudulent transactions prevented
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant="secondary" 
                          className={getRiskColor(country.threatLevel)}
                        >
                          {country.threatLevel} threat
                        </Badge>
                        <Button 
                          size="sm" 
                          variant={country.blocked ? "outline" : "destructive"}
                          onClick={() => handleCountryBlock(country.code, !country.blocked)}
                          className={country.blocked ? "border-blue-500 text-blue-600 hover:text-blue-700 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-300" : ""}
                        >
                          {country.blocked ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1.5" />
                              Allow
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 mr-1.5" />
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
          </TabsContent>

          <TabsContent value="payments">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  Payment Method Security
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Configure security protocols for each payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30">
                          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{method.name}</p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {method.protection.map((prot, i) => (
                              <Badge key={i} variant="outline" className="text-xs py-0.5 px-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                                {prot}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className={getRiskColor(method.riskLevel)}>
                          {method.riskLevel} risk
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={method.enabled ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}
                        >
                          {method.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button size="sm" variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                          <Settings className="h-4 w-4 mr-1.5" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentSecurity;