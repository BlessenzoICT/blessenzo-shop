import crypto from "crypto";
import { company } from "@/data/company";

export type PayFastItem = {
  name: string;
  quantity: number;
  price: number; // incl VAT each
};

export type PayFastOrder = {
  orderId: string;
  items: PayFastItem[];
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  amount: number; // total incl VAT (and optional card surcharge)
  applyCardSurcharge?: boolean;
};

/** Build signature string per PayFast docs (attribute order matters). */
function buildSignature(data: Record<string, string>, passphrase?: string) {
  const params = Object.keys(data)
    .filter((k) => data[k] !== "" && k !== "signature")
    .map((k) => `${k}=${encodeURIComponent(data[k].trim()).replace(/%20/g, "+")}`)
    .join("&");
  const withPass = passphrase
    ? `${params}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : params;
  return crypto.createHash("md5").update(withPass).digest("hex");
}

export function getPayFastHost() {
  return company.payfast.sandbox
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";
}

export function buildPayFastPayment(order: PayFastOrder, siteUrl: string) {
  const pf = company.payfast;
  let amount = order.amount;
  if (order.applyCardSurcharge && company.paymentTerms.cardSurchargePercent) {
    amount = Math.round(amount * (1 + company.paymentTerms.cardSurchargePercent / 100) * 100) / 100;
  }

  const itemName =
    order.items.length === 1
      ? order.items[0].name.slice(0, 100)
      : `Blessenzo order ${order.orderId} (${order.items.length} items)`;

  const data: Record<string, string> = {
    merchant_id: pf.merchantId,
    merchant_key: pf.merchantKey,
    return_url: `${siteUrl}/checkout/success?order=${encodeURIComponent(order.orderId)}`,
    cancel_url: `${siteUrl}/checkout/cancel?order=${encodeURIComponent(order.orderId)}`,
    notify_url: `${siteUrl}/api/payfast/notify`,
    name_first: order.customer.name.split(" ")[0] || order.customer.name,
    name_last: order.customer.name.split(" ").slice(1).join(" ") || "",
    email_address: order.customer.email,
    cell_number: (order.customer.phone || "").replace(/\s/g, ""),
    m_payment_id: order.orderId,
    amount: amount.toFixed(2),
    item_name: itemName,
    item_description: order.items.map((i) => `${i.quantity}x ${i.name}`).join("; ").slice(0, 255),
  };

  const signature = buildSignature(data, pf.passphrase);
  return { action: getPayFastHost(), fields: { ...data, signature }, amount };
}

/** Verify ITN signature from PayFast. */
export function verifyPayFastSignature(payload: Record<string, string>) {
  const received = payload.signature || "";
  const { signature: _s, ...rest } = payload;
  const expected = buildSignature(rest, company.payfast.passphrase);
  return received.toLowerCase() === expected.toLowerCase();
}
