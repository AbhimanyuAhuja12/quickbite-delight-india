
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CategoryProps {
  id: string;
  name: string;
  image: string;
}

const categories: CategoryProps[] = [
  {
    id: "1",
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Thali",
    image: "https://images.unsplash.com/photo-1631292116269-8b6f48e6a1d6?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Dosa",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Rolls",
    image: "https://images.unsplash.com/photo-1511689660979-10d2a0a84567?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Chinese",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=300&auto=format&fit=crop"
  }
];

const CategoryCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer group">
      <div className="w-28 h-28 rounded-full overflow-hidden mb-2 border-2 border-orange-100 group-hover:border-orange-500 transition-all">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

const FoodCategories = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Explore Categories
      </h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem key={category.id} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
              <CategoryCard name={category.name} image={category.image} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-6">
          <CarouselPrevious className="relative static transform-none left-0 right-0 bg-orange-500 hover:bg-orange-600 text-white" />
          <CarouselNext className="relative static transform-none left-0 right-0 bg-orange-500 hover:bg-orange-600 text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default FoodCategories;
