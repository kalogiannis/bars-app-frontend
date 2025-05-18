// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useGetBar, useGetReviews, useAddReview } from "@/api/BarApi";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import { v4 as uuidv4 } from "uuid";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";

// const STAR_PATH =
//   "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.961c.3.92-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0L5.07 16.92c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L1.085 8.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z";

// const BarDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: bar, isLoading, isError } = useGetBar(id);
//   const {
//     data: reviewsData,
//     isLoading: revLoading,
//   } = useGetReviews(id);
//   const addReview = useAddReview(id);

//   const [activeTab, setActiveTab] = useState<
//     "description" | "hours" | "photos" | "location" | "reviews"
//   >("description");

//   // Reservation form
//   const [people, setPeople] = useState("2");
//   const today = new Date();
//   const isoToday = today.toISOString().split("T")[0];
//   const [date, setDate] = useState(isoToday);
//   const [time, setTime] = useState("19:00");

//   // Add-review form
//   const [reviewer, setReviewer] = useState("");
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(5);

//   if (isLoading) return <p className="text-center py-20">Loading bar details…</p>;
//   if (isError || !bar) return <p className="text-center py-20">Bar not found.</p>;

//   // parse hours & map
//   const [openStart, openEnd] = bar.openingHours.split(/[–-]/).map((s) => s.trim());
//   const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
//     bar.location
//   )}&output=embed`;

//   // reservation handler
//   const handleReservation = () => {
//     const refid = uuidv4();
//     const url =
//       `https://www.i-host.gr/reservations/new` +
//       `?restaurant=${bar._id}` +
//       `&channel=ta&lang=eng&refid=${refid}` +
//       `&people=${people}&date=${date}&time=${time}`;
//     window.location.href = url;
//   };

//   // add review handler
//   const handleAddReview = () => {
//     if (!reviewer || !comment) return;
//     addReview.mutate(
//       { reviewer, comment, rating },
//       { onSuccess: () => {
//           setReviewer("");
//           setComment("");
//           setRating(5);
//         },
//       }
//     );
//   };

//   // destructure summary + reviews array
//   const summary = reviewsData?.summary;
//   const reviews = reviewsData?.reviews;

//   return (
//     <div className="bg-gray-900 text-white">
//       {/* Hero */}
//       <div className="relative">
//         <AspectRatio ratio={16 / 9}>
//           <img src={bar.imageUrl} alt={bar.name} className="object-cover w-full h-full" />
//         </AspectRatio>
//         <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 lg:px-20">
//           <h1 className="text-5xl font-bold">{bar.name}</h1>
//           <p className="mt-2 text-xl">{bar.location}</p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button size="lg" className="absolute right-6 bottom-6 bg-amber-600 hover:bg-amber-500">
//               Reserve a Table
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Reserve a Table</DialogTitle>
//               <DialogDescription>Select number of people, valid date & time.</DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-2 items-center gap-2">
//                 <Label htmlFor="people">People</Label>
//                 <Select value={people} onValueChange={setPeople}>
//                   <SelectTrigger id="people" className="w-full">
//                     <SelectValue placeholder="Select people" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[...Array(10)].map((_, i) => (
//                       <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="grid grid-cols-2 items-center gap-2">
//                 <Label htmlFor="date">Date</Label>
//                 <Input id="date" type="date" value={date} min={isoToday} onChange={e => setDate(e.target.value)} />
//               </div>
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

