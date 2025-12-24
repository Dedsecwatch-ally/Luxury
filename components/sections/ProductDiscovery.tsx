"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


import { useState } from "react";
import { ALL_PRODUCTS } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";

const filters = ["All", "Living", "Office", "Dining", "Accessories"];

export function ProductDiscovery() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = ALL_PRODUCTS.filter(product => {
        if (activeCategory === "All") return true;
        return product.category === activeCategory;
    });

    // Limit to 6 items for the "All" view to maintain layout, or show all for specific categories?
    // Let's show up to 6 for now to keep the section neat, or maybe 9.
    // The previous hardcoded list had 6.
    const displayProducts = filteredProducts.slice(0, 12);

    return (
        <section className="py-12 md:py-24 px-4 md:px-12 bg-background min-h-screen">
            <div className="flex flex-col gap-10">

                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-8">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">Discover Design</h2>
                        <p className="text-muted-foreground">Furniture that speaks for itself.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 scrollbar-none">
                        {filters.map((filter, index) => (
                            <Button
                                key={filter}
                                variant={activeCategory === filter ? "default" : "ghost"}
                                className="rounded-full px-6"
                                onClick={() => setActiveCategory(filter)}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {displayProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {displayProducts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No products found in this category.</p>
                    </div>
                )}

                <div className="flex justify-center mt-12">
                    <Link href="/products">
                        <Button size="lg" variant="outline" className="px-12 rounded-full">Load More</Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
