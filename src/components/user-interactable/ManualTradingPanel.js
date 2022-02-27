import React, { useContext, useState } from "react";
import Balance from "../binance-rest-api/functions/Balance";
import LongEntry from "../strategy/LongEntry";
import LongExit from "../strategy/LongExit";
import ShortEntry from "../strategy/ShortEntry";
import ShortExit from "../strategy/ShortExit";
import "../../styles/ManualTradingPanel.css";
import AutoTradeQty from "./AutoTradeQty";
import ContextStore from "../../context-store/context-store";
import SetLeverage from "./SetLeverage";

const ManualTradingPanel = ({ bestBid, bestAsk }) => {
    const [reFetch, setReFetch] = useState(false);

  const ctx = useContext(ContextStore);

  const longHandler = () => {
    ctx.goLongHandler(true);
    setReFetch(!reFetch);
  };
  const shortHandler = () => {
    ctx.goShortHandler(true);
    setReFetch(!reFetch);
  };
  const exitShortHandler = () => {
    ctx.exitShortHandler(true);
    setReFetch(!reFetch);
  };
  const exitLongHandler = () => {
    ctx.exitLongHandler(true);
    setReFetch(!reFetch);
  };
  const dualEntryHandler = () => {
    longHandler();
    shortHandler();
  };
  const dualExitHandler = () => {
    exitLongHandler();
    exitShortHandler();
  };

  return (
    <div className="manual-trading-container">
      <AutoTradeQty />
      <div className="ac-info">
        {reFetch ? <Balance /> : <Balance />}
        <SetLeverage />
      </div>
      <div className="btns-container">
        <div className="entry-div">
          <button className="entry-btn" onClick={dualEntryHandler}>
            Dual Entry
          </button>
          <button className="entry-btn" onClick={longHandler}>
            Go Long
          </button>
          {ctx.goLong ? <LongEntry bestBid={bestBid} /> : null}
          <button className="entry-btn" onClick={shortHandler}>
            Go Short
          </button>
          {ctx.goShort ? <ShortEntry bestAsk={bestAsk} /> : null}
        </div>

        <div className="exit-div">
          <button className="exit-btn" onClick={dualExitHandler}>
            Dual Exit
          </button>
          <button className="exit-btn" onClick={exitShortHandler}>
            Exit Long
          </button>
          {ctx.exitShort ? <ShortExit bestAsk={bestAsk} /> : null}
          <button className="exit-btn" onClick={exitLongHandler}>
            Exit Short
          </button>
          {ctx.exitLong ? <LongExit bestBid={bestBid} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ManualTradingPanel;
