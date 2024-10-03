import { useEffect } from "react";
import { useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, indx) => (
          <div key={indx}>
            <img src={assets.parcel_icon} alt={assets.parcel_icon} />
            <div>
              <div>
                {order.items.map((item, indx) => {
                  if (indx === order.items.length - 1) {
                    return (
                      <p key={indx}>
                        {item.name} X {item.quantity} <span> {item.size} </span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={indx}>
                        {item.name} X {item.quantity} <span> {item.size} </span>
                        ,
                      </p>
                    );
                  }
                })}
              </div>
              <p> {order.address.firstName + " " + order.address.lastName} </p>

              <div>
                <p> {order.address.street} ,</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                  ,
                </p>
              </div>
              <p> {order.address.phone} </p>
            </div>

            <div>
              <p>Items: {order.items.length} </p>
              <p> Method: {order.paymentMethod} </p>
              <p> Payment: {order.payment ? "Done" : "Pending"} </p>
              <p> Date: {new Date(order.date).toLocaleDateString()} </p>
            </div>

            <p>
              {currency}
              {order.amount}
            </p>

            <select>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Deliverd"> Deliverd </option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
