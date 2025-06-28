import { Button } from "../ui/button";
import { cubicBezier, motion } from "framer-motion";

export default function Banner() {
  // Animation for text and button
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: cubicBezier(0.2, 0.8, 0.25, 1) },
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
        ease: cubicBezier(0.2, 0.8, 0.25, 1),
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
          animate="visible"
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
          {[0, 1, 2].map((index) => {
            const positions = [
              { top: 0, right: 0, rotate: 3, z: 0 },
              { top: 100, left: 16, rotate: -2, z: 10 },
              { bottom: 80, right: 24, rotate: 1, z: 20 },
            ];
            const pos = positions[index];
            const imageSrc = `./images/banner-${index + 1}.png`;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className={`absolute w-[288px] h-[320px] shadow-2xl rounded-lg overflow-hidden z-[${pos.z}]`}
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  right: pos.right,
                  left: pos.left,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
              >
                <img
                  src={imageSrc}
                  alt={`صورة ${index + 1}`}
                  className="w-full h-full object-cover bg-gray-600"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
