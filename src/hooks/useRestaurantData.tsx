
import { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";
import { MENU_API, IMG_CDN_URL, API_OPTIONS } from '@/constants/api';

// Types for our data structure
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number;
  priceForTwo: number;
  discount?: string;
}

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
}

interface UseRestaurantDataReturn {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  refetch: () => void;
  loadMore: () => void;
  hasMore: boolean;
}

const useRestaurantData = (): UseRestaurantDataReturn => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const restaurantsPerPage = 6; // Number of restaurants to load each time

  // Function to detect user's current location
  const detectCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          
          try {
            const city = await getCityFromCoordinates(latitude, longitude);
            setLocation({ ...newLocation, city });
            toast.success(`Location detected: ${city}`);
          } catch (err) {
            setLocation(newLocation); // Still set coordinates even if city lookup fails
            toast.error("Could not determine your city name.");
          }
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Could not access your location. Please enable location services.");
          setLoading(false);
          toast.error("Could not access your location");
        },
        { timeout: 10000 }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      toast.error("Geolocation is not supported by your browser");
    }
  };

  // Get city name from coordinates
  const getCityFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata"];
          const randomIndex = Math.floor((latitude + longitude) % cities.length);
          resolve(cities[randomIndex]);
        }, 500);
      });
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "Unknown City";
    }
  };

  // Function to fetch restaurants data from Swiggy API
  const fetchRestaurants = async (isLoadMore = false) => {
    if (!location) return;
    
    if (!isLoadMore) {
      setLoading(true);
    }
    setError(null);
    
    try {
      const apiUrl = MENU_API;
      
      const response = await fetch(apiUrl, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      const transformedData = transformSwiggyData(data);
      console.log("Transformed Data:", transformedData);
      
      if (isLoadMore) {
        setRestaurants(prev => [...prev, ...transformedData]);
      } else {
        setRestaurants(transformedData);
      }
      
      setHasMore(transformedData.length >= restaurantsPerPage);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to fetch restaurants. Please try again later.");
      toast.error("Failed to fetch restaurants");
      
      console.log("Falling back to mock data...");
      const mockData = await simulateApiCall(location, isLoadMore, page, restaurantsPerPage);
      
      if (isLoadMore) {
        setRestaurants(prev => [...prev, ...mockData]);
      } else {
        setRestaurants(mockData);
      }
      
      setHasMore(mockData.length >= restaurantsPerPage);
    } finally {
      setLoading(false);
    }
  };

  // Transform Swiggy API data to our Restaurant format
  const transformSwiggyData = (data: any): Restaurant[] => {
    try {
      // Find the correct card that contains the restaurant list
      const cards = data?.data?.cards || [];
      
      // Look for the restaurant list in different possible locations
      let restaurantList = [];
      
      // First attempt: check for restaurant grid listing
      const restaurantListCard = cards.find((card: any) => 
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      
      if (restaurantListCard) {
        restaurantList = restaurantListCard.card.card.gridElements.infoWithStyle.restaurants || [];
      } else {
        // Second attempt: check for restaurant carousel
        const carouselCard = cards.find((card: any) => 
          card?.card?.card?.id === "restaurant_grid_listing"
        );
        
        if (carouselCard) {
          restaurantList = carouselCard.card.card.restaurants || [];
        }
      }
      
      console.log("Restaurant list found:", restaurantList);
      
      if (!restaurantList || restaurantList.length === 0) {
        // Third attempt: look deeper in the structure
        for (const card of cards) {
          if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
            restaurantList = card.card.card.gridElements.infoWithStyle.restaurants;
            break;
          }
        }
      }
      
      return restaurantList.map((restaurant: any) => {
        const info = restaurant.info || restaurant.data?.data || restaurant;
        
        return {
          id: info.id || "",
          name: info.name || "",
          image: info.cloudinaryImageId ? `${IMG_CDN_URL}${info.cloudinaryImageId}` : "",
          cuisine: info.cuisines || [],
          rating: info.avgRating || 0,
          deliveryTime: info.sla?.deliveryTime || info.deliveryTime || 30,
          priceForTwo: typeof info.costForTwo === 'string' ? parseInt(info.costForTwo.replace(/\D/g, '')) : (info.costForTwo || 300),
          discount: info.aggregatedDiscountInfoV3?.header || info.offerMeta?.length > 0 ? info.offerMeta[0]?.header : undefined
        };
      });
    } catch (error) {
      console.error("Error transforming Swiggy data:", error);
      return [];
    }
  };

  // Simulate API call with mock data as fallback with pagination
  const simulateApiCall = async (
    loc: Location, 
    isLoadMore = false,
    currentPage = 1,
    perPage = 6
  ): Promise<Restaurant[]> => {
    return new Promise((resolve) => {
      const allMockRestaurants = [
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
        },
        {
          id: "7",
          name: "South Indian Delights",
          image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=500&auto=format&fit=crop",
          cuisine: ["South Indian", "Dosa"],
          rating: 4.5,
          deliveryTime: 30,
          priceForTwo: 250,
          discount: "20% OFF"
        },
        {
          id: "8",
          name: "Healthy Bowls",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop",
          cuisine: ["Salads", "Healthy Food"],
          rating: 4.2,
          deliveryTime: 25,
          priceForTwo: 350
        },
        {
          id: "9",
          name: "Tandoori Express",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=500&auto=format&fit=crop",
          cuisine: ["North Indian", "Kebabs"],
          rating: 4.3,
          deliveryTime: 35,
          priceForTwo: 400,
          discount: "BOGO on Tikkas"
        },
        {
          id: "10",
          name: "Sushi Corner",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop",
          cuisine: ["Japanese", "Sushi"],
          rating: 4.6,
          deliveryTime: 40,
          priceForTwo: 600
        },
        {
          id: "11",
          name: "Thai Delight",
          image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=500&auto=format&fit=crop",
          cuisine: ["Thai", "Asian"],
          rating: 4.4,
          deliveryTime: 35,
          priceForTwo: 450,
          discount: "Free Tom Yum Soup on orders above ₹600"
        },
        {
          id: "12",
          name: "Dessert King",
          image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=500&auto=format&fit=crop",
          cuisine: ["Desserts", "Ice Cream"],
          rating: 4.7,
          deliveryTime: 20,
          priceForTwo: 300
        },
        {
          id: "13",
          name: "Morning Bakery",
          image: "https://images.unsplash.com/photo-1467949576168-6ce8e2df4e13?q=80&w=500&auto=format&fit=crop",
          cuisine: ["Bakery", "Breakfast"],
          rating: 4.5,
          deliveryTime: 25,
          priceForTwo: 200,
          discount: "20% Off on Breakfast Combos"
        },
        {
          id: "14",
          name: "Street Food Corner",
          image: "https://images.unsplash.com/photo-1513640127641-49ba81f8305c?q=80&w=500&auto=format&fit=crop",
          cuisine: ["Street Food", "Chaat"],
          rating: 4.1,
          deliveryTime: 15,
          priceForTwo: 150
        },
        {
          id: "15",
          name: "Family Diner",
          image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=500&auto=format&fit=crop",
          cuisine: ["Multi-Cuisine", "Family Meals"],
          rating: 4.3,
          deliveryTime: 45,
          priceForTwo: 500,
          discount: "10% Off on Family Combos"
        }
      ];
      
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;
      const paginatedData = allMockRestaurants.slice(start, end);
      
      setTimeout(() => {
        resolve(paginatedData);
      }, 1000);
    });
  };

  // Function to load more restaurants
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setPage(prevPage => prevPage + 1);
    fetchRestaurants(true);
  }, [loading, hasMore]);

  // Function to manually trigger a refetch
  const refetch = () => {
    setPage(1);
    setHasMore(true);
    if (location) {
      fetchRestaurants();
    } else {
      detectCurrentLocation();
    }
  };

  // Effect to detect location on initial load
  useEffect(() => {
    detectCurrentLocation();
  }, []);

  // Effect to fetch restaurants when location changes
  useEffect(() => {
    if (location) {
      setPage(1);
      setHasMore(true);
      fetchRestaurants();
    }
  }, [location]);

  return { restaurants, loading, error, location, setLocation, refetch, loadMore, hasMore };
};

export default useRestaurantData;
