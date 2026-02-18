import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { DrinkItem } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type BarOwner = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  role: "user" | "bar_owner" | "admin";
  auth0Id: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  role: "user" | "bar_owner" | "admin";
  auth0Id: string;
};

export type DashboardStats = {
  totals: {
    bars: number;
    barOwners: number;
    users: number;
  };
  recent: {
    last7Days: {
      bars: number;
      barOwners: number;
      users: number;
    };
    last30Days: {
      bars: number;
      barOwners: number;
      users: number;
    };
  };
  active: {
    bars: number;
    barOwners: number;
  };
};

type DrinkFormData = {
  barId: string;
  name: string;
  description: string;
  price: number;
  category: "Beer" | "Wine" | "Cocktail" | "Spirit" | "Non-Alcoholic" | "Special";
  imageUrl?: string;
  featured: boolean;
  ingredients: string[];
  alcoholPercentage?: number;
};

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

export const useGetDashboardStats = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getDashboardStatsRequest = async (): Promise<DashboardStats> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get dashboard statistics");
    }

    return response.json();
  };

  const { data: stats, isLoading, error } = useQuery<DashboardStats, Error>(
    "dashboardStats",
    getDashboardStatsRequest
  );

  return { stats, isLoading, error };
};

export const useGetAllBarOwners = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllBarOwnersRequest = async (): Promise<BarOwner[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get bar owners");
    }

    return response.json();
  };

  const { data: barOwners, isLoading, error, refetch } = useQuery<BarOwner[], Error>(
    "allBarOwners",
    getAllBarOwnersRequest
  );

  return { barOwners, isLoading, error, refetch };
};

export const useDeleteBarOwner = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: deleteBarOwner, isLoading, isError, isSuccess } = useMutation(
    async (barOwnerId: string) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/admin/bar-owners/${barOwnerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete bar owner");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allBarOwners");
      },
    }
  );

  return { deleteBarOwner, isLoading, isError, isSuccess };
};

export const useGetBarOwnerById = (barOwnerId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getBarOwnerByIdRequest = async (): Promise<BarOwner> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners/${barOwnerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get bar owner");
    }

    return response.json();
  };

  const { data: barOwner, isLoading, error } = useQuery<BarOwner, Error>(
    ["barOwner", barOwnerId],
    getBarOwnerByIdRequest,
    { enabled: !!barOwnerId }
  );

  return { barOwner, isLoading, error };
};


export const useGetAllUsers = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllUsersRequest = async (): Promise<User[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get users");
    }

    return response.json();
  };

  const { data: users, isLoading, error, refetch } = useQuery<User[], Error>(
    "allUsers",
    getAllUsersRequest
  );

  return { users, isLoading, error, refetch };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: deleteUser, isLoading, isError, isSuccess } = useMutation(
    async (userId: string) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allUsers");
      },
    }
  );

  return { deleteUser, isLoading, isError, isSuccess };
};


export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(
    async (formData: User) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allUsers");
      },
    }
  );

  return { createUser, isLoading, isError, isSuccess };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: updateUser, isLoading, isError, isSuccess } = useMutation(
    async (formData: User) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${formData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allUsers");
      },
    }
  );

  return { updateUser, isLoading, isError, isSuccess };
};

export const useGetUserById = (userId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserByIdRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  };

  const { data: user, isLoading, error } = useQuery<User, Error>(
    ["user", userId],
    getUserByIdRequest,
    { enabled: !!userId }
  );

  return { user, isLoading, error };
};


export const useCreateBarOwner = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: createBarOwner, isLoading, isError, isSuccess } = useMutation(
    async (formData: { email: string; name: string; addressLine1?: string; city?: string; country?: string }) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create bar owner");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allBarOwners");
        toast.success("Bar owner created successfully!");
      },
    }
  );

  return { createBarOwner, isLoading, isError, isSuccess };
};

export const useUpdateBarOwner = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const { mutateAsync: updateBarOwner, isLoading, isError, isSuccess } = useMutation(
    async (formData: { _id: string; name: string; addressLine1?: string; city?: string; country?: string }) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners/${formData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          addressLine1: formData.addressLine1,
          city: formData.city,
          country: formData.country,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bar owner");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allBarOwners");
        queryClient.invalidateQueries("barOwner");
        toast.success("Bar owner updated successfully!");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return { updateBarOwner, isLoading, isError, isSuccess };
};

export const useCreateBarOwnerBar = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createBarOwnerBarRequest = async ({ barOwnerId, barFormData }: { barOwnerId: string; barFormData: FormData }) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/bar-owners/${barOwnerId}/bars`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: barFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create bar");
    }
    return response.json();
  };

  const { mutateAsync: createBarOwnerBar, isLoading, isSuccess, error } = useMutation(createBarOwnerBarRequest);

  if (isSuccess) {
    toast.success("Bar created successfully!");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { createBarOwnerBar, isLoading };
};

export const useUpdateBar = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateBarRequest = async ({ barId, barFormData }: { barId: string; barFormData: FormData }) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/bars/${barId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: barFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update bar");
    }
    return response.json();
  };

  const { mutateAsync: updateBar, isLoading, isSuccess, error } = useMutation(updateBarRequest);

  if (isSuccess) {
    toast.success("Bar updated successfully!");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { updateBar, isLoading };
};

export const useDeleteBar = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteBarRequest = async (barId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/bars/${barId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete bar");
    }
    return response.json();
  };

  const { mutateAsync: deleteBar, isLoading } = useMutation(deleteBarRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchBarOwnerBars");
      toast.success("Bar deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.toString());
    },
  });

  return { deleteBar, isLoading };
};

export const useGetDrinkMenu = (barId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getDrinkMenuRequest = async (): Promise<DrinkItem[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/drink-menu/bar/${barId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch drink menu");
    }
    return response.json();
  };

  const { data: drinkMenu, isLoading, error } = useQuery(
    ["fetchDrinkMenu", barId],
    getDrinkMenuRequest,
    { enabled: !!barId }
  );

  if (error) {
    toast.error(error.toString());
  }

  return { drinkMenu, isLoading };
};

export const useAddDrinkItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const addDrinkItemRequest = async (drinkData: DrinkFormData) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/bars/drink-menu`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drinkData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add drink item");
    }
    return response.json();
  };

  const { mutateAsync: addDrinkItem, isLoading } = useMutation(addDrinkItemRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchDrinkMenu");
      toast.success("Drink item added successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.toString());
    },
  });

  return { addDrinkItem, isLoading };
};

export const useUpdateDrinkItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateDrinkItemRequest = async ({ drinkId, drinkData }: { drinkId: string; drinkData: DrinkFormData }) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/bars/drink-menu/${drinkId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drinkData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update drink item");
    }
    return response.json();
  };

  const { mutateAsync: updateDrinkItem, isLoading } = useMutation(updateDrinkItemRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchDrinkMenu");
      toast.success("Drink item updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.toString());
    },
  });

  return { updateDrinkItem, isLoading };
};

export const useDeleteDrinkItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteDrinkItemRequest = async (drinkId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/bars/drink-menu/${drinkId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete drink item");
    }
    return response.json();
  };

  const { mutateAsync: deleteDrinkItem, isLoading } = useMutation(deleteDrinkItemRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchDrinkMenu");
      toast.success("Drink item deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.toString());
    },
  });

  return { deleteDrinkItem, isLoading };
};