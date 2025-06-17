
import { useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../components/barDetails/HeroSection";
import ReservationDialog from "../components/barDetails/ReservationDialog";
import Tabs, { Tab } from "../components/barDetails/Tabs";
import DescriptionTab from "../components/barDetails/DescriptionTab";
import HoursTab from "../components/barDetails/HoursTab";
import PhotosTab from "../components/barDetails/PhotosTab";
import LocationTab from "../components/barDetails/LocationTab";
import ReviewsTab from "../components/barDetails/ReviewsTab";
import { useGetBar, useGetReviews, useAddReview } from "@/api/BarApi";
import type { Review } from "@/types";
import { motion, AnimatePresence } from "framer-motion"; 

const BarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bar, isLoading, isError } = useGetBar(id);
  const { data: reviewsData, isLoading: revLoading } = useGetReviews(id);
  const addReview = useAddReview(id);

  const [activeTab, setActiveTab] = useState<Tab>("description");

  if (isLoading) return <p className="text-center py-20">Loading…</p>;
  if (isError || !bar)
    return <p className="text-center py-20">Bar not found.</p>;

  const images = [bar.imageUrl, bar.imageUrl, bar.imageUrl];
  const summary = reviewsData?.summary;
  const reviews: Review[] = reviewsData?.reviews ?? [];

  const handleAddReview = (
    reviewer: string,
    comment: string,
    rating: number
  ) => {
    if (!reviewer || !comment) return;
    addReview.mutate({ reviewer, comment, rating });
  };

  // Define variants for tab content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col overflow-x-hidden">
      <div className="relative">
        <HeroSection
          imageUrl={bar.imageUrl}
          name={bar.name}
          location={bar.location}
        />
        <ReservationDialog
          barId={bar._id}
          barName={bar.name}
          openingHours={bar.openingHours}
        />
      </div>
      <div className="container mx-auto px-6 lg:px-20 py-12 flex-1">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-10">
          <AnimatePresence mode="wait"> {/* Use AnimatePresence for exit/enter animations */}
            {activeTab === "description" && (
              <motion.div
                key="description"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DescriptionTab description={bar.description} id={bar._id} />
              </motion.div>
            )}
            {activeTab === "hours" && (
              <motion.div
                key="hours"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <HoursTab openingHours={bar.openingHours} />
              </motion.div>
            )}
            {activeTab === "photos" && (
              <motion.div
                key="photos"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <PhotosTab images={images} alt={bar.name} />
              </motion.div>
            )}
            {activeTab === "location" && (
              <motion.div
                key="location"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <LocationTab location={bar.location} />
              </motion.div>
            )}
            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ReviewsTab
                  summary={summary}
                  reviews={reviews}
                  onAdd={handleAddReview}
                  loading={revLoading || addReview.isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BarDetailPage;
