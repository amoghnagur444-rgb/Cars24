import { Home, Search, ArrowLeft, Car, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-6">
            <Car className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
            Don't worry, we'll help you get back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>

          <div className="flex items-center justify-center gap-4 text-gray-400">
            <span>or</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/buy-car"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all text-center"
            >
              <Search className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Browse Cars</p>
              <p className="text-sm text-gray-500">Find your dream car</p>
            </Link>

            <Link
              href="/sell-car"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all text-center"
            >
              <RotateCcw className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Sell Your Car</p>
              <p className="text-sm text-gray-500">Get best price</p>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Popular Pages</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/buy-car"
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                Buy Used Cars
              </Link>
              <span className="text-gray-300">·</span>
              <Link
                href="/finance"
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                Car Finance
              </Link>
              <span className="text-gray-300">·</span>
              <Link
                href="/services"
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                Car Services
              </Link>
              <span className="text-gray-300">·</span>
              <Link
                href="/faq"
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                FAQ
              </Link>
              <span className="text-gray-300">·</span>
              <Link
                href="/appointments"
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                My Appointments
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-400">
        <p>Can't find what you're looking for? </p>
        <Link
          href="/contact"
          className="text-orange-600 hover:text-orange-700 font-medium"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}