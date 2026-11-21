"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { img } from "@/lib/data";
const e = [0.22, 1, 0.36, 1] as const;
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden text-white">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: e }}
      >
        <Image
          src={img("1613490493576-7fde63acd811", 2200)}
          alt="Modern luxury villa with pool at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-36 pt-40">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="label !text-white/80 flex items-center gap-2"
        >
          <MapPin size={14} />
          Malibu · New York · London · Lake Como
        </motion.p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl md:text-8xl">
          {["Find a Place", "That Feels Like Yours."].map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: e }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-6 max-w-lg text-lg text-white/85"
        >
          Exceptional properties. Thoughtfully selected. Discover spaces that
          bring together architecture, lifestyle, and timeless value.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link href="/properties" className="btn btn-light">
            Explore Properties
          </Link>
          <Link href="/#about" className="btn btn-line">
            Discover Our Approach
          </Link>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block"
        aria-hidden
      >
        <ChevronDown />
      </motion.div>
    </section>
  );
}
