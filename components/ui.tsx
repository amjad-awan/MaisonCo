"use client";
import { useEffect, useState, type ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, BedDouble, Bath, Maximize } from "lucide-react";
import { img, fmt, type Property } from "@/lib/data";

export const Motion = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
export const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
export function Fav({ slug }: { slug: string }) {
  const [on, set] = useState(false);
  useEffect(() => {
    try {
      set(JSON.parse(localStorage.getItem("favs") || "[]").includes(slug));
    } catch {}
  }, [slug]);
  const toggle = () => {
    try {
      const f: string[] = JSON.parse(localStorage.getItem("favs") || "[]");
      const n = on ? f.filter((s) => s !== slug) : [...f, slug];
      localStorage.setItem("favs", JSON.stringify(n));
    } catch {}
    set(!on);
  };
  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Remove from favourites" : "Save to favourites"}
      className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center bg-ivory/90 hover:bg-white transition"
    >
      <Heart size={18} className={on ? "fill-olive text-olive" : "text-ink"} />
    </button>
  );
}
export function PropertyCard({
  p,
  large = false,
}: {
  p: Property;
  large?: boolean;
}) {
  return (
    <article className="group">
      <div
        className={`relative overflow-hidden bg-beige ${large ? "aspect-[4/3] md:aspect-[16/11]" : "aspect-[4/5]"}`}
      >
        <Link href={`/properties/${p.slug}`} aria-label={`View ${p.name}`}>
          <Image
            src={img(p.images[0], large ? 1400 : 800)}
            alt={`${p.name}, ${p.location}`}
            fill
            sizes={
              large
                ? "(min-width:768px) 60vw, 100vw"
                : "(min-width:768px) 33vw, 100vw"
            }
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        </Link>
        {p.featured && (
          <span className="absolute left-3 top-3 bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
            Featured
          </span>
        )}
        <Fav slug={p.slug} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl">{p.name}</h3>
          <p className="text-sm text-stone">
            {p.location} · {p.type}
          </p>
        </div>
        <p className="whitespace-nowrap font-semibold">{fmt(p)}</p>
      </div>
      <div className="mt-3 flex items-center gap-5 border-t border-ink/10 pt-3 text-sm text-stone">
        {p.beds > 0 && (
          <span className="flex items-center gap-1.5">
            <BedDouble size={16} />
            {p.beds}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Bath size={16} />
          {p.baths}
        </span>
        <span className="flex items-center gap-1.5">
          <Maximize size={16} />
          {p.sqft.toLocaleString()} sq ft
        </span>
        <Link
          href={`/properties/${p.slug}`}
          className="ml-auto font-semibold text-olive hover:text-ink"
        >
          View Property
        </Link>
      </div>
    </article>
  );
}
