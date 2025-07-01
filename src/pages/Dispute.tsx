import { FileWarning, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Dispute = () => {
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    if (!transactionId || !details.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Dispute submitted successfully", {
      description: "We'll review the transaction and update you shortly.",
    });

    setTransactionId("");
    setDetails("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/customer-dashboard')} className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <FileWarning className="h-6 w-6 text-yellow-600" />
                <h1 className="text-xl font-bold text-gray-900">Dispute Center</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="shadow-md border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <FileWarning className="h-5 w-5 mr-2" />
              Dispute a Transaction
            </CardTitle>
            <CardDescription className="text-sm text-yellow-700">
              Provide the transaction ID and describe the issue. Our security team will investigate promptly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Transaction ID</label>
              <Input
                placeholder="e.g. #TXN14567"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                placeholder="Explain what happened..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
              />
            </div>
            <div className="flex justify-end">
              <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={handleSubmit}>
                <Send className="h-4 w-4 mr-2" />
                Submit Dispute
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dispute;
