import CategoryTemplate from "@/components/templates/CategoryPage";

const BEDROOM_PRODUCTS = [
  { id: 17, name: "Platform Bed Frame", category: "Bedroom", price: "₹3,200", image: "/images/bedroom-bed.png" },
  { id: 18, name: "Oak Nightstand", category: "Bedroom", price: "₹800", image: "/images/bedroom-nightstand.png" },
  { id: 5, name: "Floor Lamp", category: "Lighting", price: "₹450", image: "/images/p5.png" },
  { id: 19, name: "Linen Bedding Set", category: "Bedding", price: "₹450", image: "/images/bedroom.png" },
  { id: 1, name: "Lounge Chair 01", category: "Living", price: "₹1,200", image: "/images/p1.png" },
];

export default function BedroomPage() {
  return (
    <CategoryTemplate
      title="Bedroom Sanctuary"
      description="Rest in absolute luxury. Soft textures and supportive designs for deep sleep."
      heroImage="/images/bedroom.png"
      products={BEDROOM_PRODUCTS}
    />
  );
}
