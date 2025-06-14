

const MenuSection2 = () => {
  const menuItems = [
    {
      title: "SPRING SALAD",
      price: "$16",
      description: "Cherry tomatoes, mozzarella, toast and sweet peas.",
      img: "https://images.unsplash.com/photo-1453899242646-c74d86b5b8e8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=05993ddfa31268c29b2e7e253d9b112b",
    },
    {
      title: "ARUGULA SALAD",
      price: "$18",
      description: "Ricotta, goat cheese, beetroot and datterini.",
      img: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max",
    },
    {
      title: "CROISSANT",
      price: "$12",
      description: "Classic french croissants, freeze-dried strawberries, frosting.",
      img: "https://images.unsplash.com/photo-1523476843875-43c2cb89aa85?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=ebbc04144bf8882ca12eba50d95f1150",
    },
    {
      title: "LE CREPE",
      price: "$16",
      description: "Crepe, cream, vanilla and fresh strawberry slices.",
      img: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=1080&q=80&fit=max",
    },
  ];

  return (
    <div className="w-full py-16 ">
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
            <div 
              key={index} 
              className={`flex flex-col items-center text-center px-4 mb-12 md:mb-6 w-full md:w-1/4 max-w-[300px] mx-auto ${
                index === 0 || index === menuItems.length - 1 ? 'md:-mt-16' : ''
              }`}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-md mx-auto">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-medium uppercase mb-2">{item.title}</h4>
              <p className="font-medium text-[#F9A826] mb-2">{item.price}</p>
              <p className="text-center text-gray-600 text-sm max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection2;