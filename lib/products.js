const products = [
  {
    id: '1',
    slug: 'morning-steep',
    name: 'Morning Steep',
    type: 'tshirt',
    category: 'Classic',
    priceInCents: 3400,
    description: 'Start your day the right way. Clean lines, soft cotton, and the quiet confidence of someone who brews before they think.',
    imageUrl: '/images/shirtwhite.png',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F0EDE8' },
      { name: 'Black', hex: '#1C1C1C' },
      { name: 'Sage', hex: '#8FAF8C' },
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'golden-hour-brew',
    name: 'Golden Hour Brew',
    type: 'tshirt',
    category: 'Bold',
    priceInCents: 3800,
    description: 'Amber-toned and unapologetic. For those who take their tea seriously and their wardrobe even more so.',
    imageUrl: '/images/shirtwhite.png',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F0EDE8' },
      { name: 'Black', hex: '#1C1C1C' },
      { name: 'Sage', hex: '#8FAF8C' },
    ],
    featured: true,
  },
  {
    id: '3',
    slug: 'empty-cup',
    name: 'Empty Cup',
    type: 'tshirt',
    category: 'Minimal',
    priceInCents: 2900,
    description: 'Nothing left to say. A minimalist tee for the contemplative tea drinker who finds meaning in the pause.',
    imageUrl: '/images/shirtwhite.png',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F0EDE8' },
      { name: 'Black', hex: '#1C1C1C' },
      { name: 'Sage', hex: '#8FAF8C' },
    ],
    featured: true,
  },
  {
    id: '4',
    slug: 'loose-leaf-theory',
    name: 'Loose Leaf Theory',
    type: 'tshirt',
    category: 'Classic',
    priceInCents: 3200,
    description: 'A tribute to the unfiltered approach. Loose leaf only, no compromises, no tea bags.',
    imageUrl: '/images/shirtwhite.png',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F0EDE8' },
      { name: 'Black', hex: '#1C1C1C' },
      { name: 'Sage', hex: '#8FAF8C' },
    ],
    featured: false,
  },
  {
    id: '5',
    slug: 'second-flush',
    name: 'Second Flush',
    type: 'tshirt',
    category: 'Bold',
    priceInCents: 4100,
    description: 'The second infusion is always better. Bolder, richer, more itself. So is this shirt.',
    imageUrl: '/images/shirtwhite.png',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F0EDE8' },
      { name: 'Black', hex: '#1C1C1C' },
      { name: 'Sage', hex: '#8FAF8C' },
    ],
    featured: false,
  },
  {
    id: '6',
    slug: 'still-water',
    name: 'Still Water',
    type: 'tshirt',
    category: 'Minimal',
    priceInCents: 2700,
    description: 'Quiet. Unhurried. The shirt equivalent of 75°C water and a three-minute steep.',
    imageUrl: '/images/shirtwhite.png',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F0EDE8' },
      { name: 'Black', hex: '#1C1C1C' },
      { name: 'Sage', hex: '#8FAF8C' },
    ],
    featured: false,
  },
  {
    id: '7',
    slug: 'morning-steep-hoodie',
    name: 'Morning Steep Hoodie',
    type: 'hoodie',
    category: 'Classic',
    priceInCents: 5900,
    description: 'The warmth of a double steep. Soft fleece lining, relaxed fit, and enough pocket space for your phone and a tea sachet.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80&auto=format&fit=crop',
    transparentBg: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#F0EDE8' },
      { name: 'Black', hex: '#1C1C1C' },
      { name: 'Sage', hex: '#8FAF8C' },
    ],
    featured: false,
  },
  {
    id: '8',
    slug: 'steep-beanie',
    name: 'Steep Beanie',
    type: 'beanie',
    category: 'Minimal',
    priceInCents: 2400,
    description: 'For cold mornings and slower brews. A ribbed cuff beanie that pairs well with a flask and a view.',
    imageUrl: 'https://images.unsplash.com/photo-1576529598261-96e376f6aabb?w=800&q=80&auto=format&fit=crop',
    transparentBg: false,
    sizes: ['One Size'],
    colors: [],
    featured: false,
  },
  {
    id: '9',
    slug: 'loose-leaf-tote',
    name: 'Loose Leaf Tote',
    type: 'tote',
    category: 'Classic',
    priceInCents: 2200,
    description: "For the farmer's market, the tea shop, or just looking like you're about to do something intentional. Heavy canvas, long handles.",
    imageUrl: 'https://images.unsplash.com/photo-1574365569389-a10d488ca3fb?w=800&q=80&auto=format&fit=crop',
    transparentBg: false,
    sizes: [],
    colors: [],
    featured: false,
  },
  {
    id: '10',
    slug: 'morning-mug',
    name: 'Morning Mug',
    type: 'mug',
    category: 'Minimal',
    priceInCents: 1800,
    description: 'A proper enamel mug for a proper cup. No irony — tea drinkers deserve good vessels. Dishwasher safe, drop-resistant.',
    imageUrl: 'https://images.unsplash.com/photo-1605714262316-da2faa04731a?w=800&q=80&auto=format&fit=crop',
    transparentBg: false,
    sizes: ['8 oz', '12 oz'],
    colors: [],
    featured: false,
  },
  {
    id: '11',
    slug: 'steep-socks',
    name: 'Steep Socks',
    type: 'socks',
    category: 'Bold',
    priceInCents: 1400,
    description: 'Cozy, mid-calf, with a subtle tea leaf pattern woven into the cuff. The kind of socks you notice on someone and immediately respect.',
    imageUrl: 'https://images.unsplash.com/photo-1589895868947-b51095d437f3?w=800&q=80&auto=format&fit=crop',
    transparentBg: false,
    sizes: ['S/M', 'L/XL'],
    colors: [],
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

export function getRelatedProducts(currentId, category, limit = 3) {
  const sameCategory = products.filter(
    (p) => p.id !== currentId && p.category === category
  )
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)
  const others = products.filter(
    (p) => p.id !== currentId && p.category !== category
  )
  return [...sameCategory, ...others].slice(0, limit)
}
