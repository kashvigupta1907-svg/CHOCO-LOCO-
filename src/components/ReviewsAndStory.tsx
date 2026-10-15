import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, Sparkles, ChevronDown, ChevronUp, MapPin, Clock, Award } from 'lucide-react';
import { FAQS } from '../data/knowledgeBase';

export const ReviewsAndStory: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Priyanka Sharma',
      occasion: '25th Birthday Party',
      rating: 5,
      comment:
        'The Belgian Chocolate Truffle cake was literally the centerpiece of my birthday! You can taste the genuine Callebaut dark chocolate — not sickeningly sweet, rich and silky ganache. Everyone thought it was imported from Paris!',
      cake: 'Belgian Chocolate Truffle (1kg)',
    },
    {
      name: 'Aditya Mehta',
      occasion: 'Anniversary Celebration',
      rating: 5,
      comment:
        'The dynamic UPI QR flow was so fast and smooth! Scanned via Google Pay, clicked Confirm on WhatsApp, and received a personal note from the bakery in minutes. The Hazelnut Nutella drip was out of this world.',
      cake: 'Hazelnut Nutella Drip (1kg)',
    },
    {
      name: 'Dr. Radhika Sen',
      occasion: 'Family Gathering',
      rating: 5,
      comment:
        'Finally a bakery that takes eggless baking seriously without compromising on texture. The Mango Passionfruit Crunch and Blueberry Cheesecake Jars were phenomenal.',
      cake: 'Mango Passionfruit & Jars',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#78350F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Behind the Oven</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2A1810]">
              The CHOCOLOCO Artisan Philosophy
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We started CHOCOLOCO with a singular conviction: dessert should never be an afterthought made from synthetic compounds and hydrogenated fats. We source single-origin 55% Belgian chocolate, European churned butter, real Madagascar Bourbon vanilla beans, and hand-pick fresh fruit for every single compote.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Whether you order our celebrated Belgian Chocolate Truffle, our gluten-free Pistachio Rose Cardamom, or a custom two-tier wedding cake, your order is baked on the morning of delivery to ensure peak moisture and freshness.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
              <div className="border-l-2 border-amber-800 pl-3">
                <div className="font-serif text-2xl font-bold text-[#2A1810]">55%</div>
                <div className="text-xs text-stone-500">Pure Callebaut Cocoa</div>
              </div>
              <div className="border-l-2 border-emerald-700 pl-3">
                <div className="font-serif text-2xl font-bold text-[#2A1810]">80%+</div>
                <div className="text-xs text-stone-500">100% Eggless Menu</div>
              </div>
              <div className="border-l-2 border-rose-700 pl-3">
                <div className="font-serif text-2xl font-bold text-[#2A1810]">18km</div>
                <div className="text-xs text-stone-500">Fast Delivery Radius</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80"
                alt="CHOCOLOCO Artisan Bakery Process"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                  Handmade with Passion
                </div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Real butter, organic berries, pure chocolate curls.
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2A1810]">
              Loved by Dessert Connoisseurs
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Real reviews from celebration orders delivered across our 18km zone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#FAF4EE]/50 p-6 rounded-3xl border border-[#EADBD0] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E8D9CE] flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">{t.name}</h5>
                    <span className="text-[10px] text-stone-500">{t.occasion}</span>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-600 font-medium">
                    {t.cake}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2A1810]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Everything about delivery, storage, dynamic UPI QR payments, and eggless bakes.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 overflow-hidden transition-all bg-[#FFFDF9]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-sm sm:text-base text-stone-900 flex items-center justify-between gap-4 hover:bg-stone-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-900 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
