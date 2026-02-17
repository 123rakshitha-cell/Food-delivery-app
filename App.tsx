
import React, { useState, useEffect, useMemo } from 'react';
import { RESTAURANTS, CATEGORIES } from './data';
import { Restaurant, FoodItem, CartItem, AppView, AIRecommendation } from './types';
import RestaurantCard from './components/RestaurantCard';
import FoodItemCard from './components/FoodItemCard';
import Cart from './components/Cart';
import { SearchIcon, ShoppingBagIcon, BackIcon, SparklesIcon, StarIcon, ClockIcon } from './components/Icons';
import { getAIRecommendations } from './geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // AI Feature states
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  // Memoized filtered restaurants
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const matchesCategory = activeCategory === 'All' || r.cuisine.includes(activeCategory);
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Visual feedback could be added here
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const navigateToRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('restaurant');
    setRecommendations([]);
    setAiPrompt('');
    window.scrollTo(0, 0);
  };

  const handleAIRecquest = async () => {
    if (!aiPrompt.trim() || !selectedRestaurant) return;
    setIsAiLoading(true);
    try {
      const recs = await getAIRecommendations(aiPrompt, selectedRestaurant.menu);
      setRecommendations(recs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 
              onClick={() => { setView('home'); setSelectedRestaurant(null); }}
              className="text-2xl font-black text-orange-500 cursor-pointer tracking-tighter"
            >
              BITEDASH
            </h1>
            
            {view === 'home' && (
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
                <SearchIcon className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search restaurants or cuisines..."
                  className="bg-transparent border-none outline-none text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <ShoppingBagIcon className="text-gray-700 group-hover:text-orange-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="hidden sm:block">
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'home' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="bg-orange-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 max-w-lg">
                <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                  Hungry? We've got you covered.
                </h2>
                <p className="text-orange-100 text-lg mb-8">
                  Get the best food from local favorites delivered to your doorstep in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-white rounded-full flex items-center px-4 py-3 flex-1">
                    <span className="mr-2">📍</span>
                    <input 
                      type="text" 
                      placeholder="Enter delivery address" 
                      className="text-gray-900 outline-none bg-transparent w-full text-sm font-medium"
                    />
                  </div>
                  <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                    Find Food
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10 scale-150 select-none pointer-events-none">
                <span className="text-[200px]">🍔</span>
              </div>
            </section>

            {/* Categories */}
            <section className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all font-semibold ${
                    activeCategory === cat.name 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </section>

            {/* Restaurant List */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Featured Restaurants</h3>
                <span className="text-orange-500 font-semibold cursor-pointer hover:underline text-sm">View all</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard 
                    key={restaurant.id} 
                    restaurant={restaurant} 
                    onClick={navigateToRestaurant}
                  />
                ))}
                {filteredRestaurants.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-xl text-gray-500">No restaurants found matching your criteria.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Restaurant Detail View */}
            <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium group transition-colors"
            >
              <BackIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Browse
            </button>

            {selectedRestaurant && (
              <div className="space-y-8">
                {/* Hero Header */}
                <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl">
                  <img 
                    src={selectedRestaurant.image} 
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h2 className="text-4xl md:text-5xl font-black mb-2">{selectedRestaurant.name}</h2>
                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium">
                      <div className="flex items-center gap-1.5">
                        <StarIcon className="text-yellow-400" />
                        <span>{selectedRestaurant.rating} (500+ ratings)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ClockIcon className="text-white/70" />
                        <span>{selectedRestaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>💰</span>
                        <span>{selectedRestaurant.deliveryFee === 0 ? 'Free Delivery' : `$${selectedRestaurant.deliveryFee} Fee`}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Assistant Feature */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-500 p-2 rounded-lg text-white">
                      <SparklesIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">AI Menu Assistant</h4>
                      <p className="text-xs text-orange-700">Tell us what you're craving and we'll pick the perfect dish!</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAIRecquest()}
                      placeholder="e.g., I want something spicy but not too heavy..."
                      className="flex-1 px-4 py-2 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none text-sm"
                    />
                    <button 
                      onClick={handleAIRecquest}
                      disabled={isAiLoading || !aiPrompt.trim()}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all"
                    >
                      {isAiLoading ? 'Thinking...' : 'Recommend'}
                    </button>
                  </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedRestaurant.menu.map(item => {
                    const recommendation = recommendations.find(r => r.dishId === item.id);
                    return (
                      <FoodItemCard 
                        key={item.id} 
                        item={item} 
                        onAddToCart={handleAddToCart}
                        highlight={recommendation?.reason}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cart Slider */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => {
          alert('This is a demo! In a real app, you would proceed to payment.');
          setIsCartOpen(false);
        }}
      />

      {/* Mobile Footer Navigation (Floating) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex justify-around items-center z-50">
        <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1 ${view === 'home' ? 'text-orange-500' : 'text-gray-400'}`}>
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">🔍</span>
          <span className="text-[10px] font-bold">Search</span>
        </button>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-gray-400 relative">
          <span className="text-xl">🛍️</span>
          <span className="text-[10px] font-bold">Orders</span>
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">👤</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default App;
