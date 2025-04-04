
import { useState } from "react";
import { MapPin, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import RestaurantCard from "@/components/RestaurantCard";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import useRestaurantData from "@/hooks/useRestaurantData";

// Filter options
const filters = [
  { id: "all", label: "All" },
  { id: "fast-delivery", label: "Fast Delivery" },
  { id: "offers", label: "Offers" },
  { id: "top-rated", label: "Top Rated" },
  { id: "veg", label: "Pure Veg" },
  { id: "price", label: "Price: Low to High" }
];

const Restaurants = () => {
  const { restaurants, loading, error, location, refetch } = useRestaurantData();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter restaurants based on active filter and search query
  const filteredRestaurants = restaurants.filter(restaurant => {
    // First apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!restaurant.name.toLowerCase().includes(query) && 
          !restaurant.cuisine.some(c => c.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    // Then apply category filter
    switch (activeFilter) {
      case "fast-delivery":
        return restaurant.deliveryTime <= 30;
      case "offers":
        return !!restaurant.discount;
      case "top-rated":
        return restaurant.rating >= 4.2;
      case "veg":
        // In a real app, you would have a veg/non-veg property
        // For now, we'll just filter by cuisine containing "veg"
        return restaurant.cuisine.some(c => c.toLowerCase().includes("veg"));
      case "price":
        // This would normally sort, not filter
        return true;
      default:
        return true;
    }
  });

  // Sort restaurants if price filter is active
  const displayRestaurants = activeFilter === "price" 
    ? [...filteredRestaurants].sort((a, b) => a.priceForTwo - b.priceForTwo)
    : filteredRestaurants;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Location and search header */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Restaurants</h1>
            {location?.city && (
              <div className="flex items-center text-gray-500 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location.city}</span>
                <button 
                  onClick={refetch}
                  className="ml-2 text-orange-500 text-sm hover:underline"
                >
                  Update
                </button>
              </div>
            )}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search restaurants or cuisines"
              className="pl-9 border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={activeFilter === filter.id 
                ? "bg-orange-500 hover:bg-orange-600" 
                : "border-gray-200 hover:border-orange-500 hover:text-orange-500"
              }
            >
              {filter.id === "price" && <SlidersHorizontal className="h-4 w-4 mr-1" />}
              {filter.id === "veg" && <span className="h-3 w-3 bg-green-500 rounded-full mr-1.5" />}
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-3">{error}</p>
            <Button onClick={refetch} className="bg-orange-500 hover:bg-orange-600">
              Retry
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && displayRestaurants.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-3">No restaurants found matching your criteria.</p>
            <Button onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }} className="bg-orange-500 hover:bg-orange-600">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Restaurant Grid */}
        {!loading && !error && displayRestaurants.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;
