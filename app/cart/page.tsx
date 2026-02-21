"use client";

import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  console.log("Cart page rendered");  
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (cart.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div>
      <h1>Cart Page</h1>

      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.qty}</p>

          <button onClick={() => increaseQty(item.id)}>+</button>
          <button onClick={() => decreaseQty(item.id)}>-</button>
          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>

          <hr />
        </div>
      ))}

      <h2>Total Price: {totalPrice}</h2>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}