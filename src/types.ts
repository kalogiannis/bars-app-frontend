export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};


//30
export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};


export type Bar = {
  _id: string;
  user: string;
  barName: string;
  city: string;
  country: string;
  drinks: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};