import { Bar } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { MapPin, Star } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { useGetReviews } from "@/api/BarApi";

type Props = {
  bar: Bar;
};

const SearchResultCard = ({ bar }: Props) => {
  const { data: reviewsData, isLoading: revLoading } = useGetReviews(bar._id);
  const averageRating = reviewsData?.summary.average ?? 0;
  const totalReviews = reviewsData?.summary.total ?? 0;
  const reviewText = totalReviews === 1 ? "review" : "reviews";
  return (
    <Link
      to={`/detail/${bar._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group hover:bg-gray-800 transition-colors rounded"
    >
      <AspectRatio ratio={16 / 6} className="rounded-md overflow-hidden">
        <img
          src={bar.imageUrl}
          alt={bar.name}
          className="w-full h-full object-cover"
        />
      </AspectRatio>

      <div className="p-4 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{bar.name}</h3>
            <FavoriteButton barId={bar._id} />
          </div>

          <div className="flex items-center text-gray-400 mt-1">
            <MapPin size={16} className="mr-1" />
            <span className="text-gray-200">
              {bar.city}, {bar.country}
            </span>
          </div>
          <div>
            <span>capacity</span>: {bar.capacity}
          </div>
          <div className="flex items-center text-amber-500 mt-2">
            <Star size={16} className="mr-1" />
            <span className="font-semibold">
              {revLoading ? "New" : averageRating.toFixed(1)}
            </span>
            <span className="text-gray-500 ml-1">
              ({revLoading ? 0 : totalReviews} {reviewText})
            </span>
          </div>

          <p className="text-gray-600 mt-2 line-clamp-2">{bar.description}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="destructive">Details</Button>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
