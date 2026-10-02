import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions, refund, cancellation and delivery policy for Blessenzo Holdings ICT equipment and services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms &amp; Conditions</h1>
      <p className="text-slate-600 text-sm mb-8">
        Blessenzo Holdings (Pty) Ltd · Reg {company.regNo} · Last updated: October 2026
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">1. About us</h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          Blessenzo Holdings (Pty) Ltd supplies ICT equipment and related services to businesses,
          government and individual customers in South Africa. We source genuine products via
          authorised distributors including Tarsus Distribution, Pinnacle Micro, Axiz and Mustek.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Contact: {company.phones.tel} · {company.emails.sales} ·{" "}
          {company.address.physical}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Orders and quotations</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-2">
          <li>Prices on the website are in South African Rand (ZAR) and include VAT unless stated otherwise.</li>
          <li>Quotations are valid for the period stated on the quote (typically 7 days) unless withdrawn earlier due to supplier price or stock changes.</li>
          <li>An order is accepted when we confirm it in writing or when payment is received, whichever occurs first for online card payments.</li>
          <li>Stock availability is subject to our distributors. Lead times will be communicated where items are not immediately available.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Payment</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-2">
          <li>Online card payments are processed securely via PayFast.</li>
          <li>Electronic funds transfer (EFT) is accepted to our nominated bank account. Goods may be released after funds reflect.</li>
          <li>B2B customers may request a formal quote, pro-forma invoice or tax invoice.</li>
        </ul>
      </section>

      <section className="mb-10" id="delivery">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Delivery policy</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-2">
          <li>We arrange delivery within South Africa via reputable couriers or, where agreed, customer collection.</li>
          <li>Delivery timeframes depend on stock location (distributor warehouse) and destination. Estimated times are given at checkout or on the quote and are not guaranteed delivery dates.</li>
          <li>Risk in the goods passes to the customer on delivery to the address supplied or on collection.</li>
          <li>Please ensure someone is available to receive and check parcels. Report visible damage on the delivery note immediately and notify us within 48 hours with photos.</li>
          <li>Incorrect delivery details supplied by the customer may result in additional courier charges.</li>
        </ul>
      </section>

      <section className="mb-10" id="cancellation">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Cancellation policy</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-2">
          <li>
            <strong>Before dispatch:</strong> You may cancel an order by contacting{" "}
            {company.emails.sales} or {company.phones.tel}. If payment has been made, we will refund
            according to the refund policy below.
          </li>
          <li>
            <strong>After dispatch:</strong> Cancellation is not available once goods have left our
            or the distributor’s warehouse. You may refuse delivery and return the goods under the
            return conditions, subject to restocking fees where applicable.
          </li>
          <li>
            <strong>Custom / indent orders:</strong> Orders placed specifically for you with a
            supplier (non-stock) cannot be cancelled once the supplier has accepted the order,
            unless the supplier agrees.
          </li>
          <li>
            We may cancel an order if stock cannot be supplied, payment fails, or fraud is
            suspected. In such cases any payment received will be refunded.
          </li>
        </ul>
      </section>

      <section className="mb-10" id="refund">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Refund and returns policy</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-2">
          <li>
            <strong>Cooling-off (where applicable):</strong> For qualifying electronic transactions
            under the Electronic Communications and Transactions Act, a consumer may cancel within
            seven (7) days of receipt of goods, subject to statutory exceptions (e.g. sealed
            software, personalised goods).
          </li>
          <li>
            <strong>Faulty or dead-on-arrival goods:</strong> Contact us within seven (7) days of
            delivery. We will arrange repair, replacement or refund in line with the manufacturer
            warranty and the Consumer Protection Act where it applies.
          </li>
          <li>
            <strong>Change of mind:</strong> Unopened goods in original packaging may be considered
            for return within seven (7) days at our discretion. A restocking fee of up to 15% may
            apply. Opened, used or incomplete items are not eligible for change-of-mind returns.
          </li>
          <li>
            <strong>Refund method:</strong> Approved refunds are processed to the original payment
            method (PayFast card refund or EFT) within 7–14 business days after we receive and
            inspect returned goods.
          </li>
          <li>
            Return shipping for change-of-mind returns is for the customer’s account unless we
            agree otherwise. Faulty goods: we will advise the return process.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Warranties</h2>
        <p className="text-slate-700 leading-relaxed">
          Hardware carries the manufacturer’s warranty as applicable. Software licences follow the
          publisher’s terms. We will assist with warranty claims through the relevant distributor
          or OEM channel. Warranty does not cover damage from misuse, unauthorised modification,
          power surges outside product specification, or normal wear and tear.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Limitation of liability</h2>
        <p className="text-slate-700 leading-relaxed">
          To the extent permitted by South African law, our liability is limited to the value of
          the goods or services supplied under the relevant order. We are not liable for indirect
          or consequential loss, including loss of profit or data, except where the law does not
          allow such exclusion.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Privacy</h2>
        <p className="text-slate-700 leading-relaxed">
          Personal information is processed in accordance with POPIA for order fulfilment, support
          and legal compliance. We do not sell your data. Contact {company.emails.admin} for
          privacy requests.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Governing law</h2>
        <p className="text-slate-700 leading-relaxed">
          These terms are governed by the laws of the Republic of South Africa. Courts of South
          Africa have jurisdiction.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contact</h2>
        <p className="text-slate-700 leading-relaxed">
          Questions about these terms, deliveries, cancellations or refunds:
          <br />
          Email: {company.emails.sales} / {company.emails.support}
          <br />
          Tel: {company.phones.tel}
          <br />
          WhatsApp: {company.phones.whatsapp}
        </p>
      </section>
    </div>
  );
}
