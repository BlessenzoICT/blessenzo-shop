"use client";

import {
  DocumentData,
  calcLine,
  calcTotals,
  docTitle,
  formatZAR,
  company,
} from "./documents";

/** Dynamically import jspdf so build still works if not installed yet. */
export async function downloadDocumentPdf(doc: DocumentData) {
  const { jsPDF } = await import("jspdf");
  // @ts-expect-error optional peer
  await import("jspdf-autotable");

  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  let y = 14;

  const title = docTitle(doc.type);
  const totals = calcTotals(doc.lines, doc.deliveryIncl || 0);

  // Header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text(company.name, 14, y);
  pdf.setFontSize(14);
  pdf.text(title, pageW - 14, y, { align: "right" });
  y += 7;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(80);
  const leftMeta = [
    `Reg: ${company.regNo}`,
    `Tax: ${company.taxNo}`,
    `CSD: ${company.csdNo}`,
    company.address.physical,
    `Tel: ${company.phones.tel}`,
    `WhatsApp: ${company.phones.whatsapp}`,
    company.emails.sales,
    company.website,
  ];
  leftMeta.forEach((line) => {
    pdf.text(line, 14, y);
    y += 4;
  });

  let yR = 21;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(0);
  pdf.text(`${title} No: ${doc.number}`, pageW - 14, yR, { align: "right" });
  yR += 5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(`Date: ${doc.date}`, pageW - 14, yR, { align: "right" });
  yR += 5;
  if (doc.type === "quote") {
    pdf.text(`Valid for ${company.paymentTerms.quoteValidityDays} days`, pageW - 14, yR, { align: "right" });
  }
  if (doc.customer.orderNo) {
    yR += 5;
    pdf.text(`Order / Bid: ${doc.customer.orderNo}`, pageW - 14, yR, { align: "right" });
  }

  y = Math.max(y, yR) + 6;

  // Customer block
  pdf.setDrawColor(200);
  pdf.line(14, y, pageW - 14, y);
  y += 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(0);
  pdf.text("Bill to / Attention", 14, y);
  y += 5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  const custLines = [
    doc.customer.company || doc.customer.name,
    doc.customer.attention ? `Att: ${doc.customer.attention}` : "",
    doc.customer.name && doc.customer.company ? doc.customer.name : "",
    doc.customer.email || "",
    doc.customer.phone || "",
    doc.customer.address || "",
    doc.customer.vatNumber ? `VAT: ${doc.customer.vatNumber}` : "",
  ].filter(Boolean);
  custLines.forEach((l) => {
    pdf.text(String(l), 14, y);
    y += 4;
  });
  y += 4;

  // Table
  const body = doc.lines.map((line) => {
    const { totalIncl, totalExcl } = calcLine(line);
    return [
      line.sku,
      line.description.slice(0, 60),
      String(line.quantity),
      formatZAR(line.unitPriceIncl),
      formatZAR(totalExcl),
      formatZAR(totalIncl),
    ];
  });

  if ((doc.deliveryIncl || 0) > 0) {
    const delIncl = doc.deliveryIncl || 0;
    const delExcl = Math.round((delIncl / 1.15) * 100) / 100;
    body.push(["", "DELIVERY", "1", formatZAR(delIncl), formatZAR(delExcl), formatZAR(delIncl)]);
  }

  // @ts-expect-error autotable augments jsPDF
  pdf.autoTable({
    startY: y,
    head: [["Code", "Description", "Qty", "Unit (incl)", "Total excl", "Total incl"]],
    body,
    styles: { fontSize: 7, cellPadding: 1.5 },
    headStyles: { fillColor: [30, 58, 138], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 28 },
      2: { cellWidth: 12, halign: "right" },
      3: { cellWidth: 26, halign: "right" },
      4: { cellWidth: 26, halign: "right" },
      5: { cellWidth: 26, halign: "right" },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-expect-error
  y = pdf.lastAutoTable.finalY + 8;

  // Totals
  pdf.setFontSize(9);
  const right = pageW - 14;
  const labelX = right - 55;
  pdf.setFont("helvetica", "normal");
  pdf.text("Total excl. VAT:", labelX, y);
  pdf.text(formatZAR(totals.totalExcl), right, y, { align: "right" });
  y += 5;
  pdf.text("VAT (15%):", labelX, y);
  pdf.text(formatZAR(totals.vat), right, y, { align: "right" });
  y += 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("Total incl. VAT:", labelX, y);
  pdf.text(formatZAR(totals.totalIncl), right, y, { align: "right" });
  y += 10;

  // Banking
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("Banking details", 14, y);
  y += 5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  company.banking.forEach((b) => {
    pdf.text(
      `${b.bank}: ${b.accountName} · Acc ${b.accountNumber} · Branch ${b.branchCode} · SWIFT ${b.swift}`,
      14,
      y
    );
    y += 4;
  });
  y += 4;

  // Terms
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text("Payment terms", 14, y);
  y += 4;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  const terms = [
    company.paymentTerms.due,
    company.paymentTerms.methods,
    company.paymentTerms.latePenalty,
  ];
  if (doc.type === "quote") {
    terms.unshift(`This quotation is valid for ${company.paymentTerms.quoteValidityDays} days.`);
  }
  terms.forEach((t) => {
    const lines = pdf.splitTextToSize(t, pageW - 28);
    pdf.text(lines, 14, y);
    y += lines.length * 3.5 + 1;
  });

  if (doc.notes) {
    y += 3;
    pdf.setFont("helvetica", "italic");
    pdf.text(doc.notes, 14, y);
  }

  // Footer
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(120);
  pdf.text(
    `${company.name} · ${company.tagline} · Sales: ${company.salesPerson}`,
    pageW / 2,
    287,
    { align: "center" }
  );

  const filename = `${doc.type}-${doc.number}.pdf`;
  pdf.save(filename);
}
