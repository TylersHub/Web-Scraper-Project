"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProductDetail {
  id: number;
  name: string;
  image: string;
  url: string;
  price: string;
  description?: string;
}

async function loadProduct(baseUrl: string, id: string): Promise<ProductDetail | null> {
  try {
    const response = await fetch(`${baseUrl}/api/data/${id}`, { cache: "no-store" });
    if (response.ok) {
      const product = (await response.json()) as ProductDetail;
      return {
        ...product,
        description:
          product.description && product.description !== "Description not available."
            ? product.description
            : "Couldn't load description.",
      };
    }
  } catch {}

  try {
    const listResponse = await fetch(`${baseUrl}/api/data`, { cache: "no-store" });
    if (!listResponse.ok) {
      return null;
    }
    const products = (await listResponse.json()) as ProductDetail[];
    const match = products.find((p) => String(p.id) === id);
    if (!match) {
      return null;
    }
    return {
      ...match,
      description: "Couldn't load description.",
    };
  } catch {
    return null;
  }
}

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const id = params?.id;
  const fallbackProduct: ProductDetail | null =
    searchParams.get("url") && searchParams.get("name")
      ? {
          id: 0,
          name: searchParams.get("name") || "Unnamed Product",
          image: searchParams.get("image") || "",
          url: searchParams.get("url") || "",
          price: searchParams.get("price") || "Price not available",
          description: searchParams.get("description") || "Couldn't load description.",
        }
      : null;

  useEffect(() => {
    let cancelled = false;

    if (!id || !BASE_URL || id === "external") {
      setIsLoading(false);
      return;
    }

    loadProduct(BASE_URL, id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, BASE_URL]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <Link href="/" className="text-sm underline underline-offset-4">
            Back to search
          </Link>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    if (fallbackProduct) {
      return (
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/" className="text-sm underline underline-offset-4">
              Back to search
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="rounded-lg border bg-muted/30 overflow-hidden">
                {fallbackProduct.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fallbackProduct.image}
                    alt={fallbackProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-8 text-muted-foreground">No image available</div>
                )}
              </div>

              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{fallbackProduct.name}</h1>
                <p className="text-xl font-semibold">{fallbackProduct.price}</p>
                <p className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
                  {fallbackProduct.description || "Couldn't load description."}
                </p>
                <Button asChild>
                  <a href={fallbackProduct.url} target="_blank" rel="noopener noreferrer">
                    Open on Store
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <Link href="/" className="text-sm underline underline-offset-4">
            Back to search
          </Link>
          <h1 className="text-2xl font-bold">Product unavailable</h1>
          <p className="text-muted-foreground">
            We could not load this product right now. Try searching again and reopening the result.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/" className="text-sm underline underline-offset-4">
          Back to search
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="rounded-lg border bg-muted/30 overflow-hidden">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="p-8 text-muted-foreground">No image available</div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold">{product.price}</p>
            <p className="text-sm leading-6 text-muted-foreground whitespace-pre-wrap">
              {product.description || "Couldn't load description."}
            </p>
            <Button asChild>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                Open on Store
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
