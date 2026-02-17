
import React from 'react';
import { Restaurant } from '../types';
import { StarIcon, ClockIcon } from './Icons';

interface Props {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<Props> = ({ restaurant, onClick }) => {
  return (
    <div 
      onClick={() => onClick(restaurant)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {restaurant.promoted && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-orange-600">
            Promoted
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <div className="flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded text-sm font-semibold">
            <StarIcon className="w-3 h-3 mr-1" />
            {restaurant.rating}
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-3">{restaurant.cuisine}</p>
        <div className="flex items-center text-gray-500 text-xs gap-4 border-t pt-3">
          <div className="flex items-center">
            <ClockIcon className="mr-1 opacity-70" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center">
            <span className="mr-1">💰</span>
            {restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee} Delivery`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
