// src/pages/ProductToCartPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductToCartPage() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = sessionStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const goToCheckout = () => {
    // store is already synced to sessionStorage; also pass state for immediate navigation
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cart Demo</h1>

      {/* Sample Products */}
      <div className="flex gap-4">
        <button
          onClick={() => addToCart({ id: 1, name: "Pro License", price: 49 })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Pro License
        </button>
        <button
          onClick={() => addToCart({ id: 2, name: "Enterprise License", price: 99 })}
          className="px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          Add Enterprise License
        </button>
      </div>

      {/* Cart List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {cart.map((item, i) => (
              <li key={`${item.id}-${i}`} className="flex justify-between items-center">
                <span>
                  {item.name} — ${Number(item.price).toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => removeFromCart(i)}
                    className="text-sm px-2 py-1 border rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      {cart.length > 0 && (
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={goToCheckout}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold"
          >
            Go to Checkout
          </button>

          <button
            type="button"
            onClick={clearCart}
            className="px-4 py-2 border rounded-md"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}