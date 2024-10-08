import { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

import {
  filterdOrders,
  calculatePrice,
  totalQuantity,
} from "../utils/orderCalculate";
import axios from "axios";
import PieChartDiagram from "./piechart";

function Home({ token }) {
  const [menList, setMenList] = useState([]);
  const [womenList, setWomenList] = useState([]);
  const [kidList, setKidList] = useState([]);

  const [menSell, setMenSell] = useState(0);
  const [womenSell, setWomenSell] = useState(0);
  const [kidsSell, setKidsSell] = useState(0);
  const [sell, setTotalSell] = useState(0);

  const [delivered, setDelivered] = useState({ Men: 0, Women: 0, Kids: 0 });

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        const products = response.data.products;

        // Filter products by category
        const menProducts = products.filter(
          (product) => product.category === "Men"
        );
        const womenProducts = products.filter(
          (product) => product.category === "Women"
        );
        const kidProducts = products.filter(
          (product) => product.category === "Kids"
        );

        setMenList(menProducts.length);
        setWomenList(womenProducts.length);
        setKidList(kidProducts.length);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const orders = response.data.orders;

        const filteredMenOrders = filterdOrders(orders, "Men");
        const totalMenSell = calculatePrice(filteredMenOrders, "Men");

        const filteredWomenOrders = filterdOrders(orders, "Women");
        const totalWomenSell = calculatePrice(filteredWomenOrders, "Women");

        const filteredKidsOrders = filterdOrders(orders, "Kids");
        const totalKidsSell = calculatePrice(filteredKidsOrders, "Kids");

        const totalMenDelivered = totalQuantity(orders, "Men");
        const totalWomenDelivered = totalQuantity(orders, "Women");
        const totalKidsDelivered = totalQuantity(orders, "Kids");

        setDelivered({
          Men: totalMenDelivered,
          Women: totalWomenDelivered,
          Kids: totalKidsDelivered,
        });

        const totalAmount = totalMenSell + totalWomenSell + totalKidsSell;

        setMenSell(totalMenSell);
        setWomenSell(totalWomenSell);
        setKidsSell(totalKidsSell);
        setTotalSell(totalAmount);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
    fetchAllOrders();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>MEN TOTAL ITEMS: {menList}</b>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>WOMEN TOTAL ITEMS: {womenList}</b>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>KIDS TOTAL ITEMS: {kidList}</b>
        </div>
      </div>

      <div className="flex flex-col justify-center md:flex-row">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b> MEN TOTAL SELL : {menSell}$</b>
          <b> WOEN TOTAL SELL : {womenSell}$</b>
          <b> KIDS TOTAL SELL : {kidsSell} $</b>
          <b>Sum Of Toal: {sell} $</b>
        </div>
        <div className="border px-8 md:px-8 py-8 sm:py-10 flex flex-col gap-5 ">
          <PieChartDiagram delivered={delivered} />
        </div>
      </div>
    </>
  );
}

export default Home;
