"use client";

import { motion } from "framer-motion";
import { Leaf, Award, Hammer, Zap } from "lucide-react";

const stories = [
    {
        id: 1,
        title: "Design Philosophy",
        content: "We believe that furniture should be more than just functional. It should be an extension of your personality, a canvas for your life.",
        icon: <Award className="w-8 h-8 md:w-12 md:h-12 text-muted-gold" />,
        alignment: "left",
    },
    {
        id: 2,
        title: "Eco-Conscious Craft",
        content: "Our commitment to the planet is as strong as our commitment to quality. We use 100% recycled materials and sustainable sourcing.",
        icon: <Leaf className="w-8 h-8 md:w-12 md:h-12 text-green-600" />,
        alignment: "right",
    },
    {
        id: 3,
        title: "Comfort Engineering",
        content: "Every curve, every cushion is engineered for maximum comfort. We combine ergonomics with aesthetics to create furniture that feels as good as it looks.",
        icon: <Zap className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />,
        alignment: "left",
    },
    {
        id: 4,
        title: "Built to Last",
        content: "Quality is not an act, it is a habit. Our furniture is built to withstand the test of time, ensuring that you can enjoy it for years to come.",
        icon: <Hammer className="w-8 h-8 md:w-12 md:h-12 text-gray-700" />,
        alignment: "right",
    },
];

export function Storytelling() {
    return (
        <section className="py-24 px-4 md:px-12 bg-secondary/30 overflow-hidden">
            <div className="max-w-5xl mx-auto space-y-32">
                {stories.map((story, index) => (
                    <motion.div
                        key={story.id}
                        initial={{ opacity: 0, x: story.alignment === "left" ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${story.alignment === "right" ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Visual Side (Placeholder for now) */}
                        <div className="w-full md:w-1/2 h-64 md:h-96 bg-white rounded-2xl shadow-sm flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                            <div className="relative z-10 p-8 bg-white/50 backdrop-blur rounded-full">
                                {story.icon}
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                                {story.title}
                            </h3>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {story.content}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
