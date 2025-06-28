import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-primary text-white w-full overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-7">
        <motion.div
          className="grid gap-12 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {/* Logo & Description */}
          <motion.div
            className="space-y-6"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center justify-start gap-3">
              <img
                src="./images/logo.png"
                className="h-[80px] rounded-md"
                alt="شعار الجمعية"
              />
            </div>
            <p className="text-sm text-white/80 leading-loose text-right">
              نحن نكرّس جهودنا لتوفير مياه نظيفة وغذاء صحي للمجتمعات المحتاجة في
              أفريقيا، مسترشدين بقيم الإسلام من الرحمة والعطاء والكرامة.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-5 text-sm text-white/80 text-right"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h4 className="text-white text-lg font-semibold border-r-4 border-secondary pr-3">
              تواصل معنا
            </h4>
            <div className="flex items-center gap-3">
              <i className="fas fa-phone text-secondary text-sm" />
              <span>+44 20 1234 5678</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-envelope text-secondary text-sm" />
              <span>info@waterandhope.org</span>
            </div>
            <div className="flex items-start gap-3">
              <i className="fas fa-map-marker-alt text-secondary mt-1 text-sm" />
              <span>
                123 شارع الخير
                <br />
                لندن، المملكة المتحدة EC1A 1BB
              </span>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="space-y-5 text-right"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <h4 className="text-white text-lg font-semibold border-r-4 border-secondary pr-3">
              تابعنا على مواقع التواصل
            </h4>
            <div className="flex justify-start gap-4">
              {[
                { icon: "fab fa-facebook-f", href: "#" },
                { icon: "fab fa-twitter", href: "#" },
                { icon: "fab fa-instagram", href: "#" },
                { icon: "fab fa-youtube", href: "#" },
              ].map(({ icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  className="p-2 rounded-full aspect-square size-[35px] flex items-center justify-center bg-white/10 hover:bg-secondary transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${icon} text-white text-sm`} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>© 2024 جمعية ماء وأمل - جميع الحقوق محفوظة.</p>
          <p className="text-secondary font-medium mt-2">
            السلام عليكم – جزى الله خيرًا كل من دعم وساهم في هذا الخير
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
