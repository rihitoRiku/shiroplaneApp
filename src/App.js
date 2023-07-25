import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Detail from "./pages/detail/Detail";
import NotFound from "./pages/notfound/NotFound";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
