import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  Filter,
  ShoppingBag,
  Star,
  Sparkles,
  DollarSign,
  StarIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  isExpertPick?: boolean;
  category: string;
}

interface FiltersType {
  price?: string;
  title?: string;
  rating?: string;
}

export default function Shop() {
  // const categories = [
  //   "All",
  //   "Toothbrushes",
  //   "Toothpaste",
  //   "Floss",
  //   "Mouthwash",
  //   "Whitening",
  // ];

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FiltersType>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase.from("products").select("*");

        if (error) {
          console.error("Error fetching products:", error);
        } else {
          setProducts(data || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let { data, error } = await supabase
          .from("products")
          .select("category");

        if (error) {
          console.error("Error fetching categories:", error);
        } else {
          const uniqueCategories = [
            "All",
            ...new Set(data?.map((product) => product.category)),
          ];
          setCategories(uniqueCategories || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filteredProducts =
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory);
    setFilteredProducts(filteredProducts);
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Dent Shop" />

      <main className="container px-4 py-6">
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
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center mb-6 space-x-4">
          <Popover>
            <PopoverTrigger className="p-2 rounded-lg bg-muted flex items-center">
              <DollarSign size={18} />
              <span className="ml-2 text-sm">
                {filters.price || "Price: Default"}
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col space-y-2 w-40">
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    price: "Price: Low to High",
                  }));
                }}
              >
                Low to High
              </button>
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    price: "Price: High to Low",
                  }));
                }}
              >
                High to Low
              </button>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="p-2 rounded-lg bg-muted flex items-center">
              <Filter size={18} />
              <span className="ml-2 text-sm">{filters.title || "A to Z"}</span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col space-y-2 w-40">
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    title: "A to Z",
                  }));
                }}
              >
                A to Z
              </button>
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    title: "Z to A",
                  }));
                }}
              >
                Z to A
              </button>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="p-2 rounded-lg bg-muted flex items-center">
              <StarIcon size={18} />
              <span className="ml-2 text-sm">{filters.rating || "> 4.5"}</span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col space-y-2 w-40">
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    rating: "> 4.5",
                  }));
                }}
              >
                &#62; 4.5
              </button>
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    rating: "> 3.5",
                  }));
                }}
              >
                &#62; 3.5
              </button>
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    rating: "> 2.5",
                  }));
                }}
              >
                &#62; 2.5
              </button>
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    rating: "> 1.5",
                  }));
                }}
              >
                &#62; 1.5
              </button>
              <button
                className="hover:bg-secondary rounded-xl"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    rating: "> 0.5",
                  }));
                }}
              >
                &#62; 0.5
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
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

                <div className="flex justify-between">
                  <div className="flex items-center mt-auto space-x-2">
                    <div className="flex items-center bg-muted px-1.5 py-0.5 rounded text-md space-x-2">
                      <span className="font-bold text-xl">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="font-medium text-sm line-through">
                        ${(product.price + 5.0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center bg-muted px-1.5 py-0.5 rounded text-md">
                      <Star
                        size={12}
                        className="text-amber-500 fill-amber-500 mr-0.5"
                      />
                      {product.rating}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center">
                    <button className="ml-2 p-1.5 bg-primary rounded-full text-white">
                      <span className="flex items-center gap-2 text-sm">
                        <ShoppingBag size={18} />
                        Add
                      </span>
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
