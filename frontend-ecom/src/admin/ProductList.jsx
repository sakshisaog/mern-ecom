import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);

  

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully");
            loadProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };
      const loadProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Product List</h1>
                <Link to="/admin/products/add" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Add Product
                </Link>
            </div>

            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="text-center">
                            <td className="py-2 px-4 border-b">{product.description}</td>
                            <td className="py-2 px-4 border-b">{product.price}</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-2 px-4 border-b">
                                <Link
                                    to={`/admin/products/update/${product._id}`}
                                    className="px-2 py-1 bg-green-600 text-white rounded"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}