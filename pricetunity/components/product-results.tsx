"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Star, ArrowUpDown, Award, ThumbsUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { getSearchResults } from "../lib/store";
import type { Product } from "../lib/types";

interface Product_Extra {
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  url: string;
  imageUrl?: string;
  source: string;
  isBestPrice?: boolean;
  isBestRated?: boolean;
}

interface Props {
  show: boolean;
  reloadKey: number;
}

export function ProductResults({ show, reloadKey }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showBestPrice, setShowBestPrice] = useState<boolean>(false);
  const [showBestRated, setShowBestRated] = useState<boolean>(false);

  const fetchData = () => {
    //setLoading(true);
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.error("Error fetching data:", error));
    //.finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(); // fetch results whenever reloadKey changes
  }, [reloadKey]);

  // useEffect(() => {
  //   console.log("Setting up store subscription")
  //   // Subscribe to search results updates
  //   const unsubscribe = getSearchResults((results) => {
  //     console.log("Received updated results:", results.length, "products")
  //     setProducts(results)
  //   })

  //   return () => {
  //     console.log("Cleaning up store subscription")
  //     unsubscribe()
  //   }
  // }, [])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      // case "rating-desc":
      //   return b.rating - a.rating || b.reviewCount - a.reviewCount;
      // case "reviews-desc":
      //   return b.reviewCount - a.reviewCount;
      default:
        return Number(a.price) - Number(b.price);
    }
  });

  // Apply filters for best price and best rated
  let filteredProducts =
    activeTab === "all"
      ? sortedProducts
      : sortedProducts.filter((product) => product.source === activeTab);

  if (showBestPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.isBestPrice
    );
  }

  if (showBestRated) {
    filteredProducts = filteredProducts.filter(
      (product) => product.isBestRated
    );
  }

  const sources = [...new Set(products.map((product) => product.source))];

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Search for a product to see results here
        </p>
      </div>
    );
  }

  if (!show) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Results ({products.length})</h2>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="best-price"
              checked={showBestPrice}
              onCheckedChange={(checked) => setShowBestPrice(checked === true)}
            />
            <Label htmlFor="best-price" className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-green-500" />
              Best Price
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="best-rated"
              checked={showBestRated}
              onCheckedChange={(checked) => setShowBestRated(checked === true)}
            />
            <Label htmlFor="best-rated" className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1 text-amber-500" />
              Best Reviews
            </Label>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="price-asc">
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-desc">
                  Price: High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rating-desc">
                  Highest Rating
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="reviews-desc">
                  Most Reviews
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Sources</TabsTrigger>
          {sources.map((source) => (
            <TabsTrigger key={source} value={source}>
              {source}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products match the current filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    {product.image ? (
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No image available
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                      {product.source}
                    </div>

                    {/* Best price badge */}
                    {product.isBestPrice && (
                      <div className="absolute bottom-2 left-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Best Price
                        </Badge>
                      </div>
                    )}

                    {/* Best rated badge */}
                    {product.isBestRated && (
                      <div className="absolute bottom-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center"
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Best Reviews
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2 h-12">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-amber-400 text-amber-400"
                                : i < product.rating
                                ? "fill-amber-400 text-amber-400 fill-half"
                                : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Number(product.rating).toFixed(1)} (
                        {product.reviewCount})
                      </span>
                    </div>
                    <div className="mt-2 text-lg font-bold">
                      {product.price}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        View Product
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
