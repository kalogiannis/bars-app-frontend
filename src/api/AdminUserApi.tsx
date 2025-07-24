
import { User } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type AdminCreateUserRequest = {
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useCreateAdminUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createAdminUserRequest = async (user: AdminCreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user by admin");
    }
    return response.json(); // Return the created user data
  };

  const { mutateAsync: createAdminUser, isLoading, isError, isSuccess, error, reset } = useMutation(
    createAdminUserRequest,
    {
      onSuccess: () => {
        toast.success("User created successfully!");
      },
      onError: (err: Error) => {
        toast.error(`Error creating user: ${err.message}`);
      },
    }
  );

  return { createAdminUser, isLoading, isError, isSuccess, error, reset };
};

type AdminUpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateAdminUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateAdminUserRequest = async (data: { auth0Id: string; formData: AdminUpdateUserRequest }) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${data.auth0Id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user by admin");
    }

    return response.json();
  };

  const { mutateAsync: updateAdminUser, isLoading, isSuccess, error, reset } = useMutation(
    updateAdminUserRequest,
    {
      onSuccess: () => {
        toast.success("User profile updated by admin!");
      },
      onError: (err: Error) => {
        toast.error(`Error updating user: ${err.message}`);
      },
    }
  );

  return { updateAdminUser, isLoading, isSuccess, error, reset };
};

export const useGetAdminUserById = (auth0Id: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getAdminUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/admin/users/${auth0Id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user by admin");
    }

    return response.json();
  };

  const { data: adminUser, isLoading, error } = useQuery(
    ["fetchAdminUser", auth0Id],
    getAdminUserRequest,
    { enabled: !!auth0Id } // Only run query if auth0Id is available
  );

  if (error) {
    toast.error(error.toString());
  }

  return { adminUser, isLoading };
};

