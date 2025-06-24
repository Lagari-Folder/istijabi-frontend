import { Calendar, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import KeyValueCharityBox from "../charity/KeyValueCharityBox";
import { formatCurrency } from "@/helper/format_currency";
import { motion } from "framer-motion";
import type { CharityProgram } from "@/types/program";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    transition: { duration: 0.3 },
  },
};

export function CharityCard({ program }: { program: CharityProgram }) {
  const progressPercentage = (program.raised / program.goal) * 100;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="w-full rounded-xl max-w-[400px] "
    >
      <Card
        className="overflow-hidden  transition-shadow duration-300 p-0 gap-0"
        dir="rtl"
      >
        <CardHeader className="p-0">
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
            <img
              src={program.image || "/placeholder.svg"}
              alt={program.title}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-3 right-3 bg-white text-gray-800 hover:bg-secondary hover:text-secondary-foreground cursor-pointer text-xs sm:text-sm">
              {program.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {program.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {program.description}
          </p>

          <div className="space-y-4">
            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  نسبة التقدم
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                <span>{formatCurrency(program.raised)} تم جمعها</span>
                <span className="font-medium text-gray-700">
                  {formatCurrency(program.goal)} الهدف
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <KeyValueCharityBox
                icon="fa-regular fa-heart text-red-500"
                value={formatCurrency(program.raised)}
                label="تم جمعه"
              />
              <KeyValueCharityBox
                icon="fa-regular fa-user text-blue-500"
                value={program.donors.toString()}
                label="المتبرعين"
              />
              <KeyValueCharityBox
                icon="fa-regular fa-calendar text-green-500"
                value={program.daysLeft.toString()}
                label="الأيام المتبقية"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col sm:flex-row gap-3">
          <Button asChild className="w-full sm:flex-1 text-sm sm:text-base">
            <Link to={`/donate/${program.id}`}>تبرع الآن</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="w-full sm:flex-1 text-sm sm:text-base bg-white text-gray-700"
          >
            <Link to={`/charity/${program.id}`}>عرض التفاصيل</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
