"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
    {
        id: 1,
        title: "Minimalist Living",
        description: "Serene spaces for modern life. Clean lines and calming hues defining your sanctuary.",
        color: "bg-[#E6DED5]",
        image: "/images/living-room.png",
        link: "/living"
    },
    {
        id: 2,
        title: "Executive Office",
        description: "Focus and comfort combined. Ergonomic excellence meets premium aesthetics.",
        color: "bg-[#EDEDED]",
        image: "/images/office.png",
        link: "/office"
    },
    {
        id: 3,
        title: "Artisan Dining",
        description: "Gather around craftsmanship. Tables and seating that turn meals into memories.",
        color: "bg-[#BFA980]",
        image: "/images/dining.png",
        link: "/dining"
    },
    {
        id: 4,
        title: "Bedroom Sanctuary",
        description: "Rest in absolute luxury. Soft textures and supportive designs for deep sleep.",
        color: "bg-[#6F8FAF]",
        image: "/images/bedroom.png",
        link: "/bedroom"
    },
];

export default function CollectionsPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="py-24 px-4 md:px-12 container mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                        Curated Series
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
                        Collections Designed<br /> For You
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our thoughtfully curated series where every piece tells a story of craftsmanship and comfort.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {COLLECTIONS.map((collection, index) => (
                        <Link href={collection.link} key={collection.id} className="group block">
                            <div className={`relative h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden ${collection.color}`}>
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white pb-12">
                                    <div className="max-w-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h2 className="text-4xl md:text-6xl font-bold mb-4">{collection.title}</h2>
                                        <p className="text-xl md:text-2xl font-light opacity-90 mb-8">{collection.description}</p>
                                        <div className="inline-flex items-center text-lg font-medium border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                                            Explore Series <ArrowRight className="ml-2 h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
