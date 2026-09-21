const TSHIRT_COLORS = [
  {
    name: 'White',
    hex: '#F0EDE8',
    images: {
      front: '/images/products/tshirt/tshirt-white-front.webp',
      back: '/images/products/tshirt/tshirt-white-back.webp',
    },
  },
  {
    name: 'Black',
    hex: '#1C1C1C',
    images: {
      front: '/images/products/tshirt/tshirt-black-front.webp',
      back: '/images/products/tshirt/tshirt-black-back.webp',
    },
  },
  {
    name: 'Grey',
    hex: '#9EA09C',
    images: {
      front: '/images/products/tshirt/tshirt-grey-front.webp',
      back: '/images/products/tshirt/tshirt-grey-back.webp',
    },
  },
  {
    name: 'Pink',
    hex: '#EABFC6',
    images: {
      front: '/images/products/tshirt/tshirt-pink-front.webp',
      back: '/images/products/tshirt/tshirt-pink-back.webp',
    },
  },
  {
    name: 'Sand',
    hex: '#C9A97A',
    images: {
      front: '/images/products/tshirt/tshirt-sand-front.webp',
      back: '/images/products/tshirt/tshirt-sand-back.webp',
    },
  },
]

const HOODIE_COLORS = [
  {
    name: 'White',
    hex: '#F0EDE8',
    images: {
      front: '/images/products/hoodie/hoodie-white-front.webp',
      back: '/images/products/hoodie/hoodie-white-back.webp',
    },
  },
  {
    name: 'Black',
    hex: '#1C1C1C',
    images: {
      front: '/images/products/hoodie/hoodie-black-front.webp',
      back: '/images/products/hoodie/hoodie-black-back.webp',
    },
  },
  {
    name: 'Grey',
    hex: '#9EA09C',
    images: {
      front: '/images/products/hoodie/hoodie-grey-front.webp',
      back: '/images/products/hoodie/hoodie-grey-back.webp',
    },
  },
  {
    name: 'Pink',
    hex: '#EABFC6',
    images: {
      front: '/images/products/hoodie/hoodie-pink-front.webp',
      back: '/images/products/hoodie/hoodie-pink-back.webp',
    },
  },
  {
    name: 'Sand',
    hex: '#C9A97A',
    images: {
      front: '/images/products/hoodie/hoodie-sand-front.webp',
      back: '/images/products/hoodie/hoodie-sand-back.webp',
    },
  },
]

const BEANIE_COLORS = [
  { name: 'White', hex: '#F0EDE8', images: { front: '/images/products/beanie/beanie-white.webp' } },
  { name: 'Black', hex: '#1C1C1C', images: { front: '/images/products/beanie/beanie-black.webp' } },
  { name: 'Grey',  hex: '#9EA09C', images: { front: '/images/products/beanie/beanie-grey.webp'  } },
  { name: 'Pink',  hex: '#EABFC6', images: { front: '/images/products/beanie/beanie-pink.webp'  } },
  { name: 'Sand',  hex: '#C9A97A', images: { front: '/images/products/beanie/beanie-sand.webp'  } },
]

const TOTE_COLORS = [
  { name: 'White', hex: '#F0EDE8', images: { front: '/images/products/totebag/tote-white.webp' } },
  { name: 'Black', hex: '#1C1C1C', images: { front: '/images/products/totebag/tote-black.webp' } },
  { name: 'Grey',  hex: '#9EA09C', images: { front: '/images/products/totebag/tote-grey.webp'  } },
  { name: 'Pink',  hex: '#EABFC6', images: { front: '/images/products/totebag/tote-pink.webp'  } },
  { name: 'Sand',  hex: '#C9A97A', images: { front: '/images/products/totebag/tote-sand.webp'  } },
]

const MUG_COLORS = [
  { name: 'White', hex: '#F0EDE8', images: { front: '/images/products/mug/mug-white.webp' } },
  { name: 'Black', hex: '#1C1C1C', images: { front: '/images/products/mug/mug-black.webp' } },
  { name: 'Grey',  hex: '#9EA09C', images: { front: '/images/products/mug/mug-grey.webp'  } },
  { name: 'Pink',  hex: '#EABFC6', images: { front: '/images/products/mug/mug-pink.webp'  } },
  { name: 'Sand',  hex: '#C9A97A', images: { front: '/images/products/mug/mug-sand.webp'  } },
]

const SOCKS_COLORS = [
  { name: 'White', hex: '#F0EDE8', images: { front: '/images/products/socks/socks-white.webp' } },
  { name: 'Black', hex: '#1C1C1C', images: { front: '/images/products/socks/socks-black.webp' } },
  { name: 'Grey',  hex: '#9EA09C', images: { front: '/images/products/socks/socks-grey.webp'  } },
  { name: 'Pink',  hex: '#EABFC6', images: { front: '/images/products/socks/socks-pink.webp'  } },
  { name: 'Sand',  hex: '#C9A97A', images: { front: '/images/products/socks/socks-sand.webp'  } },
]

const products = [
  {
    id: '1',
    slug: 'morning-steep',
    name: 'Morning Steep',
    type: 'tshirt',
    category: 'Classic',
    priceInCents: 3400,
    description: 'Start your day the right way. Clean lines, soft cotton, and the quiet confidence of someone who brews before they think.',
    imageUrl: '/images/products/tshirt/tshirt-white-front.webp',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: TSHIRT_COLORS,
    featured: true,
  },
  {
    id: '7',
    slug: 'morning-steep-hoodie',
    name: 'Morning Steep Hoodie',
    type: 'hoodie',
    category: 'Classic',
    priceInCents: 5900,
    description: 'The warmth of a double steep. Soft fleece lining, relaxed fit, and enough pocket space for your phone and a tea sachet.',
    imageUrl: '/images/products/hoodie/hoodie-white-front.webp',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: HOODIE_COLORS,
    featured: true,
  },
  {
    id: '8',
    slug: 'steep-beanie',
    name: 'Steep Beanie',
    type: 'beanie',
    category: 'Minimal',
    priceInCents: 2400,
    description: 'For cold mornings and slower brews. A ribbed cuff beanie that pairs well with a flask and a view.',
    imageUrl: '/images/products/beanie/beanie-white.webp',
    transparentBg: false,
    sizes: ['One Size'],
    colors: BEANIE_COLORS,
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
    imageUrl: '/images/products/totebag/tote-white.webp',
    transparentBg: true,
    sizes: [],
    colors: TOTE_COLORS,
    featured: true,
  },
  {
    id: '10',
    slug: 'morning-mug',
    name: 'Morning Mug',
    type: 'mug',
    category: 'Minimal',
    priceInCents: 1800,
    description: 'A proper enamel mug for a proper cup. No irony — tea drinkers deserve good vessels. Dishwasher safe, drop-resistant.',
    imageUrl: '/images/products/mug/mug-white.webp',
    transparentBg: false,
    sizes: ['8 oz', '12 oz'],
    colors: MUG_COLORS,
    featured: false,
  },
  {
    id: '11',
    slug: 'steep-socks',
    name: 'Steep Socks',
    type: 'socks',
    category: 'Minimal',
    priceInCents: 1400,
    description: 'Cozy, mid-calf, with a subtle tea leaf pattern woven into the cuff. The kind of socks you notice on someone and immediately respect.',
    imageUrl: '/images/products/socks/socks-white.webp',
    transparentBg: false,
    sizes: ['S/M', 'L/XL'],
    colors: SOCKS_COLORS,
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
