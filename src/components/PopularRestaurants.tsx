
import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Button } from "@/components/ui/button";

// Mock restaurant data
const mockRestaurants = [
  {
    id: "1",
    name: "Biryani House",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069a1e43?q=80&w=500&auto=format&fit=crop",
    cuisine: ["North Indian", "Biryani"],
    rating: 4.3,
    deliveryTime: 25,
    priceForTwo: 400,
    discount: "50% OFF up to ₹100"
  },
  {
    id: "2",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=500&auto=format&fit=crop",
    cuisine: ["South Indian", "Chinese"],
    rating: 4.1,
    deliveryTime: 35,
    priceForTwo: 350
  },
  {
    id: "3",
    name: "The Burger Club",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop",
    cuisine: ["American", "Fast Food"],
    rating: 4.4,
    deliveryTime: 20,
    priceForTwo: 300,
    discount: "Buy 1 Get 1 Free"
  },
  {
    id: "4",
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop",
    cuisine: ["Italian", "Pizzas"],
    rating: 4.2,
    deliveryTime: 30,
    priceForTwo: 450
  },
  {
    id: "5",
    name: "Punjabi Dhaba",
    image: "https://images.unsplash.com/photo-1631292116269-8b6f48e6a1d6?q=80&w=500&auto=format&fit=crop",
    cuisine: ["North Indian", "Punjabi"],
    rating: 3.9,
    deliveryTime: 40,
    priceForTwo: 300,
    discount: "30% OFF"
  },
  {
    id: "6",
    name: "China Town",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=500&auto=format&fit=crop",
    cuisine: ["Chinese", "Thai"],
    rating: 4.0,
    deliveryTime: 35,
    priceForTwo: 350
  }
];

// Filter options
const filters = [
  { id: "all", label: "All" },
  { id: "fast-delivery", label: "Fast Delivery" },
  { id: "offers", label: "Offers" },
  { id: "top-rated", label: "Top Rated" },
  { id: "price", label: "Price" }
];

const PopularRestaurants = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Popular Restaurants Near You
        </h2>
        <a href="/restaurants" className="text-orange-500 font-medium text-sm">
          View All
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => setActiveFilter(filter.id)}
            className={activeFilter === filter.id ? "bg-orange-500 hover:bg-orange-600" : "border-gray-200 hover:border-orange-500 hover:text-orange-500"}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularRestaurants;
