import type { Product } from "./types"

// Simple client-side store for search results
let searchResults: Product[] = []
let listeners: ((products: Product[]) => void)[] = []

export function updateSearchResults(products: Product[]) {
  console.log("Updating search results with", products.length, "products")
  searchResults = products
  notifyListeners()
}

export function getSearchResults(callback: (products: Product[]) => void) {
  // Add the listener
  listeners.push(callback)

  // Immediately call with current results
  callback(searchResults)

  // Return unsubscribe function
  return () => {
    listeners = listeners.filter((listener) => listener !== callback)
  }
}

function notifyListeners() {
  console.log("Notifying", listeners.length, "listeners about updated results")
  listeners.forEach((listener) => listener(searchResults))
}
