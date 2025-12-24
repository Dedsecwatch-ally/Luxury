export default function Loading() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background z-50">
            <div className="space-y-4 text-center">
                <h1 className="text-2xl font-bold tracking-widest animate-pulse">LUXURY.</h1>
                <div className="h-[1px] w-24 bg-neutral-200 overflow-hidden">
                    <div className="h-full w-full bg-black animate-progress origin-left" />
                </div>
            </div>
            <style>{`
                @keyframes progress {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(0.5); }
                    100% { transform: scaleX(1); }
                }
                .animate-progress {
                    animation: progress 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
