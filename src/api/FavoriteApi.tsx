import { useQuery, useMutation, useQueryClient } from "react-query";
import { Bar, FavoriteResponse } from "../types";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useFavoriteBar = (barId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<FavoriteResponse>(
    ["favoriteStatus", barId],
    async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/favorites/check/${barId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get favorite status");
      }

      return response.json();
    },
    {
      enabled: !!barId,
    }
  );

  const addFavoriteMutation = useMutation(
    async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/favorites/${barId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add favorite");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favoriteStatus", barId]);
        queryClient.invalidateQueries("userFavorites");
      },
    }
  );

  const removeFavoriteMutation = useMutation(
    async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/favorites/${barId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favoriteStatus", barId]);
        queryClient.invalidateQueries("userFavorites");
      },
    }
  );

  const toggleFavorite = () => {
    if (data?.isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  return {
    isFavorite: data?.isFavorite || false,
    isLoading,
    toggleFavorite,
    isToggling: addFavoriteMutation.isLoading || removeFavoriteMutation.isLoading,
  };
};

export const useUserFavorites = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery<Bar[]>("userFavorites", async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get favorites");
    }

    return response.json();
  });
};
