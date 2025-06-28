import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCard = ({
  stat,
}: {
  stat: {
    title: string;
    value: string;
    change: string;
    period: string;
    icon: string;
  };
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <Card className="border-primary/20 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <i className={`${stat.icon} text-lg md:text-xl text-primary`} />
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-1">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-xl md:text-2xl font-bold text-primary"
          >
            {stat.value}
          </motion.div>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-xs md:text-sm text-muted-foreground"
          >
            <span className="text-secondary font-medium">{stat.change}</span>{" "}
            {stat.period}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
