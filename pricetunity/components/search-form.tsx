"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotifications } from "@/components/notification-provider";
import { generateMockProducts } from "@/lib/mock-data";
import { updateSearchResults } from "@/lib/store";

export function SearchForm() {
  const [query, setQuery] = useState("headphones");
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      addNotification({
        title: "Please enter a search query",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Add a small delay to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate mock products on the client side
      const mockProducts = generateMockProducts(query);
      console.log("Generated mock products:", mockProducts);

      // Update the store with the results
      updateSearchResults(mockProducts);

      addNotification({
        title: "Search completed",
        description: `Found ${mockProducts.length} products`,
        type: "success",
      });
    } catch (error) {
      addNotification({
        title: "Error searching products",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="space-y-2">
        <Label htmlFor="search">Product Search</Label>
        <div className="flex gap-2">
          <Input
            id="search"
            placeholder="Enter product name (e.g., 'wireless headphones')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-1">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Searching
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                Search
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
