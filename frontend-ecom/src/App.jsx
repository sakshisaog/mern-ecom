import { createBrowserRouter ,RouterProvider} from "react-router-dom"; 
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductDetailes from "./pages/ProductDetailes";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/signup",
    element:<Signup />
  },
  {
    path:"/product/:id",
    element:<ProductDetailes />
  },
  


  {path:"/admin/products",
   element:<ProductList />
  },
  { path:"/admin/products/add",
    element:<AddProduct />
  },
  { path:"/admin/products/edit/:id", element:<EditProduct /> }

]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}