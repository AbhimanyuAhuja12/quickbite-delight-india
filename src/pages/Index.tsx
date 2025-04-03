
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FoodCategories from "@/components/FoodCategories";
import PopularRestaurants from "@/components/PopularRestaurants";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <FoodCategories />
        <PopularRestaurants />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
