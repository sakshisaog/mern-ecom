import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductDetailes from "./pages/ProductDetailes";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Cart from "./pages/Cart";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess"


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailes />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/checkout-address",
        element:<CheckoutAddress/>
      },
       {
        path:"/checkout",
        element:<Checkout/>
      },
      {
        path:"/order-success/:id",
        element:<OrderSuccess/>
      },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
