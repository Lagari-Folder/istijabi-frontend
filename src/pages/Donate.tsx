import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { charityPrograms } from "@/utils/data";
import AmountSelection from "@/components/donate/AmountSelection";
import DonationSummary from "@/components/donate/DonationSummary";
import AreebaComponent from "@/components/donate/AreebaComponent";
import { getSessionId } from "@/api/donation";
import { toast } from "react-toastify";

export default function Donate() {
  const { id } = useParams();
  const program = charityPrograms.find(
    (program) => program.id.toString() === id
  );

  const [step, setStep] = useState<1 | 2>(1);
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const selectedAmount =
    donationAmount === "custom" ? customAmount : donationAmount;

  if (!program) {
    return (
      <div className="p-4 text-center text-red-600">البرنامج غير موجود</div>
    );
  }

  const handleStepOneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amountValue = Number(selectedAmount);
    if (!selectedAmount || isNaN(amountValue) || amountValue <= 0) {
      toast.error("يرجى إدخال مبلغ صالح للتبرع (أكبر من صفر).");
      return;
    }

    if (message.length > 300) {
      toast.warn("الرسالة يجب ألا تتجاوز 300 حرف.");
      return;
    }

    try {
      setIsProcessing(true);

      const data = await getSessionId({
        id: program.id.toString(),
        amount: selectedAmount,
        message: message.trim(),
      });

      if (!data.sessionId) {
        throw new Error("فشل في إنشاء الجلسة.");
      }

      setSessionId(data.sessionId);
      setStep(2);
    } catch (error: any) {
      console.error("API Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء بدء جلسة التبرع."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="container mx-auto max-w-7xl px-6 pb-8">
        <div className="mb-3">
          <Button variant="ghost" asChild size="lg">
            <Link to={`/charity/${id}`} className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" /> العودة إلى البرنامج
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[2.5fr_1.5fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Heart className="h-6 w-6 text-red-600" /> قم بالتبرع
                </CardTitle>
              </CardHeader>

              <CardContent>
                {step === 1 ? (
                  <form onSubmit={handleStepOneSubmit} className="space-y-5">
                    <AmountSelection
                      donationAmount={donationAmount}
                      setDonationAmount={setDonationAmount}
                      customAmount={customAmount}
                      setCustomAmount={setCustomAmount}
                    />

                    <div>
                      <label htmlFor="message">رسالة (اختياري)</label>
                      <textarea
                        id="message"
                        placeholder="اترك رسالة دعم..."
                        rows={3}
                        className="w-full mt-1 border rounded p-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Shield className="h-6 w-6 text-green-600" />
                      <span className="text-sm text-green-800 font-medium">
                        مدفوعاتك آمنة باستخدام تشفير SSL بقوة 256-بت
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className={`w-full h-14 text-lg font-semibold ${
                        isProcessing ? "animate-pulse" : ""
                      }`}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "جاري التحميل..." : "التالي"}
                    </Button>
                  </form>
                ) : sessionId ? (
                  <AreebaComponent
                    checkoutSessionId={sessionId}
                    receiptPageUrl={`${window.location.origin}/receipt`}
                  />
                ) : (
                  <div className="text-center text-red-500 font-bold">
                    حدث خطأ في تحميل صفحة الدفع. الرجاء المحاولة مجددًا.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DonationSummary
              program={program}
              selectedAmount={selectedAmount}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
