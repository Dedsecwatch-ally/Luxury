"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function getCollectionLink(id: number) {
    switch (id) {
        case 1: return "/living";
        case 2: return "/office";
        case 3: return "/dining";
        case 4: return "/bedroom";
        default: return "/products";
    }
}


const collections = [
    {
        id: 1,
        title: "Minimalist Living",
        description: "Serene spaces for modern life. Clean lines and calming hues defining your sanctuary.",
        color: "bg-secondary-bg",
        textColor: "text-foreground",
        image: "/images/living-room.png"
    },
    {
        id: 2,
        title: "Executive Office",
        description: "Focus and comfort combined. Ergonomic excellence meets premium aesthetics.",
        color: "bg-background",
        textColor: "text-foreground",
        image: "/images/office.png"
    },
    {
        id: 3,
        title: "Artisan Dining",
        description: "Gather around craftsmanship. Tables and seating that turn meals into memories.",
        color: "bg-muted-gold",
        textColor: "text-white",
        image: "/images/dining.png"
    },
    {
        id: 4,
        title: "Bedroom Sanctuary",
        description: "Rest in absolute luxury. Soft textures and supportive designs for deep sleep.",
        color: "bg-deep-green",
        textColor: "text-white",
        image: "/images/bedroom.png"
    },
];

export function FeaturedCollections() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-12 mx-auto">
                <div className="mb-16 md:flex md:justify-between md:items-end">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            Collections<br />
                            <span className="text-muted-foreground font-light">
                                Designed for You
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-lg">
                            Explore our curated series of furniture, designed to elevate every corner of your life.
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {collections.map((collection) => (
                        <Link href={getCollectionLink(collection.id)} key={collection.id} className="block group">
                            <div
                                className={`relative h-[60vh] rounded-3xl overflow-hidden ${collection.color} transition-transform duration-500 hover:scale-[1.01] cursor-pointer`}
                            >
                                {/* Image Container */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={collection.image}
                                        alt={collection.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                                    <h3 className={`text-3xl md:text-4xl font-bold mb-3 text-white`}>
                                        {collection.title}
                                    </h3>
                                    <p className={`text-lg md:text-xl opacity-90 text-white/90`}>
                                        {collection.description}
                                    </p>
                                    <div className={`mt-6 inline-flex items-center text-sm font-semibold tracking-wide uppercase text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}>
                                        Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Button variant="link" className="text-lg">
                        View All Collections <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
