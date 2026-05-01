const products = [
  {
    id: '1',
    slug: 'morning-steep',
    name: 'Morning Steep',
    category: 'Classic',
    priceInCents: 3400,
    description: 'Start your day the right way. Clean lines, soft cotton, and the quiet confidence of someone who brews before they think.',
    imageUrl: '/images/shirtwhite.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: '2',
    slug: 'golden-hour-brew',
    name: 'Golden Hour Brew',
    category: 'Bold',
    priceInCents: 3800,
    description: 'Amber-toned and unapologetic. For those who take their tea seriously and their wardrobe even more so.',
    imageUrl: '/images/shirtwhite.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: '3',
    slug: 'empty-cup',
    name: 'Empty Cup',
    category: 'Minimal',
    priceInCents: 2900,
    description: 'Nothing left to say. A minimalist tee for the contemplative tea drinker who finds meaning in the pause.',
    imageUrl: '/images/shirtwhite.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
  },
  {
    id: '4',
    slug: 'loose-leaf-theory',
    name: 'Loose Leaf Theory',
    category: 'Classic',
    priceInCents: 3200,
    description: 'A tribute to the unfiltered approach. Loose leaf only, no compromises, no tea bags.',
    imageUrl: '/images/shirtwhite.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: false,
  },
  {
    id: '5',
    slug: 'second-flush',
    name: 'Second Flush',
    category: 'Bold',
    priceInCents: 4100,
    description: 'The second infusion is always better. Bolder, richer, more itself. So is this shirt.',
    imageUrl: '/images/shirtwhite.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: false,
  },
  {
    id: '6',
    slug: 'still-water',
    name: 'Still Water',
    category: 'Minimal',
    priceInCents: 2700,
    description: 'Quiet. Unhurried. The shirt equivalent of 75°C water and a three-minute steep.',
    imageUrl: '/images/shirtwhite.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: false,
  },
]

export function getProducts() {
  return products
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null
}
