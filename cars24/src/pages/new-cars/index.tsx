import React from "react";
import Link from "next/link";
import {
  Car,
  Sparkles,
  Shield,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Tag,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NewCarsPage = () => {
  const brands = [
    { name: "Maruti Suzuki", count: 156, logo: "MS" },
    { name: "Hyundai", count: 89, logo: "H" },
    { name: "Tata Motors", count: 67, logo: "T" },
    { name: "Mahindra", count: 45, logo: "M" },
    { name: "Honda", count: 34, logo: "H" },
    { name: "Toyota", count: 28, logo: "T" },
    { name: "Kia", count: 23, logo: "K" },
    { name: "MG Motor", count: 12, logo: "MG" },
  ];

  const categories = [
    { name: "Hatchback", icon: Car, count: 120 },
    { name: "Sedan", icon: Car, count: 85 },
    { name: "SUV", icon: Car, count: 156 },
    { name: "MPV", icon: Car, count: 28 },
    { name: "Electric", icon: Sparkles, count: 15 },
    { name: "Luxury", icon: Shield, count: 8 },
  ];

  const featuredCars = [
    {
      id: 1,
      name: "Maruti Suzuki Fronx",
      type: "Compact SUV",
      price: "₹7.51 - 13.04 Lakh",
      mileage: "21.79 kmpl",
      engine: "1197 cc",
      image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      variants: 12,
    },
    {
      id: 2,
      name: "Hyundai Creta",
      type: "Mid-size SUV",
      price: "₹10.87 - 19.20 Lakh",
      mileage: "17.5 kmpl",
      engine: "1497 cc",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      variants: 18,
    },
    {
      id: 3,
      name: "Tata Nexon",
      type: "Compact SUV",
      price: "₹8.10 - 15.50 Lakh",
      mileage: "17.44 kmpl",
      engine: "1497 cc",
      image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg",
      variants: 15,
    },
    {
      id: 4,
      name: "Mahindra Scorpio N",
      type: "Full-size SUV",
      price: "₹13.26 - 24.54 Lakh",
      mileage: "15.2 kmpl",
      engine: "2198 cc",
      image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      variants: 10,
    },
  ];

  const upcomingCars = [
    {
      name: "Maruti Suzuki eVX",
      type: "Electric SUV",
      expectedLaunch: "Early 2025",
      expectedPrice: "₹20-25 Lakh",
      image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    },
    {
      name: "Hyundai Ioniq 5",
      type: "Electric Crossover",
      expectedLaunch: "Q1 2025",
      expectedPrice: "₹45-50 Lakh",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    },
    {
      name: "Tata Harrier EV",
      type: "Electric SUV",
      expectedLaunch: "Mid 2025",
      expectedPrice: "₹25-30 Lakh",
      image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">New Cars in India</h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover the latest car launches, compare prices, specs, and find
              your perfect new car from 400+ models across 25+ brands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                Explore All Cars
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700 px-8 py-3"
              >
                Compare Cars
                <Search className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search cars by name..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option value="">All Body Types</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option value="">Price Range</option>
                <option value="0-5">Under ₹5 Lakh</option>
                <option value="5-10">₹5-10 Lakh</option>
                <option value="10-20">₹10-20 Lakh</option>
                <option value="20-50">₹20-50 Lakh</option>
                <option value="50">Above ₹50 Lakh</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Brands</h2>
              <p className="text-gray-600 mt-1">Explore new cars from your favorite manufacturers</p>
            </div>
            <Button variant="outline" className="hidden sm:block">
              View All Brands
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/new-cars/brand/${brand.name.toLowerCase().replace(" ", "-")}`}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                  <span className="text-2xl font-bold text-blue-600">{brand.logo}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{brand.name}</h3>
                <p className="text-xs text-gray-500">{brand.count} models</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Body Type Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Body Type</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect car type for your lifestyle and needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/new-cars/type/${category.name.toLowerCase()}`}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:border-blue-300 border border-gray-200 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                  <category.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} cars</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured New Cars</h2>
              <p className="text-gray-600 mt-1">Top picks from our experts</p>
            </div>
            <Button variant="outline">
              View All Cars
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                    {car.variants} variants
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-blue-600 font-medium mb-1">{car.type}</p>
                  <h3 className="font-bold text-gray-900 mb-2">{car.name}</h3>
                  <div className="space-y-1 mb-3">
                    <p className="text-xl font-bold text-blue-600">{car.price}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {car.mileage}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {car.engine}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Cars */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Cars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay ahead with the latest upcoming car launches in India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingCars.map((car, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Upcoming
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{car.type}</p>
                  <h3 className="font-bold text-gray-900 mb-2">{car.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Expected: {car.expectedLaunch}
                    </p>
                    <p className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Expected: {car.expectedPrice}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Notify Me
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Dream Car?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you find the perfect new car. Our experts can assist with
            comparisons, test drives, and the best deals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
              Book Test Drive
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-700 px-8 py-3"
            >
              Compare Cars
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewCarsPage;