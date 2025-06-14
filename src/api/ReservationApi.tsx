import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const BASE = import.meta.env.VITE_API_BASE_URL;

type Reservation = {
  _id: string;
  bar: string;
  date: string;
  time: string;
  partySize: number;
  refid: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export function useCheckAvailability(
  barId: string,
  date: string,
  time: string,
  partySize: number
) {
  return useQuery(
    ['availability', barId, date, time, partySize],
    () =>
      fetch(
        `${BASE}/api/bar/${barId}/reservations/availability?` +
          new URLSearchParams({
            date,
            time,
            partySize: String(partySize),
          })
      ).then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Availability check failed');
        }
        return res.json();
      }),
    {
      enabled: !!barId && !!date && !!time,
    }
  );
}


export function useCreateReservation(barId: string) {
   const { getAccessTokenSilently } = useAuth0();
  const qc = useQueryClient();
  return useMutation<
    Reservation,                              
    Error,
    { date: string; time: string; partySize: string; refid: string }
  >(
    async ({ date, time, partySize, refid }) => {
      const token = await getAccessTokenSilently();
      const payload = {
        date,
        time,
        partySize: Number(partySize),
        refid,
      };
      const res = await fetch(
        `${BASE}/api/bar/${barId}/reservations`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' ,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to book reservation');
      }
      const json = await res.json();
      // invalidate availability after booking
      qc.invalidateQueries(['availability', barId]);
      return json;
    }
  );
}
