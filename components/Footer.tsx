"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
export default function Footer() {
  const [done, setDone] = useState(false);
  const col = (t: string, items: [string, string][]) => (
    <div>
      <h4 className="label mb-4">{t}</h4>
      <ul className="space-y-2 text-sm text-white/75">
        {items.map(([l, h]) => (
          <li key={l}>
            <Link className="hover:text-white" href={h}>
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-serif text-3xl">
            Maison <span className="text-gold">&amp;</span> Co.
          </p>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            A boutique international real estate advisory, representing
            exceptional homes in the world's most considered locations.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mt-8 flex max-w-sm border-b border-white/30"
          >
            <label htmlFor="nl" className="sr-only">
              Email
            </label>
            <input
              id="nl"
              type="email"
              required
              placeholder="Join our newsletter"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/50"
            />
            <button className="text-sm font-semibold text-gold">
              {done ? "Thank you" : "Subscribe"}
            </button>
          </form>
        </div>
        {col("Explore", [
          ["Properties", "/properties"],
          ["Buy", "/properties?mode=buy"],
          ["Rent", "/properties?mode=rent"],
          ["About", "/#about"],
        ])}
        {col("Categories", [
          ["Villas & Estates", "/properties?type=Villa"],
          ["Apartments", "/properties?type=Apartment"],
          ["Waterfront", "/properties?type=Waterfront"],
          ["Commercial", "/properties?type=Commercial"],
        ])}
        <div>
          <h4 className="label mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2">
              <MapPin size={16} />
              200 Park Avenue, New York, NY
            </li>
            <li className="flex gap-2">
              <Phone size={16} />
              +1 (212) 555-0142
            </li>
            <li className="flex gap-2">
              <Mail size={16} />
              hello@maisonandco.example
            </li>
          </ul>
          <div className="mt-5 flex gap-4">
            <a aria-label="Instagram" href="https://instagram.com">
              <Instagram size={18} />
            </a>
            <a aria-label="LinkedIn" href="https://linkedin.com">
              <Linkedin size={18} />
            </a>
            <a aria-label="Facebook" href="https://facebook.com">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Maison &amp; Co. Sample brand for
        demonstration. All rights reserved.
      </div>
    </footer>
  );
}
