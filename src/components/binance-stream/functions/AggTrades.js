import "./../../../styles/AggTrades.css";
import BinanceStream from "../BinanceStream";
import { useState } from "react";

const AggTrades = (props) => {
  const {
    wsref,
    coin: { pair },
  } = props;
  const [aggTrades, setAggTrades] = useState([]);
  const wsRef = (ws) => wsref(ws);

  const resHandler = (response) => {
    setAggTrades((prev) => {
      return [[+response.p, +response.q], ...prev.slice(0, 40)];
    });
  };
  return (
    <div id="aggtrades-container">
      <BinanceStream
        wsref={wsRef}
        resHandler={resHandler}
        wsEndPoint={pair.toLowerCase() + "@aggTrade"}
      />
      <h3>Aggregate trades</h3>
      {aggTrades?.map((arr, index) => {
        return (
          <div className="agg-trade" key={index}>
            <span className="price">{arr[0]}</span>
            <span className="quantity">{arr[1]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AggTrades;
