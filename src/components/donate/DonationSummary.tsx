import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { formatCurrency } from "@/helper/format_currency";

type DonationSummaryProps = {
  program: any;
  selectedAmount: string;
};

export default function DonationSummary({ program, selectedAmount }: DonationSummaryProps) {
  const progressPercentage = (program.raised / program.goal) * 100;

  return (
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-semibold text-blue-900 mb-1">تبرعك</div>
            <div className="text-3xl font-bold text-blue-900 leading-tight">${selectedAmount}</div>
            <div className="text-xs text-blue-700 mt-1">
              هذا يساعدنا في الاقتراب بنسبة{" "}
              {((parseFloat(selectedAmount) / (program.goal - program.raised)) * 100).toFixed(1)}% من هدفنا
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
  );
}
