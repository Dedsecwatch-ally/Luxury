"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FurnitureSidebar } from "./FurnitureSidebar";
import { RoomCanvas } from "./RoomCanvas";
import { RoomToolbar } from "./RoomToolbar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type RoomType = "living" | "bedroom" | "office";

export interface FurnitureItem {
    id: string;
    type: string;
    name: string;
    image: string;
    x: number;
    y: number;
    rotation: number;
}

export function RoomBuilder() {
    const [roomType, setRoomType] = useState<RoomType>("living");
    const [wallColor, setWallColor] = useState("#f5f5f5");
    const [floorColor, setFloorColor] = useState("#e5e5e5");
    const [items, setItems] = useState<FurnitureItem[]>([]);

    const addItem = (item: Omit<FurnitureItem, "id" | "x" | "y" | "rotation">) => {
        const newItem: FurnitureItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
            x: 100, // Default start position
            y: 100,
            rotation: 0,
        };
        setItems([...items, newItem]);
    };

    const updateItemPosition = (id: string, x: number, y: number) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, x, y } : item))
        );
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="flex h-[100dvh] overflow-hidden flex-col md:flex-row bg-neutral-100">
            {/* Desktop Sidebar Controls (Hidden on Mobile) */}
            <aside className="hidden md:flex w-80 bg-white border-r border-border z-20 flex-col h-full shadow-xl">
                <div className="p-4 border-b border-border flex items-center gap-2">
                    <Link href="/products">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="font-semibold text-lg">Room Configurator</h1>
                </div>

                <div className="p-4 border-b border-border">
                    <RoomToolbar
                        roomType={roomType}
                        setRoomType={setRoomType}
                        wallColor={wallColor}
                        setWallColor={setWallColor}
                        floorColor={floorColor}
                        setFloorColor={setFloorColor}
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <FurnitureSidebar onAddItem={addItem} orientation="vertical" />
                </div>
            </aside>

            {/* Mobile Header (Hidden on Desktop) */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md z-20 border-b border-border absolute top-0 left-0 right-0">
                <Link href="/products">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <span className="font-semibold text-sm">Configurator</span>
                <div className="w-8" /> {/* Balance spacer */}
            </div>

            {/* Main Canvas Area */}
            <main className="flex-1 relative w-full h-full overflow-hidden">
                <RoomCanvas
                    roomType={roomType}
                    wallColor={wallColor}
                    floorColor={floorColor}
                    items={items}
                    onMoveItem={updateItemPosition}
                    onRemoveItem={removeItem}
                />
            </main>

            {/* Mobile Bottom Bar Controls (Hidden on Desktop) */}
            <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-border z-30 flex flex-col gap-2 pb-safe">
                {/* Mini Toolbar */}
                <div className="px-4 py-2 border-b border-border/50 overflow-x-auto">
                    <div className="flex gap-4 min-w-max">
                        <RoomToolbar
                            roomType={roomType}
                            setRoomType={setRoomType}
                            wallColor={wallColor}
                            setWallColor={setWallColor}
                            floorColor={floorColor}
                            setFloorColor={setFloorColor}
                            compact={true}
                        />
                    </div>
                </div>

                {/* Furniture Horizontal List */}
                <div className="py-2">
                    <FurnitureSidebar onAddItem={addItem} orientation="horizontal" />
                </div>
            </div>
        </div>
    );
}