import CategoryTemplate from "@/components/templates/CategoryPage";

const OFFICE_PRODUCTS = [
    { id: 2, name: "Minimal Desk", category: "Office", price: "₹2,400", image: "/images/p2.png" },
    { id: 8, name: "Executive Chair", category: "Office", price: "₹1,800", image: "/images/office.png" },
    { id: 12, name: "Walnut Bookshelf", category: "Storage", price: "₹3,200", image: "/images/office-shelf.png" },
    { id: 13, name: "Ergonomic Pro Chair", category: "Office", price: "₹1,200", image: "/images/office-chair.png" },
    { id: 201, name: "Drafting Table", category: "Office", price: "₹2,800", image: "/images/p2.png" },
    { id: 202, name: "Leather Desk Pad", category: "Accessories", price: "₹150", image: "/images/side-table.png" },
    { id: 5, name: "Floor Lamp", category: "Lighting", price: "₹450", image: "/images/p5.png" },
    { id: 9, name: "Bookshelf unit", category: "Storage", price: "₹3,200", image: "/images/p2.png" },
];

export default function OfficePage() {
    return (
        <CategoryTemplate
            title="Office"
            description="Workspace defined by clarity and focus. Premium tools for big ideas."
            heroImage="/images/office.png"
            products={OFFICE_PRODUCTS}
        />
    );
}
