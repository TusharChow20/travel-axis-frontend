"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/modules/tours/TourCard";
import {
  ArrowRight,
  MapPin,
  Star,
  Users,
  Shield,
  Clock,
  Compass,
} from "lucide-react";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=80",
    eyebrow: "Khulna Division",
    headline: ["EXPLORE THE", "WILD HEART"],
    accent: "OF BANGLADESH.",
    sub: "Sail through the world's largest mangrove delta — where tigers roam and fireflies light the night.",
    cta: "Discover Tours",
    href: "/tours",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    eyebrow: "Cox's Bazar",
    headline: ["WHERE THE SKY", "MEETS THE SEA"],
    accent: "ENDLESSLY.",
    sub: "Walk 120km of unbroken shoreline. The world's longest natural sea beach is waiting for you.",
    cta: "Book Now",
    href: "/tours",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    eyebrow: "Rangamati",
    headline: ["SLEEP ABOVE", "THE CLOUDS"],
    accent: "IN SAJEK.",
    sub: "The cloud kingdom of Bangladesh. Wake up to mist-wrapped hills and a sky full of stars.",
    cta: "See Packages",
    href: "/tours",
  },
];

const floatingDots = [
  { size: 18, top: "14%", left: "8%", delay: "0s", duration: "4s" },
  { size: 10, top: "22%", left: "52%", delay: "1.2s", duration: "5s" },
  { size: 14, top: "68%", left: "6%", delay: "0.6s", duration: "3.5s" },
  { size: 22, top: "78%", left: "55%", delay: "2s", duration: "4.5s" },
  { size: 8, top: "40%", right: "5%", delay: "0.3s", duration: "6s" },
  { size: 12, top: "88%", right: "8%", delay: "1.8s", duration: "4s" },
];

const reasons = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safe & Trusted",
    desc: "Verified guides and partners. Your safety is our top priority on every journey.",
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: "Expert Local Guides",
    desc: "Our guides are born and raised in Bangladesh. They know every hidden gem.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Flexible Scheduling",
    desc: "Choose from tours of 1 to 14 days. We adapt to your timeline, not the other way around.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Small Groups",
    desc: "Intimate group sizes mean personalized attention and a richer, more authentic experience.",
  },
];

const destinations = [
  { name: "Sundarbans", division: "Khulna", emoji: "🌿" },
  { name: "Cox's Bazar", division: "Chittagong", emoji: "🌊" },
  { name: "Sylhet", division: "Sylhet", emoji: "🍃" },
  { name: "Bandarban", division: "Chittagong", emoji: "⛰️" },
  { name: "Rangamati", division: "Chittagong", emoji: "🏔️" },
  { name: "Saint Martin", division: "Chittagong", emoji: "🐚" },
  { name: "Sajek", division: "Chittagong", emoji: "☁️" },
  { name: "Kuakata", division: "Barisal", emoji: "🌅" },
];

