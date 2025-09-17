"use client";

import { useEffect, useMemo, useState } from "react";

type NoodleStatus = "Halal" | "Non-Halal";

interface NoodleShop {
  name: string;
  address: string;
  status: NoodleStatus;
  style: string;
  hours: string;
  mapLink: string;
}

const NOODLE_SHOPS: NoodleShop[] = [
  { name: "Bakmi Abadi (Angke)", address: "Jl. Tubagus Angke No. 89, Angke, Jakarta Barat", status: "Non-Halal", style: "Mie Karet, Lomie", hours: "Mon-Sun: 09:00 - 22:00", mapLink: "#" },
  { name: "Bakmi Ace (Pademangan)", address: "Jl. Rajawali Selatan XII No. 24, Gn. Sahari Utara, Sawah Besar, Jakarta Pusat", status: "Non-Halal", style: "Kalimantan Style", hours: "Tue-Sun: 07:00 - 18:30 (Mon Closed)", mapLink: "#" },
  { name: "Bakmi Acang (Grogol)", address: "Jl. Dr. Susilo 3, Grogol, Jakarta Barat", status: "Halal", style: "Ayam Kampung", hours: "Mon-Sun: 10:00 - 22:00", mapLink: "#" },
  { name: "Bakmi Acing (Grogol)", address: "Jl. Muwardi 1 No. 17, Grogol, Jakarta Barat", status: "Halal", style: "Ayam Kampung", hours: "Daily (Hours vary)", mapLink: "#" },
  { name: "Bakmi Agoan (Puri)", address: "Ruko Pasar Puri Indah, Jl. Puri Indah Raya, Puri, Jakarta Barat", status: "Non-Halal", style: "Mie Alot (Gummy Noodle)", hours: "Mon-Sun: 07:00 - 21:00", mapLink: "#" },
  { name: "Bakmi Akong (Muara Karang)", address: "Jl. Pluit Karang Indah Timur Blok B8 Timur No. 102, Muara Karang, Jakarta Utara", status: "Non-Halal", style: "Mie Campur", hours: "Mon, Wed-Sun: 06:00 - 15:00 (Tue Closed)", mapLink: "#" },
  { name: "Bakmi Alim Pejagalan (Muara Karang)", address: "Jl. Pluit Karang Sari XV Blok D7 Timur No. 103, Muara Karang, Jakarta Utara", status: "Halal", style: "Ayam Pangsit", hours: "Mon-Sun: 06:30 - 20:00", mapLink: "#" },
  { name: "Bakmi Aliang Gg. 14 (Pademangan)", address: "Jl. Pademangan II Gang 14 No. 26, Pademangan Timur, Jakarta Utara", status: "Non-Halal", style: "Traditional Chinese-Indonesian", hours: "Tue-Sun: 06:00 - 17:00 (Mon Closed)", mapLink: "#" },
  { name: "Bakmi Alip (Sawah Besar)", address: "Jl. Sukarjo Wiryopranoto (Sawah Besar)", status: "Halal", style: "Ayam Kampung & Jamur", hours: "Daily: 06:00 - 15:00", mapLink: "#" },
  { name: "Bakmi Alok (Green Ville)", address: "Jl. Mangga II B No. 38, Green Ville, Jakarta Barat", status: "Halal", style: "Ayam Kampung", hours: "Tue-Sun: 07:00 - 15:00 (Mon Closed)", mapLink: "#" },
  { name: "Bakmi Aloi (Green Ville)", address: "Jl. Mangga II Blok B No. 37, Green Ville, Jakarta Barat", status: "Non-Halal", style: "Palembang Style", hours: "Mon-Sun: 06:00 - 21:30", mapLink: "#" },
  { name: "Bakmi Asoi (Puri)", address: "Pasar Puri Indah, Jl. Puri Indah Raya Blok I No. 43, Puri, Jakarta Barat", status: "Non-Halal", style: "Ayam Kampung & Babi Cincang", hours: "Mon-Sun: 06:00 - 13:00", mapLink: "#" },
  { name: "Bakmi Asiu (Kelapa Gading)", address: "Jl. Kelapa Kopyor Raya Blok Q1 No. 10, Kelapa Gading, Jakarta Utara", status: "Non-Halal", style: "Mie Karet, 6 Toppings", hours: "Daily: 06:00 - 16:30", mapLink: "#" },
  { name: "Bakmi Asui (Tanjung Duren)", address: "Jl. Tanjung Duren Utara IIIA No. 337B, Grogol petamburan, Jakarta Barat", status: "Halal", style: "Mie Karet Ayam Kampung", hours: "Tue-Sun: 06:00 - 13:00 (Mon Closed)", mapLink: "#" },
  { name: "Bakmi Asuk (Sunter)", address: "Jl. Danau Sunter Utara No. 59 Blok R, Sunter Agung, Jakarta Utara", status: "Halal", style: "Mie Karet Ayam Kampung", hours: "Mon-Sun: 07:00 - 18:00", mapLink: "#" },
  { name: "Bakmi Atek Siantar (Puri)", address: "Jl. Puri Kembangan No. 1, Puri, Jakarta Barat", status: "Non-Halal", style: "Mie Keriting Siantar Style", hours: "Daily: 06:00 - 16:00", mapLink: "#" },
  { name: "Bakmi Ationg (Sunrise Garden)", address: "Komplek Sunrise Garden, Jl. Surya Asih I No. 10, Kebon Jeruk, Jakarta Barat", status: "Halal", style: "Mie Alot Ayam", hours: "Mon-Sun: 06:00 - 18:00", mapLink: "#" },
  { name: "Bakmi Baji Pamai (Kelapa Gading)", address: "Jl. Boulevard Raya Blok FV1 No. 29-31, Kelapa Gading, Jakarta Utara", status: "Non-Halal", style: "Makassar Style", hours: "Daily (Hours vary)", mapLink: "#" },
  { name: "Bakmi Belawan Amin (Jelambar)", address: "Jl. Seni Budaya Raya No. 2, Jelambar, Jakarta Barat", status: "Non-Halal", style: "Medan Style", hours: "Mon-Sun: 06:00 - 19:30", mapLink: "#" },
  { name: "Bakmi Bulon Singkawang (Jelambar)", address: "Jl. Jelambar Baru Raya No. 33, Jelambar, Jakarta Barat", status: "Non-Halal", style: "Singkawang Style", hours: "Mon-Sun: 07:00 - 17:00", mapLink: "#" },
  { name: "Bakmi Camat (Tan) (Mangga Besar)", address: "Jl. Mangga Besar IV No. 4E, Mangga Besar, Jakarta Barat", status: "Non-Halal", style: "Traditional Chinese-Indonesian", hours: "Tue-Sun: 06:00 - 14:00 (Mon Closed)", mapLink: "#" },
  { name: "Bakmi Cong Sim (Mangga Besar)", address: "Jl. Raya Mangga Besar No. 2J, Maphar, Taman Sari, Jakarta Barat", status: "Non-Halal", style: "Medan Style", hours: "Mon-Sun: 10:00 - 23:00", mapLink: "#" },
  { name: "Bakmi Copin (Kelapa Gading)", address: "Jl. Kelapa Hybrida Blok RA 3 No. 5, Kelapa Gading, Jakarta Utara", status: "Non-Halal", style: "Legendary Pork Noodle", hours: "Daily: 07:00 - 22:00", mapLink: "#" },
  { name: "Bakmi Dina (Puri)", address: "Pasar Puri Indah, Blok K No. 5B, Jl. Puri Indah Raya, Puri, Jakarta Barat", status: "Non-Halal", style: "Traditional Market Stall", hours: "Mon-Sun: 05:30 - 13:00", mapLink: "#" },
  { name: "Bakmi Erni (Kelapa Gading)", address: "Jl. Boulevard Raya Blok FY 1 No. 15, Kelapa Gading, Jakarta Utara", status: "Non-Halal", style: "Traditional Chinese-Indonesian", hours: "Daily (Hours vary)", mapLink: "#" },
  { name: "Bakmi GM (Gajah Mada)", address: "Jl. Gajah Mada No. 92, Krukut, Taman Sari, Jakarta Barat", status: "Halal", style: "Iconic Jakarta Chain", hours: "Mon-Sun: 09:00 - 21:30", mapLink: "#" },
  { name: "Bakmi Gang Mangga (Glodok)", address: "Jl. Kemurnian IV Gang Mangga No. 38B, Glodok, Jakarta Barat", status: "Non-Halal", style: "Late-Night Noodle", hours: "Daily: 12:00 PM - 03:00 AM", mapLink: "#" },
  { name: "Bakmi Kah Seng (Tomang)", address: "Jl. Kemuning No. 16, Tomang, Jakarta Barat", status: "Non-Halal", style: "Mie Karet", hours: "Mon-Sun: 07:00 - 14:00", mapLink: "#" },
  { name: "Bakmi Karet Krekot (Pasar Baru)", address: "Jl. H. Samanhudi No. 6, Pasar Baru, Sawah Besar, Jakarta Pusat", status: "Halal", style: "Mie Karet", hours: "Mon-Sun: 06:00 - 13:00", mapLink: "#" },
  { name: "Bakmi Karet Planet (Puri)", address: "Pasar Puri Indah Blok I No. 32, Jl. Puri Indah Raya, Puri, Jakarta Barat", status: "Non-Halal", style: "Mie Karet", hours: "Mon-Sun: 06:00 - 16:00", mapLink: "#" },
  { name: "Bakmi Khek 63 (Muara Karang)", address: "Jl. Muara Karang Raya Blok B7 Utara No. 115, Muara Karang, Jakarta Utara", status: "Non-Halal", style: "Hakka Style", hours: "Mon-Sun: 06:00 - 15:00", mapLink: "#" },
  { name: "Bakmi Kribo (Taman Ratu)", address: "Taman Ratu, Jakarta Barat", status: "Non-Halal", style: "Mee Pok, Special Toppings", hours: "Daily (Hours vary)", mapLink: "#" },
  { name: "Bakmi Ling-ling (Puri Indah)", address: "Ruko Pasar Puri Indah, Jl. Puri Indah Raya, Puri, Jakarta Barat", status: "Non-Halal", style: "5-Rasa Topping", hours: "Daily (Hours vary)", mapLink: "#" },
  { name: "Bakmi Lungkee (Hayam Wuruk)", address: "Jl. Hayam Wuruk No. 68, Maphar, Taman Sari, Jakarta Barat", status: "Non-Halal", style: "Mie Kecil/Lebar", hours: "Mon-Sun: 18:00 - 02:00", mapLink: "#" },
  { name: "Bakmi Orpa (Kota)", address: "Jl. Malaka II No. 25, Kota, Jakarta Barat", status: "Non-Halal", style: "Eggy Noodle, Tahu Bakso", hours: "Mon-Sun: 06:30 - 14:30", mapLink: "#" },
  { name: "Bakmi Toko Tiga (Menteng)", address: "Jl. KH Wahid Hasyim No. 63A, Menteng, Jakarta Pusat", status: "Halal", style: "Indonesian-Chinese Cuisine", hours: "Mon-Sun: 09:00 - 21:30", mapLink: "#" },
  { name: "DEMIE Bakmie (Kemang)", address: "Como Park, Jl. Kemang Timur No. 998, Bangka, Jakarta Selatan", status: "Halal", style: "Modern Noodle Bar", hours: "Sun-Thur: 08:00 - 21:00, Fri-Sat: 08:00 - late", mapLink: "#" },
  { name: "Mie Encim (Sawah Besar)", address: "Jl. Kartini Raya No. 22A, Sawah Besar, Jakarta Pusat", status: "Non-Halal", style: "Legendary Ayam Kampung", hours: "Tue-Sun: 05:30 - 14:00 (Mon Closed)", mapLink: "#" },
];

