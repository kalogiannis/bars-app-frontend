
import { Heart } from "lucide-react";
import { useFavoriteBar } from "../api/FavoriteApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";

interface FavoriteButtonProps {
  barId: string;
  className?: string;
}

export const FavoriteButton = ({ barId, className = "" }: FavoriteButtonProps) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { isFavorite, toggleFavorite, isLoading, isToggling } = useFavoriteBar(barId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    toggleFavorite();
  };

  if (isLoading) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className={`h-8 w-8 ${className}`}
        disabled
      >
        <Spinner size="sm" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className={`h-8 w-8 ${className}`}
      disabled={isToggling}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isToggling ? (
        <Spinner size="sm" />
      ) : (
        <Heart 
          className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} 
        />
      )}
    </Button>
  );
};
