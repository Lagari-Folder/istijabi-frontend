import AboutUsSection from "@/components/home/AboutUsSection";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import Charity from "@/components/home/Charity";
import Stats from "@/components/home/Stats";
import { charityPrograms } from "@/utils/data";
import { useState } from "react";

const categories = [
  "كل المشاريع",
  "الأشد احتياجاً",
  "المساعدات",
  "الوقفيات",
  "كفارات ونذور",
  "تفريج كربة",
  "الصدقات",
];
const Home = () => {
  const [activeCat, setActiveCat] = useState(categories[0]);

  const filteredPrograms =
    activeCat === "كل المشاريع"
      ? charityPrograms
      : charityPrograms.filter((program) => program.category === activeCat);

  return (
    <div className="px-4 sm:px-8">
      <Banner />
      <Stats />
      <Categories
        categories={categories}
        activeCat={activeCat}
        handleChangeCat={(s: string) => setActiveCat(s)}
      />
      <Charity programs={filteredPrograms} more />
      <AboutUsSection />
    </div>
  );
};

export default Home;
