import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className=" flex items-center py-2 px-[4%] justify-between">
      <NavLink to="/" className="w-[max(10%,80px)]">
        <img src={assets.logo} alt={assets.logo} />
      </NavLink>
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
