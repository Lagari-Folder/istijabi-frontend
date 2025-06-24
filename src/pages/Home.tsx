import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import Charity from "@/components/home/Charity";
import { charityPrograms } from "@/utils/data";
import { useState } from "react";

const Home = () => {
  const categories = [
    "كل المشاريع", // 👈 Added All option
    "الأشد احتياجاً",
    "المساعدات",
    "الوقفيات",
    "كفارات ونذور",
    "تفريج كربة",
    "الصدقات",
  ];

  const [activeCat, setActiveCat] = useState(categories[0]);

  // Show all if "كل المشاريع" is selected, otherwise filter by category
  const filteredPrograms =
    activeCat === "كل المشاريع"
      ? charityPrograms
      : charityPrograms.filter((program) => program.category === activeCat);

  return (
    <div className="px-4 sm:px-8">
      <Banner />
      <Categories
        categories={categories}
        activeCat={activeCat}
        handleChangeCat={(s: string) => setActiveCat(s)}
      />
      <Charity programs={filteredPrograms} />
    </div>
  );
};

export default Home;
