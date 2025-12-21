"use client";

import { RoomType } from "./RoomBuilder";

import { Button } from "@/components/ui/button";

interface RoomToolbarProps {
    roomType: RoomType;
    setRoomType: (type: RoomType) => void;
    wallColor: string;
    setWallColor: (color: string) => void;
    floorColor: string;
    setFloorColor: (color: string) => void;
    compact?: boolean;
}

const WALL_COLORS = ["#f5f5f5", "#e8e6e1", "#d4d4d8", "#C1C7C9", "#1a1a1a"];
const FLOOR_COLORS = ["#e5e5e5", "#bfa07a", "#8c735a", "#524b42", "#2e2e2e"];

export function RoomToolbar({
    roomType,
    setRoomType,
    wallColor,
    setWallColor,
    floorColor,
    setFloorColor,
    compact = false,
}: RoomToolbarProps) {
    if (compact) {
        return (
            <div className="flex items-center gap-6">
                {/* Compact Room Switcher */}
                <div className="flex bg-neutral-100 p-1 rounded-md shrink-0">
                    {(["living", "bedroom", "office"] as RoomType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setRoomType(type)}
                            className={`px-3 py-1 text-[10px] font-medium rounded-sm capitalize transition-all ${roomType === type ? "bg-white shadow-sm text-black" : "text-muted-foreground"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="h-6 w-[1px] bg-border/50 shrink-0" />

                {/* Compact Wall Colors */}
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-muted-foreground mr-1">Wall</span>
                    <div className="flex gap-1.5">
                        {WALL_COLORS.slice(0, 3).map(color => (
                            <button
                                key={color}
                                onClick={() => setWallColor(color)}
                                className={`w-4 h-4 rounded-full border border-black/10 transition-transform ${wallColor === color ? "scale-125 border-black ring-1 ring-black/20" : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <div className="h-6 w-[1px] bg-border/50 shrink-0" />

                {/* Compact Floor Colors */}
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-muted-foreground mr-1">Floor</span>
                    <div className="flex gap-1.5">
                        {FLOOR_COLORS.slice(0, 3).map(color => (
                            <button
                                key={color}
                                onClick={() => setFloorColor(color)}
                                className={`w-4 h-4 rounded-full border border-black/10 transition-transform ${floorColor === color ? "scale-125 border-black ring-1 ring-black/20" : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Room Type Switcher */}
            <div className="space-y-2">
                <div className="flex bg-neutral-100 p-1 rounded-lg">
                    {(["living", "bedroom", "office"] as RoomType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setRoomType(type)}
                            className={`flex-1 text-xs font-medium py-1.5 rounded-md capitalize transition-all ${roomType === type ? "bg-white shadow-sm text-black" : "text-muted-foreground hover:text-black"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Customization */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-medium leading-none text-muted-foreground">Wall Color</label>
                    <div className="flex flex-wrap gap-2">
                        {WALL_COLORS.map(color => (
                            <button
                                key={color}
                                onClick={() => setWallColor(color)}
                                className={`w-6 h-6 rounded-full border border-black/10 focus:outline-none ring-offset-1 focus:ring-2 ${wallColor === color ? "ring-2 ring-black" : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium leading-none text-muted-foreground">Floor Tone</label>
                    <div className="flex flex-wrap gap-2">
                        {FLOOR_COLORS.map(color => (
                            <button
                                key={color}
                                onClick={() => setFloorColor(color)}
                                className={`w-6 h-6 rounded-full border border-black/10 focus:outline-none ring-offset-1 focus:ring-2 ${floorColor === color ? "ring-2 ring-black" : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
