import {
  MapPin,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { charityPrograms } from "@/utils/data";
import { formatCurrency } from "@/helper/format_currency";
import { motion, spring } from "framer-motion";

export default function CharityDetail() {
  const { id } = useParams();
  const program = charityPrograms.find(
    (program) => program.id.toString() === id
  );

  if (!program) {
    return <div>البرنامج غير موجود</div>;
  }

  const progressPercentage = (program.raised / program.goal) * 100;

  // Animation variants for fade & slide-up
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        type: spring,
        stiffness: 90,
        damping: 18,
      },
    }),
  };

  return (
    <div className="w-full" dir="rtl">
      <div className="container mx-auto px-4 pb-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى البرامج
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Card className="p-0">
              <CardHeader className="p-0">
                <motion.img
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  width={600}
                  height={400}
                  className="w-full h-60 sm:h-64 md:h-80 object-cover rounded-t-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <motion.div
                  className="flex flex-wrap items-center gap-2 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-secondary text-secondary-foreground">
                    {program.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 ml-1" />
                    {program.location}
                  </div>
                </motion.div>

                <motion.h1
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  {program.title}
                </motion.h1>

                <motion.p
                  className="text-gray-600 mb-6 text-sm sm:text-base"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {program.longDescription}
                </motion.p>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    الأثر المتوقع
                  </h3>
                  <ul className="space-y-2">
                    {program.impact!.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <i className="fa-solid fa-bullseye text-xl text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </CardContent>
            </Card>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 80 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-5 w-5" />
                    آخر التحديثات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {program.updates!.map((update, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {update.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {update.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {update.description}
                      </p>
                      {index < program.updates!.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  تقدم التبرع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(progressPercentage)}% تم تحقيقه
                    </span>
                    <span className="text-sm text-gray-500">
                      تبقى {formatCurrency(program.goal - program.raised)}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </motion.div>

                <div className="grid grid-cols-1 gap-4">
                  <motion.div
                    className="text-center p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <i className="fa-heart fa-regular text-red-500  text-xl" />
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(program.raised)}
                    </div>
                    <div className="text-sm text-gray-500">
                      تم جمعه من {formatCurrency(program.goal)}
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="text-center p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="flex items-center justify-center mb-1">
                        <i className="fa-regular fa-user text-xl text-blue-500" />
                      </div>
                      <div className="text-base font-semibold text-gray-900">
                        {program.donors}
                      </div>
                      <div className="text-xs text-gray-500">عدد المتبرعين</div>
                    </motion.div>

                    <motion.div
                      className="text-center p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <div className="flex items-center justify-center mb-1">
                        <i className="fa-regular fa-calendar text-xl text-green-500" />
                      </div>
                      <div className="text-base font-semibold text-gray-900">
                        {program.daysLeft}
                      </div>
                      <div className="text-xs text-gray-500">
                        الأيام المتبقية
                      </div>
                    </motion.div>
                  </div>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link to={`/donate/${program.id}`}>تبرع الآن</Link>
                </Button>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">المنظم</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fa-regular fa-heart text-2xl text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        {program.organizer}
                      </div>
                      <div className="text-xs text-gray-500">منظمة موثوقة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
