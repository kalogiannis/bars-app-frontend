
import { motion, Variants } from 'framer-motion';
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import CarouselCards from "@/components/CarouselCards";
import MenuSection from "@/components/MenuSection";
import MenuSection2 from "@/components/MenuSection2";
import DecorationText from "../components/DecorationText";

// Variant for scroll-triggered animation
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HomePage = () => {
  const navigate = useNavigate();

  const makeSubmitHandler = (basePath: string) => (values: SearchForm) => {
    navigate(`${basePath}/${encodeURIComponent(values.searchQuery)}`);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <motion.div
        className="md:px-32 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-5xl font-bold tracking-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sequi?
        </h1>
        <span className="text-xl">Lorem ipsum dolor sit amet consectetur.</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={makeSubmitHandler("/search")}
        />
      </motion.div>

      {/* Decoration Text 1 */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DecorationText text1={"MORE THAN"} span={"Just"} text2={"DRINKS"} />
      </motion.div>

      {/* Menu Section 1 */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <MenuSection />
      </motion.div>

      {/* Menu Section 2 */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <MenuSection2 />
      </motion.div>

      {/* Decoration Text 2 */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DecorationText
          text1={"SOME OF THE"}
          span={"BEST"}
          text2={"BARS IN YOUR CITY!"}
        />
      </motion.div>

      {/* Carousel Cards */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <CarouselCards />
      </motion.div>

      {/* Download Section */}
      <motion.div
        className="grid md:grid-cols-2 gap-5"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src={landingImage} alt="Landing visual" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            at autem itaque.
          </span>
          <span>Download the App</span>
          <img src={appDownloadImage} alt="App download visual" />
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
