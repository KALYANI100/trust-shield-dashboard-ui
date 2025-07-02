import { useState, useEffect } from "react";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  History,
  FileText,
  ArrowLeft,
  Eye,
  Lock,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogFooter,DialogTrigger} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [trustScore, setTrustScore] = useState(87);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "purchase",
      amount: "$129.99",
      merchant: "Electronics Store",
      status: "verified",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "login",
      location: "Mobile App",
      status: "secure",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "purchase",
      amount: "$45.67",
      merchant: "Grocery Store",
      status: "verified",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "dispute",
      amount: "$89.99",
      merchant: "Unknown Merchant",
      status: "resolved",
      time: "3 days ago",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrustScore((prev) => Math.min(100, prev + Math.floor(Math.random() * 3)));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // const handleViewProof = (transactionId: number) => {
  //   toast.success(`Blockchain verification opened for transaction #${transactionId}`);
  // };

  const handleViewProof = (transactionId: number) => {
  setSelectedTransactionId(transactionId);
  setDialogOpen(true);
};


  const handleResolveAlert = () => {
    toast.success("Fraud alert marked as resolved");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Customer Security Portal</h1>
                <p className="text-sm text-gray-600">Welcome back</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Account Secure
              </Badge>
              <Button variant="outline" onClick={() => navigate("/shop")}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Trust Score + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trust Score */}
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
            <CardContent className="space-y-6">
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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {["2FA Enabled", "Device Verified", "Biometric Auth", "AI Protection"].map((label) => (
                  <div key={label} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/checkout")}>
                <CreditCard className="h-4 w-4 mr-2" />
                Secure Checkout
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/dispute")}>
                <FileText className="h-4 w-4 mr-2" />
                File Dispute
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/account-security")}>
                <Lock className="h-4 w-4 mr-2" />
                Account Security
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/shop")}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop Securely
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Alert */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Active Security Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-yellow-800 font-medium">
                  Unusual login attempt detected from New York, NY
                </p>
                <p className="text-yellow-700 text-sm">
                  If this wasn't you, please secure your account immediately.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={handleResolveAlert}>
                  That was me
                </Button>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700" onClick={() => navigate("/secure")}>
                  Secure Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 text-gray-600 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Blockchain-verified transaction history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      activity.status === "verified"
                        ? "bg-green-500"
                        : activity.status === "resolved"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.type === "purchase"
                        ? `Purchase: ${activity.amount}`
                        : activity.type === "login"
                        ? `Login: ${activity.location}`
                        : `Dispute: ${activity.amount}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(activity.merchant || activity.location) + " • " + activity.time}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      activity.status === "verified"
                        ? "default"
                        : activity.status === "resolved"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      activity.status === "verified"
                        ? "bg-green-100 text-green-800"
                        : activity.status === "resolved"
                        ? "bg-blue-100 text-blue-800"
                        : ""
                    }
                  >
                    {activity.status}
                  </Badge>
                  {activity.type === "purchase" && (
                    <Button size="sm" variant="ghost" onClick={() => handleViewProof(activity.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Proof
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-blue-600">Blockchain Proof</DialogTitle>
            <DialogDescription>
              Verification details for transaction #{selectedTransactionId}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span className="font-medium">Transaction ID</span>
              <span className="text-gray-600">TXN-{selectedTransactionId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Hash</span>
              <span className="truncate max-w-[160px] text-gray-500">0x6a7b2...f0c1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Timestamp</span>
              <span className="text-gray-600">2025-07-01 18:23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Block Number</span>
              <span className="text-gray-600">#142093</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="font-medium">Details</span>
              <span className="text-gray-500 text-right">
                Verified on-chain using zkProof v2.4<br />
                Network: Ethereum (L2)
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View on Blockchain
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </div>
    </div>
  );
};

export default CustomerDashboard;
