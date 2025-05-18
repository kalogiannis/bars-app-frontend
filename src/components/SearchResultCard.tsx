import { Bar } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

type Props = {
  bar: Bar;
};

const SearchResultCard = ({ bar }: Props) => {
  return (
    <Link
      to={`/detail/${bar._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={bar.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
         <h3 className="text-4xl font-bold tracking-tight mb-2 group-hover:underline">
          {bar.name}
        </h3>
        <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:underline">
          {bar.city}
        </h2>

        <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {bar.openingHours}
        </h3>
        
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
       <Button variant='destructive'>details</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;