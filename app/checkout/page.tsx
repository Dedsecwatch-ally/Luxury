"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronDown, ChevronUp, CreditCard, Loader2, MapPin, Truck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Step = "info" | "shipping" | "payment" | "complete";

export default function CheckoutPage() {
    const { items, subtotal } = useCart();
    const [currentStep, setCurrentStep] = useState<Step>("info");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking" | "cod">("card");
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    });

    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const validateInfo = () => {
        const newErrors: Record<string, boolean> = {};
        let isValid = true;

        // Check required fields
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData].trim()) {
                newErrors[key] = true;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleContinueToShipping = () => {
        if (validateInfo()) {
            setCurrentStep("shipping");
        }
    };

    // Mock completing payment
    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setCurrentStep("complete");
        }, 2000);
    };

    if (items.length === 0 && currentStep !== "complete") {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <p className="text-neutral-500">Your bag is empty.</p>
                    <Link href="/products">
                        <Button variant="outline">Browse Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 lg:grid lg:grid-cols-2">
            {/* Mobile Order Summary Toggle */}
            <div className="lg:hidden bg-neutral-100 border-b border-neutral-200">
                <button
                    onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                    className="w-full p-4 flex items-center justify-between text-sm font-medium"
                >
                    <div className="flex items-center gap-2 text-neutral-600">
                        <ShoppingBag className="w-4 h-4" />
                        <span>{isSummaryOpen ? "Hide" : "Show"} order summary</span>
                        {isSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <span className="text-lg font-semibold">₹{subtotal.toLocaleString()}</span>
                </button>

                <AnimatePresence>
                    {isSummaryOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-neutral-200"
                        >
                            <div className="p-4 space-y-4">
                                {items.map((item) => (
                                    <div key={item.uniqueId} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-neutral-200">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover mix-blend-multiply"
                                            />
                                            <div className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-bl-md">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium text-neutral-900">{item.name}</p>
                                            <p className="text-neutral-500">{item.selectedColor?.name}</p>
                                        </div>
                                        <p className="text-sm font-medium text-neutral-900">{item.price}</p>
                                    </div>
                                ))}
                                <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
                                    <div className="flex justify-between text-neutral-500">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-500">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 font-semibold text-lg text-neutral-900">
                                        <span>Total</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Left Column: Form Steps */}
            <div className="p-4 md:p-12 lg:p-24 flex flex-col justify-start lg:justify-center">
                <div className="max-w-xl mx-auto w-full space-y-8 md:space-y-12">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-400 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
                        <span className={cn(currentStep === "info" ? "text-black font-medium" : "text-neutral-400")}>Information</span>
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        <span className={cn(currentStep === "shipping" ? "text-black font-medium" : "text-neutral-400")}>Shipping</span>
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        <span className={cn(currentStep === "payment" ? "text-black font-medium" : "text-neutral-400")}>Payment</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {currentStep === "info" && (
                            <motion.div
                                key="info"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-light">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                                errors.email ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                            )}
                                        />
                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                                errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            name="firstName"
                                            type="text"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                                errors.firstName ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                            )}
                                        />
                                        <input
                                            name="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                                errors.lastName ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                            )}
                                        />
                                    </div>
                                    <input
                                        name="address"
                                        type="text"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={cn(
                                            "w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                            errors.address ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                        )}
                                    />
                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            name="city"
                                            type="text"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "col-span-1 w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                                errors.city ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                            )}
                                        />
                                        <input
                                            name="state"
                                            type="text"
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "col-span-1 w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                                errors.state ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                            )}
                                        />
                                        <input
                                            name="zip"
                                            type="text"
                                            placeholder="ZIP"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "col-span-1 w-full p-4 bg-white rounded-lg border shadow-sm outline-none transition-all",
                                                errors.zip ? "border-red-500 focus:ring-2 focus:ring-red-200" : "border-transparent focus:ring-2 focus:ring-black"
                                            )}
                                        />
                                    </div>
                                </div>
                                <Button size="lg" className="w-full h-14 rounded-full text-lg" onClick={handleContinueToShipping}>
                                    Continue to Shipping
                                </Button>
                            </motion.div>
                        )}

                        {currentStep === "shipping" && (
                            <motion.div
                                key="shipping"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-light">Shipping Method</h2>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 divide-y divide-neutral-50">
                                    <label className="flex items-center justify-between p-4 cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-4 h-4 rounded-full border border-neutral-300 bg-black" />
                                            <div>
                                                <p className="font-medium">Standard Delivery</p>
                                                <p className="text-sm text-neutral-500">4-5 Business Days</p>
                                            </div>
                                        </div>
                                        <span className="font-medium">Free</span>
                                    </label>
                                    <label className="flex items-center justify-between p-4 cursor-pointer opacity-50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-4 h-4 rounded-full border border-neutral-300" />
                                            <div>
                                                <p className="font-medium">White Glove</p>
                                                <p className="text-sm text-neutral-500">Scheduled Room Placement</p>
                                            </div>
                                        </div>
                                        <span className="font-medium">₹150.00</span>
                                    </label>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" onClick={() => setCurrentStep("info")}>Back</Button>
                                    <Button size="lg" className="flex-1 h-14 rounded-full text-lg" onClick={() => setCurrentStep("payment")}>
                                        Continue to Payment
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === "payment" && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-light">Payment Method</h2>

                                {/* Payment Method Selection */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {["card", "upi", "netbanking", "cod"].map((method) => (
                                        <button
                                            key={method}
                                            onClick={() => setPaymentMethod(method as any)}
                                            className={cn(
                                                "p-4 rounded-xl border-2 text-sm font-medium transition-all capitalize",
                                                paymentMethod === method
                                                    ? "border-black bg-black text-white"
                                                    : "border-neutral-100 bg-white hover:border-neutral-200"
                                            )}
                                        >
                                            {method === "cod" ? "Cash on Delivery" : method === "netbanking" ? "Net Banking" : method}
                                        </button>
                                    ))}
                                </div>

                                {/* Credit/Debit Card Input */}
                                {paymentMethod === "card" && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="bg-black text-white p-6 rounded-2xl relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
                                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black" />
                                            <div className="relative z-10 flex justify-between items-start mb-12">
                                                <CreditCard className="w-8 h-8 opacity-80" />
                                                <div className="w-12 h-8 bg-neutral-700/50 rounded-md" />
                                            </div>
                                            <div className="relative z-10 space-y-2">
                                                <p className="font-mono text-xl tracking-widest">•••• •••• •••• 4242</p>
                                                <div className="flex justify-between text-sm opacity-70">
                                                    <span>{formData.firstName || "CARD"} {formData.lastName || "HOLDER"}</span>
                                                    <span>12/28</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <input type="text" placeholder="Card Number" className="w-full p-4 bg-white rounded-lg border-0 shadow-sm focus:ring-2 focus:ring-black outline-none" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="text" placeholder="MM / YY" className="w-full p-4 bg-white rounded-lg border-0 shadow-sm focus:ring-2 focus:ring-black outline-none" />
                                                <input type="text" placeholder="CVC" className="w-full p-4 bg-white rounded-lg border-0 shadow-sm focus:ring-2 focus:ring-black outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* UPI Input */}
                                {paymentMethod === "upi" && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="bg-white p-6 rounded-xl border border-neutral-100 space-y-4">
                                            <p className="text-sm text-neutral-500">Enter your UPI ID to verify payment.</p>
                                            <input type="text" placeholder="username@upi" className="w-full p-4 bg-white rounded-lg border shadow-sm focus:ring-2 focus:ring-black outline-none" />
                                            <div className="flex gap-2 justify-center py-4">
                                                {/* Mock GPay/PhonePe icons could go here */}
                                                <div className="w-10 h-10 rounded-full bg-neutral-100" />
                                                <div className="w-10 h-10 rounded-full bg-neutral-100" />
                                                <div className="w-10 h-10 rounded-full bg-neutral-100" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Net Banking Dropdown */}
                                {paymentMethod === "netbanking" && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="bg-white p-6 rounded-xl border border-neutral-100 space-y-4">
                                            <p className="text-sm text-neutral-500">Select your bank to proceed securely.</p>
                                            <select className="w-full p-4 bg-white rounded-lg border shadow-sm focus:ring-2 focus:ring-black outline-none appearance-none cursor-pointer">
                                                <option>HDFC Bank</option>
                                                <option>ICICI Bank</option>
                                                <option>State Bank of India</option>
                                                <option>Axis Bank</option>
                                                <option>Kotak Mahindra Bank</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {/* COD Message */}
                                {paymentMethod === "cod" && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="bg-neutral-50 p-6 rounded-xl border border-dashed border-neutral-200 text-center">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                                <Truck className="w-6 h-6 text-neutral-600" />
                                            </div>
                                            <h3 className="font-medium mb-1">Pay on Delivery</h3>
                                            <p className="text-sm text-neutral-500">You can pay via Cash or UPI when the package is delivered to your doorstep.</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <Button variant="ghost" onClick={() => setCurrentStep("shipping")} disabled={isProcessing}>Back</Button>
                                    <Button size="lg" className="flex-1 h-14 rounded-full text-lg relative" onClick={handlePay} disabled={isProcessing}>
                                        {isProcessing ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            paymentMethod === "cod" ? "Place Order" : `Pay ₹${subtotal.toLocaleString()}`
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === "complete" && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 py-12"
                            >
                                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-green-200">
                                    <Check className="w-12 h-12" />
                                </div>
                                <h2 className="text-4xl font-semibold">Order Confirmed!</h2>
                                <p className="text-neutral-500 max-w-md mx-auto">
                                    Thank you for your purchase. We're actively preparing your order for shipment. You will receive a confirmation email shortly.
                                </p>
                                <div className="pt-8">
                                    <Link href="/">
                                        <Button size="lg" variant="outline" className="rounded-full">Return Home</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="hidden lg:block bg-neutral-100 p-12 xl:p-24 border-l border-neutral-200">
                <div className="max-w-md sticky top-24 space-y-12">
                    <h2 className="text-2xl font-light">Order Summary</h2>
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.uniqueId} className="flex gap-6 group">
                                <div className="relative w-20 h-24 bg-white rounded-md overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover mix-blend-multiply"
                                    />
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-neutral-500">{item.selectedColor?.name}</p>
                                </div>
                                <p className="font-medium">{item.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-neutral-200 pt-6 space-y-4">
                        <div className="flex justify-between text-neutral-500">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-4 border-t border-neutral-200">
                            <span className="text-lg">Total</span>
                            <span className="text-3xl font-semibold">₹{subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
