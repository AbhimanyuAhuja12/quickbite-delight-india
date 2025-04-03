
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus, Minus, Star, Clock, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

// Mock restaurant data
const restaurantData = {
  id: "123",
  name: "Biryani House Deluxe",
  image: "https://images.unsplash.com/photo-1633945274405-b6c8069a1e43?q=80&w=1000&auto=format&fit=crop",
  cuisines: ["North Indian", "Biryani", "Kebabs"],
  rating: 4.3,
  deliveryTime: 25,
  priceForTwo: 400,
  address: "123 Food Street, Mumbai, Maharashtra",
  offers: [
    "50% OFF up to ₹100",
    "FREE delivery on orders above ₹199",
  ],
  description: "Serving the most authentic Hyderabadi biryani and North Indian delicacies since 1998."
};

// Mock menu categories
const menuCategories = [
  {
    id: "cat1",
    name: "Recommended",
    items: [
      {
        id: "item1",
        name: "Chicken Biryani",
        description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.",
        price: 220,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=300&auto=format&fit=crop",
        veg: false,
        bestseller: true,
        rating: 4.5,
      },
      {
        id: "item2",
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes simmered in rich tomato and butter gravy.",
        price: 180,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300&auto=format&fit=crop",
        veg: true,
        bestseller: true,
        rating: 4.2,
      },
    ]
  },
  {
    id: "cat2",
    name: "Biryani",
    items: [
      {
        id: "item3",
        name: "Hyderabadi Dum Biryani",
        description: "Signature Hyderabadi style biryani with basmati rice and meat cooked on slow fire.",
        price: 250,
        image: "https://images.unsplash.com/photo-1633945274524-389f76ecb8f0?q=80&w=300&auto=format&fit=crop",
        veg: false,
        bestseller: false,
        rating: 4.6,
      },
      {
        id: "item4",
        name: "Veg Biryani",
        description: "Mixed vegetables and basmati rice cooked with aromatic spices.",
        price: 180,
        image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=300&auto=format&fit=crop",
        veg: true,
        bestseller: false,
        rating: 4.0,
      },
    ]
  },
  {
    id: "cat3",
    name: "Starters",
    items: [
      {
        id: "item5",
        name: "Chicken Tikka",
        description: "Boneless chicken pieces marinated and grilled in clay oven.",
        price: 210,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=300&auto=format&fit=crop",
        veg: false,
        bestseller: true,
        rating: 4.4,
      },
      {
        id: "item6",
        name: "Paneer Tikka",
        description: "Cubes of cottage cheese marinated with spices and grilled.",
        price: 190,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=300&auto=format&fit=crop",
        veg: true,
        bestseller: false,
        rating: 4.3,
      },
    ]
  },
];

// Loading state component
const MenuSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-24 w-24 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-full max-w-[250px]" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-24 w-24 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-full max-w-[250px]" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Menu item component
const MenuItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddItem = () => {
    setQuantity(quantity + 1);
    onAddToCart(item, quantity + 1);
  };

  const handleRemoveItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onAddToCart(item, quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 border-b pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
      <div className="relative w-24 h-24 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-md"
        />
        {item.veg ? (
          <div className="absolute top-1 left-1 w-4 h-4 border border-green-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        ) : (
          <div className="absolute top-1 left-1 w-4 h-4 border border-red-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        )}
        {item.bestseller && (
          <div className="absolute top-1 right-1 bg-yellow-500 text-white text-[8px] px-1 py-0.5 rounded">
            BESTSELLER
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{item.name}</h4>
        <div className="flex items-center gap-1 my-1">
          <span className="flex items-center gap-0.5 text-xs bg-green-500 text-white px-1 py-0.5 rounded">
            <Star className="w-3 h-3 fill-white" />
            {item.rating}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">₹{item.price}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="font-medium">₹{item.price}</span>
          {quantity === 0 ? (
            <Button 
              variant="outline" 
              className="h-8 border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
              onClick={handleAddItem}
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-2 border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-8 h-8 flex items-center justify-center text-orange-500 bg-white hover:bg-orange-50"
                onClick={handleRemoveItem}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                className="w-8 h-8 flex items-center justify-center text-orange-500 bg-white hover:bg-orange-50"
                onClick={handleAddItem}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main menu category component
const MenuCategory = ({ category, onAddToCart }) => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4 sticky top-[76px] bg-white py-2 z-10">{category.name}</h3>
      <div>
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

// Cart summary component
const CartSummary = ({ cartItems }) => {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  if (totalItems === 0) return null;
  
  return (
    <Card className="sticky bottom-4 shadow-lg border-orange-200 mt-4">
      <CardContent className="p-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        <Button className="w-full bg-orange-500 hover:bg-orange-600">
          View Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const RestaurantDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      // In a real app, you would fetch data from an API using the restaurant ID
      setTimeout(() => {
        setRestaurant(restaurantData);
        setMenu(menuCategories);
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, [id]);
  
  const handleAddToCart = (item, quantity) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
      return;
    }
    
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity } 
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-60" />
            <div className="flex gap-4">
              <Skeleton className="h-24 w-24 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full max-w-[200px]" />
                <Skeleton className="h-3 w-full max-w-[300px]" />
                <Skeleton className="h-3 w-full max-w-[150px]" />
              </div>
            </div>
            <Separator />
            <MenuSkeleton />
          </div>
        ) : (
          <div className="md:flex gap-8">
            {/* Left column - Restaurant details */}
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="sticky top-20">
                <div className="mb-4">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-48 object-cover rounded-lg" 
                  />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
                
                <p className="text-gray-500 mb-2">{restaurant.cuisines.join(", ")}</p>
                
                <p className="text-gray-500 flex items-center gap-1 mb-4">
                  <MapPin className="w-4 h-4" />
                  {restaurant.address}
                </p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded">
                    <Star className="w-4 h-4 fill-white" />
                    <span>{restaurant.rating}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime} mins</span>
                  </div>
                  
                  <div className="text-gray-500">
                    ₹{restaurant.priceForTwo} for two
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                  <p className="text-sm text-gray-500">{restaurant.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Offers</h3>
                  <div className="space-y-2">
                    {restaurant.offers.map((offer, index) => (
                      <div 
                        key={index}
                        className="border border-orange-200 bg-orange-50 text-orange-800 px-3 py-2 rounded-md text-sm flex items-start gap-2"
                      >
                        <Info className="w-4 h-4 mt-0.5 text-orange-500" />
                        <span>{offer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Menu */}
            <div className="md:w-2/3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
                
                {/* Menu categories */}
                {menu.map(category => (
                  <MenuCategory 
                    key={category.id} 
                    category={category} 
                    onAddToCart={handleAddToCart} 
                  />
                ))}
              </div>
              
              {/* Cart summary */}
              <CartSummary cartItems={cartItems} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetails;
