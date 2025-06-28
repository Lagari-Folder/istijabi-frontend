import { useState } from "react";
import Charity from "@/components/home/Charity";
import { Input } from "@/components/ui/input";
import { charityPrograms } from "@/utils/data";
import { easeOut, motion } from "framer-motion";

const categories = [
  "كل المشاريع",
  "الأشد احتياجاً",
  "المساعدات",
  "الوقفيات",
  "كفارات ونذور",
  "تفريج كربة",
  "الصدقات",
];

const sortOptions = [
  { value: "newest", label: "الأحدث أولاً" },
  { value: "oldest", label: "الأقدم أولاً" },
  { value: "amountHigh", label: "الأكثر تمويلاً" },
  { value: "amountLow", label: "الأقل تمويلاً" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function Projects() {
  const [activeCat, setActiveCat] = useState("كل المشاريع");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  return (
    <motion.div
      dir="rtl"
      className="max-w-screen-xl mx-auto px-6 py-10 space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* العنوان */}
      <motion.h1
        className="text-4xl font-extrabold text-primary text-center"
        variants={fadeUpVariants}
      >
        مشاريعنا
      </motion.h1>

      {/* التصنيفات في صف مستقل */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3"
        variants={containerVariants}
      >
        <i className="fas fa-filter text-primary text-lg ml-2" />
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold border transition cursor-pointer
              ${
                activeCat === cat
                  ? "bg-primary text-white  border-primary shadow-md"
                  : "text-primary hover:text-white bg-white/90    border-primary/50 hover:bg-primary/70"
              }`}
            variants={fadeUpVariants}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* البحث والترتيب في صف ثاني */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-6"
        variants={fadeUpVariants}
      >
        {/* البحث */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <i className="fas fa-search text-primary text-xl" />
          <Input
            type="search"
            placeholder="ابحث عن مشروع..."
            className="text-right bg-white/90 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* الترتيب */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <i className="fas fa-sort text-primary text-xl" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-primary text-primary bg-white/90 text-right cursor-pointer transition hover:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {sortOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* شبكة المشاريع */}
      <motion.div variants={fadeUpVariants}>
        <Charity programs={charityPrograms} />
      </motion.div>
    </motion.div>
  );
}
