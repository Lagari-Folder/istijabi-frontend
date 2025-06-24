import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function Banner() {
  // Animation for text and button
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.2, 0.8, 0.25, 1] }, // Valid cubic-bezier easing
    },
  };

  // Animation for images (stacked cards)
  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.2, 0.8, 0.25, 1], // Valid easing array
      },
    }),
  };

  return (
    <div className="max-w-content mx-auto px-4 pt-12" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Right side - Text and Button */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 text-right"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
              مشروع إطعام الطعام
            </h1>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed">
              نحن ملتزمون بتقديم الدعم الغذائي للأسر المحتاجة، ونسعى لضمان حصول
              كل شخص على وجبة يومية كريمة.
            </p>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed">
              يساهم تبرعك في توفير الوجبات الساخنة للمحتاجين، وتوزيعها في
              الأحياء ذات الاحتياج الأكبر. كل ريال تقدمه يُحدث فرقًا حقيقيًا في
              حياة شخص ما.
            </p>
          </div>
          <Button size="lg">تبرع الآن</Button>
        </motion.div>

        {/* Left side - Stacked Images */}
        <div className="relative h-[600px] md:h-[700px] max-w-full">
          {/* First image - Background */}
          <motion.div
            custom={0}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute top-0 right-0 w-[288px] h-[320px] transform rotate-3 shadow-2xl rounded-lg overflow-hidden"
          >
            <img
              src="./images/banner-1.png"
              className="w-[288px] h-[320px] object-cover bg-gray-600"
              alt="صورة 1"
            />
          </motion.div>

          {/* Second image - Middle */}
          <motion.div
            custom={1}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute top-25 left-4 sm:left-8 w-[288px] h-[320px] transform -rotate-2 shadow-2xl rounded-lg overflow-hidden z-10"
          >
            <img
              src="./images/banner-2.png"
              className="w-[288px] h-[320px] object-cover bg-gray-600"
              alt="صورة 2"
            />
          </motion.div>

          {/* Third image - Foreground */}
          <motion.div
            custom={2}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute bottom-20 right-6 sm:right-12 w-[288px] h-[320px] transform rotate-1 shadow-2xl rounded-lg overflow-hidden z-20"
          >
            <img
              src="./images/banner-3.png"
              className="w-[288px] h-[320px] object-cover bg-gray-600"
              alt="صورة 3"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
