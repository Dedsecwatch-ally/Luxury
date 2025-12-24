"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductConfigurator } from "./ProductConfigurator";

interface ProductInfoProps {
    title: string;
    price: string;
    description: string;
    colors?: { name: string; value: string }[];
    options?: {
        fabrics?: { name: string; value: string; priceMod?: number }[];
        woods?: { name: string; value: string; priceMod?: number }[];
        legs?: { name: string; value: string; priceMod?: number }[];
    };
}

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ALL_PRODUCTS } from "@/lib/products";

const DEFAULT_COLORS = [
    { name: "Standard", value: "var(--color-warm-beige)" },
];

export function ProductInfo({ title, price, description, colors = DEFAULT_COLORS, options }: ProductInfoProps) {
    const safeColors = colors && colors.length > 0 ? colors : DEFAULT_COLORS;
    const [selectedColor, setSelectedColor] = useState(safeColors[0]);
    const [priceModifier, setPriceModifier] = useState(0);
    const { addItem } = useCart();

    // Wishlist Logic
    const { toggleWishlist, isInWishlist } = useWishlist();
    const product = ALL_PRODUCTS.find(p => p.name === title);
    const inWishlist = product ? isInWishlist(product.id) : false;

    // Price Calculation
    const basePrice = parseInt(price.replace(/[^0-9]/g, ""));
    const finalPrice = basePrice + priceModifier;
    const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalPrice);


    const handleAddToCart = () => {
        if (product) {
            // Include customization details if we had a way to pass them.
            // For now, we just pass the base product and selected color.
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
                    {formattedPrice}
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

                {/* Customization Configurator OR Standard Color Selector */}
                {options ? (
                    <ProductConfigurator
                        options={options}
                        onPriceChange={setPriceModifier}
                        onConfigurationChange={() => {
                            // If config has fabric, we could sync it to selectedColor if we wanted, 
                            // but they might use different data structures. 
                            // For now, we'll just track pricing.
                        }}
                    />
                ) : (
                    <div className="space-y-3">
                        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Finish: {selectedColor.name}
                        </label>
                        <div className="flex gap-3">
                            {safeColors.map((color) => (
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
                )}

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
