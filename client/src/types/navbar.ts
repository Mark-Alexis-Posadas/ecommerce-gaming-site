export interface ShopDropdownItem {
  id: string;
  name: string;
  path: string;
}

export interface NavbarTypes {
  id: string;
  name: string;
  path: string;
  hasDropdown?: boolean;
  shopDropdown?: ShopDropdownItem[];
}
