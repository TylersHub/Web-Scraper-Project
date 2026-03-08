export interface Product {
  id?: number;
  name?: string;
  title?: string;
  image?: string;
  imageUrl?: string;
  url: string;
  price: string | number;
  rating?: number;
  reviewCount?: number;
  source?: string;
  isBestPrice?: boolean;
  isBestRated?: boolean;
}
