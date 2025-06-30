
import { useQuery, useMutation, useQueryClient } from "react-query";
import { SearchState } from "@/pages/SearchPage";
import { Bar, BarSearchResponse, Review, ReviewsResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchBars = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<BarSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/bar/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get bar");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchBars", searchState, city],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export function useGetBar(id?: string) {
  return useQuery<Bar, Error>(
    ["fetchBar", id],
    async () => {
      if (!id) throw new Error("No bar ID provided");
      const res = await fetch(`${API_BASE_URL}/api/bar/${id}`);
      if (!res.ok) throw new Error("Failed to fetch bar");
      return res.json();
    },
    { enabled: Boolean(id) }
  );
}





export function useGetReviews(barId?: string) {
  return useQuery<ReviewsResponse, Error>(
    ["fetchReviews", barId],
    async () => {
      if (!barId) throw new Error("No bar ID");
      const res = await fetch(
        `${API_BASE_URL}/api/bar/${barId}/reviews`
      );
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    { enabled: Boolean(barId) }
  );
}



export function useAddReview(barId?: string) {
  const qc = useQueryClient();
  return useMutation<
    Review,                
    Error,
    { reviewer: string; comment: string; rating: number }  
  >(
    async (newReview) => {
      if (!barId) throw new Error("No bar ID provided");
      const res = await fetch(`${API_BASE_URL}/api/bar/${barId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),  
      });
      if (!res.ok) throw new Error("Failed to add review");
      return res.json();
    },
    {
      onSuccess: () => {
        qc.invalidateQueries(["fetchReviews", barId]);
      },
    }
  );
}




export const useGetAllBars = () => {
  const getAllBarsRequest = async (): Promise<Bar[]> => {
    const response = await fetch(`${API_BASE_URL}/api/bar`);

    if (!response.ok) {
      throw new Error("Failed to get bars");
    }

    return response.json();
  };

  const { data: bars, isLoading, error } = useQuery<Bar[], Error>(
    "fetchBars",
    getAllBarsRequest
  );

  return { bars, isLoading, error };
};

export const useGetBarsByCategory = (searchState: {
  category: string;
  page: number;
  sortOption: string;
  city?: string;
}) => {
  const getBarsByCategoryRequest = async (): Promise<BarSearchResponse> => {
    const params = new URLSearchParams();
    params.set("page", searchState.page.toString());
    params.set("sortOption", searchState.sortOption);
    
    if (searchState.city) {
      params.set("city", searchState.city);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/bar/category/${searchState.category}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get bars by category");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["getBarsByCategory", searchState],
    getBarsByCategoryRequest
  );

  return {
    results,
    isLoading,
  };
};