"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfigOption {
    name: string;
    value: string;
    priceMod?: number;
}

interface ProductConfiguratorProps {
    options?: {
        fabrics?: ConfigOption[];
        woods?: ConfigOption[];
        legs?: ConfigOption[];
    };
    onPriceChange: (additionalPrice: number) => void;
    onConfigurationChange?: (config: { fabric: ConfigOption | null; wood: ConfigOption | null; leg: ConfigOption | null }) => void;
}

export function ProductConfigurator({ options, onPriceChange, onConfigurationChange }: ProductConfiguratorProps) {
    const [selectedFabric, setSelectedFabric] = useState<ConfigOption | null>(options?.fabrics?.[0] || null);
    const [selectedWood, setSelectedWood] = useState<ConfigOption | null>(options?.woods?.[0] || null);
    const [selectedLeg, setSelectedLeg] = useState<ConfigOption | null>(options?.legs?.[0] || null);

    useEffect(() => {
        let totalMod = 0;
        if (selectedFabric?.priceMod) totalMod += selectedFabric.priceMod;
        if (selectedWood?.priceMod) totalMod += selectedWood.priceMod;
        if (selectedLeg?.priceMod) totalMod += selectedLeg.priceMod;

        onPriceChange(totalMod);

        if (onConfigurationChange) {
            onConfigurationChange({
                fabric: selectedFabric,
                wood: selectedWood,
                leg: selectedLeg
            });
        }
    }, [selectedFabric, selectedWood, selectedLeg, onPriceChange, onConfigurationChange]);

    if (!options) return null;

    const hasCustomization = (selectedFabric?.priceMod || 0) > 0 ||
        (selectedWood?.priceMod || 0) > 0 ||
        (selectedLeg?.priceMod || 0) > 0;

    return (
        <div className="space-y-6 pt-4 border-t border-border/50">
            <AnimatePresence>
                {hasCustomization && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-2 rounded-full w-fit mb-4">
                            <Sparkles className="w-3 h-3" />
                            <span>Your design, made for you</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fabric Selection */}
            {options.fabrics && options.fabrics.length > 0 && (
                <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex justify-between">
                        <span>Fabric</span>
                        <span className="text-foreground">{selectedFabric?.name}</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {options.fabrics.map((fabric) => (
                            <button
                                key={fabric.name}
                                onClick={() => setSelectedFabric(fabric)}
                                className={cn(
                                    "relative w-12 h-12 rounded-full border-2 transition-all duration-200",
                                    selectedFabric?.name === fabric.name
                                        ? "border-primary scale-110 shadow-md"
                                        : "border-transparent hover:scale-105"
                                )}
                                style={{ backgroundColor: fabric.value }}
                                title={`${fabric.name} ${fabric.priceMod ? `(+₹${fabric.priceMod})` : ""}`}
                            >
                                {selectedFabric?.name === fabric.name && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Wood Selection */}
            {options.woods && options.woods.length > 0 && (
                <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex justify-between">
                        <span>Wood Finish</span>
                        <span className="text-foreground">{selectedWood?.name}</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {options.woods.map((wood) => (
                            <button
                                key={wood.name}
                                onClick={() => setSelectedWood(wood)}
                                className={cn(
                                    "relative w-10 h-10 rounded-full border transition-all duration-200 overflow-hidden",
                                    selectedWood?.name === wood.name
                                        ? "ring-2 ring-primary ring-offset-2 scale-105"
                                        : "hover:ring-1 hover:ring-muted-foreground/30"
                                )}
                                style={{ backgroundColor: wood.value }}
                                title={`${wood.name} ${wood.priceMod ? `(+₹${wood.priceMod})` : ""}`}
                            >
                                {selectedWood?.name === wood.name && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Leg Style Selection */}
            {options.legs && options.legs.length > 0 && (
                <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex justify-between">
                        <span>Leg Style</span>
                        <span className="text-foreground">{selectedLeg?.name}</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {options.legs.map((leg) => (
                            <button
                                key={leg.name}
                                onClick={() => setSelectedLeg(leg)}
                                className={cn(
                                    "px-4 py-3 rounded-lg border text-sm text-left transition-all duration-200 flex justify-between items-center group",
                                    selectedLeg?.name === leg.name
                                        ? "border-primary bg-primary/5 shadow-sm"
                                        : "border-border hover:border-muted-foreground/50 hover:bg-muted/50"
                                )}
                            >
                                <span>{leg.name}</span>
                                {leg.priceMod ? (
                                    <span className="text-xs text-muted-foreground group-hover:text-foreground">+₹{leg.priceMod}</span>
                                ) : (
                                    <span className="text-xs text-muted-foreground">Included</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
