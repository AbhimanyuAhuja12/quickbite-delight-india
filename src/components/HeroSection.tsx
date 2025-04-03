
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-orange-100 to-orange-50 py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 md:text-5xl">
          Delicious Food, Delivered to Your Doorstep
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Order from the best local restaurants with easy, on-demand delivery.
        </p>
        
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:max-w-xl sm:mx-auto">
          <div className="relative w-full">
            <Input 
              type="text" 
              placeholder="Enter your delivery location" 
              className="pl-4 pr-10 py-6 border-orange-200 focus:border-orange-400 rounded-md w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <Button className="w-full sm:w-auto py-6 px-8 bg-orange-500 hover:bg-orange-600">
            Find Food
          </Button>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>Popular cities:</span>
          <a href="#" className="hover:text-orange-500">Mumbai</a>
          <a href="#" className="hover:text-orange-500">Delhi</a>
          <a href="#" className="hover:text-orange-500">Bangalore</a>
          <a href="#" className="hover:text-orange-500">Hyderabad</a>
          <a href="#" className="hover:text-orange-500">Chennai</a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
