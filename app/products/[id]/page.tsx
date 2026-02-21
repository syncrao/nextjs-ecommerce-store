"use client";
import { fetcher } from "@/app/lib/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";

type Products = {
  _id: string;
  name: string;
  mrp: number;
  price: number;
  images: { url: string }[];
};

const Product = () => {
  console.log("Product details page rendered");
  const [product, setProduct] = useState<Products | null>(null);
  const params = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  console.log(params);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url,
    });

    alert("Added to cart ✅");
  };

  useEffect(() => {
    fetcher(`/api/products/${params.id}`)
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product details:", err));
  }, [params.id]);

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product?.name}</h2>
      <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default Product;
