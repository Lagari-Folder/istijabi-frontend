import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, spring } from "framer-motion";
import { logoPublic } from "@/utils/images";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const navbarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: spring, stiffness: 80, damping: 14, duration: 0.6 },
    },
  };

  const linkContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.1 },
    },
  };

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      className="bg-primary/90 backdrop-blur-md flex justify-between items-center w-[95%] lg:h-[70px] h-[60px] max-w-content my-6 mb-12 lg:px-8 px-4 py-4 text-white z-50 shadow-xl rounded-full relative border border-white/10"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >
      {/* Mobile Menu Button */}
      <button
        ref={buttonRef}
        className="lg:hidden text-white hover:text-secondary text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>

      {/* Mobile Logo */}
      <motion.img
        src={logoPublic}
        className="h-[42px] lg:hidden object-contain"
        alt="الشعار"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 16 }}
      />

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center w-full h-full gap-6">
        <a href="/">
          <motion.img
            src="./images/logo.png"
            className="h-[50px] ml-14 object-contain"
            alt="الشعار"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 16,
            }}
          />
        </a>

        {/* Links */}
        <motion.div
          className="flex items-center gap-6 font-semibold text-base h-fit"
          variants={linkContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "الصفحة الرئيسية", to: "/" },
            { label: "المشاريع", to: "/projects" },
            { label: "من نحن", to: "/" },
            { label: "تبرع الآن", to: "/" },
            { label: "اتصل بنا", to: "/" },
          ].map((link, i) => (
            <motion.span key={i} variants={linkVariants}>
              <Link
                to={link.to}
                className="hover:text-secondary transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Desktop Search & Login */}
      <div className="flex max-lg:hidden items-center gap-4">
        <AnimatePresence>
          {searchOpen && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              type="text"
              placeholder="ابحث هنا..."
              className="px-3 py-1 rounded-full border-[0.5px] text-primary-foreground placeholder:text-primary-foreground/70"
            />
          )}
        </AnimatePresence>

        <button
          className="text-white hover:text-secondary text-xl cursor-pointer"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        <Link
          to="/auth"
          className="bg-white text-primary text-sm font-semibold rounded-full w-[100px] text-center py-2 hover:bg-secondary hover:text-white transition-all duration-300 shadow-md"
        >
          تسجيل الدخول
        </Link>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-md rounded-lg shadow-xl mt-4 py-4 px-6 z-50 border border-white/10"
          >
            <motion.ul
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ delay: 0.1, staggerChildren: 0.1 }}
              className="flex flex-col gap-4"
            >
              {[
                "الصفحة الرئيسية",
                "المشاريع",
                "من نحن",
                "تبرع الآن",
                "اتصل بنا",
              ].map((label, i) => (
                <motion.li key={i} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/"
                    className="block py-2 hover:text-secondary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}

              {/* Mobile Search */}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mt-4 h-[40px]">
                  <button
                    className="text-white hover:text-secondary text-xl cursor-pointer"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                  <AnimatePresence>
                    {searchOpen && (
                      <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        type="text"
                        placeholder="ابحث هنا..."
                        className="px-3 py-1 rounded-full border-[0.5px] text-primary-foreground placeholder:text-primary-foreground/70"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>

              {/* Mobile Login Button */}
              <motion.li whileTap={{ scale: 0.98 }}>
                <Link
                  to="/auth"
                  className="block py-2 mt-2 text-center bg-white text-primary font-semibold rounded-full hover:bg-secondary hover:text-white transition-all duration-300 shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
