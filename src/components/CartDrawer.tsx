import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus, Sparkles, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExploreCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCatalog,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF9]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2A1810]">Your Sweet Cart</h3>
                <span className="text-xs text-stone-500">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto text-2xl">
                  🎂
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">Your cart is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Treat yourself to our handcrafted Belgian Chocolate Truffle or freshly whipped Cheesecakes!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCatalog();
                  }}
                  className="px-5 py-2.5 bg-[#2A1810] text-amber-200 text-xs font-semibold rounded-xl hover:bg-[#3D2314] transition-colors cursor-pointer"
                >
                  Explore Delicious Cakes
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-stone-200 bg-[#FAF4EE]/40 flex gap-3 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover shrink-0 border border-stone-200"
                  />

                  <div className="flex-1 min-w-0 pr-6">
                    <h5 className="font-serif text-sm font-bold text-stone-900 truncate">
                      {item.name}
                    </h5>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {item.size}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {item.dietary}
                      </span>
                    </div>

                    {item.customCakeMessage && (
                      <div className="text-[10px] text-amber-900 italic mt-1.5 truncate">
                        Msg: "{item.customCakeMessage}"
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-sm text-[#2A1810]">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute top-3 right-3 text-stone-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#FFFDF9] space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Estimated Packaging &amp; Fresh Care</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Amount</span>
                  <span className="font-serif text-2xl font-extrabold text-[#2A1810]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>UPI Verified</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#2A1810] hover:bg-[#3D2314] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Proceed to UPI &amp; WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-stone-400 text-center">
                Dynamic UPI QR code generated with exact bill amount on next screen.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
