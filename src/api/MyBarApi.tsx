import {  Bar } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyBar = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyBarRequest = async (): Promise<Bar> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/bar`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get bar");
    }
    return response.json();
  };

  const { data: bar, isLoading } = useQuery(
    "fetchMyBar",
    getMyBarRequest
  );

  return { bar, isLoading };
};



export const useCreateMyBar = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyBarRequest = async (
    barFormData: FormData
  ): Promise<Bar> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/bar`, {
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

  const {
    mutate: createBar,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyBarRequest);

  if (isSuccess) {
    toast.success("Bar created!");
  }

  if (error) {
    toast.error("Unable to update bar");
  }

  return { createBar, isLoading };
};




export const useUpdateMyBar = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateBarRequest = async (
    barFormData: FormData
  ): Promise<Bar> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/bar`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: barFormData,
    });

    if (!response) {
      throw new Error("Failed to update bar");
    }

    return response.json();
  };

  const {
    mutate: updateBar,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateBarRequest);

  if (isSuccess) {
    toast.success("Bar Updated");
  }

  if (error) {
    toast.error("Unable to update bar");
  }

  return { updateBar, isLoading };
};




