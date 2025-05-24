import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const logoutOptions: LogoutOptions = {
    logoutParams: {
      returnTo: window.location.origin,
    },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-white gap-2">
        <CircleUserRound className="text-white" />
        {user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-900 text-white">
        {/* override Radix’s data-highlighted background */}
        <DropdownMenuItem className="data-[highlighted]:bg-gray-900">
          <Link to="/user-profile" className="font-bold hover:text-white text-gray-500">
            User Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="data-[highlighted]:bg-gray-900">
          <Link to="/manage-bar" className="font-bold hover:text-white text-gray-500">
            Manage bar
          </Link>
        </DropdownMenuItem>

    <DropdownMenuItem className="data-[highlighted]:bg-gray-900">
          <Link to="/reservations" className="font-bold hover:text-white text-gray-500">
            Reservations
          </Link>
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem className="data-[highlighted]:bg-gray-900">
          <Button
            onClick={() => logout(logoutOptions)}
            className="flex w-full justify-center font-bold bg-blue-500 hover:bg-blue-400 text-white rounded-md px-4 py-2"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;



