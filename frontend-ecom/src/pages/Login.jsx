import {useState} from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router';


export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await api.post('/auth/login', form);
            console.log(response, "Login response");
            localStorage.setItem('token', response.data.token);
            setMsg("Login successful");
            setTimeout(() => {
                setMsg("");
            }, 1000); 
            navigate('/'); 
        }
        catch(err){
          console.log(err);

           setMsg(err.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-center">Login to your account</h2>       
                {msg && (
                  <div className="text-red-500 text-center mb-4">
                    {msg}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"  
                            placeholder="Enter your email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            required    
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
} 