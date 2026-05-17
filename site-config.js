/**
 * Ticket Verse — payment & merchant config (safe to commit; no secret keys here)
 *
 * PayPal JavaScript SDK uses a *Client ID* (public). Get yours at:
 * https://developer.paypal.com/dashboard/applications/sandbox (test) or Production.
 *
 * Link the PayPal Business account that receives funds: sahil790a@gmail.com
 * in the same developer app (Log in with that account or add as facilitator).
 */
// Set your PayPal REST Client ID here (Sandbox or Live).
// This is public and safe to ship.
window.TV_PAYPAL_CLIENT_ID =
  window.TV_PAYPAL_CLIENT_ID || 'Af-RQ4HslRsbFqNeXGsAb1Evz_1_fIfX-ogXQTEfgS96cZRJQNZRaK4rbDKwTYvwWGcu5foLQL495qSs';

/** Shown on checkout for support / receipts */
window.TV_MERCHANT_EMAIL = 'sahil790a@gmail.com';

/**
 * PayPal currency for checkout.
 * - Prefer 'INR' if your PayPal account supports it.
 * - Your console shows CURRENCY_NOT_SUPPORTED for INR → defaulting to USD.
 */
window.TV_PAYPAL_CURRENCY = window.TV_PAYPAL_CURRENCY || 'USD';

/**
 * FX rate used only for displaying/charging when currency != INR.
 * Update anytime (no backend here).
 */
window.TV_FX_INR_PER_USD = window.TV_FX_INR_PER_USD || 83;

/**
 * Razorpay public Key ID (safe to ship).
 * Get it from Razorpay Dashboard → Account & Settings → API Keys.
 */
window.TV_RAZORPAY_KEY_ID = window.TV_RAZORPAY_KEY_ID || 'PASTE_YOUR_RAZORPAY_KEY_ID_HERE';
