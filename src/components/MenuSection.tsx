
import { motion, Variants } from 'framer-motion';
import MenuCard from "./MenuCard";

// Define card variants with index-based delay
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.3, duration: 0.6 }
  }),
};

const MenuSection = () => {
  const myArray = [
    {
      title: "Thessaloniki",
      img: "https://images.unsplash.com/photo-1620050248206-f5c11bd7f1f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Patra",
      img: "https://images.unsplash.com/photo-1603387478792-56d8bd233046?q=80&w=763&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Alexandroupoli",
      img: "https://images.unsplash.com/photo-1730206658429-f2c28685eb21?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
     {
      title: "Athens",
      img: "https://images.unsplash.com/photo-1599423217192-34da246be9e8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <section className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {myArray.map((card, index) => (
        <motion.div
         whileTap={{ scale: 0.95 }}
          key={index}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={index === 1 || index === 3 ? "mt-6" : ""}
        >
          <MenuCard title={card.title} img={card.img} />
        </motion.div>
      ))}
    </section>
  );
};

export default MenuSection;
