import { useNavigate } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useGetAllBars } from "@/api/BarApi";

const CarouselCards = () => {
  const navigate = useNavigate();
  const { bars, isLoading, error } = useGetAllBars();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!bars?.length) return <div>No bars available</div>;
  return (
    <>
      
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4">
          {bars.map((bar) => (
            <CarouselItem
              key={bar._id}
              className="md:basis-1/3 cursor-pointer"
              onClick={() => {
                console.log("Navigating to:", `/detail/${bar._id}`);
                navigate(`/detail/${bar._id}`);
              }}
            >
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <AspectRatio ratio={16 / 5}>
                  <img
                    src={bar.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                    alt={bar.name}
                  />
                </AspectRatio>
                <p className="mt-2 text-lg font-semibold">
                  {bar.name}
                </p>
                <p className="text-gray-500">${bar.city}</p>
                {/* <p className="text-sm">{bar.cuisines.join(", ")}</p> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CarouselCards;
