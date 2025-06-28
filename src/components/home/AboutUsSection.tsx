// src/components/AboutUsSection.tsx

import { motion } from "framer-motion";
import { CheckCircle, Droplets, Utensils, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Droplets,
    title: "الوصول إلى مياه نظيفة",
    description:
      "نبني آبار مياه مستدامة وأنظمة تنقية لتوفير مياه شرب آمنة ونظيفة للمجتمعات في جميع أنحاء إفريقيا.",
  },
  {
    icon: Utensils,
    title: "الأمن الغذائي",
    description:
      "نوزع وجبات مغذية ونؤسس برامج غذائية لمحاربة الجوع وسوء التغذية في المناطق المحتاجة.",
  },
  {
    icon: Heart,
    title: "القيم الإسلامية",
    description:
      "نسترشد بمبادئ الزكاة والصدقة والرحمة، ونخدم الإنسانية بتفانٍ وأخلاق إسلامية.",
  },
];

const achievements = [
  "توفير المياه النظيفة لأكثر من ١٢٧,٠٠٠ شخص",
  "توزيع أكثر من ٨٩,٠٠٠ وجبة غذائية للعائلات المحتاجة",
  "بناء ١٥٦ بئرًا في ١٥ دولة",
  "تحسين حياة ٧٨ مجتمعًا من خلال برامجنا",
  "فريق استجابة طارئة يعمل 24/7 للحالات الإنسانية",
  "شفافية كاملة في توزيع واستخدام التبرعات",
];

const AboutUsSection = () => {
  return (
    <section dir="rtl" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          {/* النص والإنجازات */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <span className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                عن مهمتنا
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                الأمل من خلال الماء والغذاء
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                انطلاقًا من المبادئ الإسلامية في الرحمة والعطاء، نكرّس جهودنا
                لتوفير المياه النظيفة والطعام المغذي للمجتمعات في إفريقيا. كل
                قطرة وكل وجبة هي خطوة نحو غدٍ أفضل.
              </p>
              <div className="bg-secondary/10 p-4 rounded-lg border-r-4 border-secondary">
                <p className="text-sm italic text-secondary font-medium">
                  {"وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا"} -
                  القرآن 5:32
                </p>
              </div>
            </div>

            <div className="grid gap-3 py-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{achievement}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Heart className="ml-2 h-4 w-4" />
                تبرع الآن
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                <Globe className="ml-2 h-4 w-4" />
                مشاريعنا
              </Button>
            </div>
          </motion.div>

          {/* البطاقات الجانبية */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-lg bg-white/90 border border-primary/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
