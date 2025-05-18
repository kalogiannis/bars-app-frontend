// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useGetBar, useGetReviews, useAddReview } from "@/api/BarApi";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// import { v4 as uuidv4 } from "uuid";

// import type { Review } from "@/types";

// // Star SVG path
// const STAR_PATH =
//   "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 ...";

// const TABS = ["description", "hours", "photos", "location", "reviews"] as const;
// type Tab = typeof TABS[number];

// const BarDetailPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const { data: bar, isLoading, isError } = useGetBar(id);
//   const { data: reviewsData, isLoading: revLoading } = useGetReviews(id);
//   const addReview = useAddReview(id);

//   const [activeTab, setActiveTab] = useState<Tab>("description");

//   // Reservation form state
//   const [people, setPeople] = useState("2");
//   const today = new Date();
//   const isoToday = today.toISOString().split("T")[0];
//   const [date, setDate] = useState(isoToday);
//   const [time, setTime] = useState("19:00");

//   // Review form state
//   const [reviewer, setReviewer] = useState("");
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState<number>(5);

//   if (isLoading) return <p className="text-center py-20">Loading…</p>;
//   if (isError || !bar) return <p className="text-center py-20">Bar not found.</p>;

//   // parse hours & map URL
//   const [openStart, openEnd] = bar.openingHours.split(/[–-]/).map((s) => s.trim());
//   const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
//     bar.location
//   )}&output=embed`;

//   // Navigate to confirmation page instead of external redirect
//   const handleReservation = () => {
//     const refid = uuidv4();
//     const params = new URLSearchParams({
//       barId: bar._id,
//       barName: bar.name,
//       people,
//       date,
//       time,
//       refid,
//     }).toString();
//     navigate(`/reservation-confirmation?${params}`);
//   };

//   // Post new review
//   const handleAddReview = () => {
//     if (!reviewer || !comment) return;
//     addReview.mutate(
//       { reviewer, comment, rating },
//       {
//         onSuccess: () => {
//           setReviewer("");
//           setComment("");
//           setRating(5);
//         },
//       }
//     );
//   };

//   const summary = reviewsData?.summary;
//   const reviews: Review[] = reviewsData?.reviews ?? [];

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col overflow-x-hidden">
//       {/* Hero */}
//       <div className="relative flex-1">
//         <AspectRatio ratio={16 / 9}>
//           <img
//             src={bar.imageUrl}
//             alt={bar.name}
//             className="block w-full h-full object-cover"
//           />
//         </AspectRatio>
//         <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 lg:px-20">
//           <h1 className="text-5xl font-bold">{bar.name}</h1>
//           <p className="mt-2 text-xl">{bar.location}</p>
//         </div>

//         {/* Reservation Modal */}
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button className="absolute right-6 bottom-6 bg-amber-600 hover:bg-amber-500" size="lg">
//               Reserve a Table
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Reserve a Table</DialogTitle>
//               <DialogDescription>Select # of people, date & time</DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               {/* People */}
//               <div className="grid grid-cols-2 items-center gap-2">
//                 <Label htmlFor="people">People</Label>
//                 <Select value={people} onValueChange={setPeople}>
//                   <SelectTrigger id="people" className="w-full">
//                     <SelectValue placeholder="Select people" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Array.from({ length: 10 }, (_, i) => (
//                       <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               {/* Date */}
//               <div className="grid grid-cols-2 items-center gap-2">
//                 <Label htmlFor="date">Date</Label>
//                 <Input id="date" type="date" value={date} min={isoToday} onChange={e => setDate(e.target.value)} />
//               </div>
//               {/* Time */}
//               <div className="grid grid-cols-2 items-center gap-2">
//                 <Label htmlFor="time">Time</Label>
//                 <Input
//                   id="time"
//                   type="time"
//                   value={time}
//                   min={openStart}
//                   max={openEnd}
//                   onChange={e => setTime(e.target.value)}
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button onClick={handleReservation}>Confirm</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-6 lg:px-20 py-12 flex-1">
//         {/* Tabs */}
//         <nav className="flex space-x-8 border-b border-gray-700">
//           {TABS.map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-2 text-lg font-medium ${
//                 activeTab === tab
//                   ? "border-b-2 border-white"
//                   : "border-b-2 border-transparent hover:border-gray-600"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-10">
//           {activeTab === "description" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Description</h2>
//               <p className="leading-relaxed">{bar.description}</p>
//             </div>
//           )}

//           {activeTab === "hours" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Opening Hours</h2>
//               <ul className="space-y-2">
//                 {bar.openingHours.split(",").map((line, idx) => {
//                   const [start, end] = line.split("-").map(s => s.trim());
//                   return <li key={idx} className="flex justify-between"><span>{start}</span><span>{end}</span></li>;
//                 })}
//               </ul>
//             </div>
//           )}

//           {activeTab === "photos" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Photos</h2>
//               <div className="grid grid-cols-3 gap-4">
//                 {[bar.imageUrl, bar.imageUrl, bar.imageUrl].map((src, idx) => (
//                   <img
//                     key={idx}
//                     src={src}
//                     alt={`${bar.name} photo ${idx+1}`}
//                     className="block w-full h-48 object-cover rounded-lg"
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "location" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Location</h2>
//               <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
//                 <iframe
//                   src={mapSrc}
//                   className="block w-full h-full border-0"
//                   allowFullScreen
//                 />
//               </div>
//             </div>
//           )}

