import { motion } from "framer-motion";
import { Bar } from "../types";
import { FavoriteButton } from "./FavoriteButton";

type BarCardProps = {
  bar: Bar;
  onClick: () => void;
  showFavoriteButton?: boolean;
}

export const BarCard = ({ bar, onClick, showFavoriteButton = false }: BarCardProps) => {
  return (
    <motion.div  whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900  rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={bar.imageUrl} 
          alt={bar.name} 
          className="w-full h-full object-cover"
        />
        {showFavoriteButton && (
          <div className="absolute top-2 right-2">
            <FavoriteButton barId={bar._id} className="bg-white/80 hover:bg-white" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{bar.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{bar.city}, {bar.country}</p>
        <p className="text-gray-500 text-sm truncate">{bar.description}</p>
      </div>
    </motion.div>
  );
};
