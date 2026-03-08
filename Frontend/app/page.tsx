"use client";

import { useState } from "react";
import { SearchForm } from "@/components/search-form";
import { ProductResults } from "@/components/product-results";
import { AIChatbot } from "@/components/ai-chatbot";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "https://pricetunity-backend-render.onrender.com";

  const searchProducts = (searchTerm: string) => {
    setLoading(true);
    fetch(`${BASE_URL}/api/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchTerm }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log(`Scraping started for: ${searchTerm}`);
        setShowResults(true);
        setReloadKey((prev) => prev + 1);
      })
      .catch((error) => console.error("Error scraping:", error))
      .finally(() => setLoading(false));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-3">Pricetunity</h1>
          <p className="text-muted-foreground">
            Search for products across the best websites to find the best prices and
            reviews
          </p>
        </div>
        <SearchForm onSearch={searchProducts} productCount={productCount} />
        <ProductResults
          show={showResults}
          reloadKey={reloadKey}
          onProductCountChange={setProductCount}
        />
      </div>
      <ThemeToggle />
      <AIChatbot />
    </main>
  );
}
