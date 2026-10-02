"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { company } from "@/data/company";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-brand-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href={`tel:${company.phones.tel.replace(/\s/g, "")}`} className="flex items-center gap-1 hover:underline">
              <Phone className="w-3.5 h-3.5" />
              {company.phones.tel}
            </a>
            <span className="hidden sm:inline">|</span>
            <a href={`https://wa.me/27${company.phones.whatsapp.replace(/\s/g, "").slice(1)}`} className="hover:underline">
              WhatsApp: {company.phones.whatsapp}
            </a>
          </div>
          <div className="text-xs sm:text-sm">
            B-BBEE Level 1 · 100% Black-owned · CSD Registered
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-brand-900 leading-tight">Blessenzo Holdings</div>
              <div className="text-xs text-slate-500">ICT Equipment & Services</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="hover:text-brand-600 transition">Products</Link>
            <Link href="/categories" className="hover:text-brand-600 transition">Categories</Link>
            <Link href="/about" className="hover:text-brand-600 transition">About</Link>
            <Link href="/services" className="hover:text-brand-600 transition">Services</Link>
            <Link href="/contact" className="hover:text-brand-600 transition">Contact</Link>
            <Link href="/quote" className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition">
              Request Quote
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="p-2 hover:bg-slate-100 rounded-lg relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col p-4 gap-3 text-sm font-medium">
            <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link href="/categories" onClick={() => setOpen(false)}>Categories</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/cart" onClick={() => setOpen(false)}>Cart ({totalItems})</Link>
            <Link
              href="/quote"
              className="bg-brand-600 text-white px-4 py-2 rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              Request Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
