import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/cartTotal";
import Title from "../components/title";
import { ShopContext } from "../context/shopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Lefet Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELEVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="First name"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="Last name"
          />
        </div>
        <input
          type="email"
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          placeholder="Email address"
        />
        <input
          type="text"
          className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="City"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="Street"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="ZipCode"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-1.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          type="number"
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
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
