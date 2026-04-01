'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get travel tips, special offers, and new property listings</p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">ErentalsCad</h2>
            <p className="text-gray-400 text-sm mb-6">Premium furnished apartments across all 20 arrondissements of Paris.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold mb-4">Browse</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">All Properties</a></li>
              <li><a href="#" className="hover:text-white transition">All Arrondissements</a></li>
              <li><a href="#" className="hover:text-white transition">Featured Apartments</a></li>
              <li><a href="#" className="hover:text-white transition">Budget Gems</a></li>
              <li><a href="#" className="hover:text-white transition">Luxury Apartments</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Blog & Guides</a></li>
              <li><a href="#" className="hover:text-white transition">Become a Host</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Booking Help</a></li>
              <li><a href="#" className="hover:text-white transition">Cancellations</a></li>
              <li><a href="#" className="hover:text-white transition">Reviews & Safety</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Compliance Info</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-slate-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-400 text-sm">+33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-400 text-sm">erentalscaddex@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="font-semibold">Office</p>
              <p className="text-gray-400 text-sm">Paris, France</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 ErentalsCad. All rights reserved. | All properties comply with 2026 French rental regulations.
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>🇫🇷 Registered in France</span>
              <span>✓ 2026 Compliant</span>
              <span>🔒 Secure Booking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
