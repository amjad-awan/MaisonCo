"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  ["Home", "/"],
  ["Properties", "/properties"],
  ["Buy", "/properties?mode=buy"],
  ["Rent", "/properties?mode=rent"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
];
export default function Header() {
  const path = usePathname();
  const [y, setY] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setY(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => setOpen(false), [path]);
  const solid = y || path !== "/" || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-ivory/95 backdrop-blur text-ink border-b border-ink/5" : "text-white"}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-serif text-2xl tracking-wide">
          Maison <span className="text-gold">&amp;</span> Co.
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {links.map(([l, h]) => (
            <Link
              key={l}
              href={h}
              className="group relative text-sm font-medium"
            >
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className={`btn hidden lg:inline-flex ${solid ? "btn-solid" : "btn-light"}`}
        >
          Book a Consultation
        </Link>
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] bg-ivory text-ink px-6 py-10"
          >
            <ul className="space-y-6">
              {links.map(([l, h], i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <Link
                    href={h}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl"
                  >
                    {l}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-solid mt-10 w-full"
            >
              Book a Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
