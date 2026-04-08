export type Deal = {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  image: string;
  dealTitle: string;
  dealDescription: string;
  discountPercent: number;
  availableSlots: string[];
  isFeatured?: boolean;
};

export const deals: Deal[] = [
  {
    id: '1',
    name: 'Sushi Zen',
    cuisine: 'Japanese',
    location: 'Bangkok',
    rating: 4.7,
    priceRange: '$$$',
    image: '/images/sushi.jpg',
    dealTitle: '20% Off Omakase',
    dealDescription: 'Premium omakase experience with fresh imports',
    discountPercent: 20,
    availableSlots: ['18:00', '19:30'],
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Mama Pasta',
    cuisine: 'Italian',
    location: 'Bangkok',
    rating: 4.5,
    priceRange: '$$',
    image: '/images/pasta.jpg',
    dealTitle: 'Buy 1 Get 1 Free Pasta',
    dealDescription: 'Classic Italian homemade pasta',
    discountPercent: 50,
    availableSlots: ['12:00', '14:00', '18:00'],
  },
  {
    id: '3',
    name: 'Grill House',
    cuisine: 'Steakhouse',
    location: 'Bangkok',
    rating: 4.6,
    priceRange: '$$$',
    image: '/images/steak.jpg',
    dealTitle: 'Free Wine Pairing',
    dealDescription: 'Free red wine with any steak order',
    discountPercent: 25,
    availableSlots: ['18:30', '20:00'],
  },
  {
    id: '4',
    name: 'Green Bowl',
    cuisine: 'Healthy',
    location: 'Bangkok',
    rating: 4.3,
    priceRange: '$$',
    image: '/images/salad.jpg',
    dealTitle: '15% Off All Bowls',
    dealDescription: 'Fresh organic ingredients',
    discountPercent: 15,
    availableSlots: ['11:00', '13:00'],
  },
  {
    id: '5',
    name: 'Spicy Thai',
    cuisine: 'Thai',
    location: 'Bangkok',
    rating: 4.8,
    priceRange: '$$',
    image: '/images/thai.jpg',
    dealTitle: 'Free Dessert',
    dealDescription: 'Get mango sticky rice free',
    discountPercent: 10,
    availableSlots: ['17:00', '19:00'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `${i + 6}`,
    name: `Restaurant ${i + 6}`,
    cuisine: ['Japanese', 'Thai', 'Italian', 'BBQ', 'Cafe'][i % 5],
    location: ['Bangkok', 'Chiang Mai', 'Phuket'][i % 3],
    rating: Number((4 + Math.random()).toFixed(1)),
    priceRange: ['$', '$$', '$$$'][i % 3] as '$' | '$$' | '$$$',
    image: `/images/restaurant-${i + 6}.jpg`,
    dealTitle: `${10 + (i % 5) * 5}% Discount`,
    dealDescription: 'Special limited-time dining deal',
    discountPercent: 10 + (i % 5) * 5,
    availableSlots: ['12:00', '14:00', '18:00', '20:00'].slice(0, (i % 4) + 1),
    isFeatured: i % 7 === 0,
  })),
];