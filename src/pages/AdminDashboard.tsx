// (No change in imports)
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Shield,
  Activity,
  Users,
  TrendingUp,
  Bot,
  Eye,
  Settings,
  ArrowLeft,
  Zap,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [threats, setThreats] = useState([
    { id: 1, type: "Bot Attack", severity: "critical", source: "192.168.1.100", status: "active", time: "2 min ago" },
    { id: 2, type: "Brute Force", severity: "high", source: "10.0.0.45", status: "mitigated", time: "15 min ago" },
    { id: 3, type: "SQL Injection", severity: "medium", source: "172.16.0.23", status: "blocked", time: "1 hour ago" },
    { id: 4, type: "DDoS Attempt", severity: "high", source: "Multiple IPs", status: "monitoring", time: "2 hours ago" }
  ]);

  const [systemStats, setSystemStats] = useState({
    activeThreats: 12,
    blockedAttacks: 1847,
    networkHealth: 98,
    userSessions: 2341
  });

  const [selectedThreat, setSelectedThreat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 5),
        userSessions: prev.userSessions + Math.floor(Math.random() * 10) - 5
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBlockIP = (threatId: number) => {
    toast.success(`IP blocked and threat #${threatId} mitigated`);
    setThreats(prev =>
      prev.map(threat =>
        threat.id === threatId ? { ...threat, status: "blocked" } : threat
      )
    );
  };

  const handleInvestigate = (threat: any) => {
    setSelectedThreat(threat);
    setIsModalOpen(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-400";
      default: return "bg-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-red-700 bg-red-100";
      case "blocked": return "text-gray-700 bg-gray-100";
      case "mitigated": return "text-green-700 bg-green-100";
      case "monitoring": return "text-blue-700 bg-blue-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  const ThreatDetailModal = ({
    open,
    onClose,
    threat
  }: {
    open: boolean;
    onClose: () => void;
    threat: any;
  }) => {
    if (!threat) return null;
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Threat #{threat.id}: {threat.type}
            </DialogTitle>
            <DialogDescription>
              Detailed information about the detected threat
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p><strong>Type:</strong> {threat.type}</p>
            <p><strong>Severity:</strong> {threat.severity}</p>
            <p><strong>Status:</strong> {threat.status}</p>
            <p><strong>Source IP:</strong> {threat.source}</p>
            <p><strong>Time:</strong> {threat.time}</p>
            <p><strong>Mitigation Suggestions:</strong></p>
            <ul className="list-disc list-inside ml-2 text-gray-700">
              <li>Check firewall logs</li>
              <li>Block the IP if not internal</li>
              <li>Inspect login attempt patterns</li>
              <li>Notify security team</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/")} className="p-2 text-gray-600 hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold">Security Operations Center</h1>
                <p className="text-sm text-gray-500">Real-time Threat Monitoring</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="destructive" className="bg-red-100 text-red-700">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {systemStats.activeThreats} Active Threats
              </Badge>
              <Button variant="outline" onClick={() => navigate("/fraud-review")}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Fraud Review
              </Button>
              <Button variant="outline" onClick={() => navigate("/payment-security")}>
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Config
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Active Threats" value={systemStats.activeThreats} Icon={AlertTriangle} color="text-red-600" />
          <StatCard title="Blocked Attacks" value={systemStats.blockedAttacks.toLocaleString()} Icon={Shield} color="text-green-600" />
          <StatCard title="Network Health" value={`${systemStats.networkHealth}%`} Icon={Activity} color="text-blue-600" />
          <StatCard title="Active Sessions" value={systemStats.userSessions.toLocaleString()} Icon={Users} color="text-purple-600" />
        </div>

        {/* Main Threats & Bot Defense */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threat Feed */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                Live Threat Feed
              </CardTitle>
              <CardDescription>
                Real-time security incidents and automated responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {threats.map((threat) => (
                <div
                  key={threat.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100 border rounded-lg gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`} />
                    <div>
                      <p className="font-medium">{threat.type}</p>
                      <p className="text-sm text-gray-500">
                        Source: {threat.source} • {threat.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getStatusColor(threat.status)}>{threat.status}</Badge>
                    <Button size="sm" variant="ghost" onClick={() => handleInvestigate(threat)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {threat.status === "active" && (
                      <Button size="sm" variant="destructive" onClick={() => handleBlockIP(threat.id)}>
                        Block IP
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bot Defense Console */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 text-orange-500 mr-2" />
                Bot Defense
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <BarItem label="Bot Traffic" percent={23} color="text-orange-600" />
              <BarItem label="Human Traffic" percent={77} color="text-green-600" />
              <div className="pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Blocked Bots Today</span>
                  <span className="font-medium text-gray-900">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Grinch Bot Attacks</span>
                  <span className="font-medium text-red-600">34</span>
                </div>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Zap className="h-4 w-4 mr-2" />
                Auto-Mitigation ON
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Zero Trust Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              Zero-Trust Network Status
            </CardTitle>
            <CardDescription>
              Microsegmentation and access control monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ZeroTrustItem value="1,423" label="Verified Sessions" color="text-green-600" />
              <ZeroTrustItem value="67" label="Pending Verification" color="text-yellow-600" />
              <ZeroTrustItem value="12" label="Denied Access" color="text-red-600" />
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <ThreatDetailModal open={isModalOpen} onClose={() => setIsModalOpen(false)} threat={selectedThreat} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, Icon, color }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </CardContent>
  </Card>
);

const BarItem = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between mb-1 text-sm text-gray-500">
      <span>{label}</span>
      <span className={`font-medium ${color}`}>{percent}%</span>
    </div>
    <Progress value={percent} className="h-2" />
  </div>
);

const ZeroTrustItem = ({ value, label, color }) => (
  <div className="text-center p-4 bg-gray-100 rounded-lg">
    <div className={`text-2xl font-bold mb-2 ${color}`}>{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

export default AdminDashboard;
