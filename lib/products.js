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
    name: 'Plain T-shirt',
    type: 'tshirt',
    category: 'Clothing',
    priceInCents: 3400,
    description: 'A plain T-shirt in five solid colours. Choose your colour and size for an everyday staple with no printed design.',
    imageUrl: '/images/products/tshirt/tshirt-white-front.webp',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: TSHIRT_COLORS,
    featured: true,
  },
  {
    id: '7',
    slug: 'morning-steep-hoodie',
    name: 'Plain Hoodie',
    type: 'hoodie',
    category: 'Clothing',
    priceInCents: 5900,
    description: 'A plain hoodie in five solid colours. An easy layer for everyday wear, with no printed design.',
    imageUrl: '/images/products/hoodie/hoodie-white-front.webp',
    transparentBg: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: HOODIE_COLORS,
    featured: true,
  },
  {
    id: '8',
    slug: 'steep-beanie',
    name: 'Plain Beanie',
    type: 'beanie',
    category: 'Accessories',
    priceInCents: 2400,
    description: 'A plain beanie for cooler days. Pick from five solid colours to finish your everyday outfit.',
    imageUrl: '/images/products/beanie/beanie-white.webp',
    transparentBg: false,
    sizes: ['One Size'],
    colors: BEANIE_COLORS,
    featured: false,
  },
  {
    id: '9',
    slug: 'loose-leaf-tote',
    name: 'Plain Tote Bag',
    type: 'tote',
    category: 'Accessories',
    priceInCents: 2200,
    description: 'A plain tote bag for your daily essentials. Available in five solid colours, with no printed design.',
    imageUrl: '/images/products/totebag/tote-white.webp',
    transparentBg: true,
    sizes: [],
    colors: TOTE_COLORS,
    featured: true,
  },
  {
    id: '10',
    slug: 'morning-mug',
    name: 'Plain Mug',
    type: 'mug',
    category: 'Accessories',
    priceInCents: 1800,
    description: 'A plain mug for your daily routine. Choose from five solid colours and two sizes.',
    imageUrl: '/images/products/mug/mug-white.webp',
    transparentBg: false,
    sizes: ['8 oz', '12 oz'],
    colors: MUG_COLORS,
    featured: false,
  },
  {
    id: '11',
    slug: 'steep-socks',
    name: 'Plain Socks',
    type: 'socks',
    category: 'Clothing',
    priceInCents: 1400,
    description: 'Plain socks in five solid colours. Choose your size and keep the everyday details simple.',
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
