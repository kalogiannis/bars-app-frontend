
import  { useState } from 'react';
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

const BarDetailPage = () => {
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
      <div className="relative">
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
