"use client";
import { UserRound, Search, ShoppingCart, TextAlignStart } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-surface px-6 py-2 border-b border-border">
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-6">
          <button className="lg:hidden p-2 rounded-xl hover:scale-105">
            <TextAlignStart className="text-text h-10 w-10  p-2 rounded-full border border-border" />
          </button>
          <div className="h-10 ">
            <p className=" text-accent">Bikaneri</p>
            <p className="text-xs text-accent">Bandhej House</p>
          </div>
        </div>

        <div className="flex items-cemter space-x-4">
          <div className="flex items-center bg-surface md:bg-section rounded-xl md:px-6  md:w-90 hover:scale-105 transition-all duration-300 ">
            <Search className="h-10 text-text md:mr-3" />
            <input
              type="text"
              placeholder="Search Products by Name, Brand. . ."
              className="hidden md:block bg-section text-text placeholder- focus:outline-none flex-1"
            />
          </div>
          <div className="bg-surface flex items-center rounded-xl hover:scale-105 transition-all duration-300">
            <ShoppingCart className="h-9" />
          </div>
          <div className="bg-surface flex items-center rounded-xl hover:scale-105 transition-all duration-300">
            <UserRound className="h-9" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
