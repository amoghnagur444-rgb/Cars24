"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getcarSummaries } from "@/lib/Carapi";
import { ChevronDown, Heart, Search, Sliders, CarFront } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

interface Car {
  id: string;
  title: string;
  year: number;
  km: string;
  fuel: string;
  transmission: string;
  owner: string;
  emi: string;
  price: string;
  location: string;
  image: string[];
}

function LoaderCard() {
  return (
    <div className="bg-white rounded-lg shadow-md animate-pulse overflow-hidden">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
}

const Index = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[] | null>(null);
  const [fuelFilter, setFuelFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [transmissionFilter, setTransmissionFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [mileageFilter, setMileageFilter] = useState("");
  
  
  // FIX: Added hydration safety state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Component has mounted on the client
    setIsMounted(true);
    
    const fetchCars = async () => {
      const carData = await getcarSummaries();
      setCars(carData);
    };
    fetchCars();
  }, []);

  // Helper to safely format currency without hydration errors
  const formatPrice = (val: number) => {
    return isMounted ? val.toLocaleString("en-IN") : val.toString();
  };

  const parsePrice = (price: string) => {
  const numeric = parseFloat(price.replace(/[₹,\s]/g, "").replace("lakh", ""));
  return numeric * 100000;
};

const fuse = useMemo(
  () =>
    new Fuse(cars || [], {
      keys: ["title"],
      threshold: 0.45,
      distance: 100,
      ignoreLocation: true,
      includeScore: true,
      minMatchCharLength: 2,
    }),
  [cars]
);

const searchedCars =
  searchTerm.length > 0
    ? fuse.search(searchTerm).map((result) => result.item)
    : cars || [];

const filteredCars =
  searchedCars.filter((car) => {
    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) =>
        car.title.toLowerCase().includes(brand.toLowerCase())
      );

    const matchesFuel =
      !fuelFilter ||
      car.fuel.toLowerCase() === fuelFilter.toLowerCase();

    const matchesTransmission =
      !transmissionFilter ||
      car.transmission.toLowerCase() ===
        transmissionFilter.toLowerCase();

    const price = parsePrice(car.price);

    const matchesPrice =
      price >= priceRange[0] &&
      price <= priceRange[1];

    const matchesYear =
    !yearFilter ||
    car.year.toString() === yearFilter;

    const km = parseInt(car.km.replace(/,/g, ""));

    const matchesMileage =
      !mileageFilter ||
      (mileageFilter === "10000" && km <= 10000) ||
      (mileageFilter === "25000" && km > 10000 && km <= 25000) ||
      (mileageFilter === "50000" && km > 25000 && km <= 50000) ||
      (mileageFilter === "999999" && km > 50000);

        return (
      matchesBrand &&
      matchesFuel &&
      matchesTransmission &&
      matchesPrice &&
      matchesYear &&
      matchesMileage
    );
  });

    const suggestions =
      searchTerm.length > 0
        ? searchedCars.slice(0, 5)
        : [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white text-black">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Sidebar Filters */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <h3 className="font-semibold mb-4 text-black">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-black">Price Range</label>
                  <Slider
                    defaultValue={[0, 1000000]}
                    max={1000000}
                    step={10000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    {/* Use the safety helper here */}
                    <span>₹{formatPrice(priceRange[0])}</span>
                    <span>₹{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-black">Brand</label>
                  <div className="space-y-2">
                    {["Maruti", "Hyundai", "Honda", "Tata"].map((brand) => (
                      <label key={brand} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                            }
                          }}
                        />
                        <span className="ml-2 text-sm text-black group-hover:text-blue-600 transition-colors">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-black">
                    Fuel Type
                  </label>
                    
                    <select
                    value={fuelFilter}
                    onChange={(e) => setFuelFilter(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="">All</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="CNG">CNG</option>
                  </select>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block text-black">
                      Transmission
                    </label>
                    <select
                      value={transmissionFilter}
                      onChange={(e) => setTransmissionFilter(e.target.value)}
                      className="w-full border rounded p-2"
                    >
                      <option value="">All</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                    <div>
                    <label className="text-sm font-medium mb-2 block text-black">
                      Year
                    </label>

                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className="w-full border rounded p-2 text-black"
                    >
                      <option value="">All Years</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-black">
                      Mileage (KM Driven)
                    </label>

                    <select
                      value={mileageFilter}
                      onChange={(e) => setMileageFilter(e.target.value)}
                      className="w-full border rounded p-2 text-black"
                    >
                      <option value="">All Mileage</option>
                      <option value="10000">0 - 10,000 km</option>
                      <option value="25000">10,001 - 25,000 km</option>
                      <option value="50000">25,001 - 50,000 km</option>
                      <option value="999999">Above 50,000 km</option>
                    </select>
                  </div>

                    
                    
                  </div>

                  
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-2xl font-bold text-black">Used Cars in Delhi NCR</h1>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="pl-10 text-black border-gray-300"
                  />

                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                      {suggestions.map((car) => (
                        <div
                          key={car.id}
                          onClick={() => {
                            setSearchTerm(car.title);
                            setShowSuggestions(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                        >
                          {car.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="outline" className="flex items-center border-gray-300 text-white hover:bg-gray-100">
                  <Sliders className="h-4 w-4 mr-2" /> Sort <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Logical Rendering: Loading vs Empty vs List */}
            {cars === null ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <LoaderCard key={i} />)}
              </div>
            ) : cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <CarFront className="h-20 w-20 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">No cars available right now</h3>
                <p className="text-gray-500 mt-2 text-center max-w-sm px-4">
                  We couldn't find any cars matching your criteria. Try adjusting your filters or check back later!
                </p>
                <Button 
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  onClick={() => window.location.reload()}
                >
                  Check again
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Link
                    key={car.id}
                    href={`/buy-car/${car.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={car.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white shadow-sm transition-colors">
                        <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-3 line-clamp-1 text-black">{car.title}</h3>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1.5 rounded flex items-center justify-center">
                          {car.km} km
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1.5 rounded flex items-center justify-center">
                          {car.transmission}
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1.5 rounded flex items-center justify-center">
                          {car.fuel}
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1.5 rounded flex items-center justify-center">
                          {car.owner}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">EMI from</div>
                          <div className="font-bold text-blue-600 text-lg">{car.emi}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Price</div>
                          <div className="font-bold text-gray-900 text-lg">{car.price}</div>
                        </div>
                      </div>
                      <div className="mt-4 text-[11px] text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                        {car.location}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;