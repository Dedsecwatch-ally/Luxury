import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { ALL_PRODUCTS } from "@/lib/products";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";



export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 1. Find the product based on the slug
    // Ensure accurate matching by normalizing strings
    const product = ALL_PRODUCTS.find((p) => {
        return slugify(p.name) === slug;
    });

    // 2. Handle 404
    if (!product) {
        notFound();
    }

    // 3. Render Product Data
    return (
        <div className="min-h-screen bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Sticky Gallery */}
                <div className="relative h-[50vh] md:h-screen md:sticky md:top-0">
                    <ProductGallery images={[product.image]} />
                </div>

                {/* Right: Scrollable Info & Content */}
                <div className="flex flex-col">
                    <ProductInfo
                        title={product.name}
                        price={product.price}
                        description={product.description || "Experience the perfect blend of form and function. Designed for modern living, this piece exemplifies our commitment to quality craftsmanship and timeless aesthetics."}
                        colors={product.colors}
                        options={product.customizationOptions}
                    />

                    {/* Detailed Storytelling sections */}
                    {/* Detailed Storytelling sections */}
                    <div className="h-[50vh] bg-secondary/5 flex items-center justify-center text-muted-foreground p-8 text-center">
                        <div className="max-w-md">
                            <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
                            <p>{product.specs?.material || "Sourced from the finest materials for lasting quality."}</p>
                            {product.specs?.fabric && (
                                <p className="mt-2 text-sm text-muted-foreground">{product.specs.fabric}</p>
                            )}
                        </div>
                    </div>
                    <div className="h-[50vh] bg-background flex items-center justify-center text-muted-foreground p-8 text-center">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Dimensions & Care</h3>
                            <p>{product.specs?.dimensions || "Designed to fit perfectly in your life."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
