import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-200 text-sm  ">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b className="text-center">Action</b>
        </div>

        {/* products List */}

        {list.map((item, indx) => {
          return (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={indx}
            >
              <img className="w-13" src={item.image[0]} alt={item.image[0]} />
              <p> {item.name} </p>
              <p> {item.category} </p>
              <p>
                {currency} {item.price}
              </p>
              <p className="flex gap-x-4 text-right md:text-center cursor-pointer text-lg">
                <Link to={`/update/${item._id}`}>Ed</Link>
                <span onClick={() => removeProduct(item._id)}>X</span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;
