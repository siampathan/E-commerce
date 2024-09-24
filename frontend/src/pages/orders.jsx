import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl ">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, indx) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={indx}
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item.image[0]}
                className="w-16 md:w-20"
                alt={item.image[0]}
              />

              <div>
                <p className="sm:text-base font-medium"> {item.name} </p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <div className="flex items-start gap-6 text-sm">
                    <p className="text-lg">
                      {currency} {item.price}
                    </p>
                    <p> Quantity: 1 </p>
                    <p>Size: M</p>
                  </div>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400 ">25 June, 2024</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500 "></p>
                <p className="text-sm md:text-base">Ready to Ship</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
