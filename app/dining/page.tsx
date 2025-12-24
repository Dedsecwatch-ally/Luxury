import CategoryTemplate from "@/components/templates/CategoryPage";

const DINING_PRODUCTS = [
  { id: 4, name: "Oak Dining Table", category: "Dining", price: "₹2,100", image: "/images/p4.png" },
  { id: 14, name: "Artisan Chair", category: "Dining", price: "₹850", image: "/images/dining-chair.png" },
  { id: 15, name: "Minimal Sideboard", category: "Storage", price: "₹3,400", image: "/images/dining-sideboard.png" },
  { id: 16, name: "Dining Set (6 Seats)", category: "Dining", price: "₹6,200", image: "/images/dining.png" },
  { id: 301, name: "Marble Serving Platter", category: "Accessories", price: "₹120", image: "/images/p6.png" },
  { id: 302, name: "Ceramic Vase Set", category: "Accessories", price: "₹280", image: "/images/side-table.png" },
];

export default function DiningPage() {
  return (
    <CategoryTemplate
      title="Artisan Dining"
      description="Gather around craftsmanship. Tables and seating that turn meals into memories."
      heroImage="/images/dining.png"
      products={DINING_PRODUCTS}
    />
  );
}
