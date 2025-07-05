import { PackageSearch, ShoppingBasket } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  const baseLinkClasses =
    "flex items-center p-3 my-1 rounded-md text-gray-700 transition-all duration-200 ease-in-out";
  const activeLinkClasses =
    "bg-gray-100 text-black border-l-4 border-blue-900 font-semibold";
  const inactiveLinkClasses =
    "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm";

  return (
    <nav className="bg-white h-full p-4 pt-8">
      <ul>
        <li className="mb-2">
          <Link
            to="/product-list"
            onClick={() => setActiveSection("product-list")}
            className={`${baseLinkClasses} ${
              location.pathname === "/product-list"
                ? activeLinkClasses
                : inactiveLinkClasses
            }`}
          >
            <span className="mr-3 text-lg">
              <PackageSearch color="#4571a1" />
            </span>
            Gestion d'articles
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/order-list"
            onClick={() => setActiveSection("orders")}
            className={`${baseLinkClasses} ${
              location.pathname === "/order-list"
                ? activeLinkClasses
                : inactiveLinkClasses
            }`}
          >
            <span className="mr-3 text-lg">
              <ShoppingBasket color="#4571a1" />
            </span>
            Mes commandes
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
