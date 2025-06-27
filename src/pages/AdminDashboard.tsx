import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Activity, Users, TrendingUp, Bot, Eye, Settings, ArrowLeft, Zap, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [threats, setThreats] = useState([
    { id: 1, type: 'Bot Attack', severity: 'critical', source: '192.168.1.100', status: 'active', time: '2 min ago' },
    { id: 2, type: 'Brute Force', severity: 'high', source: '10.0.0.45', status: 'mitigated', time: '15 min ago' },
    { id: 3, type: 'SQL Injection', severity: 'medium', source: '172.16.0.23', status: 'blocked', time: '1 hour ago' },
    { id: 4, type: 'DDoS Attempt', severity: 'high', source: 'Multiple IPs', status: 'monitoring', time: '2 hours ago' }
  ]);

  const [systemStats, setSystemStats] = useState({
    activeThreats: 12,
    blockedAttacks: 1847,
    networkHealth: 98,
    userSessions: 2341
  });

  useEffect(() => {
    // Simulate real-time updates
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
    setThreats(prev => prev.map(threat => 
      threat.id === threatId ? { ...threat, status: 'blocked' } : threat
    ));
  };

  const handleInvestigate = (threatId: number) => {
    toast.info(`Opening detailed investigation for threat #${threatId}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'blocked': return 'text-gray-600 bg-gray-100';
      case 'mitigated': return 'text-green-600 bg-green-100';
      case 'monitoring': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
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
                onClick={() => navigate('/')}
                className="p-2 text-white hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-red-500" />
                <div>
                  <h1 className="text-xl font-bold">Security Operations Center</h1>
                  <p className="text-sm text-gray-400">Real-time Threat Monitoring</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="bg-red-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {systemStats.activeThreats} Active Threats
              </Badge>
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-700"
                onClick={() => navigate('/fraud-review')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Fraud Review
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-700"
                onClick={() => navigate('/payment-security')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Config
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Threats</p>
                  <p className="text-2xl font-bold text-red-400">{systemStats.activeThreats}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Blocked Attacks</p>
                  <p className="text-2xl font-bold text-green-400">{systemStats.blockedAttacks.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Network Health</p>
                  <p className="text-2xl font-bold text-blue-400">{systemStats.networkHealth}%</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Sessions</p>
                  <p className="text-2xl font-bold text-purple-400">{systemStats.userSessions.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Threat Intelligence Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Live Threat Feed
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time security incidents and automated responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threats.map((threat) => (
                  <div key={threat.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`} />
                      <div>
                        <p className="font-medium text-white">{threat.type}</p>
                        <p className="text-sm text-gray-400">
                          Source: {threat.source} • {threat.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(threat.status)}>
                        {threat.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-gray-400 hover:text-white hover:bg-gray-700"
                          onClick={() => handleInvestigate(threat.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {threat.status === 'active' && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleBlockIP(threat.id)}
                          >
                            Block IP
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bot Defense Console */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Bot className="h-5 w-5 text-orange-500 mr-2" />
                Bot Defense
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Bot Traffic</span>
                  <span className="text-sm font-medium text-orange-400">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Human Traffic</span>
                  <span className="text-sm font-medium text-green-400">77%</span>
                </div>
                <Progress value={77} className="h-2" />
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Blocked Bots Today</span>
                  <span className="text-white font-medium">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Grinch Bot Attacks</span>
                  <span className="text-red-400 font-medium">34</span>
                </div>
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Zap className="h-4 w-4 mr-2" />
                Auto-Mitigation ON
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Zero-Trust Policy Overview */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              Zero-Trust Network Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              Microsegmentation and access control monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-2">1,423</div>
                <div className="text-sm text-gray-400">Verified Sessions</div>
              </div>
              <div className="text-center p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-2">67</div>
                <div className="text-sm text-gray-400">Pending Verification</div>
              </div>
              <div className="text-center p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-red-400 mb-2">12</div>
                <div className="text-sm text-gray-400">Denied Access</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
