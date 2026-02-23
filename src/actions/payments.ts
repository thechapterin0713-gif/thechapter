"use server";

import { stripe, PLANS } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSession(
  plan: "basic" | "pro",
  userEmail: string,
  userId: string
) {
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: userEmail,
    line_items: [
      {
        price: PLANS[plan].priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
    metadata: {
      userId,
      plan,
    },
  });

  redirect(checkoutSession.url!);
}
