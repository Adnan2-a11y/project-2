// src/pages/CheckoutPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialCart = React.useMemo(() => {
    if (location.state && Array.isArray(location.state.cart)) return location.state.cart;
    try {
      const stored = sessionStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }, [location.state]);

  const [cart, setCart] = React.useState(initialCart);

  React.useEffect(() => {
    if (location.state && Array.isArray(location.state.cart)) {
      try {
        sessionStorage.setItem("cart", JSON.stringify(location.state.cart));
      } catch (e) {}
    }
  }, [location.state]);

  const removeItem = (idx) => {
    const next = cart.filter((_, i) => i !== idx);
    setCart(next);
    try {
      sessionStorage.setItem("cart", JSON.stringify(next));
    } catch (e) {}
  };

  const clearCart = () => {
    setCart([]);
    try {
      sessionStorage.removeItem("cart");
    } catch (e) {}
  };

  const subtotal = cart.reduce((s, it) => s + (Number(it.price) || 0), 0);
  const tax = +((subtotal * 0.1).toFixed(2)); // demo 10%
  const total = +(subtotal + tax).toFixed(2);

  const placeOrder = () => {
    alert("Order placed! Thank you for your purchase.");
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <div className="p-6 border rounded-md bg-white">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md"
            >
              Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Go to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border rounded-md p-4 bg-white">
            <h2 className="text-xl font-semibold mb-3">Items</h2>
            <ul className="divide-y">
              {cart.map((item, i) => (
                <li key={`${item.id ?? 'item'}-${i}`} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.description && <div className="text-sm text-gray-500">{item.description}</div>}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold">${Number(item.price).toFixed(2)}</div>
                    <button
                      onClick={() => removeItem(i)}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-md p-4 bg-white">
            <h2 className="text-lg font-semibold mb-3">Summary</h2>
            <div className="flex justify-between py-1"> <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span> </div>
            <div className="flex justify-between py-1"> <span>Tax (10%)</span> <span>${tax.toFixed(2)}</span> </div>
            <div className="flex justify-between py-2 border-t mt-2 font-bold"> <span>Total</span> <span>${total.toFixed(2)}</span> </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={placeOrder}
                className="px-5 py-2 bg-green-600 text-white rounded-md font-semibold"
              >
                Place Order
              </button>

              <button
                onClick={() => { clearCart(); }}
                className="px-4 py-2 border rounded-md"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}