function useImagePreloader(urls: string[]) {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  useEffect(() => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => setLoaded((prev) => ({ ...prev, [url]: true }));
    });
  }, []);
  return loaded;
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const [featuredTours, setFeaturedTours] = useState<any[]>([]);
  const [toursLoading, setToursLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const imageUrls = heroSlides.map((s) => s.image);
  const preloaded = useImagePreloader(imageUrls);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setImgVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setImgVisible(true);
        setIsAnimating(false);
      }, 450);
    },
    [isAnimating],
  );

  const next = useCallback(
    () => goTo((current + 1) % heroSlides.length),
    [current, goTo],
  );

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6500);
  }, [next]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  const handleDotClick = (i: number) => {
    goTo(i);
    resetInterval();
  };

  useEffect(() => {
    axiosInstance
      .get("/tour?limit=3&page=1")
      .then((res) => setFeaturedTours(res.data.data?.data || []))
      .catch(() => setFeaturedTours([]))
      .finally(() => setToursLoading(false));
  }, []);

  const slide = heroSlides[current];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen pt-16 overflow-hidden flex items-center dark:bg-[#0a0a0a] bg-[#f0faf3]">
        {/* Floating dots only — no rings here */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {floatingDots.map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: d.size,
                height: d.size,
                top: d.top,
                left: (d as any).left,
                right: (d as any).right,
                opacity: 0.55,
                animation: `floatY ${d.duration} ${d.delay} ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Two-column grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          {/* LEFT — photo frame */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            {/* Rings centered via flex parent */}
            <div
              className="absolute rounded-full border dark:border-white/5 border-primary/10"
              style={{ width: 480, height: 480 }}
            />
            <div
              className="absolute rounded-full border dark:border-white/5 border-primary/10"
              style={{ width: 360, height: 360 }}
            />
            {/* Decorative ring just outside photo */}
            <div
              className="absolute rounded-full dark:border-white/8 border-primary/20 border-2"
              style={{ width: "min(420px, 56vw)", height: "min(420px, 56vw)" }}
            />

            {/* Photo circle */}
            <div
              className="relative rounded-full overflow-hidden ring-4 dark:ring-white/10 ring-primary/20 shadow-2xl dark:shadow-black/60 shadow-primary/20"
              style={{ width: "min(360px, 48vw)", height: "min(360px, 48vw)" }}
            >
              {!preloaded[slide.image] && (
                <div className="absolute inset-0 dark:bg-neutral-800 bg-primary/10 animate-pulse" />
              )}
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.eyebrow}
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{
                  opacity: imgVisible && preloaded[slide.image] ? 1 : 0,
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.35)" }}
              />
            </div>

            {/* Location badge */}
            <div
              className="absolute bottom-6 right-6 lg:right-0 flex items-center gap-2 px-4 py-2 rounded-full dark:bg-white/10 bg-white/80 dark:border-white/15 border-primary/20 border backdrop-blur-md shadow-lg"
              style={{
                opacity: imgVisible ? 1 : 0,
                transform: imgVisible ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.5s ease 0.2s",
              }}
            >
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="dark:text-white text-gray-800 text-sm font-medium">
                {slide.eyebrow}
              </span>
            </div>

            {/* Slide dots */}
            <div className="absolute -bottom-8 lg:bottom-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 flex lg:flex-col gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-8 h-2 lg:w-2 lg:h-8"
                      : "dark:bg-white/25 bg-primary/25 w-2 h-2 dark:hover:bg-white/50 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — headline */}
          <div
            className="order-1 lg:order-2 transition-all duration-500"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "translateX(0)" : "translateX(20px)",
            }}
          >
            <div className="inline-flex items-center gap-2 mb-5 dark:bg-white/8 bg-primary/10 dark:border-white/12 border-primary/20 border rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="dark:text-white/70 text-primary/80 text-sm font-medium tracking-widest uppercase">
                {slide.eyebrow}
              </span>
            </div>

            <h1
              className="font-black leading-none tracking-tight mb-3 min-h-[11rem]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              {slide.headline.map((line, i) => (
                <span key={i} className="block dark:text-white text-gray-900">
                  {line}
                </span>
              ))}
              <span className="block text-primary">{slide.accent}</span>
            </h1>

            <p className="dark:text-white/55 text-gray-600 text-lg leading-relaxed mb-10 max-w-md">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                asChild
                className="gap-2 shadow-lg shadow-primary/25 font-bold px-8"
              >
                <Link href={slide.href}>
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="dark:border-white/20 dark:text-white dark:hover:bg-white/8 border-primary/30 text-primary hover:bg-primary/8 font-semibold px-8"
              >
                <Link href="/tours">Browse All</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="dark:text-white/30 text-gray-400 text-sm tabular-nums">
                0{current + 1}
              </span>
              <div className="flex-1 h-0.5 dark:bg-white/10 bg-primary/15 rounded-full overflow-hidden">
                <div
                  key={current}
                  className="h-full bg-primary rounded-full"
                  style={{ animation: "progressBar 6.5s linear forwards" }}
                />
              </div>
              <span className="dark:text-white/30 text-gray-400 text-sm tabular-nums">
                0{heroSlides.length}
              </span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes floatY {
            from { transform: translateY(0px); }
            to   { transform: translateY(-16px); }
          }
          @keyframes progressBar {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>
      </section>

      {/* ══ DESTINATION MARQUEE ═══════════════════════════════ */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-10 px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
                Where to Go
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Popular Destinations
              </h2>
            </div>
            <Button
              variant="ghost"
              asChild
              className="hidden sm:flex gap-1 text-foreground"
            >
              <Link href="/tours">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Marquee track — full width, seamless loop */}
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--background) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--background) 0%, transparent 100%)",
            }}
          />
          {/* Duplicate exactly twice for seamless -50% loop */}
          <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
            {[
              ...destinations,
              ...destinations,
              ...destinations,
              ...destinations,
              ...destinations,
              ...destinations,
            ].map((dest, i) => (
              <Link
                key={i}
                href={`/tours?searchTerm=${dest.name}`}
                className="group flex flex-col items-center gap-3 px-7 py-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 w-40 shrink-0 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  {dest.emoji}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground text-sm leading-tight">
                    {dest.name}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {dest.division}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED TOURS ════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
                Top Picks
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Featured Tours
              </h2>
            </div>
            <Button
              variant="ghost"
              asChild
              className="hidden sm:flex gap-1 text-foreground"
            >
              <Link href="/tours">
                All tours <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {toursLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : featuredTours.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No tours available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-10">
            <Button size="lg" asChild className="gap-2">
              <Link href="/tours">
                Explore All Tours <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ═════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
              Why TravelAxis BD
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Travel with Confidence
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Bangladesh-first travel company that puts experience, safety and
              authenticity at the heart of every tour.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {r.icon}
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">
                  {r.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL + CTA ═════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-card border border-border p-8 md:p-12 lg:p-16 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-snug">
                  "An unforgettable journey through Bangladesh's soul"
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  The Sundarbans tour was magical. Our guide knew every tree and
                  creek. TravelAxis BD turned my trip into a lifelong memory.
                </p>
                <p className="text-primary font-semibold">
                  — Ayesha Rahman, Dhaka
                </p>
              </div>

              <div className="text-center space-y-4 shrink-0">
                <p className="text-foreground font-semibold text-lg">
                  Ready to explore?
                </p>
                <Button size="lg" asChild className="gap-2 w-full sm:w-auto">
                  <Link href="/register">
                    Get Started Free <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  No credit card required to browse
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
