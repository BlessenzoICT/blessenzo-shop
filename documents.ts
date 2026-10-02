import { company } from "@/data/company";

export type DocLine = {
  sku: string;
  description: string;
  quantity: number;
  unitPriceIncl: number; // VAT inclusive unit price
};

export type DocType = "quote" | "proforma" | "invoice";

export type DocumentData = {
  type: DocType;
  number: string;
  date: string; // ISO or display
  customer: {
    company?: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    attention?: string;
    orderNo?: string;
    vatNumber?: string;
  };
  lines: DocLine[];
  deliveryIncl?: number; // incl VAT
  notes?: string;
};

const VAT_RATE = 0.15;

export function calcLine(line: DocLine) {
  const totalIncl = round2(line.unitPriceIncl * line.quantity);
  const totalExcl = round2(totalIncl / (1 + VAT_RATE));
  return { totalIncl, totalExcl };
}

export function calcTotals(lines: DocLine[], deliveryIncl = 0) {
  let subExcl = 0;
  let subIncl = 0;
  for (const line of lines) {
    const { totalIncl, totalExcl } = calcLine(line);
    subIncl += totalIncl;
    subExcl += totalExcl;
  }
  const delIncl = round2(deliveryIncl);
  const delExcl = round2(delIncl / (1 + VAT_RATE));
  const totalExcl = round2(subExcl + delExcl);
  const totalIncl = round2(subIncl + delIncl);
  const vat = round2(totalIncl - totalExcl);
  return { subExcl, subIncl, delExcl, delIncl, totalExcl, totalIncl, vat };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function formatZAR(n: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(n);
}

export function nextDocNumber(type: DocType): string {
  if (typeof window === "undefined") {
    return `${prefix(type)}-${Date.now().toString(36).toUpperCase()}`;
  }
  const key = `blessenzo-docseq-${type}`;
  const year = new Date().getFullYear();
  const raw = localStorage.getItem(key);
  let seq = 1;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.year === year) seq = (parsed.seq || 0) + 1;
    } catch {}
  }
  localStorage.setItem(key, JSON.stringify({ year, seq }));
  return `${prefix(type)}-${year}-${String(seq).padStart(4, "0")}`;
}

function prefix(type: DocType) {
  if (type === "quote") return "Q";
  if (type === "proforma") return "PF";
  return "INV";
}

export function docTitle(type: DocType) {
  if (type === "quote") return "Quotation";
  if (type === "proforma") return "Pro-forma Invoice";
  return "Tax Invoice";
}

export { company, VAT_RATE };
