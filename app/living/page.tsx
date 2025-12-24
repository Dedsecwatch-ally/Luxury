import CategoryTemplate from "@/components/templates/CategoryPage";

const LIVING_PRODUCTS = [
    { id: 1, name: "Lounge Chair 01", category: "Living", price: "₹1,200", image: "/images/p1.png" },
    { id: 3, name: "Velvet Sofa", category: "Living", price: "₹3,800", image: "/images/p3.png" },
    { id: 6, name: "Side Table", category: "Living", price: "₹600", image: "/images/p6.png" },
    { id: 7, name: "Modular Sectional", category: "Living", price: "₹5,400", image: "/images/living-room.png" },
    { id: 10, name: "Cloud Sofa", category: "Living", price: "₹4,200", image: "/images/living-sofa-2.png" },
    { id: 11, name: "Travertine Coffee Table", category: "Living", price: "₹1,500", image: "/images/living-table.png" },
    { id: 101, name: "Bouclé Armchair", category: "Living", price: "₹1,850", image: "/images/lounge-chair.png" },
    { id: 102, name: "Minimalist Console", category: "Living", price: "₹1,200", image: "/images/minimal-desk.png" },
    { id: 5, name: "Floor Lamp", category: "Lighting", price: "₹450", image: "/images/p5.png" },
];

export default function LivingPage() {
    return (
        <CategoryTemplate
            title="Living"
            description="Create a space that reflects your life. Comfort meets uncompromising style."
            heroImage="/images/living-room.png"
            products={LIVING_PRODUCTS}
        />
    );
}
