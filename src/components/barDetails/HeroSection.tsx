import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type HeroSectionProps ={
  imageUrl: string;
  name: string;
  location: string;
}

const HeroSection = ({ imageUrl, name, location }:HeroSectionProps) => (
  <div className="relative">
    <AspectRatio ratio={16 / 9}>
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
    </AspectRatio>
    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 lg:px-20">
      <h1 className="text-5xl font-bold">{name}</h1>
      <p className="mt-2 text-xl">{location}</p>
    </div>
  </div>
);

export default HeroSection;