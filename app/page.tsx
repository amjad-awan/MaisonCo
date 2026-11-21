import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  MapPinned,
  UserRound,
  MessageSquareText,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import { PropertyCard, Reveal } from "@/components/ui";
import { img, properties } from "@/lib/data";

const cats = [
  ["Luxury Homes", "1600596542815-ffad4c1539a9", "Villa"],
  ["Modern Apartments", "1545324418-cc1a3fa10c00", "Apartment"],
  ["Villas & Estates", "1613490493576-7fde63acd811", "Estate"],
  ["Waterfront", "1499793983690-e29da59ef1c2", "Waterfront"],
  ["Commercial", "1486406146926-c627a92ad1ab", "Commercial"],
  ["Investment", "1512917774080-9991f1c4c750", ""],
];
const why = [
  [Compass, "Carefully curated", "Fewer listings, each personally vetted."],
  [MapPinned, "Local expertise", "Advisors living in the markets they serve."],
  [
    UserRound,
    "Personal consultation",
    "A dedicated advisor from first call to keys.",
  ],
  [
    MessageSquareText,
    "Transparent communication",
    "Clear updates, honest advice.",
  ],
  [
    ShieldCheck,
    "Professional guidance",
    "Legal, financial and design partners on hand.",
  ],
  [Handshake, "End-to-end support", "We stay beyond closing day."],
] as const;
const quotes = [
  [
    "Calm, precise and genuinely thoughtful. We found our home in three weeks.",
    "Sample Client A",
    "Purchase · Malibu",
  ],
  [
    "Every viewing felt considered. Communication was impeccable throughout.",
    "Sample Client B",
    "Rental · London",
  ],
  [
    "Sold above asking with no stress. Truly a different kind of agency.",
    "Sample Client C",
    "Sale · New York",
  ],
];

export default function Home() {
  const feat = properties.filter((p) => p.featured);
  return (
    <>
      <Hero />
      <Search />
      <section className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-xl">
          <p className="label">Featured</p>
          <h2 className="h2 mt-3">Exceptional Properties</h2>
          <p className="mt-4 text-stone">
            Explore spaces selected for their architecture, character, and
            location.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <PropertyCard p={feat[0]} large />
          </Reveal>
          <Reveal delay={0.1}>
            <PropertyCard p={feat[1]} />
          </Reveal>
          <Reveal>
            <PropertyCard p={feat[2]} />
          </Reveal>
          <Reveal delay={0.1}>
            <PropertyCard p={properties[3]} />
          </Reveal>
          <Reveal delay={0.2}>
            <PropertyCard p={properties[5]} />
          </Reveal>
        </div>
        <div className="mt-14 text-center">
          <Link href="/properties" className="btn btn-dark">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section id="about" className="grid bg-beige md:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image
            src={img("1600607687939-ce8a6c25118c", 1200)}
            alt="Light-filled contemporary living room"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <Reveal className="flex flex-col justify-center px-6 py-20 md:px-16">
          <p className="label">Our Story</p>
          <h2 className="h2 mt-3">
            More Than Properties.
            <br />A Better Way to Find Home.
          </h2>
          <p className="mt-6 max-w-md text-stone">
            Founded on the belief that a home should be found, not sold, Maison
            &amp; Co. pairs deep market knowledge with a quiet, attentive
            approach. We represent a small collection of properties, so every
            client receives our full attention.
          </p>
          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-olive hover:text-ink"
          >
            Discover our approach <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <h2 className="h2">Find Your Kind of Place</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {cats.map(([t, id, ty], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <Link
                href={ty ? `/properties?type=${ty}` : "/properties"}
                className="group relative block aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={img(id, 700)}
                  alt={t}
                  fill
                  sizes="(min-width:768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 font-serif text-xl text-white md:text-2xl">
                  {t}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-xl">
            <p className="label">Why Maison &amp; Co.</p>
            <h2 className="h2 mt-3">Quiet confidence, considered service.</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {why.map(([I, t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <I className="text-gold" size={22} strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-xl">{t}</h3>
                <p className="mt-1 text-sm text-stone">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-28 md:grid-cols-12">
        <Reveal className="md:col-span-12">
          <p className="label">Journal</p>
          <h2 className="h2 mt-3">Spaces That Inspire Living.</h2>
        </Reveal>
        {[
          [
            "1505691938895-1758d7feb511",
            "Light, Material, Stillness",
            "Why natural materials define the modern home.",
            "md:col-span-7 aspect-[4/3]",
          ],
          [
            "1502672260266-1c1ef2d93688",
            "The Art of the Loft",
            "Converting industrial history into homes.",
            "md:col-span-5 aspect-[4/3] md:mt-16",
          ],
        ].map(([id, t, d, c]) => (
          <Reveal
            key={t}
            className={
              c
                .split(" ")
                .filter((x) => x.startsWith("md:col"))
                .join(" ") +
              " " +
              (c.includes("mt-16") ? "md:mt-16" : "")
            }
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={img(id, 1000)}
                alt={t}
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-serif text-2xl">{t}</h3>
            <p className="text-sm text-stone">{d}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-beige py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="label">Testimonials · sample content</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {quotes.map(([q, n, c], i) => (
              <Reveal key={n} delay={i * 0.08}>
                <blockquote className="font-serif text-2xl leading-snug">
                  “{q}”
                </blockquote>
                <p className="mt-5 text-sm font-semibold">{n}</p>
                <p className="text-sm text-stone">{c}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-32 text-center text-white">
        <Image
          src={img("1600585154340-be6161a56a0c", 1800)}
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/65" />
        <Reveal>
          <h2 className="font-serif text-5xl md:text-6xl">
            Your Next Chapter Starts Here.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-white/80">
            Let us help you discover a property that feels right.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/properties" className="btn btn-light">
              Explore Properties
            </Link>
            <a href="#contact" className="btn btn-line">
              Contact Our Team
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
