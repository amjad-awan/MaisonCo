export const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export type Property = {
  slug: string;
  name: string;
  location: string;
  city: string;
  price: number;
  mode: "buy" | "rent";
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  featured?: boolean;
  images: string[];
  description: string;
  amenities: string[];
  area: string;
};
export const properties: Property[] = [
  {
    slug: "malibu-cliffside-residence",
    name: "Cliffside Residence",
    location: "Malibu, California",
    city: "Malibu",
    price: 8950000,
    mode: "buy",
    type: "Villa",
    beds: 5,
    baths: 6,
    sqft: 6200,
    featured: true,
    images: [
      "1613490493576-7fde63acd811",
      "1600607687939-ce8a6c25118c",
      "1600566753190-17f0baa2a6c3",
      "1505691938895-1758d7feb511",
    ],
    description:
      "A glass-and-stone residence set above the Pacific, with open living spaces that dissolve into terraces, an infinity pool and uninterrupted ocean horizons.",
    amenities: [
      "Infinity pool",
      "Private beach access",
      "Wine cellar",
      "Home cinema",
      "Smart home",
      "3-car garage",
    ],
    area: "Malibu sits along 21 miles of Pacific coastline, roughly 45 minutes from Santa Monica and LAX.",
  },
  {
    slug: "tribeca-loft",
    name: "The Tribeca Loft",
    location: "Tribeca, New York",
    city: "New York",
    price: 4200000,
    mode: "buy",
    type: "Apartment",
    beds: 3,
    baths: 3,
    sqft: 2850,
    featured: true,
    images: [
      "1502672260266-1c1ef2d93688",
      "1560448204-e02f11c3d0e2",
      "1545324418-cc1a3fa10c00",
      "1600210492486-724fe5c67fb0",
    ],
    description:
      "A converted warehouse loft with 12-foot ceilings, cast-iron columns and oversized windows, finished with a contemporary kitchen and oak floors.",
    amenities: ["Doorman", "Roof terrace", "Gym", "Storage", "Pet friendly"],
    area: "Tribeca offers cobblestone streets, acclaimed restaurants and quick access to Hudson River Park.",
  },
  {
    slug: "aspen-mountain-lodge",
    name: "Mountain Lodge",
    location: "Aspen, Colorado",
    city: "Aspen",
    price: 12500000,
    mode: "buy",
    type: "Estate",
    beds: 6,
    baths: 7,
    sqft: 8100,
    featured: true,
    images: [
      "1600596542815-ffad4c1539a9",
      "1600585154340-be6161a56a0c",
      "1600607687939-ce8a6c25118c",
      "1505691938895-1758d7feb511",
    ],
    description:
      "Timber, stone and glass come together in a ski-in ski-out lodge with a double-height great room, spa and guest wing.",
    amenities: [
      "Ski-in/ski-out",
      "Spa & sauna",
      "Heated driveway",
      "Guest suite",
      "Fireplace",
    ],
    area: "Minutes from Aspen Mountain and downtown dining, galleries and the Aspen Music Festival.",
  },
  {
    slug: "miami-waterfront-villa",
    name: "Bayfront Villa",
    location: "Miami Beach, Florida",
    city: "Miami",
    price: 6750000,
    mode: "buy",
    type: "Waterfront",
    beds: 5,
    baths: 5,
    sqft: 5400,
    images: [
      "1512917774080-9991f1c4c750",
      "1499793983690-e29da59ef1c2",
      "1600566753190-17f0baa2a6c3",
      "1600210492486-724fe5c67fb0",
    ],
    description:
      "A Mediterranean-modern villa on Biscayne Bay with a private dock, landscaped gardens and a resort-style pool.",
    amenities: [
      "Private dock",
      "Pool",
      "Outdoor kitchen",
      "Elevator",
      "Generator",
    ],
    area: "Close to Lincoln Road, South Pointe Park and the Art Deco district.",
  },
  {
    slug: "notting-hill-townhouse",
    name: "Notting Hill Townhouse",
    location: "Notting Hill, London",
    city: "London",
    price: 14500,
    mode: "rent",
    type: "Townhouse",
    beds: 4,
    baths: 3,
    sqft: 3100,
    images: [
      "1564013799919-ab600027ffc6",
      "1502672260266-1c1ef2d93688",
      "1560448204-e02f11c3d0e2",
      "1600210492486-724fe5c67fb0",
    ],
    description:
      "A stucco-fronted Victorian townhouse, thoughtfully modernised, with a private walled garden. Priced per month.",
    amenities: ["Walled garden", "Study", "Underfloor heating", "Wine fridge"],
    area: "Steps from Portobello Road and Holland Park, with the Central line nearby.",
  },
  {
    slug: "lake-como-villa",
    name: "Villa Lago",
    location: "Lake Como, Italy",
    city: "Como",
    price: 9800000,
    mode: "buy",
    type: "Villa",
    beds: 7,
    baths: 8,
    sqft: 7300,
    images: [
      "1613490493576-7fde63acd811",
      "1499793983690-e29da59ef1c2",
      "1600607687939-ce8a6c25118c",
      "1505691938895-1758d7feb511",
    ],
    description:
      "A lakefront villa with terraced gardens, private mooring and frescoed salons, restored with contemporary comfort.",
    amenities: [
      "Lake frontage",
      "Boathouse",
      "Pool",
      "Caretaker cottage",
      "Olive grove",
    ],
    area: "About 50 minutes from Milan, near the lakeside towns of Bellagio and Cernobbio.",
  },
  {
    slug: "downtown-penthouse",
    name: "Skyline Penthouse",
    location: "Downtown, Dubai",
    city: "Dubai",
    price: 25000,
    mode: "rent",
    type: "Apartment",
    beds: 3,
    baths: 4,
    sqft: 3400,
    images: [
      "1545324418-cc1a3fa10c00",
      "1560448204-e02f11c3d0e2",
      "1502672260266-1c1ef2d93688",
      "1600210492486-724fe5c67fb0",
    ],
    description:
      "A full-floor penthouse with floor-to-ceiling views of Burj Khalifa. Priced per month.",
    amenities: [
      "Concierge",
      "Infinity pool",
      "Gym",
      "Valet",
      "Fully furnished",
    ],
    area: "Walking distance to Dubai Mall and the fountains.",
  },
  {
    slug: "austin-commercial-studio",
    name: "The Foundry Building",
    location: "East Austin, Texas",
    city: "Austin",
    price: 5900000,
    mode: "buy",
    type: "Commercial",
    beds: 0,
    baths: 4,
    sqft: 12000,
    images: [
      "1486406146926-c627a92ad1ab",
      "1545324418-cc1a3fa10c00",
      "1560448204-e02f11c3d0e2",
      "1600210492486-724fe5c67fb0",
    ],
    description:
      "A mixed-use creative office building with ground-floor retail and strong income potential.",
    amenities: ["Retail frontage", "Rooftop", "EV charging", "Fibre"],
    area: "In the heart of East Austin's design and tech corridor.",
  },
];
export const fmt = (p: Property) =>
  p.mode === "rent"
    ? `$${p.price.toLocaleString()} / mo`
    : `$${p.price.toLocaleString()}`;
export const types = [
  "Villa",
  "Apartment",
  "Estate",
  "Waterfront",
  "Townhouse",
  "Commercial",
];
