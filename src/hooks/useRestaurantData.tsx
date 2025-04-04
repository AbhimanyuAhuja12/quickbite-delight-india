
import { useState, useEffect } from 'react';
import { toast } from "sonner";

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

// Mock data that will be replaced with actual API response
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
  }
];

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
}

const useRestaurantData = (): UseRestaurantDataReturn => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  // Function to detect user's current location
  const detectCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          
          try {
            // Here you would normally make an API call to get city from coordinates
            // For now we'll just simulate this with mock data
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

  // Simulate getting city name from coordinates
  const getCityFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    // In a real implementation, you would make an API call to a reverse geocoding service
    // For demo purposes, we'll just return a mock city based on coordinates
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock city names based on coordinate ranges
        const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata"];
        const randomIndex = Math.floor((latitude + longitude) % cities.length);
        resolve(cities[randomIndex]);
      }, 500);
    });
  };

  // Function to fetch restaurants data based on location
  const fetchRestaurants = async () => {
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would be an API call to Swiggy's endpoints
      // For demo purposes, we'll just simulate a network request
      const data = await simulateApiCall(location);
      setRestaurants(data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to fetch restaurants. Please try again later.");
      toast.error("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  // Simulate API call with mock data
  const simulateApiCall = async (loc: Location): Promise<Restaurant[]> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // Here we would normally filter restaurants based on location
        // For now, we'll just return all mock restaurants
        resolve(mockRestaurants);
      }, 1000);
    });
  };

  // Function to manually trigger a refetch
  const refetch = () => {
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
      fetchRestaurants();
    }
  }, [location]);

  return { restaurants, loading, error, location, setLocation, refetch };
};

export default useRestaurantData;
