"use client";

import { useCart } from "@/context/CartContext";

import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
    const { items, removeItem, updateQuantity, cartOpen, setCartOpen, subtotal } = useCart();

    return (
        <>
            {/* Overlay and Panel controlled by custom state or Radix UI Sheet if available. 
                Using a custom implementation for maximum control over the "Apple-like" feel 
                if we want, but sticking to standard patterns first for reliability.
             */}

            {/* Using a custom drawer implementation for that specific "Ultra Clean" feel */}
            <AnimatePresence>
                {cartOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCartOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background shadow-2xl z-50 flex flex-col border-l border-neutral-100"
                        >
                            <div className="flex items-center justify-between p-6 md:p-8 border-b border-neutral-100">
                                <h2 className="text-2xl font-light tracking-tight">Your Bag</h2>
                                <button
                                    onClick={() => setCartOpen(false)}
                                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-neutral-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                                {items.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                                        <ShoppingBag className="w-12 h-12 opacity-20" />
                                        <p>Your bag is empty</p>
                                        <Button
                                            variant="outline"
                                            onClick={() => setCartOpen(false)}
                                            className="mt-4"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <motion.div
                                            layout
                                            key={item.uniqueId}
                                            className="flex gap-6"
                                        >
                                            <div className="relative w-24 h-32 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover mix-blend-multiply"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                                        <p className="font-medium">{item.price}</p>
                                                    </div>
                                                    {item.selectedColor && (
                                                        <p className="text-sm text-neutral-500 mt-1">
                                                            {item.selectedColor.name}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3 bg-neutral-50 rounded-full px-3 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                                                            className="p-1 hover:text-black text-neutral-400 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                                                            className="p-1 hover:text-black text-neutral-400 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.uniqueId)}
                                                        className="text-sm text-neutral-400 hover:text-red-500 transition-colors underline decoration-transparent hover:decoration-red-500 underline-offset-4"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {items.length > 0 && (
                                <div className="p-6 md:p-8 bg-neutral-50 space-y-4">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <span className="text-neutral-500">Subtotal</span>
                                        <span className="text-xl font-medium">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-neutral-400 text-center mb-4">Shipping and taxes calculated at checkout.</p>
                                    <Link href="/checkout" onClick={() => setCartOpen(false)}>
                                        <Button className="w-full rounded-full h-14 text-lg bg-black hover:bg-neutral-800 text-white shadow-lg shadow-black/10">
                                            Checkout
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
