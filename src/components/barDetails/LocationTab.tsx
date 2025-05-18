import React from 'react';

type LocationTabProps ={
  location: string;
}

const LocationTab = ({ location }: LocationTabProps) => {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Location</h2>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <iframe src={mapSrc} className="w-full h-full border-0" allowFullScreen />
      </div>
    </div>
  );
};

export default LocationTab;