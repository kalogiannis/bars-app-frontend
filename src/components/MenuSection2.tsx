import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.3, duration: 0.6 },
  }),
};

interface MenuItem {
  title: string;
  price: string;
  description: string;
  img: string;
}

const MenuSection2 = () => {
  const menuItems: MenuItem[] = [
    {
      title: "Dive Bar",
      price: "$16",
      description:
        "Unpretentious, laid-back, often a bit worn around the edges",
      img: "https://images.unsplash.com/photo-1692455129272-60299bc2b1a8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sports Bar",
      price: "$18",
      description: "Energetic, multiple big-screen TVs showing live games",
      img: "https://images.unsplash.com/photo-1671368913134-c211bc02487f?q=80&w=1098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Cocktail Lounge",
      price: "$12",
      description:
        "Craft cocktails using premium spirits, fresh-pressed juices, housemade syrups",
      img: "https://plus.unsplash.com/premium_photo-1670333183141-9e3ffc533dfa?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Wine Bar",
      price: "$16",
      description:
        "Curated list of wines by the glass/bottle—often focusing on a region or style—plus cheese and charcuterie boards",
      img: "https://plus.unsplash.com/premium_photo-1677327746194-1757bf34c80c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-[#F9A826] font-semibold mb-3 tracking-wide uppercase">
            WELCOME TO PATIO.TIME TEA HOUSE
          </h3>
          <div className="relative mb-8">
            <h2 className="text-5xl font-serif font-bold tracking-tight text-center">
              MORE THAN
            </h2>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <span className="text-7xl font-script text-[#F9A826] font-light italic transform -rotate-12 inline-block">
                Just
              </span>
            </div>
            <h2 className="text-5xl font-serif font-bold tracking-tight text-center mt-4">
              DRINKS
            </h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Simple and balanced. Alexander Petillo brings together flavors and
            specialties from Italy and beyond to create his own culinary world,
            full of surprising artistry.
          </p>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap max-w-7xl mx-auto justify-center py-10 px-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`group flex flex-col items-center text-center px-4 mb-12 md:mb-6 w-full md:w-1/4 max-w-[300px] mx-auto ${
                index === 0 || index === menuItems.length - 1 ? "md:-mt-16" : ""
              }`}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-md mx-auto">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-300 ease-in-out filter group-hover:sepia"
                />
              </div>
              <h4 className="text-lg font-medium uppercase mb-2">
                {item.title}
              </h4>
              <p className="font-medium text-[#F9A826] mb-2">{item.price}</p>
              <p className="text-center text-gray-600 text-sm max-w-xs">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection2;
