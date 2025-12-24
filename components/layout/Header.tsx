"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Search, Menu, Heart, User as UserIcon, UserPlus as UserClass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";

import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems, setCartOpen } = useCart();
    const { user, logout } = useAuth();

    // Wishlist Logic
    const { items: wishlistItems } = useWishlist();
    const [wishlistBump, setWishlistBump] = useState(false);

    useEffect(() => {
        if (wishlistItems.length > 0) {
            setWishlistBump(true);
            const timer = setTimeout(() => setWishlistBump(false), 300);
            return () => clearTimeout(timer);
        }
    }, [wishlistItems.length]);

    // ... scroll logic

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    // New State for Overlays
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    if (pathname === "/login") return null;

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                    scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter">
                        LUXURY.
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/products" className="text-sm font-medium hover:text-muted-gold transition-colors">
                            Discover Design
                        </Link>
                        <Link href="/living" className="text-sm font-medium hover:text-muted-gold transition-colors">
                            Living
                        </Link>
                        <Link href="/office" className="text-sm font-medium hover:text-muted-gold transition-colors">
                            Office
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Search"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Link href="/wishlist">
                            <Button variant="ghost" size="icon" aria-label="Wishlist">
                                <motion.div
                                    animate={wishlistBump ? { scale: [1, 1.4, 1], color: "#ef4444" } : { scale: 1, color: "inherit" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Heart className={cn("h-5 w-5", wishlistItems.length > 0 && "fill-current text-current")} />
                                </motion.div>
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Cart"
                            onClick={() => setCartOpen(true)}
                            className="relative"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Button>

                        {/* Auth Action */}
                        {user ? (
                            <div className="relative group hidden md:block">
                                <Button variant="ghost" size="icon" aria-label="User Profile">
                                    <UserIcon className="h-5 w-5" />
                                </Button>
                                <div className="absolute right-0 mt-2 w-48 bg-background border border-border/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-1">
                                    <div className="px-3 py-2 border-b border-border/50">
                                        <p className="text-xs font-medium">{user.name}</p>
                                        <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="hidden md:block">
                                <Button variant="ghost" size="icon" aria-label="Login">
                                    <UserClass className="h-5 w-5" />
                                </Button>
                            </Link>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Menu"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </motion.header>

            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
