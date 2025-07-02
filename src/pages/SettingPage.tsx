// SettingsPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Lock,
  Shield,
  ArrowLeft,
  Save,
  Loader2,
  AlarmClock,
  Network,
  UserCheck,
  Info,
  Sliders,
  Database,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    emailAlerts: true,
    enable2FA: true,
    autoMitigation: true,
    alertThreshold: 60,
    dailyReport: false,
    loginAlerts: true,
    dataRetention: 30,
    sessionTimeout: 15,
    enableZeroTrust: true,
    enableSyslog: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success(`${key.replace(/([A-Z])/g, " $1")} updated`);
  };

  const handleSliderChange = (key: keyof typeof settings, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    toast.success("Settings saved successfully.");
    // Optionally send to backend here
  };

  const settingItems = [
    {
      label: "Email Alerts",
      key: "emailAlerts",
      description: "Get notified about important events via email.",
      icon: Bell,
      type: "toggle",
    },
    {
      label: "Enable Two-Factor Authentication (2FA)",
      key: "enable2FA",
      description: "Require 2FA for admin and user login.",
      icon: Lock,
      type: "toggle",
    },
    {
      label: "Auto-Mitigation",
      key: "autoMitigation",
      description: "Automatically block IPs and threats when detected.",
      icon: Shield,
      type: "toggle",
    },
    {
      label: "Alert Sensitivity Threshold",
      key: "alertThreshold",
      description: "Set the minimum score to trigger alerts.",
      icon: Sliders,
      type: "slider",
      min: 10,
      max: 100,
    },
    {
      label: "Daily Threat Report",
      key: "dailyReport",
      description: "Email a daily summary of blocked threats.",
      icon: AlarmClock,
      type: "toggle",
    },
    {
      label: "Login Attempt Alerts",
      key: "loginAlerts",
      description: "Send alert if suspicious login attempts detected.",
      icon: UserCheck,
      type: "toggle",
    },
    {
      label: "Data Retention (days)",
      key: "dataRetention",
      description: "Number of days to retain system logs and events.",
      icon: Database,
      type: "slider",
      min: 7,
      max: 180,
    },
    {
      label: "Session Timeout (minutes)",
      key: "sessionTimeout",
      description: "Automatically log out idle sessions after this time.",
      icon: Loader2,
      type: "slider",
      min: 5,
      max: 60,
    },
    {
      label: "Enable Zero-Trust Network",
      key: "enableZeroTrust",
      description: "Strict access control and microsegmentation.",
      icon: Network,
      type: "toggle",
    },
    {
      label: "Syslog Integration",
      key: "enableSyslog",
      description: "Enable external log shipping via Syslog.",
      icon: Info,
      type: "toggle",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin-dashboard")}
            className="text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Security & System Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingItems.map((item, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <item.icon className="h-5 w-5 text-blue-500" />
                  {item.label}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {item.type === "toggle" ? (
                  <Switch
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onCheckedChange={() => handleToggle(item.key as keyof typeof settings)}
                    className="data-[state=checked]:bg-blue-500"
                  />
                ) : (
                  <div className="pt-2">
                    <Slider
                      min={item.min}
                      max={item.max}
                      step={1}
                      value={[settings[item.key as keyof typeof settings] as number]}
                      onValueChange={(val) =>
                        handleSliderChange(item.key as keyof typeof settings, val[0])
                      }
                    />
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                      Current: {settings[item.key as keyof typeof settings]}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
