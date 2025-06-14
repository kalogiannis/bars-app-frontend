import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import CarouselCards from "@/components/CarouselCards";
import MenuSection from "@/components/MenuSection";
import MenuSection2 from "@/components/MenuSection2";
import DecorationText from "../components/DecorationText";

const HomePage = () => {
  const navigate = useNavigate();

  const makeSubmitHandler = (basePath: string) => (values: SearchForm) => {
    navigate(`${basePath}/${encodeURIComponent(values.searchQuery)}`);
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sequi?
        </h1>
        <span className="text-xl">Lorem ipsum dolor sit amet consectetur.</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={makeSubmitHandler("/search")}
        />
      </div>
      <DecorationText text1={"MORE THAN"} span={"Just"} text2={"DRINKS"} />
      <MenuSection />

      <MenuSection2 />
      <DecorationText text1={"SOME OF THE"} span={"BEST"} text2={"BARS IN YOUR CITY!"}/>

      <CarouselCards />
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            at autem itaque.
          </span>
          <span>Download the App</span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
