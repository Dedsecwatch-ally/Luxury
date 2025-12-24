"use client";

import CategoryPage from "@/components/templates/CategoryPage";

const ALL_PRODUCTS = [
  { id: 1, name: "Lounge Chair 01", category: "Living", price: "₹1,200", image: "/images/p1.png" },
  { id: 2, name: "Minimal Desk", category: "Office", price: "₹2,400", image: "/images/p2.png" },
  { id: 3, name: "Velvet Sofa", category: "Living", price: "₹3,800", image: "/images/p3.png" },
  { id: 4, name: "Oak Dining Table", category: "Dining", price: "₹2,100", image: "/images/p4.png" },
  { id: 5, name: "Floor Lamp", category: "Lighting", price: "₹450", image: "/images/p5.png" },
  { id: 6, name: "Side Table", category: "Living", price: "₹600", image: "/images/p6.png" },
  { id: 7, name: "Cloud Sofa", category: "Living", price: "₹4,500", image: "/images/living-sofa-2.png" },
  { id: 8, name: "Travertine Coffee Table", category: "Living", price: "₹1,800", image: "/images/living-table.png" },
  { id: 9, name: "Walnut Bookshelf", category: "Office", price: "₹3,200", image: "/images/office-shelf.png" },
  { id: 10, name: "Ergonomic Pro Chair", category: "Office", price: "₹1,500", image: "/images/office-chair.png" },
  { id: 11, name: "Artisan Dining Chair", category: "Dining", price: "₹850", image: "/images/dining-chair.png" },
  { id: 12, name: "Minimal Sideboard", category: "Dining", price: "₹2,800", image: "/images/dining-sideboard.png" },
  { id: 13, name: "Platform Bed frame", category: "Bedroom", price: "₹3,500", image: "/images/bedroom-bed.png" },
  { id: 14, name: "Floating Nightstand", category: "Bedroom", price: "₹650", image: "/images/bedroom-nightstand.png" },
];

export default function AllProductsPage() {
  return (
    <CategoryPage
      title="All Collections"
      description="Explore our complete range of meticulously designed furniture. From the living room to the office, find the perfect piece for your space."
      heroImage="/images/living-room.png"
      products={ALL_PRODUCTS}
    />
  );
}
