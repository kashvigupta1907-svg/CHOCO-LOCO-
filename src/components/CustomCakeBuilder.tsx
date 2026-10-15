import React, { useState } from 'react';
import { Sparkles, MessageCircle, ShoppingBag, Cake, Heart, CheckCircle2 } from 'lucide-react';
import { BAKERY_CONTACT } from '../data/knowledgeBase';
import { Product, ProductOption } from '../types';

interface CustomCakeBuilderProps {
  onAddCustomCakeToCart: (customProduct: Product, option: ProductOption, messageOnCake: string) => void;
  onOpenQuickCheckoutWithCustomCake: (customProduct: Product, option: ProductOption, messageOnCake: string) => void;
}

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({
  onAddCustomCakeToCart,
  onOpenQuickCheckoutWithCustomCake,
}) => {
  const [flavor, setFlavor] = useState<string>('Belgian Dark Chocolate Truffle');
  const [size, setSize] = useState<string>('1kg');
  const [dietary, setDietary] = useState<string>('100% Eggless');
  const [pipedMessage, setPipedMessage] = useState<string>('Happy Birthday!');
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [candleChoice, setCandleChoice] = useState<string>('Metallic Gold Candles');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Price calculation based on flavor and size
  const getCustomPrice = () => {
    let base = 1600;
    if (size === '500g') base = 900;
    if (size === '1kg') base = 1700;
    if (size === '2kg') base = 3200;
    if (size === '3kg (2-Tier)') base = 4800;

    if (flavor.includes('Nutella') || flavor.includes('Pistachio')) {
      base += size === '500g' ? 150 : 250;
    }
    return base;
  };

  const calculatedPrice = getCustomPrice();

  const handleAddToCart = () => {
    const customProd: Product = {
      id: `custom-cake-${Date.now()}`,
      name: `Custom ${flavor} (${occasion})`,
      category: 'Cakes',
      description: `Custom handcrafted cake. Flavor: ${flavor}. Dietary: ${dietary}. Piped message: "${pipedMessage}". Candles: ${candleChoice}.`,
      flavorProfile: `${flavor} with custom artisan design`,
      dietary: dietary.includes('Eggless') ? 'EGGLESS' : 'EGG/OPT',
      options: [{ size, price: calculatedPrice }],
      defaultPrice: calculatedPrice,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=900&q=80',
    };

    onAddCustomCakeToCart(customProd, { size, price: calculatedPrice }, pipedMessage);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleOrderOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello CHOCOLOCO! 🎂 I would like to order a Custom Celebration Cake:\n\n` +
      `• Occasion: ${occasion}\n` +
      `• Flavor: ${flavor}\n` +
      `• Size: ${size}\n` +
      `• Dietary: ${dietary}\n` +
      `• Message on Cake: "${pipedMessage}"\n` +
      `• Candle Selection: ${candleChoice}\n` +
      `• Estimated Price: ₹${calculatedPrice.toLocaleString('en-IN')}\n\n` +
      `Please let me know slot availability and payment steps!`
    );
    window.open(`https://wa.me/${BAKERY_CONTACT.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="custom-cake" className="py-16 sm:py-20 bg-[#FAF4EE] border-y border-[#EDE0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Handcrafted Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2A1810]">
            Build Your Custom Celebration Cake
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Choose your signature sponge, decadent fillings, size, and personalized chocolate calligraphy message. Baked fresh on order morning!
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            
            {/* Occasion */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                1. What is the occasion?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Birthday', 'Anniversary', 'Farewell / New Job', 'Just Because'].map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`py-2 px-3 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                      occasion === occ
                        ? 'bg-[#2A1810] text-amber-200 shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Selection */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                2. Choose Signature Flavor Profile:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Belgian Dark Chocolate Truffle', tag: '55% Callebaut' },
                  { name: 'Red Velvet Cream Cheese', tag: 'Tangy Philadelphia Frosting' },
                  { name: 'Hazelnut Nutella Praline Drip', tag: 'Roasted Piedmont Hazelnuts' },
                  { name: 'Mango Passionfruit Crunch', tag: 'Alphonso & Wafer Crunch' },
                  { name: 'Pistachio Rose Cardamom', tag: 'Persian Scented Chiffon' },
                  { name: 'Classic Madagascar Vanilla Berry', tag: 'Bourbon Vanilla Bean' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setFlavor(item.name)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      flavor === item.name
                        ? 'border-[#2A1810] bg-[#FAF4EE] ring-2 ring-[#2A1810]/20'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-900">{item.name}</div>
                    <div className="text-[10px] text-amber-800 font-medium mt-0.5">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Weight */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                3. Select Weight &amp; Servings:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { s: '500g', serves: '4–5 guests' },
                  { s: '1kg', serves: '8–10 guests' },
                  { s: '2kg', serves: '16–20 guests' },
                  { s: '3kg (2-Tier)', serves: '25–30 guests' },
                ].map((sz) => (
                  <button
                    key={sz.s}
                    type="button"
                    onClick={() => setSize(sz.s)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      size === sz.s
                        ? 'border-[#2A1810] bg-[#2A1810] text-amber-200 shadow-xs'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{sz.s}</div>
                    <div className="text-[10px] opacity-80">{sz.serves}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                4. Dietary Requirements:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['100% Eggless', 'Classic / Contains Egg', 'Gluten-Free Flour'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDietary(d)}
                    className={`py-2 px-3 text-xs rounded-xl font-medium transition-all text-center cursor-pointer ${
                      dietary === d
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Message on Cake */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                5. Personalized Message on Cake:
              </label>
              <input
                type="text"
                maxLength={45}
                value={pipedMessage}
                onChange={(e) => setPipedMessage(e.target.value)}
                placeholder="e.g. Happy 25th Birthday Rhea! ❤️"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
              <div className="text-[11px] text-stone-400 text-right mt-1">
                {pipedMessage.length}/45 characters • Hand-piped in dark or white Belgian chocolate
              </div>
            </div>

          </div>

          {/* Real-time Cake Live Summary & Ordering Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADBD0] shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Live Custom Order Summary
                </span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Fresh Batch
                </span>
              </div>

              {/* Visual Preview Box */}
              <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-[#2A1810] to-[#452313] text-white relative overflow-hidden">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
                  Custom Creation
                </div>
                <h4 className="font-serif text-lg font-bold text-white">
                  {flavor}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
                    ⚖️ {size}
                  </span>
                  <span className="bg-emerald-500/30 text-emerald-200 px-2.5 py-0.5 rounded-md font-semibold">
                    🌿 {dietary}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
                    🎉 {occasion}
                  </span>
                </div>

                {pipedMessage && (
                  <div className="mt-4 pt-3 border-t border-white/20">
                    <span className="text-[10px] text-stone-300 block">Piped Chocolate Script:</span>
                    <span className="font-serif italic text-amber-200 text-sm">
                      "{pipedMessage}"
                    </span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-3 border-b border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Custom Handcrafted Cake ({size})</span>
                  <span className="font-semibold text-stone-900">₹{calculatedPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Personalized Chocolate Lettering</span>
                  <span className="text-emerald-700 font-semibold">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between">
                  <span>Celebration Candles &amp; Knife Pack</span>
                  <span className="text-emerald-700 font-semibold">INCLUDED</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Amount</span>
                  <span className="font-serif text-2xl font-extrabold text-[#2A1810]">
                    ₹{calculatedPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <span className="text-[11px] text-stone-500">
                  Ready for Dynamic UPI QR
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#2A1810] hover:bg-[#3D2314] text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Custom Cake Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-300" />
                      <span>Add Custom Cake to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOrderOnWhatsApp}
                  className="w-full py-3 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss &amp; Order on WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-400 text-center mt-3">
                Lead time: 24–48 hours for multi-tiered custom celebration cakes.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
