"use client";

import { useWishlist } from "@/context/WishlistContext";
import { ALL_PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";


export default function WishlistPage() {
    const { items } = useWishlist();
    const wishlistProducts = ALL_PRODUCTS.filter(product => items.includes(product.id));

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-12 container mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your Wishlist</h1>
                <p className="text-muted-foreground text-lg">A curated collection of your favorite pieces.</p>
            </div>

            {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {wishlistProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <p className="text-xl text-muted-foreground">Your wishlist is currently empty.</p>
                </div>
            )}
        </main>
    );
}
