import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faBars,
  faTimes,
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartCount = 3; // Example cart count

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-green-500">GameZone</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-green-400">
              Home
            </a>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-green-400 flex items-center gap-1"
              >
                Shop{" "}
                <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white text-gray-900 shadow-md rounded z-10">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    PC Games
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Consoles
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Accessories
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Merch
                  </a>
                </div>
              )}
            </div>
            <a href="#" className="hover:text-green-400">
              Deals
            </a>
            <a href="#" className="hover:text-green-400">
              New Arrivals
            </a>
          </div>

          {/* Search + Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search games..."
                className="rounded-full py-1 px-3 text-sm text-black"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute top-2 right-3 text-gray-500"
              />
            </div>
            <a href="#" className="hover:text-green-400 relative">
              <FontAwesomeIcon icon={faHeart} />
            </a>
            <a href="#" className="hover:text-green-400 relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                {cartCount}
              </span>
            </a>
            <a href="#" className="hover:text-green-400">
              <FontAwesomeIcon icon={faUser} />
            </a>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block hover:text-green-400">
            Home
          </a>
          <a href="#" className="block hover:text-green-400">
            Shop
          </a>
          <a href="#" className="block hover:text-green-400">
            Deals
          </a>
          <a href="#" className="block hover:text-green-400">
            New Arrivals
          </a>
        </div>
      )}
    </nav>
  );
}
