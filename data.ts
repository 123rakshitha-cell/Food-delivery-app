
import { Restaurant } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Burger Haven',
    cuisine: 'American • Burgers',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800',
    menu: [
      { id: 'f1', name: 'Classic Truffle Burger', description: 'Wagyu beef, black truffle aioli, swiss cheese', price: 14.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', category: 'Main', rating: 4.9 },
      { id: 'f2', name: 'Spicy Jalapeño Burger', description: 'Double beef, pepper jack, grilled jalapeños', price: 12.99, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400', category: 'Main', rating: 4.7 },
      { id: 'f3', name: 'Sweet Potato Fries', description: 'Crispy fries with honey mustard dip', price: 5.99, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=400', category: 'Sides', rating: 4.5 },
    ]
  },
  {
    id: 'r2',
    name: 'Sushi Zen',
    cuisine: 'Japanese • Sushi',
    rating: 4.9,
    deliveryTime: '30-45 min',
    deliveryFee: 2.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    menu: [
      { id: 'f4', name: 'Dragon Roll', description: 'Tempura shrimp, eel, avocado, kabayaki sauce', price: 18.99, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=400', category: 'Sushi', rating: 4.9 },
      { id: 'f5', name: 'Salmon Sashimi (5pc)', description: 'Freshly sliced premium Atlantic salmon', price: 12.99, image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcd3327?auto=format&fit=crop&q=80&w=400', category: 'Sashimi', rating: 4.8 },
      { id: 'f6', name: 'Miso Soup', description: 'Traditional tofu and seaweed broth', price: 3.99, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400', category: 'Starter', rating: 4.6 },
    ]
  },
  {
    id: 'r3',
    name: 'Pasta Fresca',
    cuisine: 'Italian • Pasta',
    rating: 4.7,
    deliveryTime: '25-40 min',
    deliveryFee: 0,
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    menu: [
      { id: 'f7', name: 'Wild Mushroom Risotto', description: 'Porcini mushrooms, arborio rice, parmesan', price: 16.99, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400', category: 'Pasta', rating: 4.8 },
      { id: 'f8', name: 'Classic Carbonara', description: 'Guanciale, egg yolk, pecorino romano', price: 15.99, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=400', category: 'Pasta', rating: 4.7 },
    ]
  },
  {
    id: 'r4',
    name: 'Taco Palace',
    cuisine: 'Mexican • Street Food',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: 1.49,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    menu: [
      { id: 'f9', name: 'Al Pastor Tacos', description: 'Marinated pork, pineapple, cilantro (3pc)', price: 9.99, image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=400', category: 'Tacos', rating: 4.6 },
    ]
  }
];

export const CATEGORIES = [
  { name: 'All', icon: '🍽️' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Pasta', icon: '🍝' },
  { name: 'Tacos', icon: '🌮' },
  { name: 'Healthy', icon: '🥗' },
  { name: 'Desserts', icon: '🍰' },
];
