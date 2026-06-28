import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Product } from "../types";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

export const StoreView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const prodData: Product[] = [];
        snapshot.forEach((doc) => {
          prodData.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(prodData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-black text-black dark:text-white p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-white">
              Community Store
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Explore exclusive products and join our communities.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://t.me/yourtelegramgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              Join Telegram
            </a>
            <a
              href="https://whop.com/yourcommunity"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              Join Whop
            </a>
          </div>
        </div>

        {loading ? (
          <div className="text-zinc-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-zinc-500 dark:text-zinc-400 py-12 text-center border border-zinc-200 dark:border-white/5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 transition-colors">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all group flex flex-col shadow-sm"
              >
                <div className="h-48 bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-700">
                      <ShoppingCart className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                    >
                      Buy Now <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
