"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

// ── Data ─────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@travelaxis.com",
    href: "mailto:support@travelaxis.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+880 1700-000000",
    href: "tel:+8801700000000",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
  },
];

const socialLinks = [
  {
    icon: FaFacebook,
    href: "#",
    label: "Facebook",
    color: "hover:text-blue-400",
  },
  { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:text-red-400" },
];

const faqs = [
  {
    q: "How do I cancel a booking?",
    a: "You can cancel from your dashboard under 'My Bookings'. Cancellation policies vary per tour — check the tour page for details.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bKash, Nagad, Rocket, and major credit/debit cards via our secure payment gateway.",
  },
  {
    q: "How do I become a tour guide on TravelAxis?",
    a: "Contact us at support@travelaxis.com with your experience and certifications. Our team will review and get back to you.",
  },
];

// ── Page ─────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-background to-background py-24 px-4">
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-green-400 font-semibold mb-4 border border-green-500/30 px-3 py-1 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            We'd love to <span className="text-green-400">hear from you</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a question, feedback, or need help planning your trip? Drop us
            a message and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactInfo.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-green-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                <item.icon className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Send a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle className="h-12 w-12 text-green-400" />
                <h3 className="text-lg font-bold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thanks for reaching out. We'll reply to{" "}
                  <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="text-sm text-green-400 hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={
                    loading || !form.name || !form.email || !form.message
                  }
                  className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Map + Social */}
          <div className="flex flex-col gap-6">
            {/* Map embed */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden flex-1 min-h-[260px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.36592!2d90.27767!3d23.780573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "260px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TravelAxis Office Location"
              />
            </div>

            {/* Social */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className={`text-muted-foreground transition-colors ${s.color}`}
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Stay updated with new tours, travel tips, and Bangladesh travel
                inspiration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 border-t border-border bg-card/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-foreground hover:text-green-400 transition-colors"
                >
                  {faq.q}
                  <span
                    className={`text-lg transition-transform ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
