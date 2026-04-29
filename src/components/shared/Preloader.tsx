export const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="TravelAxis"
          width={40}
          height={50}
          className="dark:invert animate-pulse"
        />

        {/* Animated dots */}
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-3 h-3 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-3 h-3 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        <p className="text-sm text-muted-foreground">Loading TravelAxis...</p>
      </div>
    </div>
  );
};