function getAreaFromName(name: string): string {
  const match = name.match(/\(([^)]+)\)/);
  return match ? match[1].toLowerCase() : "";
}

function NoodleCard({ shop }: { shop: NoodleShop }) {
  const [enterActive, setEnterActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEnterActive(true), 50);
    return () => clearTimeout(t);
  }, []);

  const statusBadgeClass = shop.status === "Halal" ? "halal-badge" : "non-halal-badge";

  return (
    <div
      className={`noodle-card bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 card-enter ${enterActive ? "card-enter-active" : ""}`}
      data-name={shop.name.toLowerCase()}
      data-area={getAreaFromName(shop.name)}
      data-style={shop.style.toLowerCase()}
      data-status={shop.status}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{shop.name}</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBadgeClass}`}>{shop.status}</span>
        </div>
        <p className="text-amber-600 font-semibold text-sm mb-3">{shop.style}</p>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong className="font-medium">Address:</strong> {shop.address}
          </p>
          <p>
            <strong className="font-medium">Hours:</strong> {shop.hours}
          </p>
        </div>
        <div className="mt-4">
          <a
            href={shop.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | NoodleStatus>("all");

  const filteredShops = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return NOODLE_SHOPS.filter((shop) => {
      const matchesSearch =
        !term ||
        shop.name.toLowerCase().includes(term) ||
        shop.style.toLowerCase().includes(term) ||
        getAreaFromName(shop.name).includes(term);

      const matchesStatus = statusFilter === "all" || shop.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const filterBtnClass = (active: boolean) =>
    `${active ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"} filter-btn px-4 py-2 rounded-full text-sm font-semibold`;

  return (
    <div className="text-gray-800">
      {/* Header Section */}
      <header className="relative text-white py-20 px-6 sm:py-32 sm:px-10 text-center bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/gemini-prod-us-west1-d85c5339f40c/images/6d3381a1-9a74-4b52-b13c-4a37f59d5870.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">A &quot;Bakmi&quot; Compass</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300">Navigating Jakarta&apos;s Legendary Bakmi Scene</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction */}
        <section id="intro" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">An Introduction to the Art of Bakmi</h2>
          <div className="max-w-4xl mx-auto text-justify space-y-6 text-base sm:text-lg leading-relaxed">
            <p>
              To understand Jakarta is to understand bakmi. More than just a bowl of noodles, it is a cultural institution, a culinary dialect spoken in countless variations across the sprawling metropolis. From the clatter of bowls in a packed, non-air-conditioned kedai (stall) at dawn to the hum of conversation in a modern, brightly-lit noodle bar at midnight, the pursuit of the perfect bakmi is a city-wide obsession. It is breakfast, lunch, and dinner; a source of comfort, a point of pride, and a direct link to the city&apos;s rich, layered history of migration and culinary fusion.
            </p>
            <p>
              This guide serves as a compass for the discerning diner, navigating the intricate landscape of Jakarta&apos;s noodle scene to uncover the masters of the craft, the legendary institutions, and the modern innovators who continue to evolve this iconic dish.
            </p>
          </div>
        </section>

        {/* Traditions & Textures */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">A Tale of Two Traditions</h3>
            <p className="mb-4">
              The Jakarta bakmi landscape is fundamentally defined by the distinction between Halal and non-Halal preparations. This is not just about protein choice but a divergence creating two parallel, rich culinary traditions.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg text-red-600">Non-Halal</h4>
                <p className="text-sm">
                  Often tracing a more direct lineage to Southern Chinese roots, utilizing pork lard (minyak babi) for richness and toppings like minced pork (babi cincang), barbecued pork (charsiu), and crispy roasted pork belly.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-green-600">Halal</h4>
                <p className="text-sm">
                  A masterful adaptation focusing on the nuanced flavors of chicken, often high-quality free-range chicken (ayam kampung). The base oil is rendered from chicken fat, resulting in a lighter yet deeply savory profile.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">The Connoisseur&apos;s Lexicon</h3>
            <p className="mb-4">
              Beyond toppings, the soul of a bakmi lies in the noodle itself. Understanding the different textures is key to finding your perfect bowl.
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Mie Kecil/Halus:</strong> Thin, fine noodles prized for their delicate texture.
              </li>
              <li>
                <strong>Mie Lebar:</strong> Wide, flat noodles offering a more substantial mouthfeel.
              </li>
              <li>
                <strong>Mie Karet:</strong> &quot;Rubber noodle,&quot; thick and dense with a pronounced chewiness.
              </li>
              <li>
                <strong>Mie Keriting:</strong> &quot;Curly noodles,&quot; thin but wavy, providing a different kind of springiness.
              </li>
            </ul>
          </div>
        </section>

        {/* The Jakarta Bakmi Directory */}
        <section id="directory" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">The Jakarta Bakmi Directory</h2>
          <p className="text-center text-gray-600 mb-8">Your essential field guide to the city&apos;s best noodles.</p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md z-10">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name, area, or style..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={filterBtnClass(statusFilter === "all")}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("Halal")}
                className={filterBtnClass(statusFilter === "Halal")}
              >
                Halal
              </button>
              <button
                onClick={() => setStatusFilter("Non-Halal")}
                className={filterBtnClass(statusFilter === "Non-Halal")}
              >
                Non-Halal
              </button>
            </div>
          </div>

          {/* Noodle Shop List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <NoodleCard key={shop.name} shop={shop} />
            ))}
          </div>
          <p className={`text-center text-gray-500 mt-8 ${filteredShops.length === 0 ? "" : "hidden"}`}>
            No results found.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Jakarta Bakmi Guide. Your compass to culinary delight.</p>
        </div>
      </footer>
    </div>
  );
}
