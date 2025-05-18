import React from "react";
import { useParams } from "react-router-dom";
import { useGetBar } from "@/api/BarApi";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const BarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bar, isLoading, isError } = useGetBar(id);
  const [activeTab, setActiveTab] = React.useState<
    "description" | "hours" | "photos" | "location"
  >("description");

  // Reservation form state
  const [people, setPeople] = React.useState<string>("2");
  const today = new Date();
  const isoToday = today.toISOString().split('T')[0];
  const [date, setDate] = React.useState<string>(isoToday);
  const [time, setTime] = React.useState<string>("19:00");

  if (isLoading) return <p className="text-center py-20">Loading bar details…</p>;
  if (isError || !bar) return <p className="text-center py-20">Bar not found.</p>;

  // Parse opening hours (e.g. "10:00–22:00")
  const [openStart, openEnd] = bar.openingHours.split(/[–-]/).map(s => s.trim());

  const mapSrc =
    `https://maps.google.com/maps?q=${encodeURIComponent(bar.location)}&output=embed`;

  const handleReservation = () => {
    const channel = "ta";
    const lang = "eng";
    const refid = uuidv4();
    const reservationUrl =
      `https://www.i-host.gr/reservations/new` +
      `?restaurant=${encodeURIComponent(bar._id)}` +
      `&channel=${encodeURIComponent(channel)}` +
      `&lang=${encodeURIComponent(lang)}` +
      `&refid=${encodeURIComponent(refid)}` +
      `&people=${encodeURIComponent(people)}` +
      `&date=${encodeURIComponent(date)}` +
      `&time=${encodeURIComponent(time)}`;

    window.location.href = reservationUrl;
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={bar.imageUrl}
            alt={bar.name}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 lg:px-20">
          <h1 className="text-5xl font-bold">{bar.name}</h1>
          <p className="mt-2 text-xl">{bar.location}</p>
        </div>

        {/* Reservation Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="absolute right-6 bottom-6 bg-amber-600 hover:bg-amber-500">
              Reserve a Table
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reserve a Table</DialogTitle>
              <DialogDescription>
                Select number of people, a valid date and time within opening hours.
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
                    {[...Array(10).keys()].map((n) => (
                      <SelectItem key={n + 1} value={`${n + 1}`}>{n + 1}</SelectItem>
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
                  min={isoToday}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Time */}
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

      {/* Tabs & Content */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        {/* Tab Navigation */}
        <nav className="flex space-x-8 border-b border-gray-700">
          {[
            { key: "description", label: "Description" },
            { key: "hours", label: "Opening Hours" },
            { key: "photos", label: "Photos" },
            { key: "location", label: "Location" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`pb-2 text-lg font-medium ${
                activeTab === key
                  ? "border-b-2 border-white"
                  : "border-b-2 border-transparent hover:border-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: tab panels */}
          <div className="lg:col-span-2 space-y-10">
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
                  <iframe
                    src={mapSrc}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: thumbnail gallery + map preview */}
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-4">
              {[bar.imageUrl, bar.imageUrl].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${bar.name} thumb ${i + 2}`}
                  className="rounded-lg object-cover w-full h-32"
                />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Map Preview</h3>
              <img
                src={bar.imageUrl}
                alt="Map preview"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarDetailPage;



// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGetBar } from "@/api/BarApi";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import { v4 as uuidv4 } from "uuid";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
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

// const BarDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: bar, isLoading, isError } = useGetBar(id);
//   const [activeTab, setActiveTab] = React.useState<
//     "description" | "hours" | "photos" | "location"
//   >("description");

//   // Reservation form state
//   const [people, setPeople] = React.useState<string>("2");
//   const [date, setDate] = React.useState<string>(
//     new Date().toISOString().split('T')[0]
//   );
//   const [time, setTime] = React.useState<string>("19:00");

//   if (isLoading) return <p className="text-center py-20">Loading bar details…</p>;
//   if (isError || !bar) return <p className="text-center py-20">Bar not found.</p>;

//   const mapSrc =
//     `https://maps.google.com/maps?q=${encodeURIComponent(bar.location)}&output=embed`;

//   const handleReservation = () => {
//     const channel = "ta";
//     const lang = "eng";
//     const refid = uuidv4();
//     const reservationUrl =
//       `https://www.i-host.gr/reservations/new` +
//       `?restaurant=${encodeURIComponent(bar._id)}` +
//       `&channel=${encodeURIComponent(channel)}` +
//       `&lang=${encodeURIComponent(lang)}` +
//       `&refid=${encodeURIComponent(refid)}` +
//       `&people=${encodeURIComponent(people)}` +
//       `&date=${encodeURIComponent(date)}` +
//       `&time=${encodeURIComponent(time)}`;

//     window.location.href = reservationUrl;
//   };

//   return (
//     <div className="bg-gray-900 text-white">
//       {/* Hero Section */}
//       <div className="relative">
//         <AspectRatio ratio={16 / 9}>
//           <img
//             src={bar.imageUrl}
//             alt={bar.name}
//             className="object-cover w-full h-full"
//           />
//         </AspectRatio>
//         <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 lg:px-20">
//           <h1 className="text-5xl font-bold">{bar.name}</h1>
//           <p className="mt-2 text-xl">{bar.location}</p>
//         </div>

//         {/* Reservation Modal */}
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button size="lg" className="absolute right-6 bottom-6 bg-amber-600 hover:bg-amber-500">
//               Reserve a Table
//             </Button>
//           </DialogTrigger>

//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Reserve a Table</DialogTitle>
//               <DialogDescription>
//                 Select number of people, date & time for your reservation.
//               </DialogDescription>
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
//                     {[...Array(10).keys()].map((n) => (
//                       <SelectItem key={n + 1} value={`${n + 1}`}>{n + 1}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Date */}
//               <div className="grid grid-cols-2 items-center gap-2">
//                 <Label htmlFor="date">Date</Label>
//                 <Input
//                   id="date"
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>

//               {/* Time */}
//               <div className="grid grid-cols-2 items-center gap-2">
//                 <Label htmlFor="time">Time</Label>
//                 <Input
//                   id="time"
//                   type="time"
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                 />
//               </div>
//             </div>

//             <DialogFooter>
//               <Button onClick={handleReservation}>Confirm</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Tabs & Content */}
//       <div className="container mx-auto px-6 lg:px-20 py-12">
//         {/* Tab Navigation */}
//         <nav className="flex space-x-8 border-b border-gray-700">
//           {[
//             { key: "description", label: "Description" },
//             { key: "hours", label: "Opening Hours" },
//             { key: "photos", label: "Photos" },
//             { key: "location", label: "Location" },
//           ].map(({ key, label }) => (
//             <button
//               key={key}
//               onClick={() => setActiveTab(key as any)}
//               className={`pb-2 text-lg font-medium ${
//                 activeTab === key
//                   ? "border-b-2 border-white"
//                   : "border-b-2 border-transparent hover:border-gray-600"
//               }`}            >
//               {label}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column: tab panels */}
//           <div className="lg:col-span-2 space-y-10">
//             {activeTab === "description" && (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold">Description</h2>
//                 <p className="leading-relaxed">{bar.description}</p>
//               </div>
//             )}

//             {activeTab === "hours" && (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold">Opening Hours</h2>
//                 <ul className="space-y-2">
//                   {bar.openingHours.split(",").map((line, idx) => (
//                     <li key={idx} className="flex justify-between">
//                       <span>{line.split("-")[0]}</span>
//                       <span>{line.split("-")[1]}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {activeTab === "photos" && (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold">Photos</h2>
//                 <div className="grid grid-cols-3 gap-4">
//                   {[bar.imageUrl, bar.imageUrl, bar.imageUrl].map((url, i) => (
//                     <img
//                       key={i}
//                       src={url}
//                       alt={`${bar.name} photo ${i + 1}`}
//                       className="rounded-lg object-cover w-full h-48"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "location" && (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold">Location</h2>
//                 <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
//                   <iframe
//                     src={mapSrc}
//                     className="w-full h-full border-0"
//                     allowFullScreen
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column: thumbnail gallery + map preview */}
//           <div className="space-y-10">
//             <div className="grid grid-cols-2 gap-4">
//               {[bar.imageUrl, bar.imageUrl].map((url, i) => (
//                 <img
//                   key={i}
//                   src={url}
//                   alt={`${bar.name} thumb ${i + 2}`}
//                   className="rounded-lg object-cover w-full h-32"
//                 />
//               ))}
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-2">Map Preview</h3>
//               <img
//                 src={bar.imageUrl}
//                 alt="Map preview"
//                 className="rounded-lg w-full h-48 object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarDetailPage;