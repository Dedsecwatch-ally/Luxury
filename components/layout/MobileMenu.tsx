"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/living", label: "Living Room" },
    { href: "/office", label: "Office" },
    { href: "/dining", label: "Dining" },
    { href: "/wishlist", label: "Wishlist" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { user, logout } = useAuth();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
                    />

                    {/* Menu Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-background border-l border-border shadow-2xl md:hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-border/50">
                            <span className="text-xl font-bold tracking-tighter">LUXURY.</span>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                            {MENU_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary-bg group transition-colors"
                                >
                                    <span className="text-lg font-medium">{link.label}</span>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </Link>
                            ))}
                        </div>

                        {/* Footer / Auth */}
                        <div className="p-6 border-t border-border/50 bg-secondary-bg/30">
                            {user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 px-2">
                                        <div className="h-10 w-10 rounded-full bg-muted-gold/20 flex items-center justify-center text-muted-gold">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/5 border-red-200"
                                        onClick={() => {
                                            logout();
                                            onClose();
                                        }}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/login" onClick={onClose}>
                                    <Button className="w-full h-12 text-base">
                                        <LogIn className="h-4 w-4 mr-2" />
                                        Sign In
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
