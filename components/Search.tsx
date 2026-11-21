"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Search as SearchIcon, X } from "lucide-react";
import { properties, types } from "@/lib/data";

type Key = "q" | "type" | "price" | "beds" | null;

const locations = Array.from(new Set(properties.map((p) => p.location)));
const PRESETS = {
  buy: [1_000_000, 2_500_000, 5_000_000, 10_000_000],
  rent: [5_000, 10_000, 15_000, 25_000],
};
const compact = (n: number) =>
  n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${n / 1_000}k` : `$${n}`;

/* Defined outside the main component so inputs keep focus while typing */
function Seg({
  label, active, onOpen, pop, align = "left", className = "", children,
}: {
  label: string; active: boolean; onOpen: () => void; pop: React.ReactNode;
  align?: "left" | "right"; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        onClick={onOpen}
        className={`flex h-full cursor-pointer flex-col justify-center px-6 py-3.5 transition-colors lg:rounded-full ${
          active ? "bg-ivory" : "hover:bg-ivory/70"
        }`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">{label}</span>
        {children}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-full z-30 mt-3 w-[min(24rem,calc(100vw-3rem))] rounded-2xl bg-white p-5 shadow-[0_24px_60px_-18px_rgba(0,0,0,.3)] ring-1 ring-ink/5 ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {pop}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Chip = ({ on, ...p }: { on: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...p}
    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
      on ? "border-olive bg-olive text-white" : "border-ink/15 hover:border-ink"
    }`}
  />
);

