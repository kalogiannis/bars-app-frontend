import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBar, useGetReviews, useAddReview } from "@/api/BarApi";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.961c.3.92-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0L5.07 16.92c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L1.085 8.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z";

// Hero + Reservation Modal
const HeroSection: React.FC<any> = ({ bar, openStart, openEnd, isoToday }) => {
  const [people, setPeople] = useState("2");
  const [date, setDate] = useState(isoToday);
  const [time, setTime] = useState(openStart);

  const handleReserve = () => {
    const refid = uuidv4();
    const url =
      `https://www.i-host.gr/reservations/new` +
      `?restaurant=${bar._id}&channel=ta&lang=eng&refid=${refid}` +
      `&people=${people}&date=${date}&time=${time}`;
    window.location.href = url;
  };

  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9}>
        <img src={bar.imageUrl} alt={bar.name} className="object-cover w-full h-full" />
      </AspectRatio>
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 lg:px-20">
        <h1 className="text-5xl font-bold">{bar.name}</h1>
        <p className="mt-2 text-xl">{bar.location}</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="absolute right-6 bottom-6 bg-amber-600 hover:bg-amber-500">
            Reserve a Table
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reserve a Table</DialogTitle>
            <DialogDescription>Select # of people, date & time</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <LabelledSelect label="People" value={people} onChange={setPeople} />
            <LabelledInput label="Date" id="date" type="date" value={date} min={isoToday} onChange={setDate} />
            <LabelledInput label="Time" id="time" type="time" value={time} min={openStart} max={openEnd} onChange={setTime} />
          </div>
          <DialogFooter>
            <Button onClick={handleReserve}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Navigation Tabs
const TabNav = ({ activeTab, onSelect }) => (
  <nav className="flex space-x-8 border-b border-gray-700">
    {[
      "description",
      "hours",
      "photos",
      "location",
      "reviews",
    ].map((tab) => (
      <button
        key={tab}
        onClick={() => onSelect(tab)}
        className={`pb-2 text-lg font-medium ${
          activeTab === tab
            ? "border-b-2 border-white"
            : "border-b-2 border-transparent hover:border-gray-600"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </nav>
);

// Reviews Section
const ReviewsSection: React.FC<any> = ({ reviewsData, revLoading, handleAddReview, reviewer, setReviewer, comment, setComment, rating, setRating }) => {
  const summary = reviewsData?.summary;
  const reviews = reviewsData?.reviews;

  return (
    <div className="space-y-6">
      {/* Summary */}
      {summary && <SummaryPanel summary={summary} />}

      {/* List */}
      {revLoading ? (
        <p>Loading…</p>
      ) : (
        reviews.map((r) => <ReviewCard key={r._id} review={r} />)
      )}

      {/* Add Form */}
      <div className="pt-6 border-t border-gray-700 space-y-4">
        <h3 className="text-xl font-semibold">Add a Review</h3>
        <Input placeholder="Your name" value={reviewer} onChange={setReviewer} />
        <Textarea placeholder="Your comment" value={comment} onChange={setComment} />
        <StarPicker rating={rating} setRating={setRating} />
        <Button onClick={handleAddReview}>Submit Review</Button>
      </div>
    </div>
  );
};

// Helper Components
const LabelledSelect = ({ label, value, onChange }) => (
  <div className="grid grid-cols-2 items-center gap-2">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {[...Array(10)].map((_, i) => (
          <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const LabelledInput = ({ label, id, type, value, min, max, onChange }) => (
  <div className="grid grid-cols-2 items-center gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} min={min} max={max} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const SummaryPanel = ({ summary }) => (
  <div className="space-y-2 mb-6">
    <div className="flex items-center space-x-2">
      <span className="text-3xl font-bold">{summary.average.toFixed(1)}</span>
      <StarRow count={Math.round(summary.average)} />
      <span>({summary.total})</span>
    </div>
    {[5, 4, 3, 2, 1].map((star) => (
      <BarRow key={star} star={star} count={summary.counts[star]} total={summary.total} />
    ))}
  </div>
);

const BarRow = ({ star, count, total }) => {
  const pct = total ? (count / total) * 100 : 0;
  const labels = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  return (
    <div className="flex items-center space-x-2">
      <span className="w-12 text-right">{labels[5 - star]}</span>
      <div className="relative flex-1 h-2 bg-gray-700 rounded">
        <div className="absolute top-0 left-0 h-2 bg-amber-400 rounded" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-right">{count}</span>
    </div>
  );
};

const StarRow = ({ count }) => (
  <span className="flex">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? "text-amber-400" : "text-gray-500"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
  </span>
);

const ReviewCard = ({ review }) => (
  <Card className="bg-gray-800">
    <CardHeader className="flex justify-between items-center">
      <CardTitle>{review.reviewer}</CardTitle>
      <StarRow count={review.rating} />
    </CardHeader>
    <CardContent>
      <CardDescription>{review.comment}</CardDescription>
    </CardContent>
  </Card>
);

const StarPicker = ({ rating, setRating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className={`p-1 ${star <= rating ? "text-amber-400" : "text-gray-500"}`}
      >
        <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current">
          <path d={STAR_PATH} />
        </svg>
      </button>
    ))}
  </div>
);

// Main Component
const BarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bar, isLoading, isError } = useGetBar(id);
  const { data: reviewsData, isLoading: revLoading } = useGetReviews(id);
  const addReview = useAddReview(id);

  const [activeTab, setActiveTab] = useState("description");

  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  if (isLoading) return <p className="text-center py-20">Loading…</p>;
  if (isError || !bar) return <p className="text-center py-20">Not found</p>;

  const [openStart, openEnd] = bar.openingHours.split(/[–-]/).map((s) => s.trim());
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];

  const handleAddReview = () => {
    if (!reviewer || !comment) return;
    addReview.mutate({ reviewer, comment, rating }, { onSuccess: () => {
        setReviewer(""); setComment(""); setRating(5);
      }});
  };

  return (
    <div className="bg-gray-900 text-white">
      <HeroSection bar={bar} openStart={openStart} openEnd={openEnd} isoToday={isoToday} />
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <TabNav activeTab={activeTab} onSelect={setActiveTab} />
        <div className="mt-10">
          {activeTab === "reviews" ? (
            <ReviewsSection
              reviewsData={reviewsData}
              revLoading={revLoading}
              reviewer={reviewer}
              setReviewer={setReviewer}
              comment={comment}
              setComment={setComment}
              rating={rating}
              setRating={setRating}
              handleAddReview={handleAddReview}
            />
          ) : ( /* other tab panels here */ null )}
        </div>
      </div>
    </div>
  );
};

export default BarDetailPage;
