import { CharityCard } from "@/components/home/CharityCard";
import { motion } from "framer-motion";
import type { CharityProgram } from "@/types/program";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function Charity({
  programs,
  more,
}: {
  programs: CharityProgram[];
  more?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="min-h-screen max-w-screen-xl px-4 p-8 mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      dir="rtl"
    >
      <div className="flex flex-col items-center gap-12">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {programs.map((program) => (
            <motion.div key={program.id} layout>
              <CharityCard program={program} />
            </motion.div>
          ))}
        </div>

        {/* Button */}
        {more && (
          <motion.div
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/projects")}
              className="text-lg px-6 py-3 bg-secondary hover:bg-secondary/90 transition-all"
            >
              عرض المزيد من المشاريع
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
