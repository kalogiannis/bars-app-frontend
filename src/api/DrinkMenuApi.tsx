
import { useQuery } from "react-query";
import { DrinkItem } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useDrinkMenu = (barId: string) => {
  return useQuery<DrinkItem[]>(
    ["drinkMenu", barId],
    async () => {
      const response = await fetch(`${API_BASE_URL}/api/drink-menu/bar/${barId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch drink menu");
      }
      
      return response.json();
    },
    {
      enabled: !!barId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

export const useFeaturedDrinks = (barId: string) => {
  return useQuery<DrinkItem[]>(
    ["featuredDrinks", barId],
    async () => {
      const response = await fetch(`${API_BASE_URL}/api/drink-menu/bar/${barId}/featured`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch featured drinks");
      }
      
      return response.json();
    },
    {
      enabled: !!barId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

export const useDrinksByCategory = (barId: string, category: string) => {
  return useQuery<DrinkItem[]>(
    ["drinksByCategory", barId, category],
    async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/drink-menu/bar/${barId}/category/${category}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} drinks`);
      }
      
      return response.json();
    },
    {
      enabled: !!barId && !!category,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
