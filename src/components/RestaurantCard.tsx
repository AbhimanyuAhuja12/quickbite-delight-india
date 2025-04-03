
import { Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number;
  priceForTwo: number;
  discount?: string;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  priceForTwo,
  discount,
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${id}`} className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg">
        <AspectRatio ratio={4/3} className="bg-muted">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
        
        {discount && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
            {discount}
          </div>
        )}
      </div>
      
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-base text-gray-800 truncate">{name}</h3>
          <div className="flex items-center gap-1 px-1 py-0.5 bg-green-500 text-white text-xs rounded">
            <Star className="w-3 h-3 fill-white" />
            <span>{rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 truncate">{cuisine.join(", ")}</p>
        
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <span>{deliveryTime} mins</span>
          <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
          <span>₹{priceForTwo} for two</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
