
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import logo from "../assets/200f.png";

const Header = () => {
  return (
    <header className="border-b-2 border-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Nightspotter logo"
            className="h-20 md:h-24 object-contain"
          />
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
