import { getProductById } from './products'

export function normalizeCartItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null
  const productId = item.productId ?? item.product?.id
  if (typeof productId !== 'string') return null
  const product = getProductById(productId)
  if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) return null
  if (product.sizes.length ? !product.sizes.includes(item.size) : item.size !== '') return null
  const colorName = item.colorName ?? item.color?.name ?? null
  const color = product.colors.find((entry) => entry.name === colorName) ?? null
  if (product.colors.length ? !color : colorName !== null) return null
  const lineId = typeof item.lineId === 'string' && /^[\w-]{1,64}$/.test(item.lineId)
    ? item.lineId
    : crypto.randomUUID()
  return { product, size: item.size, color, quantity: item.quantity, lineId }
}

export function serializeCartItem(item) {
  return {
    productId: item.product.id,
    size: item.size,
    colorName: item.color?.name ?? null,
    quantity: item.quantity,
    lineId: item.lineId,
  }
}

export function normalizeCartItems(items) {
  if (!Array.isArray(items)) return []
  const normalized = []
  for (const value of items.slice(0, 100)) {
    const item = normalizeCartItem(value)
    if (!item) continue
    const duplicate = normalized.some((entry) => entry.lineId === item.lineId || (
      entry.product.id === item.product.id && entry.size === item.size &&
      entry.color?.name === item.color?.name
    ))
    if (!duplicate) normalized.push(item)
  }
  return normalized
}

export function normalizeCheckouts(checkouts) {
  if (!Array.isArray(checkouts)) return []
  return checkouts.slice(-20).flatMap((checkout) => {
    if (!checkout || typeof checkout.sessionId !== 'string' || !/^cs_[\w]{1,250}$/.test(checkout.sessionId)) return []
    const items = normalizeCartItems(checkout.items)
    return items.length ? [{ sessionId: checkout.sessionId, items: items.map(serializeCartItem) }] : []
  })
}
