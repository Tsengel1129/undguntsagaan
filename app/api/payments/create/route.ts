import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/provider";
import { getIssue } from "@/lib/firebase/queries";

/* Create a payment invoice for one archive issue. Until a merchant account is
   configured (QPAY_* / SOCIALPAY_* env), the provider is null and this returns
   501 with a Mongolian message the UI shows — no fake checkout. */
export async function POST(request: Request) {
  const provider = getPaymentProvider();
  if (!provider) {
    return NextResponse.json(
      { ok: false, error: "Төлбөрийн систем хараахан холбогдоогүй байна." },
      { status: 501 }
    );
  }

  let slug: string | undefined;
  try {
    ({ slug } = await request.json());
  } catch {
    /* fall through */
  }
  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "slug шаардлагатай" },
      { status: 400 }
    );
  }

  const issue = await getIssue(slug);
  if (!issue || !issue.price || issue.price <= 0) {
    return NextResponse.json(
      { ok: false, error: "Дугаар олдсонгүй эсвэл үнэгүй" },
      { status: 404 }
    );
  }

  const invoice = await provider.createInvoice({
    amount: issue.price,
    description: `${issue.title} — архивын дугаар`,
    reference: `issue:${slug}`,
  });
  return NextResponse.json({ ok: true, invoice });
}
