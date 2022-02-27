import { Outlet } from "react-router-dom";
import React from "react";
import CustomLink from "../components/CustomLink";
import "../styles/Navigation.css";
const Navigation = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/markets">Markets</CustomLink>
          </li>
          <li>
            <CustomLink to="/trades">Trades</CustomLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
