import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: ''
    });

    const allowedFields = ['title','description','price','category','image','stock'];

    // ✅ FIXED: useEffect at top level
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await api.get('/products');
                const product = response.data.find(p => p._id === id);

                if (product) {
                    setForm(product);
                }
            } catch (err) {
                console.error(err);
            }
        };

        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/update/${id}`, form);
            alert("Product updated successfully");
            navigate('/admin/products');
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-center mb-4">Edit Product</h2>

                {allowedFields.map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={form[key] || ''}
                        onChange={handleChange}
                        placeholder={key}
                        className="block w-full px-3 py-2 border rounded"
                    />
                ))}

                <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded">
                    Update Product
                </button>
            </form>
        </div>
    );
}