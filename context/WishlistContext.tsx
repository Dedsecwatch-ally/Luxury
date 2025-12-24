"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/products";

interface WishlistContextType {
    items: number[]; // Store product IDs
    toggleWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(items));
    }, [items]);

    const toggleWishlist = (productId: number) => {
        setItems(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const isInWishlist = (productId: number) => items.includes(productId);

    return (
        <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
