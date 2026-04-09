import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Load cart + addresses
  useEffect(() => {
    if (!userId) return;

    api.get(`/cart/${userId}`).then((res) => setCart(res.data));

    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      setSelectedAddress(res.data[0]);

      // If no address → show form directly
      if (res.data.length === 0) {
        setShowForm(true);
      }
    });
  }, []);

  if (!cart) return <div className="p-6">Loading...</div>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  // PLACE ORDER
  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    const res = await api.post("/order/place", {
      userId,
      address: selectedAddress,
    });

    navigate(`/order-success/${res.data.orderId}`);
  };

  // SAVE NEW ADDRESS
  const saveAddress = async () => {
    const res = await api.post("/address/add", {
      userId,
      ...newAddress,
    });

    setAddresses([...addresses, res.data]);
    setSelectedAddress(res.data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f1] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-2xl font-semibold text-gray-800">Checkout</h1>

        {/* ADDRESS SECTION */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="font-medium text-gray-700 mb-4">
            Delivery Address
          </h2>

          {/* Address List */}
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`block p-3 rounded-lg border cursor-pointer transition
                ${
                  selectedAddress?._id === addr._id
                    ? "border-[#6b705c] bg-[#f6f7f3]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex gap-3">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress?._id === addr._id}
                    onChange={() => setSelectedAddress(addr)}
                    className="mt-1 accent-[#6b705c]"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      {addr.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-sm text-gray-500">📞 {addr.phone}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* ADD ADDRESS BUTTON */}
          {!showForm && (
            <div className="mt-5 border-t pt-4">
              <button
                onClick={() => setShowForm(true)}
                className="text-[#6b705c] font-medium hover:underline"
              >
                + Add New Address
              </button>
            </div>
          )}

          {/* ADDRESS FORM */}
          {showForm && (
            <div className="mt-5 space-y-3 border-t pt-4">

              <input
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafaf7] focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, fullName: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafaf7] focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
              />

              <input
                placeholder="Address Line"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafaf7] focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressLine: e.target.value })
                }
              />

              <input
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafaf7] focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />

              <input
                placeholder="State"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafaf7] focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />

              <input
                placeholder="Pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fafaf7] focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
              />

              <button
                onClick={saveAddress}
                className="w-full bg-[#6b705c] text-white py-2 rounded-md hover:bg-[#5a5f4d] transition"
              >
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="font-medium text-gray-700 mb-3">
            Order Summary
          </h2>

          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="mt-5 w-full bg-[#3a5a40] text-white py-2.5 rounded-md font-medium hover:bg-[#344e41] transition active:scale-[0.98]"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}