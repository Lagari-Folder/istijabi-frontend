// تم ترجمة كل النصوص الظاهرة للمستخدم إلى اللغة العربية وتم تحسين التصميم ليكون أكثر تماسكًا واستغلالًا للمساحات
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Heart, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { charityPrograms } from "@/utils/data";
import { formatCurrency } from "@/helper/format_currency";

export default function Donate() {
  const { id } = useParams();
  const program = charityPrograms.find((program) => program.id.toString() === id);

  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!program) {
    return <div className="p-4 text-center text-red-600">البرنامج غير موجود</div>;
  }

  const progressPercentage = (program.raised / program.goal) * 100;
  const presetAmounts = ["25", "50", "100", "250", "500"];

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("شكرًا لتبرعك! مساهمتك ستحدث فرقًا حقيقيًا.");
    setIsProcessing(false);
  };

  const selectedAmount = donationAmount === "custom" ? customAmount : donationAmount;

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
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Heart className="h-6 w-6 text-red-600" /> قم بالتبرع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonationSubmit} className="space-y-5">
                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">اختر مبلغ التبرع</Label>
                    <RadioGroup value={donationAmount} onValueChange={setDonationAmount}>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {presetAmounts.map((amount) => (
                          <div key={amount}>
                            <RadioGroupItem
                              value={amount}
                              id={amount}
                              className="peer sr-only"
                            />
                            <motion.label
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              htmlFor={amount}
                              className={`${
                                selectedAmount == amount ? "bg-secondary/10" : ""
                              } block cursor-pointer select-none rounded-md border border-gray-300 px-4 py-3 text-center font-semibold text-base transition-colors duration-200 hover:bg-blue-50 peer-checked:bg-blue-600 peer-checked:text-white`}
                            >
                              ${amount}
                            </motion.label>
                          </div>
                        ))}
                        <div>
                          <RadioGroupItem
                            value="custom"
                            id="custom"
                            className="peer sr-only"
                          />
                          <motion.label
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            htmlFor="custom"
                            className="block cursor-pointer select-none rounded-md border border-gray-300 px-4 py-3 text-center font-semibold text-base transition-colors duration-200 hover:bg-blue-50 peer-checked:bg-blue-600 peer-checked:text-white"
                          >
                            مبلغ مخصص
                          </motion.label>
                        </div>
                      </div>
                    </RadioGroup>
                    <AnimatePresence>
                      {donationAmount === "custom" && (
                        <motion.div
                          key="custom-amount"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Label htmlFor="customAmount" className="mt-2 block font-medium">
                            أدخل المبلغ ($)
                          </Label>
                          <Input
                            id="customAmount"
                            type="number"
                            placeholder="أدخل المبلغ"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            min="1"
                            required
                            className="h-12"
                            autoFocus
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">المعلومات الشخصية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول</Label>
                        <Input id="firstName" required className="h-12" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">اسم العائلة</Label>
                        <Input id="lastName" required className="h-12" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" required className="h-12" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={() => setIsAnonymous(!isAnonymous)}
                      />
                      <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                        اجعل هذا التبرع مجهولاً
                      </Label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">طريقة الدفع</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="card" id="card" />
                          <Label
                            htmlFor="card"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <CreditCard className="h-5 w-5" /> بطاقة ائتمان / خصم
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="cursor-pointer">
                            باي بال
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                    <AnimatePresence>
                      {paymentMethod === "card" && (
                        <motion.div
                          key="card-payment"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 p-5 border rounded-lg bg-gray-50"
                        >
                          <div>
                            <Label htmlFor="cardNumber">رقم البطاقة</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              required
                              className="h-12"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                              <Input id="expiry" placeholder="MM/YY" required className="h-12" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                              <Input id="cvv" placeholder="123" required className="h-12" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="cardName">الاسم على البطاقة</Label>
                            <Input id="cardName" required className="h-12" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">رسالة (اختياري)</Label>
                    <Textarea id="message" placeholder="اترك رسالة دعم..." rows={3} />
                  </div>

                  {/* Security */}
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">
                      مدفوعاتك آمنة باستخدام تشفير SSL بقوة 256-بت
                    </span>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className={`w-full h-14 text-lg font-semibold ${
                      isProcessing ? "animate-pulse" : ""
                    }`}
                    disabled={!selectedAmount || isProcessing}
                  >
                    {isProcessing ? (
                      "جارٍ المعالجة..."
                    ) : (
                      <>
                        <Lock className="h-5 w-5 ml-2" /> تبرع بـ ${selectedAmount}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Donation Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="w-full sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">ملخص التبرع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    width={96}
                    height={72}
                    className="rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <Badge className="mb-1 px-3 py-1">{program.category}</Badge>
                    <h4 className="font-semibold text-base leading-tight">{program.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">بواسطة {program.organizer}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {Math.round(progressPercentage)}% تم جمعها
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 rounded-full" />
                  <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
                    <span>{formatCurrency(program.raised)} تم جمعها</span>
                    <span>{formatCurrency(program.goal)} الهدف</span>
                  </div>
                </div>

                {selectedAmount && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="text-sm font-semibold text-blue-900 mb-1">تبرعك</div>
                    <div className="text-3xl font-bold text-blue-900 leading-tight">
                      ${selectedAmount}
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      هذا يساعدنا في الاقتراب بنسبة{" "}
                      {(
                        (parseFloat(selectedAmount) / (program.goal - program.raised)) *
                        100
                      ).toFixed(1)}
                      % من هدفنا
                    </div>
                  </motion.div>
                )}

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• تبرعك معفى من الضرائب</p>
                  <p>• 100% من تبرعك يذهب مباشرةً للغرض</p>
                  <p>• ستصلك إيصال عبر البريد الإلكتروني</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
