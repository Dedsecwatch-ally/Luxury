"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
}

interface CategoryPageProps {
    title: string;
    description: string;
    heroImage: string;
    products: Product[];
}

export default function CategoryTemplate({ title, description, heroImage, products }: CategoryPageProps) {
    return (
        <main className="min-h-screen bg-background">
            {/* Category Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImage}
                        alt={title}
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 text-center text-white space-y-4 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-lg md:text-xl max-w-xl mx-auto opacity-90"
                    >
                        {description}
                    </motion.p>
                </div>
            </section>

            {/* Filter / Sort Bar (Simplified) */}
            <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{products.length} Products</span>
                    <div className="flex gap-4">
                        <Button variant="ghost" size="sm">Sort by: Featured</Button>
                        <Button variant="ghost" size="sm">Filter</Button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-24 px-4 md:px-12 container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </section>
        </main>
    );
}
