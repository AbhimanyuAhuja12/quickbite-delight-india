
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-orange-500">QuickBite</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden gap-6 md:flex">
          <Link to="/" className="text-sm font-medium hover:text-orange-500">
            Home
          </Link>
          <Link to="/restaurants" className="text-sm font-medium hover:text-orange-500">
            Restaurants
          </Link>
          <Link to="/offers" className="text-sm font-medium hover:text-orange-500">
            Offers
          </Link>
          <Link to="/help" className="text-sm font-medium hover:text-orange-500">
            Help
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-orange-500 rounded-full">
              0
            </span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden hover:bg-orange-50 md:flex">
            <User className="w-5 h-5" />
          </Button>
          
          <Button variant="default" className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600">
            Login
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-sm font-medium">
                  Home
                </Link>
                <Link to="/restaurants" className="text-sm font-medium">
                  Restaurants
                </Link>
                <Link to="/offers" className="text-sm font-medium">
                  Offers
                </Link>
                <Link to="/help" className="text-sm font-medium">
                  Help
                </Link>
                <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
