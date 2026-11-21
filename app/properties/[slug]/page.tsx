
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BedDouble, Bath, Maximize, Check } from "lucide-react";

import { properties, img, fmt } from "@/lib/data";
import { PropertyCard } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  properties.map((p) => ({ slug: p.slug }));

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const p = properties.find((x) => x.slug === slug);

  if (!p) return {};

  return {
    title: `${p.name}, ${p.location}`,
    description: p.description,
    openGraph: {
      images: [img(p.images[0], 1200)],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const p = properties.find((x) => x.slug === slug);

  if (!p) notFound();

  const similar = properties
    .filter(
      (x) => x.slug !== p.slug && (x.type === p.type || x.mode === p.mode)
    )
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-7xl px-6 pb-28 pt-28">
      <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
        {p.images.map((id, i) => (
          <div
            key={id + i}
            className={`relative overflow-hidden bg-beige ${
              i === 0
                ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[480px]"
                : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img(id, i ? 700 : 1400)}
              alt={`${p.name} – view ${i + 1}`}
              fill
              priority={i === 0}
              sizes={i ? "25vw" : "50vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="label">
            {p.type} · {p.mode === "buy" ? "For sale" : "For rent"}
          </p>

          <h1 className="mt-2 font-serif text-5xl">{p.name}</h1>

          <p className="mt-1 text-stone">{p.location}</p>

          <p className="mt-4 font-serif text-3xl text-olive">
            {fmt(p)}
          </p>

          <div className="mt-8 flex gap-8 border-y border-ink/10 py-5 text-sm">
            {p.beds > 0 && (
              <span className="flex items-center gap-2">
                <BedDouble size={18} />
                {p.beds} Beds
              </span>
            )}

            <span className="flex items-center gap-2">
              <Bath size={18} />
              {p.baths} Baths
            </span>

            <span className="flex items-center gap-2">
              <Maximize size={18} />
              {p.sqft.toLocaleString()} sq ft
            </span>
          </div>

          <p className="mt-8 max-w-prose text-lg">
            {p.description}
          </p>

          <h2 className="mt-12 font-serif text-3xl">Amenities</h2>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {p.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <Check size={16} className="text-gold" />
                {a}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-serif text-3xl">The Area</h2>

          <p className="mt-3 max-w-prose text-stone">{p.area}</p>
        </div>

        <aside className="h-fit bg-beige p-8 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl">Contact the agent</h2>
          <ContactForm name={p.name} />
        </aside>
      </div>

      <h2 className="mt-24 font-serif text-4xl">
        Similar Properties
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {similar.map((s) => (
          <PropertyCard key={s.slug} p={s} />
        ))}
      </div>

      <Link
        href="/properties"
        className="mt-12 inline-block font-semibold text-olive"
      >
        ← Back to all properties
      </Link>
    </article>
  );
}
