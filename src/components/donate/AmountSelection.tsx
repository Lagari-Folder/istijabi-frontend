import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

type AmountSelectionProps = {
  donationAmount: string;
  setDonationAmount: (value: string) => void;
  customAmount: string;
  setCustomAmount: (value: string) => void;
};

const presetAmounts = ["25", "50", "100", "250", "500"];

export default function AmountSelection({
  donationAmount,
  setDonationAmount,
  customAmount,
  setCustomAmount,
}: AmountSelectionProps) {
  const selectedAmount =
    donationAmount === "custom" ? customAmount : donationAmount;

  return (
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
                  selectedAmount === amount ? "bg-secondary/10" : ""
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
    </div>
  );
}
