// app/product/[id]/page.tsx

import ProductClientComponent from "./ProductClientComponent";
import { Product } from "@/app/types/product";
import { notFound } from 'next/navigation';

// Server-side function to fetch product data
async function fetchProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 10 },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const product: Product = await res.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// The next.js app router handles params asynchronously, so make sure to resolve it properly
export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await fetchProduct(params.id);
    
    if (!product) {
      notFound();
    }

    return <ProductClientComponent product={product} />;
  } catch (error) {
    console.error("Error rendering product page:", error);
    throw error;
  }
}
