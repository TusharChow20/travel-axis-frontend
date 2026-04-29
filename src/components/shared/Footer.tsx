import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  tours: [
    { label: "All Tours", href: "/tours" },
    { label: "Dhaka Division", href: "/tours?division=dhaka" },
    { label: "Chittagong Division", href: "/tours?division=chittagong" },
    { label: "Sylhet Division", href: "/tours?division=sylhet" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Booking Guide", href: "/booking-guide" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "Payment Methods", href: "/payment-methods" },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex gap-5">
              <Link href="/" className="inline-block mb-4">
                <img
                  src="/logo.svg"
                  alt="TravelAxis"
                  width={40}
                  height={40}
                  className="dark:invert"
                />
              </Link>
              <p className="text-sm  mb-6 max-w-xs">
                Discover the beauty of Bangladesh with TravelAxis. Your trusted
                partner for unforgettable travel experiences.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col  gap-3 text-sm ">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>support@travelaxis.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm  hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tours</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.tours.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm  hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm  hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground">
            © {new Date().getFullYear()} TravelAxis BD. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className=" hover:text-green-400 transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
