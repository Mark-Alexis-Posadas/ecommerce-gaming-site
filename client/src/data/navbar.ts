import { v4 as uuidv4 } from "uuid";
import type { NavbarTypes } from "../types/navbar";

export const navbarData: NavbarTypes[] = [
  {
    id: uuidv4(),
    name: "Home",
    path: "/",
  },
  {
    id: uuidv4(),
    name: "Shop",
    path: "/shop",
    hasDropdown: true,
    shopDropdown: [
      { id: uuidv4(), name: "PC Games", path: "/shop/pc-games" },
      { id: uuidv4(), name: "Consoles", path: "/shop/consoles" },
      { id: uuidv4(), name: "Accessories", path: "/shop/accessories" },
      { id: uuidv4(), name: "Merch", path: "/shop/merch" },
    ],
  },
  {
    id: uuidv4(),
    name: "Deals",
    path: "/deals",
  },
  {
    id: uuidv4(),
    name: "New Arrivals",
    path: "/new-arrivals",
  },
];
