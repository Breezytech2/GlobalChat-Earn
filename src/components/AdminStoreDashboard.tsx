import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { db, storage } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "../types";
import { Plus, Edit2, Trash2, Image as ImageIcon, X } from "lucide-react";

export const AdminStoreDashboard: React.FC = () => {
  const { currentUser } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser.role !== "admin") return;
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prodData: Product[] = [];
      snapshot.forEach((doc) =>
        prodData.push({ id: doc.id, ...doc.data() } as Product),
      );
      setProducts(prodData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser.role]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setExternalUrl("");
    setImageFile(null);
    setImageUrl("");
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setDescription(prod.description);
    setPrice(prod.price.toString());
    setExternalUrl(prod.externalUrl);
    setImageUrl(prod.imageUrl);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete product.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const storageRef = ref(
          storage,
          `products/${Date.now()}_${imageFile.name}`,
        );
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      const productData = {
        name,
        description,
        price: parseFloat(price),
        externalUrl,
        imageUrl: finalImageUrl,
      };

      if (editingProduct) {
        await updateDoc(doc(db, "products", editingProduct.id), productData);
      } else {
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch (e) {
      console.error(e);
      alert("Error saving product.");
    } finally {
      setSaving(false);
    }
  };

  if (currentUser.role !== "admin") {
    return <div className="p-8 text-red-500">Access Denied. Admins only.</div>;
  }

  return (
    <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Store Products</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="text-zinc-500">Loading products...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="py-3 px-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">URL</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr
                  key={prod.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {prod.imageUrl ? (
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-10 h-10 rounded bg-zinc-900 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-zinc-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">
                          {prod.name}
                        </div>
                        <div className="text-xs text-zinc-500 line-clamp-1">
                          {prod.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    ${prod.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-zinc-400 max-w-[150px] truncate">
                    <a
                      href={prod.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white underline"
                    >
                      Link
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(prod)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-zinc-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={resetForm}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
                  Price ($)
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
                  External Buy URL
                </label>
                <input
                  required
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20"
                />
                {imageUrl && !imageFile && (
                  <p className="text-xs text-zinc-500 mt-2">
                    Current image active
                  </p>
                )}
              </div>
              <button
                disabled={saving}
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
