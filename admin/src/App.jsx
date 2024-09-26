import React, { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Add from "./pages/add";
import List from "./pages/list";
import Orders from "./pages/orders";

import { Routes, Route } from "react-router-dom";
import Login from "./components/login";

const App = () => {
  const [token, setToken] = useState("");
  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
