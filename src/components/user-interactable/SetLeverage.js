import MarketPairs from "../../MarketPairs.json";
import Leverage from "../binance-rest-api/functions/Leverage";
import React, { useContext, useState } from "react";
import ContextStore from "../../context-store/context-store";
import "../../styles/SetLeverage.css";

const SetLeverage = () => {
  const [leverage, setLeverage] = useState(1);
  const [clicked, setClicked] = useState(true)
  const ctx = useContext(ContextStore);

  const changeLeverageHandler = (e) => {
    setLeverage(+e.target.value);
    setClicked(false)
  };
  const setLeverageHandler = () => {
    ctx.leverageHandler(leverage);
    localStorage.setItem("leverage", leverage);
    setClicked(true)
  };
  return (
    <div className="set-leverage">
      <input
        type="number"
        min={1}
        max={20}
        placeholder={"1 : " + ctx.leverage}
        onChange={changeLeverageHandler}
      />
      <button onClick={setLeverageHandler}>Set</button>
      {clicked
        ? MarketPairs.map((data, index) => {
            return (
              <Leverage
                key={index}
                symbol={data.pair}
                leverage={ctx.leverage}
              />
            );
          })
        : null}
    </div>
  );
};

export default SetLeverage;
