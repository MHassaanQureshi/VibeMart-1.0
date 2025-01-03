// app/product/[id]/page.tsx

import ProductClientComponent from "./ProductClientComponent";
import { Product } from "@/app/types/product";
import { notFound } from 'next/navigation';

// Remove the PageProps interface since it's causing conflicts
export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const product = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
      next: { revalidate: 10 },
    }).then(res => {
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    });
    
    if (!product) {
      notFound();
    }

    return <ProductClientComponent product={product} />;
  } catch (error) {
    throw error;
  }
}
