"use client";

import { motion } from "framer-motion";
import { FurnitureItem, RoomType } from "./RoomBuilder";
import { X, Move } from "lucide-react";
import Image from "next/image";

interface RoomCanvasProps {
    roomType: RoomType;
    wallColor: string;
    floorColor: string;
    items: FurnitureItem[];
    onMoveItem: (id: string, x: number, y: number) => void;
    onRemoveItem: (id: string) => void;
}

export function RoomCanvas({
    roomType,
    wallColor,
    floorColor,
    items,
    onMoveItem,
    onRemoveItem,
}: RoomCanvasProps) {
    return (
        <div className="relative w-full h-full perspective-1000 overflow-hidden">
            {/* Room Background Layer */}
            <div className="absolute inset-0 flex flex-col">
                {/* Wall */}
                <div
                    className="h-[65%] w-full relative transition-colors duration-500 ease-in-out border-b border-black/5"
                    style={{ backgroundColor: wallColor }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>

                {/* Floor */}
                <div
                    className="flex-1 w-full relative transition-colors duration-500 ease-in-out"
                    style={{ backgroundColor: floorColor }}
                >
                    {/* Floor perspective grid simulation */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_20px] opacity-20 transform origin-top perspective-[500px] rotate-x-60" />
                </div>
            </div>

            {/* Furniture Layer */}
            <div className="absolute inset-0 z-10">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 50 }}
                        whileHover={{ scale: 1.02, cursor: "grab" }}
                        initial={{ opacity: 0, scale: 0.5, x: item.x, y: item.y }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute group pt-8 will-change-transform" // padding top for handle space
                        style={{ x: item.x, y: item.y }}
                        onDragEnd={(e, info) => {
                            // Calculate rough relative position or just update state
                            // This simplistic approach just visually drags; 
                            // In a real app we'd map pixels to state
                        }}
                    >
                        {/* Remove Button */}
                        <button
                            onClick={() => onRemoveItem(item.id)}
                            className="absolute -top-3 -right-3 bg-red-500 text-white p-2 md:p-1 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-50 shadow-md touch-manipulation"
                        >
                            <X className="h-4 w-4 md:h-3 md:w-3" />
                        </button>

                        {/* Drag Handle (Visual cue) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Move className="h-4 w-4 text-black/50" />
                        </div>

                        {/* Image Asset */}
                        <div className="relative w-32 h-32 md:w-48 md:h-48 pointer-events-none select-none">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="(max-width: 768px) 128px, 192px"
                                className="object-contain drop-shadow-xl"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State / Hint */}
            {items.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/80 backdrop-blur px-6 py-4 rounded-full shadow-lg text-sm font-medium text-muted-foreground">
                        Drag items from the sidebar to decorate your {roomType}
                    </div>
                </div>
            )}
        </div>
    );
}
