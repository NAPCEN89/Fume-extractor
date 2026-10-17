import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "233963d2-f4b0-4f25-9a2f-bf7e151ac018";

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Inquiry: ${data.application || data.preferred_product || data.product || 'Website Contact'} — NAPCEN`,
      from_name: data.name || "NAPCEN Lead",
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || data.mobile,
      application: data.application || data.equipment || data.product,
      preferred_product: data.preferred_product || data.collector,
      airflow: data.airflow,
      timeline: data.timeline,
      message: data.desc || data.message,
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      return NextResponse.json({ success: true, message: "Inquiry sent successfully" });
    } else {
      console.error("Web3Forms Response Error:", result);
      return NextResponse.json({ error: result.message || 'Failed to send inquiry' }, { status: 400 });
    }
  } catch (error) {
    console.error("Error sending inquiry:", error);
    return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 });
  }
}

