export interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
    description?: string;
    colors?: { name: string; value: string }[];
}

export const ALL_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Lounge Chair 01",
        category: "Living",
        price: "₹1,200",
        image: "/images/p1.png",
        description: "A perfect balance of soft curves and strong lines. Designed for hours of reading, resting, and dreaming. Upholstered in premium Italian wool."
    },
    {
        id: 2,
        name: "Minimal Desk",
        category: "Office",
        price: "₹2,400",
        image: "/images/p2.png",
        description: "Clean, distraction-free workspace. Solid oak construction with integrated cable management."
    },
    {
        id: 3,
        name: "Velvet Sofa",
        category: "Living",
        price: "₹3,800",
        image: "/images/p3.png",
        description: "Plush comfort meeting mid-century aesthetics. Stain-resistant velvet for everyday luxury."
    },
    {
        id: 4,
        name: "Oak Dining Table",
        category: "Dining",
        price: "₹2,100",
        image: "/images/p4.png",
        description: "The centerpiece of your home. Sustainably sourced oak with a protective matte finish."
    },

    {
        id: 6,
        name: "Side Table",
        category: "Living",
        price: "₹600",
        image: "/images/p6.png",
        description: "Compact elegance. Perfect for your morning coffee or favorite book."
    },
    {
        id: 7,
        name: "Modular Sectional",
        category: "Living",
        price: "₹5,400",
        image: "/images/living-room.png",
        description: "Limitless configurations for your space. Deep seating for ultimate relaxation."
    },
    {
        id: 8,
        name: "Executive Chair",
        category: "Office",
        price: "₹1,800",
        image: "/images/office.png",
        description: "Commanding presence with ergonomic support. Full-grain leather and polished aluminum base."
    },
    {
        id: 9,
        name: "Bookshelf unit",
        category: "Storage",
        price: "₹3,200",
        image: "/images/p2.png",
        description: "Display your treasures in style. Minimalist shelving with hidden storage compartments."
    },
    {
        id: 10,
        name: "Cloud Sofa",
        category: "Living",
        price: "₹4,200",
        image: "/images/living-sofa-2.png",
        description: "Like sitting on a cloud. Overstuffed down cushions for the softest seat in the house."
    },
    {
        id: 11,
        name: "Travertine Coffee Table",
        category: "Living",
        price: "₹1,500",
        image: "/images/living-table.png",
        description: "Natural stone elegance. Each piece features unique veining and texture."
    },
    {
        id: 12,
        name: "Walnut Bookshelf",
        category: "Storage",
        price: "₹3,200",
        image: "/images/office-shelf.png",
        description: "Timeless walnut finish. Adjustable shelves for books, art, and plants."
    },
    {
        id: 13,
        name: "Ergonomic Pro Chair",
        category: "Office",
        price: "₹1,200",
        image: "/images/office-chair.png",
        description: "Designed for all-day comfort. breathable mesh back and lumbar support."
    },
    {
        id: 14,
        name: "Artisan Chair",
        category: "Dining",
        price: "₹850",
        image: "/images/dining-chair.png",
        description: "Handcrafted detail. Solid wood frame with woven rope seat."
    },
    {
        id: 15,
        name: "Minimal Sideboard",
        category: "Storage",
        price: "₹3,400",
        image: "/images/dining-sideboard.png",
        description: "Sleek storage solution. Push-to-open doors for a handle-free look."
    },
    {
        id: 16,
        name: "Dining Set (6 Seats)",
        category: "Dining",
        price: "₹6,200",
        image: "/images/dining.png",
        description: "Complete dining solution. coordinated table and chairs for a cohesive look."
    },
    {
        id: 101,
        name: "Bouclé Armchair",
        category: "Living",
        price: "₹1,850",
        image: "/images/lounge-chair.png",
        description: "Texture and comfort. Soft teddy bear bouclé fabric on a swivel base.",
        colors: [
            { name: "Cream", value: "#F5F5DC" },
            { name: "Charcoal", value: "#36454F" },
            { name: "Rust", value: "#B7410E" }
        ]
    },
    {
        id: 102,
        name: "Minimalist Console",
        category: "Living",
        price: "₹1,200",
        image: "/images/minimal-desk.png",
        description: "Entryway essential. Slim profile perfect for narrow spaces."
    },
    {
        id: 201,
        name: "Drafting Table",
        category: "Office",
        price: "₹2,800",
        image: "/images/p2.png",
        description: "For the creative professional. Adjustable tilt and height."
    },
    {
        id: 202,
        name: "Leather Desk Pad",
        category: "Accessories",
        price: "₹150",
        image: "/images/side-table.png",
        description: "Protect your desk in style. Premium vegetable-tanned leather."
    },
    {
        id: 301,
        name: "Marble Serving Platter",
        category: "Accessories",
        price: "₹120",
        image: "/images/p6.png",
        description: "Host with elegance. Cool marble surface perfect for cheeses and fruits."
    },
    {
        id: 302,
        name: "Ceramic Vase Set",
        category: "Accessories",
        price: "₹280",
        image: "/images/side-table.png",
        description: "Artistic forms. Set of 3 handcrafted vases in varying heights."
    },
    {
        id: 401,
        name: "Pendant Light",
        category: "Lighting",
        price: "₹890",
        image: "/images/p5.png",
        description: "Statement overhead lighting. Hand-blown glass shade."
    },
    {
        id: 403,
        name: "Architectural Sconce",
        category: "Lighting",
        price: "₹550",
        image: "/images/p1.png",
        description: "Wall art that lights up. Geometric shadows and warm glow."
    },
    {
        id: 404,
        name: "Chandelier",
        category: "Lighting",
        price: "₹2,100",
        image: "/images/dining.png",
        description: "Grand illumination. Modern interpretation of classic elegance."
    },
    {
        id: 405,
        name: "Orbital Floor Light",
        category: "Lighting",
        price: "₹1,250",
        image: "/images/living-room.png",
        description: "A statement piece. Brushed brass with spherical opal glass diffusers."
    },
    {
        id: 406,
        name: "Industrial Desk Lamp",
        category: "Lighting",
        price: "₹380",
        image: "/images/p2.png",
        description: "Functional task lighting. Matte black finish with adjustable arm."
    },
    {
        id: 407,
        name: "Minimalist Tube Light",
        category: "Lighting",
        price: "₹220",
        image: "/images/p3.png",
        description: "Vertical light sculpture. Warm LED glow for ambient corners."
    },
    {
        id: 501,
        name: "Wool Throw Blanket",
        category: "Textiles",
        price: "₹180",
        image: "/images/p3.png",
        description: "Cozy up. 100% merino wool for warmth without weight."
    },
    {
        id: 502,
        name: "Abstract Sculpture",
        category: "Decor",
        price: "₹450",
        image: "/images/p2.png",
        description: "Conversation starter. Bronze finished resin sculpture."
    },
    {
        id: 503,
        name: "Geometric Rug",
        category: "Textiles",
        price: "₹800",
        image: "/images/living-room.png",
        description: "Ground the room. Hand-tufted wool blend with modern pattern."
    },
    {
        id: 601,
        name: "Nordic Lounge Sofa",
        category: "Living",
        price: "₹1,899",
        image: "/images/ikea-sofa.jpg",
        description: "Green velvet elegance. Spacious seating with a mid-century modern silhouette."
    },
    {
        id: 602,
        name: "ErgoWork Chair",
        category: "Office",
        price: "₹450",
        image: "/images/ikea-chair.jpg",
        description: "Minimalist task chair. Clean grey upholstery with black metal legs."
    },
    {
        id: 603,
        name: "Scandi Dining Table",
        category: "Dining",
        price: "₹890",
        image: "/images/ikea-table.jpg",
        description: "Solid wood craftsmanship. A gathering place for family and friends."
    },
    {
        id: 604,
        name: "Minimalist Bed Frame",
        category: "Bedroom",
        price: "₹1,200",
        image: "/images/ikea-bed.jpg",
        description: "Restful simplicity. Low profile platform bed in warm wood tones."
    }
];
