"use client";

import CategoryTemplate from "@/components/templates/CategoryPage";

const ACCESSORY_PRODUCTS = [
    { id: 301, name: "Marble Serving Platter", category: "Accessories", price: "₹120", image: "/images/p6.png" },
    { id: 302, name: "Ceramic Vase Set", category: "Accessories", price: "₹280", image: "/images/side-table.png" },
    { id: 501, name: "Wool Throw Blanket", category: "Textiles", price: "₹180", image: "/images/p3.png" },
    { id: 502, name: "Abstract Sculpture", category: "Decor", price: "₹450", image: "/images/p2.png" },
    { id: 503, name: "Geometric Rug", category: "Textiles", price: "₹800", image: "/images/living-room.png" },
];

export default function AccessoriesPage() {
    return (
        <CategoryTemplate
            title="Accessories"
            description="The finishing touches. Art, textiles, and objects that define your personal style."
            heroImage="/images/side-table.png"
            products={ACCESSORY_PRODUCTS}
        />
    );
}
