"use client";

import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
    console.log("Rendering CheckoutButton");
  const cart = useCartStore((s) => s.cart);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  const checkout = async () => {
    const res = await fetch("/api/payment/phonepe-dummy/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        totalPrice,
        userId: "guest",
      }),
    });

    const data = await res.json();

    const confirmPay = confirm(
      "Dummy PhonePe Payment\n\nClick OK = Success\nClick Cancel = Fail"
    );

    if (!confirmPay) {
      alert("Payment Cancelled ❌");
      return;
    }

    await fetch("/api/payment/phonepe-dummy/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txnId: data.txnId }),
    });

    clearCart();

    router.push(`/order-success?txn=${data.txnId}`);
  };

  return <button onClick={checkout}>Pay with PhonePe (Dummy)</button>;
}