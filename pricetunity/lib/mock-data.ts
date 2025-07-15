import type { Product } from "./types"

// List of websites to scrape (for demonstration purposes)
const WEBSITES = [
  { name: "DemoShop", url: "https://example.com/search?q=" },
  { name: "BestDeals", url: "https://example.org/products?query=" },
  { name: "ReviewMart", url: "https://example.net/shop?search=" },
]

export function generateMockProducts(query: string): Product[] {
  const products: Product[] = []

  // Generate 3-5 products for each website
  WEBSITES.forEach((website) => {
    const count = Math.floor(Math.random() * 3) + 3

    for (let i = 0; i < count; i++) {
      // Create more varied prices
      const price = Math.floor(Math.random() * 50000) / 100 + 10

      // Create more varied ratings
      const rating = Math.min(5, Math.round((Math.random() * 2 + 3) * 10) / 10) // Rating between 3 and 5

      // Create more varied review counts
      const reviewCount = Math.floor(Math.random() * 1000) + 5

      products.push({
        title: `${query} ${website.name} Model ${String.fromCharCode(65 + i)} - Premium Quality`,
        price,
        rating,
        reviewCount,
        url: `${website.url}${encodeURIComponent(query)}&product=${i}`,
        imageUrl: `/placeholder.svg?height=200&width=200`,
        source: website.name,
        isBestPrice: false,
        isBestRated: false,
      })
    }
  })

  // Mark best price and best rated products
  if (products.length > 0) {
    // Find product with lowest price
    const bestPrice = products.reduce((prev, current) => (prev.price < current.price ? prev : current))
    bestPrice.isBestPrice = true

    // Find product with highest rating (and if tied, highest review count)
    const bestRated = products.reduce((prev, current) =>
      current.rating > prev.rating || (current.rating === prev.rating && current.reviewCount > prev.reviewCount)
        ? current
        : prev,
    )
    bestRated.isBestRated = true
  }

  return products
}
