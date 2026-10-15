import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const linkClass = 'text-white/60 hover:text-accent transition-colors';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-white mt-24">
      <div className="h-1 bg-gradient-to-r from-accent via-amber-300 to-accent" />
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="font-display text-accent font-bold text-lg leading-none">Z</span>
              </div>
              <span className="font-display font-bold text-lg">ZAOGA FIF</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Mabelreign Kingdom District — connecting hearts and growing faith through digital ministry.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className={linkClass}>Home</Link></li>
              <li><Link href="/sermons" className={linkClass}>Sermons</Link></li>
              <li><Link href="/events" className={linkClass}>Events</Link></li>
              <li><Link href="/prayers" className={linkClass}>Prayer Requests</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-accent">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className={linkClass}>About Us</Link></li>
              <li><Link href="/testimonies" className={linkClass}>Testimonies</Link></li>
              <li><Link href="/devotions" className={linkClass}>Daily Devotions</Link></li>
              <li><Link href="/gallery" className={linkClass}>Media Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-accent">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-accent shrink-0" />
                <span className="text-white/60">Mabelreign, Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:info@zaogafifmabelreign.org" className={linkClass}>
                  info@zaogafifmabelreign.org
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="tel:+263771234567" className={linkClass}>
                  +263 77 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/50">
          <p>&copy; {currentYear} ZAOGA FIF Mabelreign Kingdom District. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
