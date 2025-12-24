"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn, slugify } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
}

export function ProductCard({ id, name, category, price, image }: ProductCardProps) {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(id);
    const [isCompared, setIsCompared] = useState(false);

    const slug = slugify(name);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
    };

    const toggleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCompared(!isCompared);
    };

    return (
        <motion.div
            className="group relative bg-background rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            {/* Image Container with Hover Overlay */}
            <div className="relative aspect-[4/5] bg-secondary/20 overflow-hidden">
                {/* Product Image Link */}
                <Link href={`/products/${slug}`} className="block w-full h-full transform-gpu">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                {/* Quick Actions Overlay - Slides up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] flex justify-center gap-2 z-10 pointer-events-auto">
                    {/* View Action - Explicit Link */}
                    <Link href={`/products/${slug}`}>
                        <Button size="icon" variant="ghost" className="rounded-full bg-white/90 backdrop-blur hover:bg-muted-gold hover:text-white transition-all shadow-lg">
                            <Eye className="h-5 w-5" />
                        </Button>
                    </Link>

                    {/* Compare Action */}
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "rounded-full bg-white/90 backdrop-blur hover:bg-muted-gold hover:text-white transition-all shadow-lg",
                            isCompared && "text-muted-gold bg-white"
                        )}
                        onClick={toggleCompare}
                    >
                        <Scale className={cn("h-5 w-5", isCompared && "fill-current")} />
                    </Button>

                    {/* Wishlist Action */}
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "rounded-full bg-white/90 backdrop-blur hover:bg-muted-gold hover:text-white transition-all shadow-lg",
                            isWishlisted && "text-red-500 hover:text-red-600 bg-white hover:bg-white"
                        )}
                        onClick={handleWishlistClick}
                    >
                        <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                    </Button>
                </div>
            </div>

            {/* Product Details */}
            <div className="mt-4 space-y-1">
                <p className="text-sm text-muted-foreground">{category}</p>
                <div className="flex justify-between items-baseline">
                    <Link href={`/products/${slug}`}>
                        <h3 className="font-medium text-lg text-foreground group-hover:text-muted-gold transition-colors duration-300 cursor-pointer">{name}</h3>
                    </Link>
                    <span className="font-semibold">{price}</span>
                </div>
            </div>
        </motion.div>
    );
}
