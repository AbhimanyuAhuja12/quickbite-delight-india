
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">QuickBite</h3>
            <p className="text-gray-600 mb-4">
              Order delicious food online from your favorite restaurants with fast delivery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-orange-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Partner with Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Help & Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Partner with Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Ride with Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">We Deliver to:</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Mumbai</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Delhi</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Bangalore</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Hyderabad</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Pune</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} QuickBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
