import React, { useState } from 'react';
import { Product, ProductOption } from '../types';
import { ShoppingBag, Zap, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedOption: ProductOption, quantity: number) => void;
  onQuickBuy: (product: Product, selectedOption: ProductOption, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickBuy,
}) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption>(product.options[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedOption, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1400);
  };

  const handleQuickBuy = () => {
    onQuickBuy(product, selectedOption, quantity);
  };

  const renderDietaryBadge = () => {
    switch (product.dietary) {
      case 'EGGLESS':
        return (
          <span className="bg-emerald-800/90 backdrop-blur-md text-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
            100% EGGLESS
          </span>
        );
      case 'EGG/OPT':
        return (
          <span className="bg-amber-800/90 backdrop-blur-md text-amber-100 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
            EGGLESS OPTION
          </span>
        );
      case 'GF OPT':
        return (
          <span className="bg-sky-800/90 backdrop-blur-md text-sky-100 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-300"></span>
            GLUTEN FREE OPT
          </span>
        );
      case 'GF / EGG':
        return (
          <span className="bg-indigo-800/90 backdrop-blur-md text-indigo-100 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>
            GF • EGG
          </span>
        );
      default:
        return (
          <span className="bg-stone-700/90 backdrop-blur-md text-stone-200 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
            CONTAINS EGG
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#EDE0D4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Product Image Box */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

        {/* Dietary and Bestseller Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {renderDietaryBadge()}
          {product.bestseller && (
            <span className="bg-amber-400 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              BESTSELLER
            </span>
          )}
        </div>

        {/* Category Pill on right */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-stone-200 text-[10px] font-medium px-2 py-0.5 rounded-md">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#8B4513] transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-2.5 bg-[#F9F5F0] rounded-xl p-2 border border-[#EFE5DB] text-[11px] text-stone-600">
            <span className="font-semibold text-amber-900">Flavor: </span>
            {product.flavorProfile}
          </div>
        </div>

        {/* Size / Weight Selection */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
            Select Size / Weight:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {product.options.map((opt) => (
              <button
                key={opt.size}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`py-1.5 px-2 text-xs rounded-xl font-medium transition-all text-center cursor-pointer ${
                  selectedOption.size === opt.size
                    ? 'bg-[#2A1810] text-amber-200 shadow-xs ring-2 ring-[#2A1810]/20'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <div>{opt.size}</div>
                <div className="text-[10px] font-semibold opacity-90">₹{opt.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Controls */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Price</span>
              <span className="text-xl font-extrabold text-[#2A1810]">
                ₹{(selectedOption.price * quantity).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-2.5 py-1 text-sm font-bold text-stone-600 hover:bg-stone-200 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-2 text-xs font-semibold text-stone-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-2.5 py-1 text-sm font-bold text-stone-600 hover:bg-stone-200 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isAddedFeedback
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FAF4EE] hover:bg-[#F3E7DC] text-[#4A2612] border border-[#D9C4B2]'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickBuy}
              className="py-2.5 px-3 bg-[#2A1810] hover:bg-[#3D2314] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer group/btn"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
