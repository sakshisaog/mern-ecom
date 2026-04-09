import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stock: ''
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                const { name, description, price, category, imageUrl, stock } = response.data;
                setForm({ name, description, price, category, imageUrl, stock });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/products/update/${id}`, form);
            alert("Product updated successfully");
            navigate('/admin/products');
        } catch (err) {
            console.error("Error updating product:", err);
        } finally {
            setSaving(false);
        }
    };

    const fields = [
        { name: 'name', label: 'Product Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'imageUrl', label: 'Image URL', type: 'text' },
        { name: 'stock', label: 'Stock', type: 'number' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500 text-lg animate-pulse">Loading product...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="text-sm text-gray-500 hover:text-gray-800"
                    >
                        ← Back
                    </button>
                </div>

                {/* Image Preview */}
                {form.imageUrl && (
                    <div className="mb-5">
                        <img
                            src={form.imageUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">
                                {label}
                            </label>

                            {type === 'textarea' ? (
                                <textarea
                                    name={name}
                                    value={form[name] || ''}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                                />
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={form[name] || ''}
                                    onChange={handleChange}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            )}
                        </div>
                    ))}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}