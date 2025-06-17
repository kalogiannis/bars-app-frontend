
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
      title: "Athens",
      img: "https://images.unsplash.com/photo-1453899242646-c74d86b5b8e8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=05993ddfa31268c29b2e7e253d9b112b"
    },
    {
      title: "Thessaloniki",
      img: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max"
    },
    {
      title: "Patra",
      img: "https://images.unsplash.com/photo-1523476843875-43c2cb89aa85?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=ebbc04144bf8882ca12eba50d95f1150"
    },
    {
      title: "Alexandroupoli",
      img: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=1080&q=80&fit=max"
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
