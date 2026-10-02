import Link from "next/link";
import { company } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Blessenzo Holdings</h3>
          <p className="text-sm leading-relaxed mb-4">
            ICT equipment & services provider. Genuine products from authorised distributors. Reliable supply and support nationwide.
          </p>
          <p className="text-xs text-slate-400">
            Reg: {company.regNo}<br />
            Tax: {company.taxNo}<br />
            CSD: {company.csdNo}<br />
            B-BBEE Level 1 · 100% Black-owned
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/quote" className="hover:text-white">Request Quote</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
            <li><Link href="/terms#refund" className="hover:text-white">Refund Policy</Link></li>
            <li><Link href="/terms#delivery" className="hover:text-white">Delivery Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>{company.address.physical}</li>
            <li>
              <a href={`tel:${company.phones.tel.replace(/\s/g, "")}`} className="hover:text-white">
                Tel: {company.phones.tel}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/27${company.phones.whatsapp.replace(/\s/g, "").slice(1)}`} className="hover:text-white">
                WhatsApp: {company.phones.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.emails.sales}`} className="hover:text-white">
                {company.emails.sales}
              </a>
            </li>
          </ul>
        </div>

        {/* Partners */}
        <div>
          <h4 className="text-white font-semibold mb-4">Our Partners</h4>
          <p className="text-sm mb-2">Authorised reseller via:</p>
          <ul className="text-sm space-y-1">
            {company.distributors.slice(0, 5).map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="text-xs text-slate-400 mt-3">+ leading OEMs (HP, Dell, Lenovo, Cisco, Microsoft…)</p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Blessenzo Holdings (Pty) Ltd. All rights reserved.</p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
