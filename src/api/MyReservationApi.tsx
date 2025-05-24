
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { Reservation } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyReservations = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery<Reservation[]>("fetchMyReservations", async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/reservations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch reservations");
    return response.json();
  });
};

export const useCancelReservation = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ reservationId, reason }: { reservationId: string; reason?: string }) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${API_BASE_URL}/api/my/reservations/${reservationId}/cancel`,
        {
          method: "PATCH",
          headers: {
             'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
           body: JSON.stringify({ reason }),   
        }
      );

      if (!response.ok) throw new Error("Failed to cancel reservation");
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchMyReservations");
        toast.success("Reservation cancelled successfully");
      },
      onError: (error: Error) => {
        toast.error(error.toString());
      },
    }
  );
};