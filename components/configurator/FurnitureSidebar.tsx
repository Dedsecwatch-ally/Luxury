"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { FurnitureItem } from "./RoomBuilder";

interface FurnitureSidebarProps {
    onAddItem: (item: Omit<FurnitureItem, "id" | "x" | "y" | "rotation">) => void;
    orientation?: "vertical" | "horizontal";
}

const ASSETS = [
    { type: "sofa", name: "Modern Sofa", image: "/images/living-sofa-2.png" },
    { type: "chair", name: "Lounge Chair", image: "/images/p1.png" },
    { type: "lamp", name: "Floor Lamp", image: "/images/p5.png" },
    { type: "table", name: "Coffee Table", image: "/images/living-table.png" },
    { type: "shelf", name: "Bookshelf", image: "/images/office-shelf.png" },
    { type: "bed", name: "Platform Bed", image: "/images/bedroom-bed.png" },
    { type: "sideboard", name: "Sideboard", image: "/images/dining-sideboard.png" },
];

export function FurnitureSidebar({ onAddItem, orientation = "vertical" }: FurnitureSidebarProps) {
    if (orientation === "horizontal") {
        return (
            <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 px-4 min-w-max">
                    {ASSETS.map((asset) => (
                        <button
                            key={asset.name}
                            onClick={() => onAddItem({ ...asset })}
                            className="group flex flex-col items-center gap-2 min-w-[80px]"
                        >
                            <div className="relative h-20 w-20 bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                                <Image
                                    src={asset.image}
                                    alt={asset.name}
                                    fill
                                    className="object-contain p-2"
                                />
                                <div className="absolute top-1 right-1 bg-black text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="h-3 w-3" />
                                </div>
                            </div>
                            <span className="text-[10px] font-medium text-muted-foreground truncate max-w-full">{asset.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Furniture</h3>
                <div className="grid grid-cols-2 gap-3">
                    {ASSETS.map((asset) => (
                        <button
                            key={asset.name}
                            onClick={() => onAddItem({ ...asset })}
                            className="group relative bg-neutral-50 rounded-lg p-2 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all text-left"
                        >
                            <div className="relative aspect-square w-full mb-2 bg-white rounded-md overflow-hidden">
                                <Image
                                    src={asset.image}
                                    alt={asset.name}
                                    fill
                                    className="object-contain p-2 group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <span className="text-xs font-medium block truncate">{asset.name}</span>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white rounded-full p-0.5">
                                <Plus className="h-3 w-3" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
