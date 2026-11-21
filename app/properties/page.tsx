"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PropertyCard } from "@/components/ui";
import Search from "@/components/Search";
import { properties } from "@/lib/data";
function List() {
  const sp = useSearchParams();
  const g = (k: string) => sp.get(k) ?? "";
  const q = g("q").toLowerCase();
  const min = Number(g("min")) || 0;
  const max = Number(g("max")) || Infinity;
  const beds = Number(g("beds")) || 0;
  const res = properties.filter(
    (p) =>
      (!q || `${p.location} ${p.city} ${p.name}`.toLowerCase().includes(q)) &&
      (!g("type") || p.type === g("type")) &&
      (!g("mode") || p.mode === g("mode")) &&
      p.price >= min &&
      p.price <= max &&
      p.beds >= beds,
  );
  return (
    <>
      <p className="mt-6 text-stone">
        {res.length} {res.length === 1 ? "property" : "properties"}
      </p>
      {res.length ? (
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {res.map((p) => (
            <PropertyCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center">
          No matches.{" "}
          <Link
            href="/properties"
            className="font-semibold text-olive underline"
          >
            Clear filters
          </Link>
        </p>
      )}
    </>
  );
}



function Filters() {
  const sp = useSearchParams();
  const initial = Object.fromEntries(sp.entries());
  // key resets the form whenever the URL filters change (e.g. footer category links)
  return <Search key={sp.toString()} overlap={false} initial={initial} />;
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-36">
      <p className="label">Collection</p>
      <h1 className="h2 mt-3">All Properties</h1>
      <div className="mt-10">
        <Suspense>
          <Filters />
        </Suspense>
      </div>
      <div className="mt-10">
        <Suspense>
          <List />
        </Suspense>
      </div>
    </div>
  );
}
