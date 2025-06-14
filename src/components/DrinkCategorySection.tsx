
import { DrinkItem } from "../types";

interface DrinkCategorySectionProps {
  title: string;
  drinks: DrinkItem[];
  isLoading: boolean;
}

export const DrinkCategorySection= ({
  title,
  drinks,
  isLoading,
}: DrinkCategorySectionProps) => {
  if (isLoading) {
    return (
      <div className="my-12">
        <h2 className="text-2xl font-semibold text-amber-300 mb-4">{title}</h2>
        <div className="grid grid-cols-1 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-700 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!drinks || !drinks.length) return null;

  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold text-amber-300 mb-6 border-b-2 border-amber-300 inline-block">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {drinks.map((drink) => (
          <div
            key={drink._id}
            className="flex justify-between items-center border-b border-gray-700 py-2"
          >
            <span className="text-white">{drink.name}</span>
            <span className="text-amber-600 font-semibold">
              ${drink.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
