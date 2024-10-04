import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/shopContext";
import { toast } from "react-toastify";
import CartTotal from "../components/cartTotal";
import Title from "../components/title";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChngeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      console.log(orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //API call for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log("order places" + response.data);

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
            console.log(response.data.message);
          }
          break;

        case "stripe":
          try {
            const responseStripe = await axios.post(
              `${backendUrl}/api/order/stripe`,
              orderData,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Stripe response:", responseStripe.data);

            if (responseStripe.data && responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          } catch (error) {
            console.error("Error during Stripe payment:", error.message);
            toast.error("Failed to initiate payment. Please try again later.");
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  console.log(method);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Lefet Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELEVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChngeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="First name"
          />
          <input
            required
            type="text"
            onChange={onChngeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="Last name"
          />
        </div>
        <input
          required
          type="email"
          onChange={onChngeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          placeholder="Email address"
        />
        <input
          required
          type="text"
          onChange={onChngeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChngeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="City"
          />
          <input
            required
            type="text"
            onChange={onChngeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="number"
            onChange={onChngeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="ZipCode"
          />
          <input
            required
            type="text"
            onChange={onChngeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          required
          type="number"
          onChange={onChngeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          placeholder="Phone"
        />
      </div>

      {/* Right Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-800">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 `}>
                <img
                  src={assets.stripe_logo}
                  className="h-5 mx-4 "
                  alt={assets.stripe_logo}
                />
              </p>
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3 h-3 `}>
                <img
                  src={assets.razorpay_logo}
                  className="h-5 mx-4 "
                  alt={assets.razorpay_logo}
                />
              </p>
            </div>
            <div
              onClick={() => setMethod("COD")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3 h-3 mb-3 text-gray-500 font-medium mx-4`}>
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
