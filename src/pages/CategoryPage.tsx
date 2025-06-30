import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBarsByCategory } from "../api/BarApi";
import SearchResultCard from "../components/SearchResultCard";
import SearchResultInfo from "../components/SearchResultInfo";
import PaginationSelector from "../components/PaginationSelector";
import SortOptionDropdown from "../components/SortOptionDropdown";
import { Spinner } from "../components/Spinner";
import { CityRadioGroup } from "../components/CityRadioGroup";

export type Bar = {
  _id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  location: string;
  openingHours: string;
  imageUrl: string;
  category: string;
  lastUpdated: string;
  capacity: number;
};

const CategoryPage = () => {
  const { category } = useParams();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("mostReviewed");
  const [selectedCity, setSelectedCity] = useState("athens");

  const { results, isLoading } = useGetBarsByCategory({
    category: category!,
    page,
    sortOption,
    city: selectedCity,
  });

  useEffect(() => {
    setPage(1);
  }, [category, selectedCity]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setPage(1);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!results?.data || results.data.length === 0) {
    return (
      <div className="text-center">
        <span>No bars found for category: {category}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="filters-sidebar" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Filter by City</h3>
          <CityRadioGroup
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </div>
      </div>
      <div id="search-results" className="flex flex-col gap-5">
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo
            total={results.pagination.total}
            city={selectedCity.slice(1)}
            // city={`${category} Bars in ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`}
          />{" "}
          <SortOptionDropdown
            sortOption={sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((bar) => (
          <SearchResultCard key={bar._id} bar={bar} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
