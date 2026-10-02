"use client";

import { useState, useRef, useEffect } from "react";
import { company } from "@/data/company";
import { products as allProducts, searchProducts } from "@/data/products";
import Link from "next/link";

type Msg = { role: "bot" | "user"; html: string };

const QUICK_START = ["Browse products", "Request a quote", "Company details", "Contact sales", "Payment options"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [quick, setQuick] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs]);

  function openChat() {
    setOpen(true);
    if (!started) {
      setStarted(true);
      setMsgs([
        { role: "bot", html: "Hi — I'm the Blessenzo sales assistant. I can help with products, quotes, delivery and company details." },
        { role: "bot", html: "What are you looking for today?" },
      ]);
      setQuick(QUICK_START);
    }
  }

  function bot(html: string) {
    setMsgs((m) => [...m, { role: "bot", html }]);
  }

  function reply(raw: string) {
    const t = raw.toLowerCase().trim();
    const c = company;

    if (/^(hi|hello|hey|good morning|good afternoon|good day|howzit)/.test(t)) {
      bot("Hello! How can I help — products, a quote, or company information?");
      setQuick(["Laptops", "UPS / Power", "Networking", "Request a quote", "Contact"]);
      return;
    }

    if (/quote|quotation|pricing|rfq|proforma|tender/.test(t)) {
      bot("For formal quotations we respond with pricing and lead times from Tarsus, Pinnacle, Axiz or Mustek.");
      bot('Open the <a href="/quote" class="underline text-blue-300">quote form</a>, or add items to your cart first.');
      setQuick(["Contact sales", "Browse products"]);
      return;
    }

    if (/contact|phone|call|email|whatsapp|sales team|human/.test(t)) {
      bot(
        `<strong>Contact</strong><br>Tel: ${c.phones.tel}<br>WhatsApp: ${c.phones.whatsapp}<br>Sales: ${c.emails.sales}<br>Support: ${c.emails.support}`
      );
      bot(
        `<a href="https://wa.me/27${c.phones.whatsapp.replace(/\s/g, "").replace(/^0/, "")}?text=Hi%20Blessenzo%20Holdings" target="_blank" rel="noopener" class="underline text-blue-300">WhatsApp sales</a>`
      );
      setQuick(["Request a quote", "Company details"]);
      return;
    }

    if (/company|about|bee|b-bbee|csd|registration|level 1|credentials/.test(t)) {
      bot(
        `<strong>${c.name}</strong><br>Reg: ${c.regNo}<br>Tax: ${c.taxNo}<br>CSD: ${c.csdNo}<br>${c.beeLevel} · ${c.blackOwnership} Black-owned<br>${c.address.physical}`
      );
      bot("Authorised supply via Tarsus, Pinnacle, Axiz and Mustek.");
      setQuick(["Contact sales", "Request a quote"]);
      return;
    }

    if (/pay|payment|eft|card|bank|payfast/.test(t)) {
      bot("We accept <strong>EFT</strong>. Card payments via PayFast will be available once merchant approval is complete.");
      bot("Bank details appear on quotes and invoices. Card payments may include a 2.5% fee per our terms.");
      setQuick(["Request a quote", "Contact sales"]);
      return;
    }

    if (/deliver|shipping|courier|lead time/.test(t)) {
      bot("Lead times depend on distributor stock and your location. In-stock items are often dispatched a few business days after payment.");
      bot("Include your delivery area on the quote form for an accurate estimate.");
      setQuick(["Request a quote"]);
      return;
    }

    if (/browse|products|catalogue|catalog|shop/.test(t)) {
      bot('Opening the catalogue — or go to <a href="/products" class="underline text-blue-300">Products</a>.');
      setQuick(["Request a quote", "Contact sales"]);
      return;
    }

    // Product search
    try {
      const hits = searchProducts(raw).slice(0, 4);
      if (hits.length) {
        bot(`Found matches — here are top results:`);
        hits.forEach((p) => {
          bot(
            `<strong>${p.brand}</strong> — ${p.name.slice(0, 70)}<br>R${p.price.toLocaleString("en-ZA")} · <a href="/products/${p.id}" class="underline text-blue-300">View</a>`
          );
        });
        setQuick(["Request a quote", "Browse products"]);
        return;
      }
    } catch {
      /* ignore */
    }

    bot("I can help with product searches, quotes, payment, delivery and company credentials.");
    bot(`Try “laptops”, “request a quote”, or WhatsApp ${c.phones.whatsapp}.`);
    setQuick(QUICK_START);
  }

  function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", html: value }]);
    setQuick([]);
    setTimeout(() => reply(value), 300);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        className="fixed bottom-6 right-[5.5rem] z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/40 flex items-center justify-center hover:brightness-110"
        aria-label="Open chat"
      >
        <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-24px))] h-[min(520px,70vh)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-blue-900 font-bold flex items-center justify-center text-sm">B</div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Blessenzo Assistant</div>
              <div className="text-blue-200 text-xs">Sales & support</div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-white/80 text-xl leading-none">
              ×
            </button>
          </div>

          <div ref={bodyRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] px-3 py-2 rounded-xl text-sm leading-snug ${
                  m.role === "bot"
                    ? "bg-slate-800 text-slate-100 rounded-bl-sm"
                    : "bg-blue-600 text-white ml-auto rounded-br-sm"
                }`}
                dangerouslySetInnerHTML={{ __html: m.html }}
              />
            ))}
          </div>

          {quick.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {quick.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-slate-600 text-slate-300 hover:border-blue-400 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 p-3 border-t border-slate-700 bg-slate-950">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about products, quotes…"
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" onClick={() => send()} className="bg-blue-600 text-white text-sm font-semibold px-3 rounded-lg">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
