import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all bar owners
export const useGetAllBarOwners = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllBarOwnersRequest = async (): Promise<User[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bar owners");
    }

    return response.json();
  };

  const {
    data: barOwners,
    isLoading,
    error,
    refetch,
  } = useQuery("fetchAllBarOwners", getAllBarOwnersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { barOwners, isLoading, refetch };
};

// Get a specific bar owner by ID
export const useGetBarOwnerById = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getBarOwnerByIdRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bar owner");
    }

    return response.json();
  };

  const {
    data: barOwner,
    isLoading,
    error,
  } = useQuery(["fetchBarOwner", id], getBarOwnerByIdRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { barOwner, isLoading };
};

// Create a new bar owner
export const useCreateBarOwner = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createBarOwnerRequest = async (barOwnerData: Partial<User>) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(barOwnerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create bar owner");
    }

    return response.json();
  };

  const {
    mutateAsync: createBarOwner,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(createBarOwnerRequest);

  if (isSuccess) {
    toast.success("Bar owner created successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createBarOwner, isLoading };
};

// Update a bar owner
export const useUpdateBarOwner = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const updateBarOwnerRequest = async (barOwnerData: Partial<User>) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(barOwnerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update bar owner");
    }

    return response.json();
  };

  const {
    mutateAsync: updateBarOwner,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateBarOwnerRequest);

  if (isSuccess) {
    toast.success("Bar owner updated successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateBarOwner, isLoading };
};

// Delete a bar owner
export const useDeleteBarOwner = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteBarOwnerRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete bar owner");
    }

    return response.json();
  };

  const {
    mutateAsync: deleteBarOwner,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(deleteBarOwnerRequest);

  if (isSuccess) {
    toast.success("Bar owner deleted successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { deleteBarOwner, isLoading };
};

// Get all bars for a specific bar owner
export const useGetBarOwnerBars = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getBarOwnerBarsRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners/${id}/bars`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bar owner bars");
    }

    return response.json();
  };

  const {
    data: bars,
    isLoading,
    error,
  } = useQuery(["fetchBarOwnerBars", id], getBarOwnerBarsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { bars, isLoading };
};
