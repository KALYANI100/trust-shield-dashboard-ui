import { useState } from "react";
import {
  AlertTriangle,
  Shield,
  Eye,
  CheckCircle,
  X,
  ArrowLeft,
  CreditCard,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FraudReview = () => {
  const navigate = useNavigate();
  const [flaggedTransactions, setFlaggedTransactions] = useState([
    {
      id: 1,
      amount: "$1,299.99",
      merchant: "Electronics Mega Store",
      customer: "John D.",
      location: "Los Angeles, CA",
      time: "15 mins ago",
      riskScore: 85,
      reason: "Unusual purchase pattern",
      status: "pending",
    },
    {
      id: 2,
      amount: "$599.00",
      merchant: "Fashion Outlet",
      customer: "Sarah M.",
      location: "Miami, FL",
      time: "32 mins ago",
      riskScore: 78,
      reason: "High-risk country IP",
      status: "pending",
    },
    {
      id: 3,
      amount: "$2,450.00",
      merchant: "Luxury Goods Inc",
      customer: "Mike R.",
      location: "New York, NY",
      time: "1 hour ago",
      riskScore: 92,
      reason: "Card velocity exceeded",
      status: "pending",
    },
    {
      id: 4,
      amount: "$89.99",
      merchant: "Gaming Store",
      customer: "Lisa W.",
      location: "Dallas, TX",
      time: "2 hours ago",
      riskScore: 67,
      reason: "New device login",
      status: "pending",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

  const handleApprove = (transactionId: number) => {
    setFlaggedTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, status: "approved" } : t))
    );
    toast.success(`Transaction #${transactionId} approved and processed`);
  };

  const handleReject = (transactionId: number) => {
    setFlaggedTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, status: "rejected" } : t))
    );
    toast.error(`Transaction #${transactionId} rejected and blocked`);
  };

  const handleInvestigate = (transactionId: number) => {
    const tx = flaggedTransactions.find((t) => t.id === transactionId);
    if (tx) {
      setSelectedTransaction(tx);
      setIsDialogOpen(true);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return "bg-red-500";
    if (score >= 75) return "bg-orange-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 90) return "Critical";
    if (score >= 75) return "High";
    if (score >= 60) return "Medium";
    return "Low";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin-dashboard")}
                className="p-2 text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-8 w-8 text-orange-500" />
                <div>
                  <h1 className="text-xl font-bold">Fraud Review Queue</h1>
                  <p className="text-sm text-gray-500">Manual transaction review</p>
                </div>
              </div>
            </div>
            <Badge variant="destructive" className="bg-orange-100 text-orange-700">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {flaggedTransactions.filter((t) => t.status === "pending").length} Pending Review
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Review</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {flaggedTransactions.filter((t) => t.status === "pending").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Approved Today</p>
                  <p className="text-2xl font-bold text-green-600">23</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Blocked Today</p>
                  <p className="text-2xl font-bold text-red-600">8</p>
                </div>
                <X className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg Review Time</p>
                  <p className="text-2xl font-bold text-blue-600">4.2m</p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              Flagged Transactions
            </CardTitle>
            <CardDescription className="text-gray-500">
              Transactions requiring manual review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 bg-gray-50 rounded-lg border border-gray-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-4 h-4 rounded-full ${getRiskColor(
                          transaction.riskScore
                        )}`}
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Transaction #{transaction.id}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className={`${getRiskColor(
                          transaction.riskScore
                        ).replace("bg-", "bg-")} text-white`}
                      >
                        {getRiskLabel(transaction.riskScore)} Risk ({transaction.riskScore}%)
                      </Badge>
                      {transaction.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="text-orange-600 border-orange-600"
                        >
                          Pending Review
                        </Badge>
                      )}
                      {transaction.status === "approved" && (
                        <Badge className="bg-green-600 text-white">Approved</Badge>
                      )}
                      {transaction.status === "rejected" && (
                        <Badge className="bg-red-600 text-white">Rejected</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-semibold text-gray-900">{transaction.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-semibold text-gray-900">{transaction.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{transaction.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Merchant</p>
                    <p className="text-gray-900 font-medium">{transaction.merchant}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Risk Reason</p>
                    <p className="text-orange-600">{transaction.reason}</p>
                  </div>

                  {transaction.status === "pending" && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-700 border-gray-400 hover:bg-gray-100"
                        onClick={() => handleInvestigate(transaction.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleApprove(transaction.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(transaction.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent className="w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction #{selectedTransaction?.id}</DialogTitle>
            <DialogDescription>
              Detailed analysis of this flagged transaction
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Customer:</strong> {selectedTransaction?.customer}
            </p>
            <p>
              <strong>Amount:</strong> {selectedTransaction?.amount}
            </p>
            <p>
              <strong>Merchant:</strong> {selectedTransaction?.merchant}
            </p>
            <p>
              <strong>Location:</strong> {selectedTransaction?.location}
            </p>
            <p>
              <strong>Risk Score:</strong> {selectedTransaction?.riskScore}% (
              {getRiskLabel(selectedTransaction?.riskScore || 0)})
            </p>
            <p>
              <strong>Reason Flagged:</strong> {selectedTransaction?.reason}
            </p>
            <p>
              <strong>Status:</strong> {selectedTransaction?.status}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FraudReview;
