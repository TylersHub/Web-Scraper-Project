// This script demonstrates how to use Cheerio to scrape product information
// You can run this script to test scraping functionality

import fetch from "node-fetch"
import * as cheerio from "cheerio"

// Example function to scrape a product listing page
async function scrapeProductListing(url) {
  try {
    console.log(`Scraping ${url}...`)

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Example selectors - these would need to be adjusted for each website
    const products = []

    // Example: Scraping Amazon-like product listings
    $(".s-result-item").each((i, el) => {
      const title = $(el).find("h2").text().trim()
      const priceText = $(el).find(".a-price-whole").text().trim()
      const price = priceText ? Number.parseFloat(priceText.replace(/[^0-9.]/g, "")) : null
      const ratingText = $(el).find(".a-icon-star-small").text().trim()
      const rating = ratingText ? Number.parseFloat(ratingText.split(" ")[0]) : null
      const reviewCountText = $(el).find(".a-size-small .a-link-normal").text().trim()
      const reviewCount = reviewCountText ? Number.parseInt(reviewCountText.replace(/[^0-9]/g, ""), 10) : 0
      const url = $(el).find("a.a-link-normal").attr("href")
      const imageUrl = $(el).find("img").attr("src")

      if (title && price) {
        products.push({
          title,
          price,
          rating: rating || 0,
          reviewCount: reviewCount || 0,
          url: url ? new URL(url, "https://example.com").href : "",
          imageUrl,
          source: "Example",
        })
      }
    })

    console.log(`Found ${products.length} products`)
    console.log(products)

    return products
  } catch (error) {
    console.error("Error scraping products:", error)
    return []
  }
}

// Example usage
// Note: This is for demonstration purposes only
// Scraping websites may be against their terms of service
// Always check the robots.txt file and terms of service before scraping

// Uncomment to test:
// scrapeProductListing("https://example.com/search?q=headphones")
console.log("This is a test script for the web scraper. Modify the URL and selectors to test with real websites.")
console.log("Remember to check the website's robots.txt and terms of service before scraping.")
