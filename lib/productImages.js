export function getProductImage(product, colorName, side = 'front') {
  const color = product.colors.find((c) => c.name === colorName) ?? product.colors[0]
  const images = color?.images
  if (!images) return product.imageUrl
  return images[side] ?? images.front ?? product.imageUrl
}

export function getDefaultImage(product) {
  if (!product.colors.length) return product.imageUrl
  return getProductImage(product, product.colors[0].name, 'front')
}

export function hasSides(product) {
  return product.colors.some((c) => c.images?.back != null)
}
