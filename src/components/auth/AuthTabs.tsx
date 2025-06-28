type AuthTabsProps = {
  activeTab: "login" | "register";
  setActiveTab: (tab: "login" | "register") => void;
};

export default function AuthTabs({ activeTab, setActiveTab }: AuthTabsProps) {
  return (
    <div className="flex justify-center mb-8 gap-4 flex-nowrap">
      {["login", "register"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as "login" | "register")}
          className={`text-lg font-bold px-5 py-2 rounded-full transition-colors duration-300 whitespace-nowrap min-w-[110px] sm:min-w-[130px] ${
            activeTab === tab
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {tab === "login" ? "تسجيل الدخول" : "تسجيل جديد"}
        </button>
      ))}
    </div>
  );
}
