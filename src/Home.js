import React from "react";
import "./styles/Home.css";

const Home = ({ children }) => {
  return (
    <main className="home-container">
      <h1>
        We Welcome You As A <span>Market Maker</span>
        <span>Trader</span>
      </h1>
      {children}
    </main>
  );
};

export default Home;
