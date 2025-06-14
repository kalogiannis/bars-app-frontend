
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { useCheckAvailability, useCreateReservation } from '@/api/ReservationApi';

type Props = {
  barId: string;
  barName: string;
  openingHours: string; // e.g. "17:00–23:00" or "14:00–02:00"
};

const ReservationDialog= ({ barId, barName, openingHours }:Props) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const today = new Date().toISOString().split('T')[0];
  const [people, setPeople] = useState('2');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);

  const avail = useCheckAvailability(barId, date, time, Number(people));
  const createRes = useCreateReservation(barId);

  useEffect(() => {
    const parts = openingHours.split(/[–-]/).map(s => s.trim());
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      setSlots([]);
      return;
    }

    const [startStr, endStr] = parts;
    const startDt = new Date(`2000-01-01T${startStr}`);
    let endDt = new Date(`2000-01-01T${endStr}`);

    if (endDt <= startDt) {
      endDt = new Date(endDt.getTime() + 24 * 60 * 60 * 1000);
    }

    const arr: string[] = [];
    for (
      let cur = startDt;
      cur <= endDt;
      cur = new Date(cur.getTime() + 30 * 60 * 1000)
    ) {
      const hh = cur.getHours().toString().padStart(2, '0');
      const mm = cur.getMinutes().toString().padStart(2, '0');
      arr.push(`${hh}:${mm}`);
    }

    setSlots(arr);
  }, [openingHours]);

  useEffect(() => {
    if (slots.length > 0 && time === '') {
      setTime(slots[0]);
    }
  }, [slots, time]);

  const handleConfirm = async () => {
    const refid = uuidv4();
    try {
      await createRes.mutateAsync({
        date,
        time,
        partySize: people,
        refid,
      });
      navigate(
        `/reservation-confirmation?${new URLSearchParams({
          barId,
          barName,
          people,
          date,
          time,
          refid,
        }).toString()}`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    }
  };

  if (!isAuthenticated) {
    return (
      <Button
        size="lg"
        className="absolute right-6 bottom-6 bg-amber-600 hover:bg-amber-500"
        onClick={() =>
          loginWithRedirect({ appState: { returnTo: window.location.pathname } })
        }
      >
        Log in to Reserve
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="absolute bottom-4 right-4 z-50 bg-amber-600 hover:bg-amber-500"
        >
          Reserve a Table
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-visible z-[1000]">
        <DialogHeader>
          <DialogTitle>Reserve a Table</DialogTitle>
          <DialogDescription>Select party size, date & time</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="people">People</Label>
            <Select value={people} onValueChange={setPeople}>
              <SelectTrigger id="people" className="w-full">
                <SelectValue placeholder="Select people" />
              </SelectTrigger>
              <SelectContent className="z-[1100]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              min={today}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="z-[1100]">
                {slots.map(t => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {avail.data && (
            <p className={avail.data.isAvailable ? 'text-green-600' : 'text-red-600'}>
              {avail.data.isAvailable
                ? `✅ ${avail.data.freeSeats} seats left`
                : '❌ Fully booked'}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={createRes.isLoading}
            className="w-full"
          >
            {createRes.isLoading ? 'Booking…' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;



