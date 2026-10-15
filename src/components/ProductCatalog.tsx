import React, { useState, useMemo } from 'react';
import { Product, ProductOption } from '../types';
import { ProductCard } from './ProductCard';
import { Search, Sparkles, Filter, FileText, CheckCircle2 } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, selectedOption: ProductOption, quantity: number) => void;
  onQuickBuy: (product: Product, selectedOption: ProductOption, quantity: number) => void;
  onOpenKnowledgeBase: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onQuickBuy,
  onOpenKnowledgeBase,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Cakes', 'Cheesecakes', 'Cupcakes', 'Desserts & Jars'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (activeCategory !== 'All' && p.category !== activeCategory) {
        return false;
      }
      // Eggless filter
      if (egglessOnly && p.dietary !== 'EGGLESS' && p.dietary !== 'EGG/OPT') {
        return false;
      }
      // Gluten-Free filter
      if (glutenFreeOnly && p.dietary !== 'GF OPT' && p.dietary !== 'GF / EGG') {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inFlavor = p.flavorProfile.toLowerCase().includes(q);
        return inName || inDesc || inFlavor;
      }
      return true;
    });
  }, [products, activeCategory, egglessOnly, glutenFreeOnly, searchQuery]);

  return (
    <section id="catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Official Catalog</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2A1810]">
            Fresh Bakes &amp; Artisanal Creations
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-xl">
            Sourced with pure Callebaut chocolate, farm-fresh cream, and zero preservatives. Over 80% eggless options available fresh daily.
          </p>
        </div>

        <button
          onClick={onOpenKnowledgeBase}
          className="self-start md:self-auto flex items-center gap-2 text-xs font-semibold text-[#881B3E] bg-[#FDF2F4] hover:bg-[#FCE7EB] border border-[#F5C2CD] px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
        >
          <FileText className="w-4 h-4 text-[#881B3E]" />
          <span>View Knowledge Base &amp; PDF</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2A1810] text-amber-200 shadow-md'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] max-w-md w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search truffle, red velvet, hazelnut, biscoff..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dietary Filters Pill Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-stone-500 font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Dietary:
          </span>
          
          <button
            type="button"
            onClick={() => setEgglessOnly(!egglessOnly)}
            className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              egglessOnly
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${egglessOnly ? 'text-emerald-200' : 'text-emerald-600'}`} />
            <span>100% Eggless Only</span>
          </button>

          <button
            type="button"
            onClick={() => setGlutenFreeOnly(!glutenFreeOnly)}
            className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              glutenFreeOnly
                ? 'bg-sky-700 text-white shadow-xs'
                : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${glutenFreeOnly ? 'text-sky-200' : 'text-sky-600'}`} />
            <span>Gluten-Free Options</span>
          </button>

          {(egglessOnly || glutenFreeOnly || searchQuery || activeCategory !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setEgglessOnly(false);
                setGlutenFreeOnly(false);
                setSearchQuery('');
              }}
              className="text-stone-500 hover:text-stone-800 underline ml-2 text-xs cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto my-8">
          <div className="text-4xl mb-3">🍰</div>
          <h3 className="font-serif text-xl font-bold text-stone-900">No cakes found matching your search</h3>
          <p className="text-stone-500 text-xs mt-1.5">
            Try adjusting your search terms or clearing dietary filters to view our full artisanal menu.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setEgglessOnly(false);
              setGlutenFreeOnly(false);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#2A1810] text-amber-200 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickBuy={onQuickBuy}
            />
          ))}
        </div>
      )}
    </section>
  );
};
