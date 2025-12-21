import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Luxury Furniture | Designed to Live",
  description: "Premium furniture for modern living. Apple-inspired design meet IKEA functionality.",
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          playfair.variable, // Heading font
          outfit.variable,   // Body font
          "antialiased bg-background text-foreground min-h-screen font-body selection:bg-muted-gold/30"
        )}
      >
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <Header />
              {children}
              <CartDrawer />
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}


