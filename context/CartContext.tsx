"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/products";

export interface CartItem extends Product {
    uniqueId: string; // To distinguish same product with different options
    selectedColor?: { name: string; value: string };
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, color?: { name: string; value: string }) => void;
    removeItem: (uniqueId: string) => void;
    updateQuantity: (uniqueId: string, quantity: number) => void;
    cartOpen: boolean;
    setCartOpen: (open: boolean) => void;
    subtotal: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (product: Product, selectedColor?: { name: string; value: string }) => {
        setItems(prev => {
            // Create a unique ID based on product ID and color
            const uniqueId = `${product.id}-${selectedColor?.name || 'default'}`;

            const existing = prev.find(item => item.uniqueId === uniqueId);

            if (existing) {
                return prev.map(item =>
                    item.uniqueId === uniqueId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, selectedColor, quantity: 1, uniqueId }];
        });
        setCartOpen(true);
    };

    const removeItem = (uniqueId: string) => {
        setItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
    };

    const updateQuantity = (uniqueId: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(uniqueId);
            return;
        }
        setItems(prev => prev.map(item =>
            item.uniqueId === uniqueId ? { ...item, quantity } : item
        ));
    };

    const subtotal = items.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
        return sum + (price * item.quantity);
    }, 0);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            cartOpen,
            setCartOpen,
            subtotal,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
