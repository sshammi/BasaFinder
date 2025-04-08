"use client";

import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FF4B27] text-white pt-32 pb-14 px-20 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Contact Us</h3>
            <p className="text-white">Email: support@basafinder.com</p>
            <p className="text-white">Phone: +123 456 7890</p>
            <div className="flex justify-center md:justify-start gap-4 mt-3">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                className="text-white hover:text-blue-600 transition-colors"
              >
                <FacebookIcon size={24} className="text-current" />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                className="text-white hover:text-blue-400 transition-colors"
              >
                <TwitterIcon size={24} className="text-current" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                className="text-white hover:text-pink-600 transition-colors"
              >
                <InstagramIcon size={24} className="text-current" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white hover:underline font-semibold">Home</Link></li>
              <li><Link href="/about" className="text-white hover:underline font-semibold">About Us</Link></li>
              <li><Link href="/all-rentals" className="text-white hover:underline font-semibold">All Rentals</Link></li>
              <li><Link href="/contact" className="text-white hover:underline font-semibold">Contact</Link></li>
            </ul>
          </div>

          {/* Legal & Copyright */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-white hover:underline font-semibold">Terms of Use</Link></li>
              <li><Link href="/privacy" className="text-white hover:underline font-semibold">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Rights Reserved Section */}
        <div className="mt-10 text-center pt-10">
          <p className="text-lg font-bold text-white">
            © {new Date().getFullYear()} BasaFinder. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
