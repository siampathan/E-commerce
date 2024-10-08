import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const fetchUserList = async (token) => {
  if (!token) return null;
  try {
    const response = await axios.get(backendUrl + "/api/user/userlist", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      return response.data.userList;
    } else toast.error(response.data.message);
  } catch (err) {
    toast.error(err.message);
    return [];
  }
};

const fetchUsersOrders = async (token) => {
  if (!token) return null;
  try {
    const response = await axios.post(
      backendUrl + "/api/order/list",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.orders;
  } catch (err) {
    toast.error(err.message);
    return [];
  }
};

const UserList = ({ token }) => {
  const [userList, setUserList] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedUserList, fetchedOrders] = await Promise.all([
        fetchUserList(token),
        fetchUsersOrders(token),
      ]);

      const userWithTotalQuantity = fetchedUserList.map((user) => {
        const userOrders = fetchedOrders.filter(
          (order) => order.userId === user._id
        );

        // Calculate total quantity from all orders
        const totalQuantity = userOrders.reduce((total, order) => {
          return (
            total + order.items.reduce((sum, item) => sum + item.quantity, 0)
          );
        }, 0);

        const totalPrice = userOrders.reduce((total, order) => {
          return (
            total +
            order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )
          );
        }, 0);

        console.log(totalPrice);

        return {
          ...user,
          totalQuantity,
          totalPrice,
        };
      });

      setUserList(fetchedUserList);
      setOrders(userWithTotalQuantity);
    };

    fetchData();
  }, [token]);

  return (
    <>
      <p className="mb-2">Users Information</p>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[2fr_1fr] border bg-gray-200">
          <div className="grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_1fr] items-center gap-2 py-1 px-2 ">
            <b>Name</b>
            <b>Email</b>
          </div>

          <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr] items-center gap-2 py-1 px-2">
            <b>Quantity</b>
            <b>Total Price</b>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr] border">
          {userList.map((users, indx) => (
            <div
              className="grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_1fr] items-center gap-2 py-1 px-2 text-sm"
              key={indx}
            >
              <p> {users.name} </p>
              <p> {users.email} </p>
            </div>
          ))}

          {Array.isArray(orders) && orders.length > 0 ? ( // Check if orders is an array
            orders.map((order, indx) => (
              <div
                key={indx}
                className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr] items-center gap-2 py-1 px-2 text-sm"
              >
                <p>{order.totalQuantity}</p>
                <p>{order.totalPrice}$</p>
              </div>
            ))
          ) : (
            <p>No orders found</p> // Optional: Handle the case when there are no orders
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
