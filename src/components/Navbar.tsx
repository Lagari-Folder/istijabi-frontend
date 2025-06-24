import { Link } from "react-router-dom";
import { TfiSearch } from "react-icons/tfi";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Animation variants
  const navbarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
        duration: 0.6,
      },
    },
  };

  const linkContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.nav
      className="bg-primary flex justify-between items-center w-[95%] lg:h-[65px] h-[60px] max-w-content my-6 mb-12 lg:px-12 px-6 py-4 text-white z-50 shadow-md rounded-full relative"
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
        src="./images/logo.png"
        className="h-[45px] lg:hidden object-cover"
        alt="الشعار"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 16 }}
      />

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center w-full h-full gap-6">
        {/* Desktop Logo */}
        <motion.img
          src="./images/logo.png"
          className="h-[55px] ml-16 object-cover"
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
        {/* Desktop Links */}
        <motion.div
          className="flex items-center gap-6 font-bold text-lg h-fit"
          variants={linkContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={linkVariants}>
            <Link
              to="/"
              className="hover:text-secondary hover:underline transition-colors duration-300"
            >
              الصفحة الرئيسية
            </Link>
          </motion.span>
          <motion.span variants={linkVariants}>
            <Link
              to="/"
              className="hover:text-secondary hover:underline transition-colors duration-300"
            >
              المشاريع
            </Link>
          </motion.span>
          <motion.span variants={linkVariants}>
            <Link
              to="/"
              className="hover:text-secondary hover:underline transition-colors duration-300"
            >
              من نحن
            </Link>
          </motion.span>
          <motion.span variants={linkVariants}>
            <Link
              to="/"
              className="hover:text-secondary hover:underline transition-colors duration-300"
            >
              تبرع الآن
            </Link>
          </motion.span>
          <motion.span variants={linkVariants}>
            <Link
              to="/"
              className="hover:text-secondary hover:underline transition-colors duration-300"
            >
              اتصل بنا
            </Link>
          </motion.span>
        </motion.div>
      </div>
      <div className="flex max-lg:hidden items-center gap-3">
        <AnimatePresence>
          {searchOpen && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 270, opacity: 1 }}
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
            className="lg:hidden absolute top-full left-0 right-0 bg-primary rounded-lg shadow-lg mt-4 py-4 px-6 z-50"
          >
            <motion.ul
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ delay: 0.1, staggerChildren: 0.1 }}
              className="flex flex-col gap-4"
            >
              <motion.li whileTap={{ scale: 0.98 }}>
                <Link
                  to="/"
                  className="block py-2 hover:text-secondary hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  الصفحة الرئيسية
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 0.98 }}>
                <Link
                  to="/"
                  className="block py-2 hover:text-secondary hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  المشاريع
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 0.98 }}>
                <Link
                  to="/"
                  className="block py-2 hover:text-secondary hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  من نحن
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 0.98 }}>
                <Link
                  to="/"
                  className="block py-2 hover:text-secondary hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  تبرع الآن
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 0.98 }}>
                <Link
                  to="/"
                  className="block py-2 hover:text-secondary hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  اتصل بنا
                </Link>
              </motion.li>

              {/* Mobile Search Inside Menu */}
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
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
