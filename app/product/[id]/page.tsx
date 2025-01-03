// app/product/[id]/page.tsx

import ProductClientComponent from "./ProductClientComponent";
import { Product } from "@/app/types/product";
import { notFound } from 'next/navigation';

// Define the page props interface
interface PageProps {
  params: {
    id: string;
  };
}

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

export default async function ProductPage({ params }: PageProps) {
  try {
    const product = await fetchProduct(params.id);
    
    if (!product) {
      notFound();
    }

    return <ProductClientComponent product={product} />;
  } catch (error) {
    throw error;
  }
}