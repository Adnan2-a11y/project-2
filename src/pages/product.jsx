import { useState, useMemo, useRef, useEffect } from "react";
import { Grid, List, ArrowLeft, Trash, ShoppingCart } from "lucide-react";

const products = [
  { id: 1, title: "Microsoft Windows 11 Pro", img: "/images/windows11-pro.png", price: 12.99 },
  { id: 2, title: "Microsoft Office 2021 Professional", img: "/images/office-2021.png", price: 24.99 },
  { id: 3, title: "Microsoft Windows 10 Home", img: "/images/windows10-home.png", price: 8.99 },
  { id: 4, title: "Microsoft Project Professional 2021", img: "/images/project-2021.png", price: 29.99 },
  { id: 5, title: "Microsoft Visio Professional 2021", img: "/images/visio-2021.png", price: 27.99 },
  { id: 6, title: "Microsoft Windows Server 2022 Standard", img: "/images/server-2022.png", price: 39.99 },
  { id: 7, title: "Microsoft 365 Personal (1 Year)", img: "/images/office-365-personal.png", price: 49.99 },
  { id: 8, title: "Microsoft 365 Family (1 Year)", img: "/images/office-365-family.png", price: 69.99 },
];

export default function ProductPage() {
  // route: "products" | "cart"
  const [route, setRoute] = useState("products");
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [cart, setCart] = useState([]);

  // for visual container (cart box) and accessible icon
  const cartBoxRef = useRef(null);
  const cartIconRef = useRef(null);

  // small UI flags
  const [isAnimating, setIsAnimating] = useState(false);

  // preview thumbnails that briefly slide into the cart icon after fly animation
  const [previewItems, setPreviewItems] = useState([]);

  const addToCart = (product, eventOrEl) => {
    // update cart state immediately so badge updates
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });

    // run visual fly animation to the cart icon (no navigation)
    animateToCart(eventOrEl, product);

    // small pulse on cart icon
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 420);
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const subtotal = useMemo(() => cart.reduce((s, p) => s + p.price * p.qty, 0), [cart]);

  // Animate a flying image from click position (or element) to the cart icon
  const animateToCart = (eventOrRect, product) => {
    // compute start coordinates
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if (!eventOrRect) {
      startX = window.innerWidth / 2;
      startY = window.innerHeight / 2;
    } else if (eventOrRect.clientX !== undefined && eventOrRect.clientY !== undefined) {
      // event
      startX = eventOrRect.clientX;
      startY = eventOrRect.clientY;
    } else if (eventOrRect.getBoundingClientRect) {
      const r = eventOrRect.getBoundingClientRect();
      startX = r.left + r.width / 2;
      startY = r.top + r.height / 2;
    }

    // target: cart icon center
    const cartEl = cartBoxRef.current;
    if (!cartEl) return; // no animation if no cart box
    const rect = cartEl.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    // create flying image
    const flyImg = document.createElement('img');
    flyImg.src = product.img;
    flyImg.alt = product.title;
    flyImg.style.position = 'fixed';
    flyImg.style.left = `${startX - 48}px`;
    flyImg.style.top = `${startY - 48}px`;
    flyImg.style.width = '96px';
    flyImg.style.height = '96px';
    flyImg.style.objectFit = 'contain';
    flyImg.style.borderRadius = '12px';
    flyImg.style.zIndex = 9999;
    flyImg.style.pointerEvents = 'none';
    flyImg.style.transition = 'transform 520ms cubic-bezier(.18,.9,.35,1), left 520ms cubic-bezier(.18,.9,.35,1), top 520ms cubic-bezier(.18,.9,.35,1), opacity 420ms ease';
    flyImg.style.boxShadow = '0 30px 60px rgba(2,6,23,0.18)';

    document.body.appendChild(flyImg);

    // compute deltas (we'll use transform for smoothness)
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;

    // start animation on next frame
    requestAnimationFrame(() => {
      flyImg.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.18) rotate(-8deg)`;
      flyImg.style.opacity = '0.06';
    });

    const onEnd = () => {
      // small "land" preview inside cart: add a transient preview item that slides in
      const uid = Math.random().toString(36).slice(2, 9);
      setPreviewItems((prev) => [...prev, { uid, img: product.img, title: product.title }]);

      // remove the flying image
      if (flyImg && flyImg.parentNode) flyImg.parentNode.removeChild(flyImg);

      // remove preview after short time
      setTimeout(() => {
        setPreviewItems((prev) => prev.filter((p) => p.uid !== uid));
      }, 900);

      // small pulse on the cart icon
      try {
        const el = cartEl.querySelector('.cart-icon-btn');
        if (el) {
          el.classList.add('cart-pulse');
          setTimeout(() => el.classList.remove('cart-pulse'), 420);
        }
      } catch (e) {}
    };

    flyImg.addEventListener('transitionend', onEnd, { once: true });

    // safety cleanup
    setTimeout(() => {
      if (flyImg && flyImg.parentNode) {
        try { flyImg.parentNode.removeChild(flyImg); } catch {}
      }
      // ensure previews clear if something failed
      setTimeout(() => setPreviewItems([]), 800);
    }, 1400);
  };

  // If user clicks the cart icon, go to cart page
  const onCartClick = () => setRoute('cart');

  // keyboard shortcut still present
  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'c' && (ev.ctrlKey === false && ev.metaKey === false)) {
        setRoute('cart');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="page-root min-h-screen w-full transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <style>{`
        .page-root {
          --surface: #ffffff;
          --muted: #6b7280;
          --card-border: rgba(15,23,42,0.06);
          --accent-soft: rgba(59,130,246,0.08);
          --btn-gradient-from: #3b82f6;
          --btn-gradient-to: #8b5cf6;
          --bg-color: #f8fafc;
          --text-color: #0f172a;
          --cart-bg: linear-gradient(180deg,#fff,#f3f4f6);
          --cart-fg: #0f172a;
          --cart-border: rgba(15,23,42,0.06);
        }
        .dark .page-root {
          --surface: rgba(17,24,39,0.48);
          --muted: #9aa8bd;
          --card-border: rgba(255,255,255,0.04);
          --accent-soft: rgba(99,102,241,0.06);
          --btn-gradient-from: #4f46e5;
          --btn-gradient-to: #06b6d4;
          --bg-color: #0b1220;
          --text-color: #e6eef8;
          --cart-bg: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
          --cart-fg: #e6eef8;
          --cart-border: rgba(255,255,255,0.06);
        }

        .page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .breadcrumb { color: var(--muted); font-size: 0.95rem; }
        .page-title { line-height: 1; margin-bottom: 16px; }

        .controls { display: flex; flex-direction: column; gap: 12px; }
        @media (min-width: 640px) { .controls { flex-direction: row; align-items: center; justify-content: space-between; } }

        select.theme-select { background: var(--surface); color: inherit; border: 1px solid var(--card-border); padding: 8px 10px; border-radius: 8px; font-size: 0.95rem; }

        .view-toggle button { padding: 10px; border-radius: 10px; border: 1px solid var(--card-border); display: inline-flex; align-items: center; justify-content: center; }
        .view-toggle button.active { background: linear-gradient(90deg, var(--btn-gradient-from), var(--btn-gradient-to)); color: #fff; border-color: transparent; }

        /* Modern product card */
        .product-card { position: relative; background: linear-gradient(180deg, rgba(255,255,255,1), rgba(250,250,252,1)); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: transform .22s ease, box-shadow .22s ease, background .22s ease; box-shadow: 0 10px 30px rgba(2,6,23,0.06), 0 2px 6px rgba(2,6,23,0.04); border: 1px solid transparent; }
        .dark .product-card { background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)); box-shadow: 0 10px 30px rgba(2,6,23,0.12), 0 3px 8px rgba(2,6,23,0.08); }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(2,6,23,0.10); }

        /* Top gradient border (implemented as a pseudo-element) */
        .product-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 6px; /* thickness of the top gradient */
          width: 100%;
          background: linear-gradient(90deg, var(--btn-gradient-from), var(--btn-gradient-to));
          z-index: 0;
          box-shadow: inset 0 -6px 10px rgba(0,0,0,0.04);
        }

        /* ensure inner content sits above the top stripe */
        .product-card > * { position: relative; z-index: 1; }

        /* subtle darker side/bottom shadow for depth (keeps it soft and consistent in both modes) */
        .product-card::after {
          content: '';
          position: absolute;
          left: 6px;
          right: 6px;
          top: 6px;
          bottom: 6px;
          border-radius: 10px;
          pointer-events: none;
          box-shadow: 0 8px 18px rgba(2,6,23,0.06);
          z-index: -1;
        }
        .dark .product-card::after { box-shadow: 0 12px 28px rgba(2,6,23,0.12); }

        .prod-image-wrap { padding: 18px; display: flex; align-items: center; justify-content: center; background: linear-gradient(180deg, rgba(99,102,241,0.03), rgba(59,130,246,0.02)); }
        .dark .prod-image-wrap { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); }

        .price-tag {
          position: absolute;
          right: 14px;
          top: 14px;
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 800;
          background: linear-gradient(90deg,var(--btn-gradient-from),var(--btn-gradient-to));
          color: white;
          box-shadow: 0 6px 20px rgba(59,130,246,0.18);
          font-size: 0.95rem;
        }

        .product-meta { color: var(--muted); font-size: 0.92rem; }

        .card-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; position: relative; }

        .add-btn { display: inline-flex; align-items:center; gap:10px; padding: 10px 16px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; background: linear-gradient(90deg, var(--btn-gradient-from), var(--btn-gradient-to)); color: #fff; border: none; cursor: pointer; transition: transform .12s ease, box-shadow .12s ease; box-shadow: 0 10px 26px rgba(59,130,246,0.14); }
        .add-btn:active { transform: translateY(1px); }

        .product-title { font-size: 1rem; font-weight: 800; color: var(--text-color); }
        .product-sub { font-size: 0.88rem; color: var(--muted); }

        /* Floating cart icon (replaces cart box) */
        .cart-icon-wrapper {
          position: fixed;
          right: 18px;
          top: 84px;
          z-index: 1200;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-icon-btn {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, var(--btn-gradient-from), var(--btn-gradient-to));
          color: #fff;
          box-shadow: 0 18px 40px rgba(59,130,246,0.16);
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
        }

        .cart-icon-btn .icon { width: 22px; height: 22px; }

        .cart-badge { position: absolute; right: -6px; top: -6px; min-width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; border-radius:999px; font-weight:800; color:#fff; background: #111827; padding: 0 7px; box-shadow: 0 8px 18px rgba(2,6,23,0.18); }

        .cart-previews { position: absolute; right: 0; top: 76px; width: 260px; padding: 10px; border-radius: 12px; background: var(--surface); box-shadow: 0 16px 40px rgba(2,6,23,0.08); border: 1px solid var(--card-border); display:flex; gap:8px; align-items:center; overflow:hidden; }
        .preview-thumb { width:48px; height:48px; border-radius:8px; overflow:hidden; box-shadow: 0 8px 20px rgba(2,6,23,0.06); transform: translateY(12px); opacity:0; transition: transform 320ms cubic-bezier(.18,.9,.35,1), opacity 320ms ease; }
        .preview-thumb.show { transform: translateY(0); opacity:1; }

        .cart-pulse { animation: cartPulse 420ms cubic-bezier(.18,.9,.35,1); }
        @keyframes cartPulse { 0% { transform: translateY(0) scale(1); } 50% { transform: translateY(-6px) scale(1.06); } 100% { transform: translateY(-2px) scale(1.02); } }

        /* Cart content in full page - unchanged layout classes kept */
        .cart-root { padding: 22px 0; }
        .cart-top { display:flex; align-items:center; gap:12px; margin-bottom:18px; }
        .cart-items { display:flex; flex-direction:column; gap:18px; }
        .cart-item { width:100%; display:flex; gap:18px; background:var(--surface); border:1px solid var(--card-border); border-radius:14px; padding:18px; align-items:center; }
        .cart-item .thumb { width: 260px; height: 160px; flex:0 0 260px; display:flex; align-items:center; justify-content:center; }

        @media (max-width: 900px) { .cart-icon-wrapper { right: 12px; top: 72px; } }
        @media (max-width: 520px) { .cart-icon-wrapper { right: 10px; top: 64px; } .cart-previews { display:none; }
        }
      `}</style>

      {/* Floating cart icon (replaces the cart box). It keeps ref for animations and accessibility. */}
      <div ref={cartBoxRef} className="cart-icon-wrapper" role="region" aria-label={`Cart (${cart.reduce((s,p)=>s+p.qty,0)})`}>
        <button ref={cartIconRef} className={`cart-icon-btn`} onClick={onCartClick} aria-label={`Open cart (${cart.reduce((s,p)=>s+p.qty,0)})`}>
          <ShoppingCart className="icon" />
        </button>

        <div style={{ position: 'absolute', right: -6, top: -6 }} aria-hidden>
          {cart.reduce((s, p) => s + p.qty, 0) > 0 && (
            <div className="cart-badge">{cart.reduce((s, p) => s + p.qty, 0)}</div>
          )}
        </div>

        {/* transient previews that appear under the icon when items fly in */}
        {previewItems.length > 0 && (
          <div className="cart-previews" onClick={(e)=>e.stopPropagation()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700 }}>Recently added</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{previewItems[previewItems.length-1].title}</div>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              {previewItems.map((p) => (
                <div key={p.uid} className={`preview-thumb show`} title={p.title}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="page-container py-10">
        {route === 'products' && (
          <>
            <div className="breadcrumb mb-4">Home &gt; Microsoft &gt; <span style={{ color: 'var(--text-color)', fontWeight: 600 }}>Windows 11</span></div>

            <div className="mb-6">
              <h1 className="page-title text-4xl sm:text-5xl font-extrabold" style={{ color: 'var(--text-color)' }}>
                <span style={{ background: 'linear-gradient(90deg,#60a5fa,#8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Windows 11</span>
              </h1>
            </div>

            <div className="controls mb-8">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <label className="breadcrumb" style={{ marginRight: 6 }}>Sort by:</label>
                <select className="theme-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort products">
                  <option value="popularity">Sort by popularity</option>
                  <option value="latest">Sort by latest</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>

              <div className="view-toggle" style={{ display: 'flex', gap: 8 }}>
                <button aria-label="Grid view" onClick={() => setView('grid')} className={view === 'grid' ? 'active' : ''} title="Grid view"><Grid size={18} /></button>
                <button aria-label="List view" onClick={() => setView('list')} className={view === 'list' ? 'active' : ''} title="List view"><List size={18} /></button>
              </div>
            </div>

            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' : 'flex flex-col space-y-6'}>
              {products.map((product) => (
                <article key={product.id} className={`product-card ${view === 'list' ? 'list-row' : ''}`} aria-labelledby={`product-${product.id}-title`}>
                  <div className="prod-image-wrap" style={{ position: 'relative' }}>
                    <div className="price-tag">${product.price.toFixed(2)}</div>
                    <img src={product.img} alt={product.title} className="w-full h-48 object-contain" style={{ maxWidth: 220 }} />
                  </div>

                  <div className="card-body">
                    <div>
                      <h2 id={`product-${product.id}-title`} className="product-title">{product.title}</h2>
                      <p className="product-sub" style={{ marginTop: 8 }}>Genuine license • Instant delivery • 24/7 support</p>
                    </div>

                    <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: 900, fontSize: 18, lineHeight: 1 }}>${product.price.toFixed(2)}</div>
                        <div className="product-meta" style={{ marginTop: 6 }}>Popular choice</div>
                      </div>

                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button className="add-btn" aria-label={`Add ${product.title} to cart`} onClick={(e) => addToCart(product, e.currentTarget)}>
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 text-sm text-gray-600 gap-4 px-0">
              <p style={{ color: 'var(--muted)' }}>Showing 1–{products.length} of {products.length} results</p>
              <div className="pagination" style={{ display: 'flex', gap: 8 }}>
                <button aria-label="Page 1">1</button>
                <button aria-label="Page 2">2</button>
                <button aria-label="Next page">Next</button>
              </div>
            </div>
          </>
        )}

        {route === 'cart' && (
          <div className="cart-root">
            <div className="cart-top">
              <button onClick={() => setRoute('products')} title="Back to products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 8, border: '1px solid var(--card-border)', background: 'var(--surface)' }}>
                <ArrowLeft size={16} /> Back to shop
              </button>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button onClick={clearCart} style={{ padding: 8, borderRadius: 8, border: '1px solid var(--card-border)', background: 'transparent' }}>Clear cart</button>
              </div>
            </div>

            <h2 className="text-3xl font-bold" style={{ marginBottom: 14 }}>Your cart ({cart.length})</h2>

            {cart.length === 0 ? (
              <div style={{ padding: 28, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                <p style={{ margin: 0 }}>Your cart is empty. Add items from the shop.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
                <div>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <div className="thumb">
                          <img src={item.img} alt={item.title} />
                        </div>
                        <div className="body">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{item.title}</h3>
                              <p className="meta" style={{ marginTop: 8 }}>{item.id} • Genuine license • Instant delivery</p>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: 800, fontSize: 18 }}>${(item.price * item.qty).toFixed(2)}</div>
                              <button onClick={() => removeFromCart(item.id)} title="Remove" style={{ marginTop: 10, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                <Trash size={18} />
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                            <div className="qty-controls">
                              <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">-</button>
                              <div style={{ minWidth: 42, textAlign: 'center', fontWeight: 700 }}>{item.qty}</div>
                              <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                            </div>

                            <div style={{ color: 'var(--muted)' }}>${item.price.toFixed(2)} each</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="summary">
                  <h4 style={{ marginTop: 0, marginBottom: 12 }}>Order summary</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ color: 'var(--muted)' }}>Subtotal</div>
                    <div style={{ fontWeight: 800 }}>${subtotal.toFixed(2)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ color: 'var(--muted)' }}>Estimated tax</div>
                    <div style={{ fontWeight: 700 }}>${(subtotal * 0.07).toFixed(2)}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, fontSize: 18 }}>
                    <div style={{ fontWeight: 700 }}>Total</div>
                    <div style={{ fontWeight: 900 }}>${(subtotal * 1.07).toFixed(2)}</div>
                  </div>

                  <button style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', fontWeight: 800, background: 'linear-gradient(90deg,var(--btn-gradient-from),var(--btn-gradient-to))', color: '#fff' }}>
                    Checkout
                  </button>
                </aside>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}