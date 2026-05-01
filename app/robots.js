const BASE_URL = 'https://tea-shirts.vercel.app'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart', '/success'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
