


export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  role?: "user" | "bar_owner" | "admin";
  auth0Id: string;
};

export type BarOwner = User & {
  role: "bar_owner";
};

export type Bar = {
  _id: string;
  name: string;
  city: string;
  country: string;
  openingHours: string;
  description: string;
  location: string;
  imageUrl: string;
  capacity: number;
  user: string;
  lastUpdated: string;
};


export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

// export type Bar={
//   _id:string;
//   name:string;
//   city:string;
//   country:string;
//   openingHours:string;
//   description:string;
//   location:string;
//   imageUrl: string;
//   lastUpdated:string;
// }




export type BarSearchResponse = {
  data: Bar[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};



export type Review = {
  _id: string;
  reviewer: string;
  comment: string;
  rating: number;        
  createdAt: string;
};
export type ReviewSummary = {
  average: number;
  total: number;
  counts: Record<1|2|3|4|5, number>;
};
export type ReviewsResponse = {
  summary: ReviewSummary;
  reviews: Review[];
};



export type Reservation = {
  _id: string;
  bar: Bar; 
  user: string;
  date: string;
  time: string;
  partySize: number;
  refid: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;

  cancelReason?: string;
  cancelledAt?: string;
};