import { easeOut, motion } from "framer-motion";
import StatsCard from "../stats/StatsCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const Stats = () => {
  const stats = [
    {
      title: "أشخاص حصلوا على مياه نظيفة",
      value: "١٢٧٬٤٥٠",
      change: "+٢٬٣٤٠",
      changeType: "positive",
      icon: "fa-solid fa-droplet",
      period: "هذا الشهر",
    },
    {
      title: "وجبات تم توفيرها",
      value: "٨٩٬٢٣٠",
      change: "+٥٬٦٧٠",
      changeType: "positive",
      icon: "fa-solid fa-utensils",
      period: "هذا الشهر",
    },
    {
      title: "آبار مياه تم بناؤها",
      value: "١٥٦",
      change: "+١٢",
      changeType: "positive",
      icon: "fa-solid fa-map-location",
      period: "هذا العام",
    },
    {
      title: "مجتمعات تم الوصول إليها",
      value: "٧٨",
      change: "+٨",
      changeType: "positive",
      icon: "fa-regular fa-heart",
      period: "هذا العام",
    },
  ];

  return (
    <motion.section
      className="w-full py-12 md:py-24"
      dir="rtl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container px-4 md:px-6 space-y-8">
        {/* Title and Description */}
        <motion.div className="space-y-4 mb-8 text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tighter text-primary"
            variants={fadeUpVariants}
          >
            تأثيرنا
          </motion.h2>
          <motion.p
            className="text-muted-foreground md:text-xl max-w-2xl mx-auto"
            variants={fadeUpVariants}
          >
            شاهد كيف تساهم تبرعاتك ودعمك في إحداث فرق حقيقي في المجتمعات في جميع
            أنحاء أفريقيا.
          </motion.p>
        </motion.div>

        {/* Stats Cards Grid */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeUpVariants}>
              <StatsCard stat={stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Stats;
