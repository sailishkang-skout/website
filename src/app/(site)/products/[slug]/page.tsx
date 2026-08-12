import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS_DATA } from "@/lib/productData";
import ProductDetailClient from "@/components/products/ProductDetailClient";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(PRODUCTS_DATA).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = PRODUCTS_DATA[params.slug];
  if (!product) {
    return {
      title: "Product Not Found | Skout AI",
    };
  }

  return {
    title: `${product.title} - ${product.eyebrow} | Skout AI`,
    description: `${product.headline} ${product.subheadline}`,
    openGraph: {
      title: `${product.title} | Skout AI GTM Platform`,
      description: product.subheadline,
      url: `https://skoutai.io/products/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS_DATA[params.slug];

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
