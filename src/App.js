import React from "react";
import UserData from "./components/binance-stream/functions/UserData";
import Markets from "./Markets";
import './styles/App.css'
// import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import Home from "./Home";
// import Navigation from "./Router/Navigation";

export default function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Navigation />}>
    //       <Route index element={<Home />} />
    //       <Route path="markets" element={<Markets />} />
    //       <Route path="trades" element={<UserData />} />
    //     </Route>
    //   </Routes>
    // </Router>
    <div className="app-container">
      <Markets />
      <UserData />
    </div>
  );
}
