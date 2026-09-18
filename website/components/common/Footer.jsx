import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">ZAOGA FIF</h3>
            <p className="text-gray-400 text-sm">
              Mabelreign Kingdom District — Connecting hearts through digital ministry
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/sermons" className="text-gray-400 hover:text-white transition">Sermons</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-white transition">Events</Link></li>
              <li><Link href="/prayers" className="text-gray-400 hover:text-white transition">Prayer Requests</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/testimonies" className="text-gray-400 hover:text-white transition">Testimonies</Link></li>
              <li><Link href="/devotions" className="text-gray-400 hover:text-white transition">Daily Devotions</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-white transition">Media Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-400">Mabelreign, Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:info@zaogafifmabelreign.org" className="text-gray-400 hover:text-white">
                  info@zaogafifmabelreign.org
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:+263771234567" className="text-gray-400 hover:text-white">
                  +263 77 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} ZAOGA FIF Mabelreign Kingdom District. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
