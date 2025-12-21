"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    title: string;
    price: string;
    description: string;
    colors?: { name: string; value: string }[];
}

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ALL_PRODUCTS, Product } from "@/lib/products";



const DEFAULT_COLORS = [
    { name: "Standard", value: "var(--color-warm-beige)" },
];

export function ProductInfo({ title, price, description, colors = DEFAULT_COLORS }: ProductInfoProps) {
    // If no colors provided, default to standard. If provided empty array, ensure at least one option exists or handle conditionally
    const safeColors = colors && colors.length > 0 ? colors : DEFAULT_COLORS;
    const [selectedColor, setSelectedColor] = useState(safeColors[0]);
    const { addItem } = useCart();

    // Wishlist Logic
    const { toggleWishlist, isInWishlist } = useWishlist();
    const product = ALL_PRODUCTS.find(p => p.name === title);
    const inWishlist = product ? isInWishlist(product.id) : false;

    // Handle cart add
    const handleAddToCart = () => {
        // We need to find the full product object to add it. 
        // In a real app we'd pass the full ID or object. For now we lookup by title match (safe enough for this demo)
        if (product) {
            addItem(product, selectedColor);
        }
    };

    const handleToggleWishlist = () => {
        if (product) {
            toggleWishlist(product.id);
        }
    };

    return (
        <div className="flex flex-col justify-center min-h-[60vh] px-4 md:px-12 py-12 md:py-24 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
            >
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Collection 01
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                    {title}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-muted-foreground">
                    {price}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
            >
                <p className="text-lg leading-relaxed text-foreground/80 max-w-md">
                    {description}
                </p>

                {/* Color Selector */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Finish: {selectedColor.name}
                    </label>
                    <div className="flex gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color)}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === color.name
                                    ? "border-foreground scale-110"
                                    : "border-transparent hover:scale-105"
                                    }`}
                                style={{ backgroundColor: color.value }}
                                aria-label={color.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-8">
                    <Button size="lg" className="flex-1 rounded-full text-lg h-14" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="flex-1 rounded-full text-lg h-14 gap-2"
                        onClick={handleToggleWishlist}
                    >
                        <Heart className={cn("h-5 w-5 transition-colors", inWishlist && "fill-red-500 text-red-500")} />
                        {inWishlist ? "Saved" : "Save"}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
