import "./../styles/MarketDepthSingle.css";
import MarketDepth from "./binance-stream/functions/MarketDepth";
import MarketPairs from "../MarketPairs.json";
import React, { useState, useEffect, useContext } from "react";
import AggTrades from "./binance-stream/functions/AggTrades";
import BookTicker from "./binance-stream/functions/BookTicker";
import ContextStore from "../context-store/context-store";

const MarketDepthSingle = () => {
  const [pair, setPair] = useState(MarketPairs[0]);
  const [depthWs, setDepthWs] = useState();
  const [aggWs, setAggWs] = useState();
  const [tickerWs, setTickerWs] = useState();

  const ctx = useContext(ContextStore);

  const selectHandler = (e) => {
    setPair(() => {
      const tradePair = MarketPairs.filter(
        (data) => data.pair === e.target.value
      );
      return tradePair[0];
    });
    depthWs.close();
    aggWs.close();
    tickerWs.close();
  };

  useEffect(() => {
    ctx.symbolHandler(pair);
  }, [pair]);

  const depthWsHandler = (ws) => setDepthWs(ws);
  const aggWsHandler = (ws) => setAggWs(ws);
  const tickerWsHandler = (ws) => setTickerWs(ws);

  return (
    <div className="depth-data-container">
      <MarketDepth wsref={depthWsHandler} coin={pair} />
      <div className="order-book">
        <AggTrades wsref={aggWsHandler} coin={pair} />
        <BookTicker wsref={tickerWsHandler} coin={pair}>
          <select className="pair-select" onChange={selectHandler}>
            {MarketPairs.map((data, index) => {
              return (
                <option key={index} value={data.pair}>
                  {data.pair}
                </option>
              );
            })}
          </select>
        </BookTicker>
      </div>
    </div>
  );
};

export default MarketDepthSingle;
