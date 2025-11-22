import { ContactForm } from '@/components/forms/ContactForm'
import { Section } from '@/components/ui/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  'Kontak',
  'Hubungi PT Abadi Cahaya Inti di Makassar, Sulawesi Selatan. Kami siap membantu kebutuhan lifting equipment, safety equipment, dan material pendukung Anda.'
)

export default function ContactPage() {
  return (
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Tim kami siap membantu menjawab pertanyaan dan kebutuhan Anda.
          Hubungi kami melalui berbagai cara di bawah ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle>Alamat</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Jalan Palapa VII No. 17, Paccerakang, Biringkanaya
                <br />
                Kota Makassar, Sulawesi Selatan
                <br />
                90245, Indonesia
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-primary" />
                <CardTitle>Telepon / WhatsApp</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <a
                href="tel:+6285121321332"
                className="text-primary hover:underline text-lg font-semibold"
              >
                0851-2132-1332
              </a>
              <br />
              <a
                href="https://wa.me/6285121321332"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Chat via WhatsApp
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-primary" />
                <CardTitle>Email</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:info@abadicahayainti.co.id"
                className="text-primary hover:underline"
              >
                info@abadicahayainti.co.id
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-primary" />
                <CardTitle>Jam Operasional</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Senin - Jumat: 08:00 - 17:00 WITA
                <br />
                Sabtu: 08:00 - 12:00 WITA
                <br />
                Minggu: Tutup
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Lokasi Kami</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.5!2d119.4!3d-5.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDYnMDAuMCJTIDExOcKwMjQnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              * Peta menunjukkan lokasi perkiraan di Makassar, Sulawesi Selatan
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

