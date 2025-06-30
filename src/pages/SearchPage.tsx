
import { useSearchBars } from "@/api/BarApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CityRadioGroup } from "@/components/CityRadioGroup";
import { motion } from "framer-motion"; 

export type SearchState = {
  searchQuery: string;
  page: number;
  sortOption: string;
  selectedCity: string;
};

// Define variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    sortOption: "mostReviewed",
    selectedCity: city || "athens", // Initialize with URL city or default to \'athens\'
  });

  const { results, isLoading } = useSearchBars(searchState, searchState.selectedCity);

  useEffect(() => {
    if (city && city !== searchState.selectedCity) {
      setSearchState((prevState) => ({
        ...prevState,
        selectedCity: city,
      }));
    }
  }, [city]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const handleCityChange = (newCity: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCity: newCity,
      page: 1, 
    }));
  };

  if (isLoading) {
    return <span>loading...</span>;
  }

  if (!results?.data || !searchState.selectedCity) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-lg text-red-600">
          No bars found for “{searchState.selectedCity}”
        </p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="flex flex-col gap-5">
        <h3 className="text-lg font-semibold ">Filter by City</h3>
        <CityRadioGroup
          onCityChange={handleCityChange}
          selectedCity={searchState.selectedCity}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Bar Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={searchState.selectedCity} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {results.data.map((bar) => (
            <motion.div key={bar._id} variants={itemVariants}>
              <SearchResultCard bar={bar} />
            </motion.div>
          ))}
        </motion.div>
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;


