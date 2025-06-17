
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDrinkMenu, useFeaturedDrinks } from "../api/DrinkMenuApi";
import { DrinkCategorySection } from "../components/DrinkCategorySection";
import { DrinkItem } from "../types";
import { Spinner } from "../components/Spinner";
import CornerIcon from "../assets//corner.png";
import { useGetBar } from "@/api/BarApi";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Phone, ArrowLeft, CalendarDays } from "lucide-react";

export const DrinkMenuPage = () => {
  const { barId } = useParams<{ barId: string }>();
  const { data: allDrinks, isLoading: isLoadingAll } = useDrinkMenu(barId || "");
  const { data: featuredDrinks, isLoading: isLoadingFeatured } = useFeaturedDrinks(barId || "");
  const [categories, setCategories] = useState<Record<string, DrinkItem[]>>({});
  const { data } = useGetBar(barId);

  useEffect(() => {
    if (allDrinks && allDrinks.length) {
      const grouped = allDrinks.reduce((acc, d) => {
        acc[d.category] = acc[d.category] || [];
        acc[d.category].push(d);
        return acc;
      }, {} as Record<string, DrinkItem[]>);
      setCategories(grouped);
    }
  }, [allDrinks, barId]);

  const loading = isLoadingAll || isLoadingFeatured;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center py-10">
      <div className="relative bg-[#1f2735] border-2 border-white p-8 max-w-4xl w-full">
        <img src={CornerIcon} alt="" className="absolute top-0 left-0 w-12 h-12" />
        <img src={CornerIcon} alt="" className="absolute top-0 right-0 w-12 h-12 " />
        <img src={CornerIcon} alt="" className="absolute bottom-0 right-0 w-12 h-12 " />
        <img src={CornerIcon} alt="" className="absolute bottom-0 left-0 w-12 h-12 " />

        {/* Header: BAR / MENU */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold text-amber-300">{data?.name}</h2>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <div className="h-px w-24 bg-amber-300" />
            <span className="text-2xl text-white tracking-widest">MENU</span>
            <div className="h-px w-24 bg-amber-300" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link to={`/detail/${barId}`}>
            <Button variant="outline" className="text-black border-white hover:bg-white hover:text-gray-700 ">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Bar Details
            </Button>
          </Link>
          <Link to={`/bar/${barId}/reserve`}>
            <Button variant="outline" className="text-black border-white hover:bg-white hover:text-gray-700">
              <CalendarDays className="mr-2 h-4 w-4" />
              Make a Reservation
            </Button>
          </Link>
         {/*  <a href={`tel:${data?.phoneNumber || "+1234567890"}`}> */}
          <a href={`tel:${data?.name || "+1234567890"}`}>
            <Button variant="outline" className="text-black border-white hover:bg-white hover:text-gray-700">
              <Phone className="mr-2 h-4 w-4" />
              Call Bar
            </Button>
          </a>
          {barId && <FavoriteButton barId={barId} className="text-white border-white hover:bg-white hover:text-gray-900" />}
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner size="lg" />
          </div>
        ) : !allDrinks || !allDrinks.length ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              No drinks available
            </h3>
            <p className="text-gray-500">
              This bar hasn't added any drinks to their menu yet.
            </p>
          </div>
        ) : (
          <>
            {featuredDrinks && featuredDrinks.length > 0 && (
              <div className="mb-16">
                <h3 className="text-3xl font-semibold text-amber-300 inline-block border-b-2 border-amber-300 mb-8">
                  Cocktails
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredDrinks.map((drink) => (
                    <div key={drink._id} className="flex justify-between">
                      <span className="text-lg text-white">{drink.name}</span>
                      <span className="text-amber-600 font-semibold">
                        ${drink.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Object.entries(categories).map(([category, drinks]) => (
              <DrinkCategorySection
                key={category}
                title={category}
                drinks={drinks}
                isLoading={false}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};


