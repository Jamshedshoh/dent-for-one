interface Product {
  id: number;
  name: string;
  category: string;
  image_url?: string;
}

interface ProductsProps {
  products: Product[];
}

interface FeaturedProductsProps {
  products: Product[];
}