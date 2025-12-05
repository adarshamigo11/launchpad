"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function TestPaymentPage() {
  const [promoCode, setPromoCode] = useState("");
  const [amount, setAmount] = useState(1000);
  const [validating, setValidating] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);

  useEffect(() => {
    loadPromoCodes();
  }, []);

  const loadPromoCodes = async () => {
    try {
      const response = await fetch("/api/promo-codes");
      const data = await response.json();
      if (data.ok) {
        setPromoCodes(data.promoCodes);
      }
    } catch (error) {
      console.error("Error loading promo codes:", error);
    }
  };

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return;

    setValidating(true);
    try {
      console.log("[Test] Validating promo code:", promoCode);
      
      const response = await fetch("/api/promo-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promoCode,
          amount: amount
        }),
      });

      console.log("[Test] Promo code validation response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Test] Promo code validation HTTP error:", errorText);
        throw new Error(`Failed to validate promo code. Server responded with status ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("[Test] Unexpected promo code response content type:", contentType);
        console.error("[Test] Response text:", text);
        throw new Error(`Unexpected response format from promo code validation`);
      }

      const data = await response.json();
      console.log("[Test] Promo code validation response data:", data);

      if (data.ok) {
        setDiscount(data.discount);
        setAppliedPromo(promoCode);
        toast.success("Promo Code Applied", {
          description: data.promoCode?.description || `Discount applied! You saved ₹${data.discount.toFixed(2)}`,
        });
      } else {
        toast.error("Invalid Promo Code", {
          description: data.message || "Please check your promo code and try again.",
        });
        setAppliedPromo(null);
        setDiscount(0);
      }
    } catch (error) {
      console.error("[Test] Error validating promo code:", error);
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to validate promo code. Please try again.",
      });
      setAppliedPromo(null);
      setDiscount(0);
    } finally {
      setValidating(false);
    }
  };

  const testPayment = async () => {
    setPaymentProcessing(true);
    try {
      console.log("[Test] Starting payment test...");
      
      const requestData = {
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        senderName: "Test Sender",
        passType: "general",
        passName: "General Pass",
        amount: Math.max(0, amount - discount),
        promoCode: appliedPromo || undefined
      };
      
      console.log("[Test] Payment request data:", requestData);
      
      const response = await fetch("/api/e-summit/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      console.log("[Test] Payment API response received:");
      console.log("[Test] Response status:", response.status);
      console.log("[Test] Response headers:", [...response.headers.entries()]);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Test] HTTP error response body:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("[Test] Unexpected response content type:", contentType);
        console.error("[Test] Response text:", text);
        throw new Error(`Unexpected response format. Expected JSON, got: ${contentType}`);
      }

      const data = await response.json();
      console.log("[Test] Payment API response data:", data);

      if (data.ok && data.paymentUrl) {
        toast.success("Success", {
          description: "Would redirect to: " + data.paymentUrl
        });
        console.log("[Test] Would redirect to:", data.paymentUrl);
      } else {
        const errorMessage = data.message || "Failed to initiate payment. Please try again.";
        console.error("[Test] Payment initiation failed:", {
          status: response.status,
          errorMessage,
          fullResponse: data,
        });
        toast.error("Payment Failed", {
          description: errorMessage,
        });
      }
    } catch (error: any) {
      console.error("[Test] Payment initiation error:", error);
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  const createTestPromoCode = async () => {
    try {
      const response = await fetch("/api/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: "TEST20",
          description: "20% off",
          discountType: "percentage",
          discountValue: 20,
          validFrom: new Date().toISOString(),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        }),
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success("Test Promo Code Created", {
          description: "Promo code TEST20 created successfully",
        });
        loadPromoCodes();
      } else {
        toast.error("Error", {
          description: data.message || "Failed to create test promo code",
        });
      }
    } catch (error) {
      console.error("Error creating test promo code:", error);
      toast.error("Error", {
        description: "Failed to create test promo code",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#144449] mb-8">Payment Test Page</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Promo Code Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={validatePromoCode}
                    disabled={!promoCode.trim() || validating}
                    className="bg-[#BF9B30] hover:bg-[#BF9B30]/90"
                  >
                    {validating ? "Validating..." : "Validate"}
                  </Button>
                </div>
              </div>
              
              {appliedPromo && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    Applied: {appliedPromo} (-₹{discount.toFixed(2)})
                  </p>
                </div>
              )}
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  Final Amount: ₹{(Math.max(0, amount - discount)).toFixed(2)}
                </p>
              </div>
              
              <div className="pt-4">
                <Button onClick={createTestPromoCode} variant="outline">
                  Create Test Promo Code (TEST20)
                </Button>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Available Promo Codes:</h3>
                {promoCodes.length === 0 ? (
                  <p className="text-sm text-gray-500">No promo codes found</p>
                ) : (
                  <div className="space-y-2">
                    {promoCodes.map((code) => (
                      <div key={code.id} className="text-sm p-2 bg-gray-50 rounded">
                        <div className="font-medium">{code.code}</div>
                        <div className="text-gray-600">{code.description}</div>
                        <div className="text-gray-500">
                          {code.discountType === "percentage" 
                            ? `${code.discountValue}% off` 
                            : `₹${code.discountValue} off`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-800">
                  Testing with amount: ₹{amount}
                </p>
                {appliedPromo && (
                  <p className="text-sm text-gray-800 mt-1">
                    With discount: -₹{discount.toFixed(2)}
                  </p>
                )}
                <p className="text-sm font-medium text-gray-900 mt-2">
                  Final Amount: ₹{(Math.max(0, amount - discount)).toFixed(2)}
                </p>
              </div>
              
              <Button
                onClick={testPayment}
                disabled={paymentProcessing}
                className="w-full bg-gradient-to-r from-[#144449] to-[#BF9B30] hover:from-[#144449]/90 hover:to-[#BF9B30]/90 text-white font-bold py-6 text-lg"
              >
                {paymentProcessing ? "Processing..." : "TEST PAYMENT"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                This is a test page. No actual payment will be made.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}