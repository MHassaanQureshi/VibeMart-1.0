// app/product/[id]/page.tsx
import ProductClientComponent from "./ProductClientComponent";
import { Product } from "@/app/types/product";
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const product: Product = await response.json();
    
    if (!product) {
      notFound();
    }

    return <ProductClientComponent product={product} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
