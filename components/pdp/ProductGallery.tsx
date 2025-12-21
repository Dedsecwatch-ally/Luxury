"use client";

import { motion } from "framer-motion";

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    return (
        <div className="w-full h-full min-h-[50vh] md:min-h-screen bg-secondary/10 flex items-center justify-center rounded-2xl md:rounded-none overflow-hidden sticky top-0">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-9xl font-bold text-foreground/5"
            >
                {/* Placeholder for 3D Viewer or Image Slider */}
                Product View
            </motion.div>
        </div>
    );
}
