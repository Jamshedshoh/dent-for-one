import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Filter, ShoppingBag, Star, Sparkles } from "lucide-react";

export default function Shop() {
  // In a real app, these would be fetched from an API
  const categories = [
    "All",
    "Toothbrushes",
    "Toothpaste",
    "Floss",
    "Mouthwash",
    "Whitening",
  ];

  const products = [
    {
      id: "1",
      name: "Ultra Soft Toothbrush",
      price: 9.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=2340&auto=format&fit=crop",
      isExpertPick: true,
      category: "Toothbrushes",
    },
    {
      id: "2",
      name: "Whitening Toothpaste",
      price: 7.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1571115355423-1d318bd95e22?q=80&w=2340&auto=format&fit=crop",
      category: "Toothpaste",
    },
    {
      id: "3",
      name: "Premium Dental Floss",
      price: 4.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1629311947908-4486ba06d10b?q=80&w=2340&auto=format&fit=crop",
      category: "Floss",
    },
    {
      id: "4",
      name: "Antibacterial Mouthwash",
      price: 11.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1612060723358-53fc89cea8e5?q=80&w=2340&auto=format&fit=crop",
      category: "Mouthwash",
    },
    {
      id: "5",
      name: "Electric Toothbrush",
      price: 49.99,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1559591937-95e5a0f2b367?q=80&w=2340&auto=format&fit=crop",
      isExpertPick: true,
      category: "Toothbrushes",
    },
    {
      id: "6",
      name: "Teeth Whitening Kit",
      price: 29.99,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1606665805732-d15efeea6211?q=80&w=2340&auto=format&fit=crop",
      category: "Whitening",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Dent Shop" />

      <main className="container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Dental Products</h2>
          <button className="p-2 rounded-lg bg-muted flex items-center">
            <Filter size={18} />
            <span className="ml-2 text-sm">Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto mb-6 -mx-4 px-4">
          <div className="flex space-x-2 w-max">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  index === 0
                    ? "bg-primary text-white"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl shadow-sm overflow-hidden flex flex-col animate-fade-in"
              style={{ animationDelay: `${parseInt(product.id) * 50}ms` }}
            >
              <div
                className="h-36 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                {product.isExpertPick && (
                  <div className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <Sparkles size={12} className="mr-1" />
                    Expert Pick
                  </div>
                )}
              </div>

              <div className="p-3 flex flex-col flex-grow">
                <h3 className="font-medium text-sm mb-1 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center mt-auto">
                  <div className="flex items-center bg-muted px-1.5 py-0.5 rounded text-xs">
                    <Star
                      size={12}
                      className="text-amber-500 fill-amber-500 mr-0.5"
                    />
                    {product.rating}
                  </div>
                  <div className="ml-auto flex items-center">
                    <span className="font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="ml-2 p-1.5 bg-primary rounded-full text-white">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
