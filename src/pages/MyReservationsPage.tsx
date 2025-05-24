import {
  useCancelReservation,
  useGetMyReservations,
} from "@/api/MyReservationApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const MyReservationsPage = () => {
  const { data: reservations, isLoading: isReservationsLoading } =
    useGetMyReservations();
  const cancelResMutation = useCancelReservation();
  // state for cancellation dialog
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const onOpenDialog = (id: string) => {
    setSelectedId(id);
    setReason("");
    setOpen(true);
  };

  const onConfirmCancel = () => {
    if (!selectedId) return;
    cancelResMutation.mutate(
      { reservationId: selectedId, reason },
      {
        onSuccess: () => {
          setOpen(false);
          setSelectedId(null);
          setReason("");
        },
      }
    );
  };

  return (
    <section className="border-t pt-6">
      <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
      {isReservationsLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {reservations?.length ? (
            reservations.map((res) => (
              <div
                key={res._id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{res.bar.name}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(res.date).toLocaleDateString()} at {res.time}
                  </p>
                  <p className="text-sm">Party size: {res.partySize}</p>
                  <span
                    className={`text-sm ${
                      res.status === "cancelled"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {res.status}
                  </span>
                  {res.status === "cancelled" && (
                    <>
                      <p className="text-xs italic text-gray-600">
                        cancelled at {new Date(res.updatedAt).toLocaleString()}
                      </p>
                      {res.cancelReason && (
                        <p className="text-xs text-gray-600">
                          reason: “{res.cancelReason}”
                        </p>
                      )}
                    </>
                  )}

                  {res.cancelledAt && (
                    <p className="text-xs text-gray-600">
                      cancelled at {new Date(res.cancelledAt).toLocaleString()}
                    </p>
                  )}
                </div>

                {res.status === "confirmed" && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => onOpenDialog(res._id)}
                      >
                        Cancel
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reason for Cancellation</DialogTitle>
                        <DialogDescription>
                          (Optional) Let us know why you’re cancelling.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-2">
                        <Label htmlFor="cancelReason">Reason</Label>
                        <Textarea
                          id="cancelReason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="e.g. changed plans…"
                          className="w-full"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={onConfirmCancel}
                          disabled={cancelResMutation.isLoading}
                          className="w-full"
                        >
                          {cancelResMutation.isLoading
                            ? "Cancelling…"
                            : "Confirm Cancel"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming reservations</p>
          )}
        </div>
      )}
    </section>
  );
};

export default MyReservationsPage;
