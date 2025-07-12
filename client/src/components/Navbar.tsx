import { useState } from "react";
import { navbarData } from "../data/navbar";
import { Link } from "react-router-dom";
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
import type { NavbarTypes } from "../types/navbar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const cartCount = 3;

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-green-500">GameZone</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navbarData.map((item: NavbarTypes) =>
              item.hasDropdown ? (
                <div className="relative" key={item.id}>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="hover:text-green-400 flex items-center gap-1"
                  >
                    {item.name}
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                  </button>
                  {openDropdownId === item.id && item.shopDropdown && (
                    <div className="absolute top-full mt-2 w-48 bg-white text-gray-900 shadow-md rounded z-10">
                      {item.shopDropdown.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  className="hover:text-green-400"
                >
                  {item.name}
                </Link>
              )
            )}
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
            <Link to="/wishlist" className="hover:text-green-400 relative">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
            <Link to="/cart" className="hover:text-green-400 relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                {cartCount}
              </span>
            </Link>
            <Link to="/account" className="hover:text-green-400">
              <FontAwesomeIcon icon={faUser} />
            </Link>
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
          {navbarData.map((item: NavbarTypes) =>
            item.hasDropdown && item.shopDropdown ? (
              <div key={item.id}>
                <span className="block text-green-400 font-semibold">
                  {item.name}
                </span>
                {item.shopDropdown.map((subItem) => (
                  <Link
                    key={subItem.id}
                    to={subItem.path}
                    className="block ml-4 text-sm hover:text-green-400"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                className="block hover:text-green-400"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
