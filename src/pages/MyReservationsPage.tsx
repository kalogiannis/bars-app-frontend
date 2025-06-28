
import { useCancelReservation, useGetMyReservations } from "@/api/MyReservationApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const MyReservationsPage = () => {
  const { data: reservations, isLoading: isReservationsLoading } = useGetMyReservations();
  const cancelResMutation = useCancelReservation();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const onOpenDialog = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleCancelReservation = () => {
    if (selectedId) {
      cancelResMutation.mutate({ reservationId: selectedId, reason });
      setOpen(false);
      setSelectedId(null);
      setReason("");
    }
  };

  if (isReservationsLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="w-full h-[200px]" />
        <Skeleton className="w-full h-[200px]" />
      </div>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center text-xl text-gray-500">
        No reservations found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Reservations</h1>
      {reservations.map((reservation: any) => (
        <div
          key={reservation._id}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div>
            <h2 className="text-2xl font-semibold">
              {reservation.bar ? reservation.bar.name : "Unknown Bar"}
            </h2>
            <p className="text-gray-600">Date: {new Date(reservation.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Time: {reservation.time}</p>
            <p className="text-gray-600">Guests: {reservation.numberOfGuests}</p>
            <p className="text-gray-600">Status: {reservation.status}</p>
          </div>
          {reservation.status === "pending" && (
            <Button
              variant="destructive"
              onClick={() => onOpenDialog(reservation._id)}
              className="mt-4 md:mt-0"
            >
              Cancel Reservation
            </Button>
          )}
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Reservation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this reservation? Please provide a
              reason.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Optional: Enter reason for cancellation"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={handleCancelReservation}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyReservationsPage;



