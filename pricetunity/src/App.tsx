import React, { useState } from "react";
import { SearchForm } from "@/components/search-form";
import { ProductResults } from "@/components/product-results";
import { AIChatbot } from "@/components/ai-chatbot";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/components/notification-provider";

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const searchProducts = (searchTerm: string) => {
    setLoading(true);
    fetch("http://localhost:5000/api/data", {
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
        setReloadKey((prev) => prev + 1); // trigger reload in DatabaseComp
      })
      .catch((error) => console.error("Error scraping:", error))
      .finally(() => setLoading(false));
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NotificationProvider>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-5xl font-bold tracking-tight mb-3">
                Pricetunity
              </h1>
              <p className="text-muted-foreground">
                Search for products across the best websites to find the best
                prices and reviews
              </p>
            </div>
            <SearchForm onSearch={searchProducts}/>
            <ProductResults show={showResults} reloadKey={reloadKey}/>
          </div>
          {/* Theme Toggle Button */}
          <ThemeToggle />
          {/* Floating AI Chatbot */}
          <AIChatbot />
        </main>
      </NotificationProvider>
    </ThemeProvider>
  );
}
