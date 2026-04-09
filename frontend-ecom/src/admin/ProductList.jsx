import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const loadProducts = async () => {
        try {
            const response = await api.get(`/products?search=${search}`);
            setProducts(response.data);
        } catch (err) {
            console.error("Error loading products:", err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully");
            loadProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [search]); 

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">

            {/* Header */}
            <div className="flex flex-col gap-4 mb-6 w-full max-w-4xl mx-auto">

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Product List
                    </h1>

                    <Link
                        to="/admin/products/add"
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        + Add Product
                    </Link>
                </div>

                {/* 🔍 SEARCH INPUT */}
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Product Grid */}
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl mx-auto">
                {products.length === 0 ? (
                    <p className="text-gray-500">No products found</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 w-full sm:w-[300px]"
                        >
                            {/* Image */}
                            {product.imageUrl && (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded"
                                    onError={(e) =>
                                        (e.target.style.display = "none")
                                    }
                                />
                            )}

                            {/* Info */}
                            <h2 className="text-xl font-semibold text-gray-800">
                                {product.name}
                            </h2>

                            <p className="text-gray-500 text-sm">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-indigo-600 font-bold text-lg">
                                    ₹{product.price}
                                </span>
                                <span className="text-sm text-gray-400">
                                    Stock: {product.stock}
                                </span>
                            </div>

                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded w-fit">
                                {product.category}
                            </span>

                            {/* Actions */}
                            <div className="flex gap-3 mt-3">
                                <Link
                                    to={`/admin/products/edit/${product._id}`}
                                    className="flex-1 text-center bg-yellow-400 text-white py-1.5 rounded hover:bg-yellow-500"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="flex-1 bg-red-500 text-white py-1.5 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}