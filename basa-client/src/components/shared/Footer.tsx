"use client";

import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-8 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-3">Contact Us</h3>
            <p>Email: support@basafinder.com</p>
            <p>Phone: +123 456 7890</p>
            <div className="flex justify-center md:justify-start gap-4 mt-3">
              <Link href="https://facebook.com" target="_blank" className="hover:text-blue-500">
                <FacebookIcon size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400">
                <TwitterIcon size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500">
                <InstagramIcon size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/all-rentals" className="hover:underline">All Rentals</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Legal & Copyright */}
          <div>
            <h3 className="text-lg font-bold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:underline">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
            <p className="text-sm text-gray-300 mt-4">
              © {new Date().getFullYear()} BasaFinder. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
