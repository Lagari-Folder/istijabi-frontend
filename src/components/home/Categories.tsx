import { motion } from "framer-motion";

export default function StyledTabs({
  categories,
  activeCat,
  handleChangeCat,
}: {
  categories: string[];
  activeCat: string;
  handleChangeCat: (s: string) => void;
}) {
  return (
    <div className="w-full border-b border-gray-200" dir="rtl">
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 px-3 sm:px-6 py-2 sm:py-3 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleChangeCat(cat)}
            className={`relative cursor-pointer pb-2 text-lg sm:text-xl font-bold whitespace-nowrap transition-colors duration-200 ${
              activeCat === cat
                ? "text-black font-bold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {cat}
            {activeCat === cat && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 right-0 h-[3px] w-full bg-lime-700 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
