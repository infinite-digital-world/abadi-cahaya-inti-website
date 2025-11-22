import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              PT Abadi Cahaya Inti
            </h3>
            <p className="text-sm mb-4 text-gray-400">
              Your Trusted Partner for Lifting, Safety & Material Supply
            </p>
            <p className="text-sm text-gray-400">
              Supplier B2B terpercaya di Makassar untuk peralatan lifting,
              safety equipment (APD), dan material pendukung industri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  Jalan Palapa VII No. 17, Paccerakang, Biringkanaya,
                  <br />
                  Kota Makassar, Sulawesi Selatan, 90245
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a
                  href="tel:+6285121321332"
                  className="hover:text-white transition-colors"
                >
                  0851-2132-1332
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:info@abadicahayainti.co.id"
                  className="hover:text-white transition-colors"
                >
                  info@abadicahayainti.co.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            Hak Cipta © {new Date().getFullYear()} PT Abadi Cahaya Inti.
            Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}

