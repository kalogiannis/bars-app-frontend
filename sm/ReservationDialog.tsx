import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface Props {
  barId: string;
  barName: string;
  openingHours: string; // e.g. "17:00–23:00"
}

const ReservationDialog: React.FC<Props> = ({
  barId,
  barName,
  openingHours,
}) => {
  const navigate = useNavigate();
  const [people, setPeople] = useState('2');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);

  // build 30‑min time slots from openingHours
  useEffect(() => {
    const [start, end] = openingHours.split(/[–-]/).map((s) => s.trim());
    if (!start || !end) {
      setSlots([]);
      return;
    }
    const startDt = new Date(`2000-01-01T${start}`);
    const endDt = new Date(`2000-01-01T${end}`);
    const out: string[] = [];
    let cur = startDt;
    while (cur <= endDt) {
      const hh = String(cur.getHours()).padStart(2, '0');
      const mm = String(cur.getMinutes()).padStart(2, '0');
      out.push(`${hh}:${mm}`);
      cur = new Date(cur.getTime() + 30 * 60 * 1000);
    }
    setSlots(out);
    if (out.length && !time) setTime(out[0]);
  }, [openingHours, time]);

  // check live availability (optional UI feedback)
  const avail = useCheckAvailability(barId, date, time, Number(people));
  // booking mutation
  const createRes = useCreateReservation(barId);

  const handleConfirm = async () => {
    const refid = uuidv4();
    try {
      // 1) POST reservation
      await createRes.mutateAsync({
        date,
        time,
        partySize: people,
        refid,
      });
      // 2) on success, redirect to confirmation page
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
    } catch (err: any) {
      alert(err.message || 'Could not complete reservation.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="absolute right-6 bottom-6 bg-amber-600 hover:bg-amber-500"
        >
          Reserve a Table
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reserve a Table</DialogTitle>
          <DialogDescription>
            Select party size, date & time
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* People */}
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="people">People</Label>
            <Select value={people} onValueChange={setPeople}>
              <SelectTrigger id="people" className="w-full">
                <SelectValue placeholder="Select people" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }).map((_, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {slots.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Optional: live availability message */}
          {avail.data && (
            <p
              className={
                avail.data.isAvailable ? 'text-green-600' : 'text-red-600'
              }
            >
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
