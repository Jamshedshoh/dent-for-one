
import { useEffect, useState } from "react";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  isExpertPick?: boolean;
}

export function RecommendedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call to fetch recommended products
  useEffect(() => {
    const fetchProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setProducts([
          {
            id: "1",
            name: "Ultra Soft Toothbrush",
            description: "Gentle on gums, tough on plaque",
            price: 9.99,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=2340&auto=format&fit=crop",
            isExpertPick: true
          },
          {
            id: "2",
            name: "Whitening Toothpaste",
            description: "Removes stains and freshens breath",
            price: 7.99,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1571115355423-1d318bd95e22?q=80&w=2340&auto=format&fit=crop"
          },
          {
            id: "3",
            name: "Premium Dental Floss",
            description: "Reaches between tight spaces",
            price: 4.99,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1629311947908-4486ba06d10b?q=80&w=2340&auto=format&fit=crop"
          },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Recommended for You</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card animate-pulse rounded-xl h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Recommended for You</h3>
        <a 
          href="/shop" 
          className="text-primary flex items-center text-sm font-medium"
        >
          View All <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
      
      <div className="space-y-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-card rounded-xl shadow-sm overflow-hidden flex h-24"
          >
            <div 
              className="h-full w-24 bg-cover bg-center flex-shrink-0" 
              style={{ backgroundImage: `url(${product.image})` }}
            />
            
            <div className="p-3 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                  {product.isExpertPick && (
                    <div className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full flex items-center">
                      <Sparkles size={10} className="mr-1" />
                      Expert Pick
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {product.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">${product.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs ml-1">{product.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
