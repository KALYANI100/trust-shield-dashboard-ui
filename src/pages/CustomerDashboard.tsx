
import { useState, useEffect } from "react";
import { Shield, CheckCircle, AlertTriangle, CreditCard, History, FileText, ArrowLeft, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [trustScore, setTrustScore] = useState(87);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'purchase', amount: '$129.99', merchant: 'Electronics Store', status: 'verified', time: '2 hours ago' },
    { id: 2, type: 'login', location: 'Mobile App', status: 'secure', time: '5 hours ago' },
    { id: 3, type: 'purchase', amount: '$45.67', merchant: 'Grocery Store', status: 'verified', time: '1 day ago' },
    { id: 4, type: 'dispute', amount: '$89.99', merchant: 'Unknown Merchant', status: 'resolved', time: '3 days ago' }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrustScore(prev => Math.min(100, prev + Math.floor(Math.random() * 3)));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleViewProof = (transactionId: number) => {
    toast.success(`Blockchain verification opened for transaction #${transactionId}`);
  };

  const handleResolveAlert = () => {
    toast.success("Fraud alert marked as resolved");
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
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Customer Security Portal</h1>
                  <p className="text-sm text-gray-600">Welcome back, John Doe</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Account Secure
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Trust Score Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                Your Security Status
              </CardTitle>
              <CardDescription>
                Real-time assessment of your account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Trust Score</span>
                    <span className="text-2xl font-bold text-blue-600">{trustScore}/100</span>
                  </div>
                  <Progress value={trustScore} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    Excellent security posture. All systems protected.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">2FA Enabled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Device Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Biometric Auth</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">AI Protection</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Secure Checkout
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                File Dispute
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Lock className="h-4 w-4 mr-2" />
                Update Security
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Fraud Alerts */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Active Security Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-800 font-medium">
                  Unusual login attempt detected from New York, NY
                </p>
                <p className="text-yellow-700 text-sm">
                  If this wasn't you, please secure your account immediately.
                </p>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={handleResolveAlert}>
                  That was me
                </Button>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  Secure Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 text-gray-600 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Blockchain-verified transaction history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'verified' ? 'bg-green-500' :
                      activity.status === 'resolved' ? 'bg-blue-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.type === 'purchase' ? `Purchase: ${activity.amount}` :
                         activity.type === 'login' ? `Login: ${activity.location}` :
                         `Dispute: ${activity.amount}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.merchant || activity.location} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        activity.status === 'verified' ? 'default' :
                        activity.status === 'resolved' ? 'secondary' : 'outline'
                      }
                      className={
                        activity.status === 'verified' ? 'bg-green-100 text-green-800' :
                        activity.status === 'resolved' ? 'bg-blue-100 text-blue-800' : ''
                      }
                    >
                      {activity.status}
                    </Badge>
                    {activity.type === 'purchase' && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleViewProof(activity.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Proof
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

export default CustomerDashboard;
