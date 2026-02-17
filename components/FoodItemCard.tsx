
import React from 'react';
import { FoodItem } from '../types';
import { StarIcon } from './Icons';

interface Props {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
  highlight?: string;
}

const FoodItemCard: React.FC<Props> = ({ item, onAddToCart, highlight }) => {
  return (
    <div className={`flex bg-white rounded-2xl p-4 shadow-sm border border-transparent transition-all hover:border-orange-200 ${highlight ? 'ring-2 ring-orange-500 bg-orange-50/30' : ''}`}>
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-gray-800">{item.name}</h4>
          {highlight && <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">✨ AI Recommended</span>}
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{item.description}</p>
        {highlight && <p className="text-orange-600 text-xs italic mb-2">"{highlight}"</p>}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-lg text-gray-900">${item.price}</span>
          <button 
            onClick={() => onAddToCart(item)}
            className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default FoodItemCard;
