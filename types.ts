
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  menu: FoodItem[];
  promoted?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export type AppView = 'home' | 'restaurant' | 'checkout';

export interface AIRecommendation {
  dishId: string;
  reason: string;
}
