"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, bypassLogin } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        login(email);
        setIsSubmitting(false);
    };

    const handleBypass = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            bypassLogin();
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-muted-gold/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-muted-gold/5 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-secondary/10 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl relative z-10"
            >
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Store
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to access your saved items and orders.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1" htmlFor="email">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background/50 border border-border/50 rounded-lg px-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all placeholder:text-muted-foreground/50"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1" htmlFor="password">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background/50 border border-border/50 rounded-lg px-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-all placeholder:text-muted-foreground/50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full rounded-lg h-12 text-base font-medium mt-4" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Sign In"}
                    </Button>
                </form>

                <div className="my-8 relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full rounded-lg h-12 border-dashed border-muted-gold/50 hover:bg-muted-gold/5 hover:border-muted-gold transition-colors text-muted-gold"
                    onClick={handleBypass}
                    disabled={isSubmitting}
                >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Developer All-Access Bypass
                </Button>
            </motion.div>
        </div>
    );
}
