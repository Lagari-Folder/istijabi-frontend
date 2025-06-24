import { CharityCard } from "@/components/home/CharityCard";
import { motion } from "framer-motion";
import type { CharityProgram } from "@/types/program";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
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
};

export default function Charity({ programs }: { programs: CharityProgram[] }) {
  return (
    <motion.div
      className="min-h-screen max-w-content py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {programs.map((program) => (
            <motion.div key={program.id} variants={itemVariants}>
              <CharityCard program={program} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
