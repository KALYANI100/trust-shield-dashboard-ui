import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Settings, Bell, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    autoMitigation: true,
    alertThreshold: 75
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1')} ${!settings[key] ? 'enabled' : 'disabled'}`);
  };

  const handleThresholdChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, alertThreshold: value[0] }));
  };

  const handleSave = () => {
    toast.success("Settings saved successfully");
    // Save to backend if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin-dashboard")}
            className="p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-semibold">System Settings</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-500" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your alert and email notification preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center py-3">
              <span>Email Notifications</span>
              <Switch checked={settings.emailNotifications} onCheckedChange={() => handleToggle('emailNotifications')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              Security
            </CardTitle>
            <CardDescription>Control access and authentication options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Two-Factor Authentication</span>
              <Switch checked={settings.twoFactorAuth} onCheckedChange={() => handleToggle('twoFactorAuth')} />
            </div>
            <div className="flex justify-between items-center">
              <span>Auto Mitigation</span>
              <Switch checked={settings.autoMitigation} onCheckedChange={() => handleToggle('autoMitigation')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              Alert Threshold
            </CardTitle>
            <CardDescription>
              Adjust the percentage level at which system alerts are triggered.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">Current Threshold: {settings.alertThreshold}%</div>
            <Slider value={[settings.alertThreshold]} max={100} step={1} onValueChange={handleThresholdChange} />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;