export default function Search({
  overlap = true,
  initial = {},
}: {
  overlap?: boolean;
  initial?: Record<string, string>;
}) {
  const r = useRouter();
  const tabId = useId();
  const ref = useRef<HTMLFormElement>(null);
  const [v, set] = useState<Record<string, string>>({ mode: "buy", ...initial });
  const [open, setOpen] = useState<Key>(null);
  const put = (k: string, val: string) => set((p) => ({ ...p, [k]: val }));
  const mode = v.mode === "rent" ? "rent" : "buy";

  useEffect(() => {
    const down = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, []);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(null);
    r.push(`/properties?${new URLSearchParams(Object.entries(v).filter(([, x]) => x))}`);
  };

  const q = (v.q ?? "").toLowerCase();
  const suggestions = locations.filter((l) => l.toLowerCase().includes(q));
  const min = Number(v.min) || 0;
  const max = Number(v.max) || 0;
  const priceText = min || max ? `${min ? compact(min) : "Any"} – ${max ? compact(max) : "Any"}` : "Any price";

  return (
    <form ref={ref} onSubmit={go} className={`relative z-20 mx-auto max-w-6xl ${overlap ? "-mt-20" : ""}`}>
      {/* Buy / Rent tabs */}
      <div className=" inline-flex rounded-t-2xl bg-white/90 p-1.5 pb-0 backdrop-blur" role="tablist" aria-label="Buy or rent">
        {(["buy", "rent"] as const).map((m) => (
          <button
            key={m} type="button" role="tab" aria-selected={mode === m}
            onClick={() => { put("mode", m); put("min", ""); put("max", ""); }}
            className={`relative px-7 py-2.5 text-sm font-semibold capitalize transition-colors ${mode === m ? "text-white" : "text-stone hover:text-ink"}`}
          >
            {mode === m && (
              <motion.span layoutId={`tab-${tabId}`} className="absolute inset-0 rounded-t-xl bg-olive" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
            )}
            <span className="relative">{m}</span>
          </button>
        ))}
      </div>

      {/* Bar */}
      <div className="grid divide-y divide-ink/10 rounded-3xl rounded-tl-none bg-white p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,.3)] lg:grid-cols-[1.5fr_1fr_1.2fr_1fr_auto] lg:items-stretch lg:divide-x lg:divide-y-0 lg:rounded-full lg:rounded-tl-3xl">
        <Seg label="Location" active={open === "q"} onOpen={() => setOpen("q")}
          pop={
            <>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone">{q ? "Matches" : "Popular destinations"}</p>
              {suggestions.length ? (
                <ul className="space-y-1">
                  {suggestions.map((l) => (
                    <li key={l}>
                      <button type="button" onClick={() => { put("q", l); setOpen("type"); }} className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm hover:bg-ivory">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-beige text-olive"><MapPin size={16} /></span>{l}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-stone">No exact match. Press Search to try anyway.</p>}
            </>
          }
        >
          <div className="flex items-center">
            <input
              value={v.q ?? ""} onChange={(e) => put("q", e.target.value)} onFocus={() => setOpen("q")}
              placeholder="Where to?" aria-label="Location" autoComplete="off"
              className="w-full bg-transparent text-sm text-stone placeholder:text-stone/70 focus:text-ink focus:outline-none"
            />
            {v.q && <button type="button" aria-label="Clear location" onClick={(e) => { e.stopPropagation(); put("q", ""); }}><X size={14} className="text-stone" /></button>}
          </div>
        </Seg>

        <Seg label="Property type" active={open === "type"} onOpen={() => setOpen("type")}
          pop={
            <div className="flex flex-wrap gap-2">
              <Chip on={!v.type} onClick={() => { put("type", ""); setOpen("price"); }}>Any</Chip>
              {types.map((t) => <Chip key={t} on={v.type === t} onClick={() => { put("type", t); setOpen("price"); }}>{t}</Chip>)}
            </div>
          }
        >
          <span className={`text-sm ${v.type ? "text-ink" : "text-stone"}`}>{v.type || "Any type"}</span>
        </Seg>

        <Seg label={mode === "rent" ? "Monthly budget" : "Price range"} active={open === "price"} onOpen={() => setOpen("price")}
          pop={
            <>
              <div className="grid grid-cols-2 gap-4">
                {(["min", "max"] as const).map((k) => (
                  <label key={k} className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">{k === "min" ? "Minimum" : "Maximum"}</span>
                    <div className="mt-1.5 flex items-center rounded-lg border border-ink/15 px-3 focus-within:border-olive">
                      <span className="text-stone">$</span>
                      <input type="number" min={0} inputMode="numeric" value={v[k] ?? ""} onChange={(e) => put(k, e.target.value)} placeholder={k === "min" ? "0" : "Any"} className="w-full bg-transparent px-2 py-2.5 text-sm focus:outline-none" />
                    </div>
                  </label>
                ))}
              </div>
              <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-stone">Up to</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS[mode].map((n) => <Chip key={n} on={max === n && !min} onClick={() => { put("min", ""); put("max", String(n)); setOpen("beds"); }}>{compact(n)}</Chip>)}
              </div>
            </>
          }
        >
          <span className={`text-sm ${min || max ? "text-ink" : "text-stone"}`}>{priceText}</span>
        </Seg>

        <Seg label="Bedrooms" align="right" active={open === "beds"} onOpen={() => setOpen("beds")}
          pop={
            <div className="flex flex-wrap gap-2">
              <Chip on={!v.beds} onClick={() => { put("beds", ""); setOpen(null); }}>Any</Chip>
              {[1, 2, 3, 4, 5].map((n) => <Chip key={n} on={v.beds === String(n)} onClick={() => { put("beds", String(n)); setOpen(null); }}>{n}+</Chip>)}
            </div>
          }
        >
          <span className={`text-sm ${v.beds ? "text-ink" : "text-stone"}`}>{v.beds ? `${v.beds}+ bedrooms` : "Any"}</span>
        </Seg>

        <div className="p-1 lg:flex lg:items-center">
          <button className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-olive px-7 text-sm font-semibold text-white transition-colors hover:bg-ink lg:w-auto" aria-label="Search properties">
            <SearchIcon size={18} className="transition-transform duration-300 group-hover:scale-110" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}