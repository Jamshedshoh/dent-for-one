import { db } from "../database/client";

const products = [
  { name: "Electric Toothbrush", description: "Rechargeable toothbrush with multiple brushing modes.", price: 50, stock: 25, category: "Hygiene", image_url: "https://picsum.photos/200/300?random=1" },
  { name: "Dental Floss", description: "Waxed dental floss for effective plaque removal.", price: 5, stock: 100, category: "Hygiene", image_url: "https://picsum.photos/200/300?random=2" },
  { name: "Mouthwash", description: "Antibacterial mouthwash for fresh breath and gum protection.", price: 10, stock: 50, category: "Hygiene", image_url: "https://picsum.photos/200/300?random=3" },
  { name: "Orthodontic Wax", description: "Relieves irritation from braces and aligners.", price: 3, stock: 40, category: "Dental Tools", image_url: "https://picsum.photos/200/300?random=4" },
  { name: "Dental Mirror", description: "Stainless steel dental mirror for home and professional use.", price: 15, stock: 20, category: "Dental Tools", image_url: "https://picsum.photos/200/300?random=5" },
  { name: "Scaler & Pick Set", description: "Professional-grade dental scaler and tartar remover.", price: 25, stock: 30, category: "Dental Tools", image_url: "https://picsum.photos/200/300?random=6" },
  { name: "Teeth Whitening Kit", description: "At-home teeth whitening strips and gel.", price: 40, stock: 35, category: "Hygiene", image_url: "https://picsum.photos/200/300?random=7" },
  { name: "Tongue Scraper", description: "Stainless steel tongue scraper for better oral hygiene.", price: 8, stock: 60, category: "Hygiene", image_url: "https://picsum.photos/200/300?random=8" }
];

export const seedProducts = async () => {
  const { data, error } = await db.from("products").insert(products);

  if (error) console.error("Error inserting mock products:", error);
  else console.log("Dental tools & hygiene products inserted successfully:", data);
};