//       {/* Tabs */}
//       <div className="container mx-auto px-6 lg:px-20 py-12">
//         <nav className="flex space-x-8 border-b border-gray-700">
//           {["description","hours","photos","location","reviews"].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab as any)}
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
//                 {bar.openingHours.split(",").map((line, idx) => (
//                   <li key={idx} className="flex justify-between">
//                     <span>{line.split("-")[0]}</span>
//                     <span>{line.split("-")[1]}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {activeTab === "photos" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Photos</h2>
//               <div className="grid grid-cols-3 gap-4">
//                 {[bar.imageUrl,bar.imageUrl,bar.imageUrl].map((url,i) => (
//                   <img key={i} src={url} alt={`${bar.name} photo ${i+1}`} className="rounded-lg object-cover w-full h-48"/>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "location" && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Location</h2>
//               <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
//                 <iframe src={mapSrc} className="w-full h-full border-0" allowFullScreen/>
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
//                     <span className="flex">
//                       {Array(5).fill(0).map((_,i) => (
//                         <svg key={i} className={`w-5 h-5 ${i < Math.round(summary.average) ? "text-amber-400" : "text-gray-500"}`} viewBox="0 0 20 20" fill="currentColor">
//                           <path d={STAR_PATH} />
//                         </svg>
//                       ))}
//                     </span>
//                     <span>({summary.total})</span>
//                   </div>
//                   {[5,4,3,2,1].map(star => {
//                     const count = summary.counts[star as 1|2|3|4|5]||0;
//                     const pct = summary.total ? (count/summary.total)*100 : 0;
//                     return (
//                       <div key={star} className="flex items-center space-x-2">
//                         <span className="w-12 text-right">
//                           {["Terrible","Poor","Average","Good","Excellent"][5-star]}
//                         </span>
//                         <div className="relative flex-1 h-2 bg-gray-700 rounded">
//                           <div className="absolute top-0 left-0 h-2 bg-amber-400 rounded" style={{width:`${pct}%`}}/>
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
//                 reviews?.map(r => (
//                   <Card key={r._id} className="bg-gray-800">
//                     <CardHeader className="flex justify-between items-center">
//                       <CardTitle>{r.reviewer}</CardTitle>
//                       <div className="flex space-x-1">
//                         {Array(5).fill(0).map((_,i) => (
//                           <svg key={i} className={`w-4 h-4 ${i < r.rating ? "text-amber-400" : "text-gray-600"}`} viewBox="0 0 20 20" fill="currentColor">
//                             <path d={STAR_PATH}/>
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

//               {/* Add */}
//               <div className="pt-6 border-t border-gray-700 space-y-4">
//                 <h3 className="text-xl font-semibold">Add a Review</h3>
//                 <div className="grid gap-3">
//                   <Input placeholder="Your name" value={reviewer} onChange={e => setReviewer(e.target.value)} />
//                   <Textarea placeholder="Your comment" value={comment} onChange={e => setComment(e.target.value)} />
//                   <div className="flex space-x-1">
//                     {[1,2,3,4,5].map(star => (
//                       <button key={star} type="button" onClick={() => setRating(star)}
//                               className={`p-1 ${star <= rating ? "text-amber-400" : "text-gray-500"}`}>
//                         <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current">
//                           <path d={STAR_PATH}/>
//                         </svg>
//                       </button>
//                     ))}
//                   </div>
//                   <Button onClick={handleAddReview} disabled={addReview.isLoading}>
//                     Submit Review
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarDetailPage;



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

import type { Review } from "@/types";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.961c.3.92-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0L5.07 16.92c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L1.085 8.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z";

// define tabs as literal types
const TABS = ["description", "hours", "photos", "location", "reviews"] as const;
type Tab = typeof TABS[number];

const BarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bar, isLoading, isError } = useGetBar(id);
  const { data: reviewsData, isLoading: revLoading } = useGetReviews(id);
  const addReview = useAddReview(id);

  const [activeTab, setActiveTab] = useState<Tab>("description");

  // reservation form
  const [people, setPeople] = useState("2");
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const [date, setDate] = useState(isoToday);
  const [time, setTime] = useState("19:00");

  // review form
  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(5);

  if (isLoading) return <p className="text-center py-20">Loading bar details…</p>;
  if (isError || !bar) return <p className="text-center py-20">Bar not found.</p>;

  // parse hours & map
  const [openStart, openEnd] = bar.openingHours.split(/[–-]/).map((s) => s.trim());
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(bar.location)}&output=embed`;

  // handle reservation
  const handleReservation = () => {
    const refid = uuidv4();
    const url =
      `https://www.i-host.gr/reservations/new` +
      `?restaurant=${bar._id}&channel=ta&lang=eng&refid=${refid}` +
      `&people=${people}&date=${date}&time=${time}`;
    window.location.href = url;
  };

  // handle add review
  const handleAddReview = () => {
    if (!reviewer || !comment) return;
    addReview.mutate(
      { reviewer, comment, rating },
      {
        onSuccess: () => {
          setReviewer("");
          setComment("");
          setRating(5);
        },
      }
    );
  };

  // destructure
  const summary = reviewsData?.summary;
  const reviews: Review[] = reviewsData?.reviews ?? [];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
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
              <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="people">People</Label>
                <Select value={people} onValueChange={setPeople}>
                  <SelectTrigger id="people" className="w-full">
                    <SelectValue placeholder="Select people" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} min={isoToday} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  min={openStart}
                  max={openEnd}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleReservation}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <nav className="flex space-x-8 border-b border-gray-700">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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

        <div className="mt-10">
          {activeTab === "description" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Description</h2>
              <p className="leading-relaxed">{bar.description}</p>
            </div>
          )}

          {activeTab === "hours" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Opening Hours</h2>
              <ul className="space-y-2">
                {bar.openingHours.split(",").map((line, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{line.split("-")[0]}</span>
                    <span>{line.split("-")[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "photos" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Photos</h2>
              <div className="grid grid-cols-3 gap-4">
                {[bar.imageUrl, bar.imageUrl, bar.imageUrl].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`${bar.name} photo ${i + 1}`}
                    className="rounded-lg object-cover w-full h-48"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Location</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe src={mapSrc} className="w-full h-full border-0" allowFullScreen />
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Reviews</h2>

              {/* Summary Panel */}
              {summary && (
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold">{summary.average.toFixed(1)}</span>
                    <span className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(summary.average) ? "text-amber-400" : "text-gray-500"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d={STAR_PATH} />
                          </svg>
                        ))}
                    </span>
                    <span>({summary.total})</span>
                  </div>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = summary.counts[star] || 0;
                    const pct = summary.total ? (count / summary.total) * 100 : 0;
                    // const labels = ["Terrible", "Poor", "Average", "Good", "Excellent"];
                     const labels = ["Excellent", "Good", "Average", "Poor", "Terrible"];
                    return (
                      <div key={star} className="flex items-center space-x-2">
                        <span className="w-16 text-right">{labels[5 - star]}</span>
                        <div className="relative flex-1 h-2 bg-gray-700 rounded">
                          <div
                            className="absolute top-0 left-0 h-2 bg-amber-400 rounded"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Review List */}
              {revLoading ? (
                <p>Loading reviews…</p>
              ) : (
                reviews.map((r) => (
                  <Card key={r._id} className="bg-gray-800">
                    <CardHeader className="flex justify-between items-center">
                      <CardTitle>{r.reviewer}</CardTitle>
                      <span className="flex space-x-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < r.rating ? "text-amber-400" : "text-gray-600"}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d={STAR_PATH} />
                            </svg>
                          ))}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{r.comment}</CardDescription>
                    </CardContent>
                  </Card>
                ))
              )}

              {/* Add Review Form */}
              <div className="pt-6 border-t border-gray-700 space-y-4">
                <h3 className="text-xl font-semibold">Add a Review</h3>
                <Input placeholder="Your name" value={reviewer} onChange={(e) => setReviewer(e.target.value)} />
                <Textarea placeholder="Your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
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
                <Button onClick={handleAddReview} disabled={addReview.isLoading}>
                  Submit Review
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarDetailPage;
