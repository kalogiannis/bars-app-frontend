import { useUserFavorites } from "../api/FavoriteApi";
import { BarCard } from "../components/BarCard";
import { PageHeader } from "../components/PageHeader";
import { Spinner } from "../components/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
  const { isAuthenticated, isLoading: authLoading, loginWithRedirect } = useAuth0();
  const { data: favorites, isLoading } = useUserFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [authLoading, isAuthenticated, loginWithRedirect]);

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="My Favorites" />
      
      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((bar) => (
            <BarCard 
              key={bar._id} 
              bar={bar} 
              onClick={() => navigate(`/detail/${bar._id}`)}
              showFavoriteButton={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-gray-500">
            Start adding bars to your favorites to see them here.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Explore Bars
          </button>
        </div>
      )}
    </div>
  );
};