//           {activeTab === "reviews" && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold">Reviews</h2>

//               {/* Summary */}
//               {summary && (
//                 <div className="space-y-2 mb-6">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-3xl font-bold">{summary.average.toFixed(1)}</span>
//                     <div className="flex">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`w-5 h-5 ${i < Math.round(summary.average) ? "text-amber-400" : "text-gray-500"}`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d={STAR_PATH} />
//                         </svg>
//                       ))}
//                     </div>
//                     <span>({summary.total})</span>
//                   </div>
//                   {[5,4,3,2,1].map(star => {
//                     const count = summary.counts[star] || 0;
//                     const pct = summary.total ? (count/summary.total)*100 : 0;
//                     const labels = ["Excellent","Good","Average","Poor","Terrible"];
//                     return (
//                       <div key={star} className="flex items-center space-x-2">
//                         <span className="w-16 text-right">{labels[5-star]}</span>
//                         <div className="relative flex-1 h-2 bg-gray-700 rounded">
//                           <div className="absolute top-0 left-0 h-2 bg-amber-400 rounded"
//                                style={{ width: `${pct}%` }} />
//                         </div>
//                         <span className="w-6 text-right">{count}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* List */}
//               {revLoading ? (
//                 <p>Loading reviews…</p>
//               ) : (
//                 reviews.map(r => (
//                   <Card key={r._id} className="bg-gray-800">
//                     <CardHeader className="flex justify-between items-center">
//                       <CardTitle>{r.reviewer}</CardTitle>
//                       <div className="flex space-x-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <svg
//                             key={i}
//                             className={`w-4 h-4 ${i < r.rating ? "text-amber-400" : "text-gray-600"}`}
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d={STAR_PATH} />
//                           </svg>
//                         ))}
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <CardDescription>{r.comment}</CardDescription>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}

//               {/* Add Review */}
//               <div className="pt-6 border-t border-gray-700 space-y-4">
//                 <h3 className="text-xl font-semibold">Add a Review</h3>
//                 <Input placeholder="Your name" value={reviewer} onChange={e=>setReviewer(e.target.value)} />
//                 <Textarea placeholder="Your comment" value={comment} onChange={e=>setComment(e.target.value)} />
//                 <div className="flex space-x-1">
//                   {[1,2,3,4,5].map(star => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={()=>setRating(star)}
//                       className={`p-1 ${star<=rating?"text-amber-400":"text-gray-500"}`}
//                     >
//                       <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
//                         <path d={STAR_PATH} />
//                       </svg>
//                     </button>
//                   ))}
//                 </div>
//                 <Button onClick={handleAddReview} disabled={addReview.isLoading}>
//                   Submit Review
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarDetailPage;





import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import HeroSection from '../components/barDetails/HeroSection';
import ReservationDialog from '../components/barDetails/ReservationDialog';
import Tabs, { Tab } from '../components/barDetails/Tabs';
import DescriptionTab from '../components/barDetails/DescriptionTab';
import HoursTab from '../components/barDetails/HoursTab';
import PhotosTab from '../components/barDetails/PhotosTab';
import LocationTab from '../components/barDetails/LocationTab';
import ReviewsTab from '../components/barDetails/ReviewsTab';
import { useGetBar, useGetReviews, useAddReview } from '@/api/BarApi';
import type { Review } from '@/types';

const BarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bar, isLoading, isError } = useGetBar(id);
  const { data: reviewsData, isLoading: revLoading } = useGetReviews(id);
  const addReview = useAddReview(id);

  const [activeTab, setActiveTab] = useState<Tab>('description');

  if (isLoading) return <p className="text-center py-20">Loading…</p>;
  if (isError || !bar) return <p className="text-center py-20">Bar not found.</p>;

  const images = [bar.imageUrl, bar.imageUrl, bar.imageUrl];
  const summary = reviewsData?.summary;
  const reviews: Review[] = reviewsData?.reviews ?? [];

  const handleAddReview = (reviewer: string, comment: string, rating: number) => {
    if (!reviewer || !comment) return;
    addReview.mutate({ reviewer, comment, rating });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col overflow-x-hidden">
         {/* Hero + Reservation */}
      <div className="relative flex-1">
        <HeroSection imageUrl={bar.imageUrl} name={bar.name} location={bar.location} />
        <ReservationDialog barId={bar._id} barName={bar.name} openingHours={bar.openingHours} />
      </div>
      <div className="container mx-auto px-6 lg:px-20 py-12 flex-1">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-10">
          {activeTab === 'description' && <DescriptionTab description={bar.description} />}
          {activeTab === 'hours' && <HoursTab openingHours={bar.openingHours} />}
          {activeTab === 'photos' && <PhotosTab images={images} alt={bar.name} />}
          {activeTab === 'location' && <LocationTab location={bar.location} />}
          {activeTab === 'reviews' && (
            <ReviewsTab summary={summary} reviews={reviews} onAdd={handleAddReview} loading={revLoading || addReview.isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BarDetailPage;
