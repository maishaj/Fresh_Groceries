import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/order/seller");
      console.log("Orders API response:", data); // Debugging
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[95vh]">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-[95vh]">
        <p>No orders found</p>
      </div>
    );
  }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order) => (
          <div
            key={order._id || Math.random()} // fallback if _id missing
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
          >
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.items?.map((item) => (
                  <div
                    key={item.product?._id || Math.random()}
                    className="flex flex-col"
                  >
                    <p className="font-medium">
                      {item.product?.name || "Unknown Product"}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p>
                {order.address?.street}, {order.address?.city}
              </p>
              <p>
                {order.address?.state}, {order.address?.zipcode},{" "}
                {order.address?.country}
              </p>
              <p>{order.address?.phone}</p>
            </div>

            <p className="font-medium text-lg my-auto">
              {currency}
              {order.amount || 0}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType || "N/A"}</p>
              <p>
                Date:{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              {/* <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
