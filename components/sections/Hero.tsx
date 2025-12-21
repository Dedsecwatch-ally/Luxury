"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Parallax Background Image */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 will-change-transform"
            >
                <Image
                    src="/images/living-sofa-2.png"
                    alt="Luxury Minimalist Sofa"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" /> {/* Overlay for text contrast */}
            </motion.div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center text-white">

                {/* Line-by-Line Reveal Animation Container */}
                <div className="space-y-0 mb-8">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="font-heading text-6xl md:text-9xl font-bold tracking-tight leading-[1.1] text-white opacity-90"
                        >
                            The Art of
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="font-heading text-6xl md:text-9xl font-bold tracking-tight leading-[1.1] text-white"
                        >
                            Living.
                        </motion.h1>
                    </div>
                </div>

                <motion.p
                    className="font-body text-lg md:text-2xl text-white/80 max-w-[600px] mx-auto font-light tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Designed to live. Built to last. <br className="hidden md:block" />
                    Experience the fusion of luxury and function.
                </motion.p>


            </div>
        </section>
    );
}
