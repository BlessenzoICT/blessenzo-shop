import { NextRequest, NextResponse } from "next/server";
import { verifyPayFastSignature } from "@/lib/payfast";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const payload: Record<string, string> = {};
    form.forEach((v, k) => {
      payload[k] = String(v);
    });

    if (!verifyPayFastSignature(payload)) {
      console.error("PayFast ITN: invalid signature", payload.m_payment_id);
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const status = payload.payment_status;
    const orderId = payload.m_payment_id;
    const amount = payload.amount_gross;
    const pfPaymentId = payload.pf_payment_id;

    console.log("PayFast ITN", { status, orderId, amount, pfPaymentId });

    return new NextResponse("OK", { status: 200 });
  } catch (e) {
    console.error("PayFast ITN error", e);
    return new NextResponse("Error", { status: 500 });
  }
}
