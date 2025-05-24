import { useSearchBars } from "@/api/BarApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    sortOption: "Rating"
  });
  const { results, isLoading } = useSearchBars(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page:1
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


    if (isLoading) {
    return <span>loading...</span>;
  }

  

if (!results?.data || !city) {
  return (
    <div className="p-8 text-center space-y-4">
      <p className="text-lg text-red-600">
        No bars found for “{city}”
      </p>
      <Link
        to="/"
        className="text-blue-500 underline hover:text-blue-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      User searched for::: {city}
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Bar Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((bar) => (
          <SearchResultCard bar={bar} />
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

export default SearchPage;
