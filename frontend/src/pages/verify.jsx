import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async (req, res) => {
    try {
      if (!token) return null;

      const response = await axios.post(
        `${backendUrl}/api/order/verifystripe`,
        { success, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>Verify</div>;
};

export default Verify;
