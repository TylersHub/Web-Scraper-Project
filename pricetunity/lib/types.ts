export interface Product {
  title: string
  price: number
  rating: number
  reviewCount: number
  url: string
  imageUrl?: string
  source: string
  isBestPrice?: boolean
  isBestRated?: boolean
}
