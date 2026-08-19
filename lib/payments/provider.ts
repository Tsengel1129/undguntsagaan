/* Payment provider seam for the paid archive (Phase 5).

   Provider-agnostic on purpose: wiring QPay or SocialPay later means writing
   ONE concrete implementation of PaymentProvider + setting env keys — no page
   or API changes. Until a merchant account is configured, getPaymentProvider()
   returns null and the UI shows an honest "payment not connected yet" state
   (never a fake checkout). */

export type Invoice = {
  invoiceId: string;
  amount: number;
  /** Hosted checkout URL / deep-link the buyer is sent to. */
  checkoutUrl?: string;
  /** QR payload (QPay) shown as a code for banking apps. */
  qrText?: string;
};

export type PaymentProvider = {
  readonly name: string;
  createInvoice(input: {
    amount: number;
    description: string;
    /** Our reference, echoed back on callback — e.g. `issue:<slug>`. */
    reference: string;
  }): Promise<Invoice>;
  /** Confirm a webhook/callback: was this invoice actually paid? */
  verifyPayment(invoiceId: string): Promise<{ paid: boolean; reference?: string }>;
};

/** True once a real merchant account is configured via env. */
export function isPaymentConfigured(): boolean {
  const qpay =
    !!process.env.QPAY_USERNAME &&
    !!process.env.QPAY_PASSWORD &&
    !!process.env.QPAY_INVOICE_CODE;
  const socialpay =
    !!process.env.SOCIALPAY_MERCHANT && !!process.env.SOCIALPAY_KEY;
  return qpay || socialpay;
}

/** The active provider, or null when no keys are set. Implement a concrete
   provider (e.g. lib/payments/qpay.ts) and return it here once keys exist. */
export function getPaymentProvider(): PaymentProvider | null {
  if (!isPaymentConfigured()) return null;
  // TODO(Phase 5b): return new QpayProvider() once QPAY_* keys are provisioned.
  return null;
}
