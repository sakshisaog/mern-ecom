import {useState} from 'react';
import api from '../api/axios'; 
import { useNavigate } from 'react-router';
export default function AddProduct() {
    const[form,setForm] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        stock: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products/add', form);
            alert("Product added successfully");

            navigate('/admin/products   ');
        }
        catch(err){
            console.log(err);
            console.error("Error adding product:", err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-center">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {
                        /* Form fields for product details */
                        Object.keys(form).map((key) => (
                           <input
                                key={key}
                                name={key}
                                value={form[key]}
                                onChange={handleChange}
                                placeholder={key}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ))
                    }
                    <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
                    