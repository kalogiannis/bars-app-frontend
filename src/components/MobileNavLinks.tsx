import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0, LogoutOptions } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  const logoutOptions: LogoutOptions = {
    logoutParams: {
      returnTo: window.location.origin,
    },
  };

  return (
    <>
      <Link
        to="/user-profile"
        className="flex  items-center font-bold text-gray-500 hover:text-white"
      >
        User Profile
      </Link>
      <Link
        to="/manage-bar"
        className="flex  items-center font-bold text-gray-500 hover:text-white"
      >
        My Bar
      </Link>
       <Link
        to="/favorites"
        className="flex  items-center font-bold text-gray-500 hover:text-white"
      >
        Favorites
      </Link>
         <Link
        to="/reservations"
        className="flex  items-center font-bold text-gray-500 hover:text-white"
      >
        Reservations
      </Link>
      <Button
        onClick={() => logout(logoutOptions)}
        className="flex items-center px-3 font-bold bg-blue-500 hover:bg-blue-400"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
