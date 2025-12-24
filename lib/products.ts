export interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
    description?: string;
    colors?: { name: string; value: string }[];
    customizationOptions?: {
        fabrics?: { name: string; value: string; priceMod?: number }[];
        woods?: { name: string; value: string; priceMod?: number }[];
        legs?: { name: string; value: string; priceMod?: number }[];
    };
    specs?: {
        dimensions: string;
        material: string;
        fabric?: string;
    };
}

export const ALL_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Lounge Chair 01",
        category: "Living",
        price: "₹1,200",
        image: "/images/p1.png",
        description: "A perfect balance of soft curves and strong lines. Designed for hours of reading, resting, and dreaming. Upholstered in premium Italian wool.",
        customizationOptions: {
            fabrics: [
                { name: "Premium Wool", value: "#A89F91", priceMod: 0 },
                { name: "Bouclé", value: "#F5F5DC", priceMod: 200 },
                { name: "Velvet", value: "#2C3E50", priceMod: 150 }
            ],
            woods: [
                { name: "Oak", value: "#C19A6B", priceMod: 0 },
                { name: "Walnut", value: "#5D4037", priceMod: 100 },
                { name: "Black Ash", value: "#2F2F2F", priceMod: 50 }
            ],
            legs: [
                { name: "Standard Tapered", value: "standard", priceMod: 0 },
                { name: "Modern Metal", value: "metal", priceMod: 80 }
            ]
        },
        specs: {
            dimensions: "85cm W x 95cm D x 80cm H",
            material: "Solid sustainable oak frame, High-density foam",
            fabric: "Italian Wool Blend (90% Wool, 10% Nylon)"
        }
    },
    {
        id: 2,
        name: "Minimal Desk",
        category: "Office",
        price: "₹2,400",
        image: "/images/p2.png",
        description: "Clean, distraction-free workspace. Solid oak construction with integrated cable management.",
        customizationOptions: {
            woods: [
                { name: "Oak", value: "#C19A6B", priceMod: 0 },
                { name: "Walnut", value: "#5D4037", priceMod: 200 },
                { name: "Black Ash", value: "#2F2F2F", priceMod: 100 }
            ]
        },
        specs: {
            dimensions: "140cm W x 70cm D x 75cm H",
            material: "Solid White Oak, Matte Clear Lacquer",
            fabric: "N/A"
        }
    },
    {
        id: 3,
        name: "Velvet Sofa",
        category: "Living",
        price: "₹3,800",
        image: "/images/p3.png",
        description: "Plush comfort meeting mid-century aesthetics. Stain-resistant velvet for everyday luxury.",
        customizationOptions: {
            fabrics: [
                { name: "Royal Blue", value: "#1e3a8a", priceMod: 0 },
                { name: "Emerald Green", value: "#064e3b", priceMod: 0 },
                { name: "Dusty Rose", value: "#9f1239", priceMod: 100 }
            ],
            legs: [
                { name: "Brass", value: "#b45309", priceMod: 0 },
                { name: "Matte Black", value: "#171717", priceMod: 0 }
            ]
        },
        specs: {
            dimensions: "220cm W x 95cm D x 85cm H",
            material: "Kiln-dried hardwood frame, Sinuous spring suspension",
            fabric: "Performance Velvet (100% Polyester)"
        }
    },
    {
        id: 4,
        name: "Oak Dining Table",
        category: "Dining",
        price: "₹2,100",
        image: "/images/p4.png",
        description: "The centerpiece of your home. Sustainably sourced oak with a protective matte finish.",
        customizationOptions: {
            woods: [
                { name: "Natural Oak", value: "#C19A6B", priceMod: 0 },
                { name: "Smoked Oak", value: "#8D6E63", priceMod: 150 }
            ]
        },
        specs: {
            dimensions: "180cm L x 90cm W x 75cm H",
            material: "Solid FSC Certified Oak",
            fabric: "N/A"
        }
    },

    {
        id: 6,
        name: "Side Table",
        category: "Living",
        price: "₹600",
        image: "/images/p6.png",
        description: "Compact elegance. Perfect for your morning coffee or favorite book.",
        specs: {
            dimensions: "45cm Dia x 50cm H",
            material: "Powder-coated steel, Tempered glass",
            fabric: "N/A"
        }
    },
    {
        id: 7,
        name: "Modular Sectional",
        category: "Living",
        price: "₹5,400",
        image: "/images/living-room.png",
        description: "Limitless configurations for your space. Deep seating for ultimate relaxation.",
        customizationOptions: {
            fabrics: [
                { name: "Linen Blend", value: "#e5e5e5", priceMod: 0 },
                { name: "Performance Weave", value: "#a3a3a3", priceMod: 400 }
            ]
        },
        specs: {
            dimensions: "300cm W x 200cm D x 70cm H",
            material: "Engineered wood frame, Memory foam cushions",
            fabric: "Performance Linen Blend"
        }
    },
    {
        id: 8,
        name: "Executive Chair",
        category: "Office",
        price: "₹1,800",
        image: "/images/office.png",
        description: "Commanding presence with ergonomic support. Full-grain leather and polished aluminum base.",
        customizationOptions: {
            fabrics: [
                { name: "Black Leather", value: "#000000", priceMod: 0 },
                { name: "Tan Leather", value: "#8B4513", priceMod: 200 }
            ]
        },
        specs: {
            dimensions: "70cm W x 70cm D x 110-120cm H",
            material: "Aluminum alloy base, High-resilience foam",
            fabric: "Top-grain Italian Leather"
        }
    },
    {
        id: 9,
        name: "Bookshelf unit",
        category: "Storage",
        price: "₹3,200",
        image: "/images/p2.png",
        description: "Display your treasures in style. Minimalist shelving with hidden storage compartments.",
        specs: {
            dimensions: "120cm W x 40cm D x 180cm H",
            material: "Walnut Veneer, MDF Core",
            fabric: "N/A"
        }
    },
    {
        id: 10,
        name: "Cloud Sofa",
        category: "Living",
        price: "₹4,200",
        image: "/images/living-sofa-2.png",
        description: "Like sitting on a cloud. Overstuffed down cushions for the softest seat in the house.",
        specs: {
            dimensions: "240cm W x 100cm D x 80cm H",
            material: "Hardwood frame, Down-feather blend fill",
            fabric: "100% Belgian Linen"
        }
    },
    {
        id: 11,
        name: "Travertine Coffee Table",
        category: "Living",
        price: "₹1,500",
        image: "/images/living-table.png",
        description: "Natural stone elegance. Each piece features unique veining and texture.",
        specs: {
            dimensions: "100cm W x 100cm D x 35cm H",
            material: "Solid Italian Travertine",
            fabric: "N/A"
        }
    },
    {
        id: 12,
        name: "Walnut Bookshelf",
        category: "Storage",
        price: "₹3,200",
        image: "/images/office-shelf.png",
        description: "Timeless walnut finish. Adjustable shelves for books, art, and plants.",
        specs: {
            dimensions: "90cm W x 35cm D x 200cm H",
            material: "Solid Walnut, Brass hardware",
            fabric: "N/A"
        }
    },
    {
        id: 13,
        name: "Ergonomic Pro Chair",
        category: "Office",
        price: "₹1,200",
        image: "/images/office-chair.png",
        description: "Designed for all-day comfort. Breathable mesh back and lumbar support.",
        specs: {
            dimensions: "65cm W x 65cm D x 100-110cm H",
            material: "Nylon frame, Breathable mesh",
            fabric: "High-grade Polyester Mesh"
        }
    },
    {
        id: 14,
        name: "Artisan Chair",
        category: "Dining",
        price: "₹850",
        image: "/images/dining-chair.png",
        description: "Handcrafted detail. Solid wood frame with woven rope seat.",
        specs: {
            dimensions: "50cm W x 55cm D x 78cm H",
            material: "Solid Teak Wood",
            fabric: "Paper Cord Weave"
        }
    },
    {
        id: 15,
        name: "Minimal Sideboard",
        category: "Storage",
        price: "₹3,400",
        image: "/images/dining-sideboard.png",
        description: "Sleek storage solution. Push-to-open doors for a handle-free look.",
        specs: {
            dimensions: "160cm W x 45cm D x 75cm H",
            material: "Lacquered MDF, Steel legs",
            fabric: "N/A"
        }
    },
    {
        id: 16,
        name: "Dining Set (6 Seats)",
        category: "Dining",
        price: "₹6,200",
        image: "/images/dining.png",
        description: "Complete dining solution. Coordinated table and chairs for a cohesive look.",
        specs: {
            dimensions: "Table: 200x90cm, Chairs: 50x50x80cm",
            material: "Solid Ash Wood",
            fabric: "Polyester Upholstery (Chairs)"
        }
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
        ],
        customizationOptions: {
            fabrics: [
                { name: "Cream Bouclé", value: "#F5F5DC", priceMod: 0 },
                { name: "Grey Bouclé", value: "#36454F", priceMod: 0 }
            ]
        },
        specs: {
            dimensions: "80cm W x 80cm D x 75cm H",
            material: "Plywood frame, Swivel mechanism",
            fabric: "Premium Synthetic Bouclé"
        }
    },
    {
        id: 102,
        name: "Minimalist Console",
        category: "Living",
        price: "₹1,200",
        image: "/images/minimal-desk.png",
        description: "Entryway essential. Slim profile perfect for narrow spaces.",
        specs: {
            dimensions: "110cm W x 30cm D x 80cm H",
            material: "Powder coated steel",
            fabric: "N/A"
        }
    },
    {
        id: 201,
        name: "Drafting Table",
        category: "Office",
        price: "₹2,800",
        image: "/images/p2.png",
        description: "For the creative professional. Adjustable tilt and height.",
        specs: {
            dimensions: "120cm W x 80cm D x 75-105cm H",
            material: "Steel frame, Laminated board",
            fabric: "N/A"
        }
    },
    {
        id: 202,
        name: "Leather Desk Pad",
        category: "Accessories",
        price: "₹150",
        image: "/images/side-table.png",
        description: "Protect your desk in style. Premium vegetable-tanned leather.",
        specs: {
            dimensions: "80cm x 40cm",
            material: "Full-grain Leather",
            fabric: "N/A"
        }
    },
    {
        id: 301,
        name: "Marble Serving Platter",
        category: "Accessories",
        price: "₹120",
        image: "/images/p6.png",
        description: "Host with elegance. Cool marble surface perfect for cheeses and fruits.",
        specs: {
            dimensions: "30cm Diameter",
            material: "Carrara Marble",
            fabric: "N/A"
        }
    },
    {
        id: 302,
        name: "Ceramic Vase Set",
        category: "Accessories",
        price: "₹280",
        image: "/images/side-table.png",
        description: "Artistic forms. Set of 3 handcrafted vases in varying heights.",
        specs: {
            dimensions: "Heights: 15cm, 22cm, 30cm",
            material: "Glazed Ceramic",
            fabric: "N/A"
        }
    },
    {
        id: 401,
        name: "Pendant Light",
        category: "Lighting",
        price: "₹890",
        image: "/images/p5.png",
        description: "Statement overhead lighting. Hand-blown glass shade.",
        specs: {
            dimensions: "40cm Dia x 30cm H (Shade)",
            material: "Glass, Brass fixtures",
            fabric: "N/A"
        }
    },
    {
        id: 403,
        name: "Architectural Sconce",
        category: "Lighting",
        price: "₹550",
        image: "/images/p1.png",
        description: "Wall art that lights up. Geometric shadows and warm glow.",
        specs: {
            dimensions: "20cm W x 10cm D x 30cm H",
            material: "Anodized Aluminum",
            fabric: "N/A"
        }
    },
    {
        id: 404,
        name: "Chandelier",
        category: "Lighting",
        price: "₹2,100",
        image: "/images/dining.png",
        description: "Grand illumination. Modern interpretation of classic elegance.",
        specs: {
            dimensions: "90cm Dia x 60cm H",
            material: "Steel, Crystal Glass",
            fabric: "N/A"
        }
    },
    {
        id: 405,
        name: "Orbital Floor Light",
        category: "Lighting",
        price: "₹1,250",
        image: "/images/living-room.png",
        description: "A statement piece. Brushed brass with spherical opal glass diffusers.",
        specs: {
            dimensions: "30cm W x 30cm D x 160cm H",
            material: "Brass, Opal Glass",
            fabric: "N/A"
        }
    },
    {
        id: 406,
        name: "Industrial Desk Lamp",
        category: "Lighting",
        price: "₹380",
        image: "/images/p2.png",
        description: "Functional task lighting. Matte black finish with adjustable arm.",
        specs: {
            dimensions: "15cm Dia (Base) x 50cm H (Max)",
            material: "Steel",
            fabric: "N/A"
        }
    },
    {
        id: 407,
        name: "Minimalist Tube Light",
        category: "Lighting",
        price: "₹220",
        image: "/images/p3.png",
        description: "Vertical light sculpture. Warm LED glow for ambient corners.",
        specs: {
            dimensions: "5cm Dia x 120cm H",
            material: "Polycarbonate, Aluminum",
            fabric: "N/A"
        }
    },
    {
        id: 501,
        name: "Wool Throw Blanket",
        category: "Textiles",
        price: "₹180",
        image: "/images/p3.png",
        description: "Cozy up. 100% merino wool for warmth without weight.",
        specs: {
            dimensions: "130cm x 170cm",
            material: "Merino Wool",
            fabric: "100% Merino Wool"
        }
    },
    {
        id: 502,
        name: "Abstract Sculpture",
        category: "Decor",
        price: "₹450",
        image: "/images/p2.png",
        description: "Conversation starter. Bronze finished resin sculpture.",
        specs: {
            dimensions: "25cm W x 15cm D x 40cm H",
            material: "Resin with Bronze Finish",
            fabric: "N/A"
        }
    },
    {
        id: 503,
        name: "Geometric Rug",
        category: "Textiles",
        price: "₹800",
        image: "/images/living-room.png",
        description: "Ground the room. Hand-tufted wool blend with modern pattern.",
        specs: {
            dimensions: "200cm x 300cm",
            material: "Wool/Viscose Blend",
            fabric: "Tufted Wool"
        }
    },
    {
        id: 601,
        name: "Nordic Lounge Sofa",
        category: "Living",
        price: "₹1,899",
        image: "/images/ikea-sofa.jpg",
        description: "Green velvet elegance. Spacious seating with a mid-century modern silhouette.",
        specs: {
            dimensions: "210cm W x 88cm D x 80cm H",
            material: "Solid pine frame, High-resilience foam",
            fabric: "Cotton Velvet"
        }
    },
    {
        id: 602,
        name: "ErgoWork Chair",
        category: "Office",
        price: "₹450",
        image: "/images/ikea-chair.jpg",
        description: "Minimalist task chair. Clean grey upholstery with black metal legs.",
        specs: {
            dimensions: "60cm W x 60cm D x 90-100cm H",
            material: "Steel, Plywood",
            fabric: "Polyester"
        }
    },
    {
        id: 603,
        name: "Scandi Dining Table",
        category: "Dining",
        price: "₹890",
        image: "/images/ikea-table.jpg",
        description: "Solid wood craftsmanship. A gathering place for family and friends.",
        specs: {
            dimensions: "160cm L x 90cm W x 74cm H",
            material: "Solid Birch",
            fabric: "N/A"
        }
    },
    {
        id: 604,
        name: "Minimalist Bed Frame",
        category: "Bedroom",
        price: "₹1,200",
        image: "/images/ikea-bed.jpg",
        description: "Restful simplicity. Low profile platform bed in warm wood tones.",
        specs: {
            dimensions: "160cm W x 200cm L",
            material: "Bamboo Veneer",
            fabric: "N/A"
        }
    }
];
