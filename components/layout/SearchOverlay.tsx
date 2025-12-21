"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn, slugify } from "@/lib/utils";
import { ALL_PRODUCTS, Product } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const POPULAR_SEARCHES = [
    "Velvet Sofa",
    "Marble Table",
    "Office Chair",
    "Lighting",
    "Modern Art"
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            setQuery(""); // Reset query handling
            setResults([]);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Search Logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchTerms = query.toLowerCase().split(" ");
        const filtered = ALL_PRODUCTS.filter(product => {
            const searchText = `
                ${product.name.toLowerCase()} 
                ${product.category.toLowerCase()} 
                ${product.description?.toLowerCase() || ""}
            `;
            return searchTerms.every(term => searchText.includes(term));
        }).slice(0, 4); // Limit to top 4 results

        setResults(filtered);
    }, [query]);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            console.log("Searching for:", query);
            // In a real app we might redirect to a full results page
            // router.push(`/search?q=${encodeURIComponent(query)}`);
            // For now, if there are results, we can just close or let user pick one
        }
    };

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
                        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[60]"
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-0 z-[70] p-4 md:p-8 max-h-screen overflow-y-auto"
                    >
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-end mb-8">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="rounded-full hover:bg-secondary-bg"
                                >
                                    <X className="h-6 w-6" />
                                    <span className="sr-only">Close search</span>
                                </Button>
                            </div>

                            <form onSubmit={handleSearch} className="relative mb-12">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search for furniture..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-border py-4 pl-12 pr-4 text-3xl md:text-5xl font-light placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-colors"
                                />
                                {query && (
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                                        onClick={() => setQuery("")}
                                    >
                                        <X className="h-6 w-6" />
                                    </Button>
                                )}
                            </form>

                            {/* Search Results or Popular Searches */}
                            <div className="min-h-[300px]">
                                {query ? (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                            {results.length > 0 ? "Search Results" : "No results found"}
                                        </h3>

                                        {results.length > 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {results.map((product) => (
                                                    <Link
                                                        href={`/products/${slugify(product.name)}`}
                                                        key={product.id}
                                                        onClick={onClose}
                                                        className="flex gap-4 p-4 rounded-xl hover:bg-secondary-bg transition-colors group"
                                                    >
                                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <h4 className="text-lg font-medium group-hover:text-muted-gold transition-colors">{product.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{product.category}</p>
                                                            <p className="mt-1 font-semibold">{product.price}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                            Popular Searches
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {POPULAR_SEARCHES.map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => setQuery(term)}
                                                    className="px-4 py-2 rounded-full bg-secondary-bg text-sm hover:bg-muted-gold/10 hover:text-muted-gold transition-colors"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
