"use client";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Users,
  Star,
  Shield,
  Heart,
  Compass,
  Award,
  Clock,
} from "lucide-react";

// ── Animation helper ─────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Data ─────────────────────────────────────────────────────
const stats = [
  { value: "500+", label: "Tours Offered", icon: Compass },
  { value: "10K+", label: "Happy Travelers", icon: Users },
  { value: "8", label: "Divisions Covered", icon: MapPin },
  { value: "4.9★", label: "Average Rating", icon: Star },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Bangladesh",
    desc: "We believe Bangladesh is one of the most underrated destinations in the world. Sundarbans, Cox's Bazar, Sajek, Ratargul — we're obsessed with sharing every hidden gem.",
  },
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every tour on TravelAxis is vetted. Our guides are certified, our itineraries are tested, and your journey is insured so you can explore with complete peace of mind.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    desc: "We curate, not aggregate. Every tour listing goes through a thorough review process to ensure you only see the best experiences Bangladesh has to offer.",
  },
  {
    icon: Clock,
    title: "Seamless Booking",
    desc: "From search to confirmation in minutes. Our platform handles everything — payments, guide coordination, and itinerary management — so you just show up and enjoy.",
  },
];

const team = [
  { name: "Rafiul Islam", role: "Founder & CEO", initial: "R" },
  { name: "Nusrat Jahan", role: "Head of Operations", initial: "N" },
  { name: "Tanvir Ahmed", role: "Lead Tour Designer", initial: "T" },
  { name: "Sadia Hossain", role: "Customer Experience", initial: "S" },
];

// ── Section wrapper ───────────────────────────────────────────
function FadeSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-background to-background py-28 px-4">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-green-500/5 blur-2xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-green-400 font-semibold mb-4 border border-green-500/30 px-3 py-1 rounded-full">
            About TravelAxis
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Bangladesh Explored,{" "}
            <span className="text-green-400">Memory Made</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TravelAxis is Bangladesh's premier tour booking platform —
            connecting adventurous souls to the rivers, forests, hills, and
            coastlines that make this country extraordinary.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <FadeSection key={i}>
              <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-green-500/40 transition-colors">
                <s.icon className="h-6 w-6 text-green-400 mx-auto mb-3" />
                <p className="text-3xl font-extrabold text-foreground">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeSection>
            <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-3 mb-5">
              Born from a love of
              <br />
              exploring Bangladesh
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                TravelAxis started as a simple idea: Bangladesh deserves a
                world-class travel platform built specifically for its unique
                landscape and culture. From the world's largest mangrove forest
                to the longest natural sea beach, no other country packs this
                much beauty into 56,000 square miles.
              </p>
              <p>
                We built TravelAxis to make discovering all of it effortless —
                transparent pricing, verified guides, and bookings that just
                work. Whether it's your first trip to Sajek or your tenth trek
                through Bandarban, we're here to make it unforgettable.
              </p>
            </div>
          </FadeSection>

          {/* Visual card */}
          <FadeSection>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-900/40 to-green-950/60 border border-green-500/20 p-8 h-72 flex flex-col justify-end">
              <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 rounded-full bg-green-400/10 blur-2xl" />
              <div className="space-y-2 relative z-10">
                {[
                  "Cox's Bazar",
                  "Sundarbans",
                  "Sajek Valley",
                  "Ratargul Swamp",
                  "Bandarban Hills",
                ].map((place) => (
                  <div key={place} className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-green-400 shrink-0" />
                    <span className="text-sm text-foreground/80">{place}</span>
                  </div>
                ))}
              </div>
              <p className="relative z-10 text-xs text-muted-foreground mt-4">
                …and hundreds more destinations
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-card/40 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <FadeSection className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">
              What We Stand For
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-3">
              Our Core Values
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <FadeSection key={i}>
                <div className="bg-card border border-border rounded-2xl p-6 hover:border-green-500/40 transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                    <v.icon className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeSection className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">
              The People
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-3">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
              A small, passionate team of travel lovers, technologists, and
              local experts dedicated to making Bangladesh travel accessible for
              everyone.
            </p>
          </FadeSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeSection key={i}>
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-green-500/40 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4 text-green-400 font-bold text-xl">
                    {member.initial}
                  </div>
                  <p className="font-semibold text-foreground text-sm">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {member.role}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-border">
        <FadeSection>
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-green-900/30 to-background border border-green-500/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to explore Bangladesh?
            </h2>
            <p className="text-muted-foreground mb-8">
              Browse hundreds of verified tours and find your next adventure.
            </p>
            <a
              href="/tours"
              className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Browse All Tours
            </a>
          </div>
        </FadeSection>
      </section>
    </main>
  );
}
