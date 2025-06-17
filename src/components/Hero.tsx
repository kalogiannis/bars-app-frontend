
import { motion, Variants } from 'framer-motion';
import hero from "../assets/hero.jpg";

const headingVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Hero = () => {
  return (
    <div className="relative w-full max-h-[600px] overflow-hidden">
      <img
        src={hero}
        alt="Hero background"
        className="w-full h-full object-cover filter brightness-70"
      />

      <div className="absolute inset-0 bg-gray-900/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          App for Bars
        </motion.h1>
      </div>
    </div>
  );
};

export default Hero;
