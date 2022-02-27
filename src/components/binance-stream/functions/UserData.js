import BinanceStream from "../BinanceStream";
import BinanceRestApi from "../../binance-rest-api/BinanceRestApi";
import EndPoints from "../../binance-rest-api/FuturesEndPoints.json";
import { useState, useContext, useCallback } from "react";
import "../../../styles/UserData.css";
import ContextStore from "../../../context-store/context-store";
import CancelOrderBtn from "../../user-interactable/CancelOrderBtn";
import CustomExitBtn from "../../user-interactable/CustomExitBtn";

const UserData = () => {
  const [TRADE_UPDATE, setTRADE_UPDATE] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [ws, setWs] = useState();
  const [listenKey, setListenKey] = useState("");

  const ctx = useContext(ContextStore);

  const config = {
    endPoint: EndPoints.userStreamCreate.endPoint,
    method: EndPoints.userStreamCreate.method,
    details: {
      timestamp: new Date().getTime(),
    },
  };

  const wsRef = (ws) => setWs(ws);

  const apiResHandler = useCallback(
    (response) => setListenKey(() => response.listenKey),
    []
  );

  const checker = (check, checkHandler, res) => {
    if (check.filter((order) => order.i === res.i)) {
      const index = check.findIndex((order) => order.i === res.i);
      checkHandler((prev) => {
        prev.splice(index, 1);
        return [res, ...prev];
      });
    } else checkHandler((prev) => [res, ...prev]);
  };

  const wsResHandler = (response) => {
    if (response.e === "listenKeyExpired") {
      ws.close();
      setReFetch(true);
    }
    if (response.e === "ORDER_TRADE_UPDATE") {
      const res = response.o;
      setTRADE_UPDATE((prev) => [res, ...prev]);

      if (res.S === "NEW") {
        checker(ctx.currentOrders, ctx.currentOrdersHandler, res);
      } else if (res.S === "FILLED") {
        checker(ctx.currentOrders, ctx.currentOrdersHandler, res);
        checker(ctx.currentTrades, ctx.currentTradesHandler, res);
      } else if (res.S === "EXPIRED" || res.S === "CANCELED") {
        checker(ctx.currentOrders, ctx.currentOrdersHandler, res);
      }
    }
    console.log("Current Orders");
    console.log("Current Trades");
    ctx.goLongHandler(false);
    ctx.goShortHandler(false);
    ctx.exitLongHandler(false);
    ctx.exitShortHandler(false);
  };

  return (
    <div className="user-data">
      <BinanceRestApi
        resHandler={apiResHandler}
        config={config}
        reFetch={reFetch}
      />
      <BinanceStream
        wsref={wsRef}
        resHandler={wsResHandler}
        wsEndPoint={listenKey}
      />

      <table className="update">
        <caption>Trade Update</caption>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Side</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Id</th>
            <th>Commission</th>
            <th>reduceOnly</th>
            <th>Profit</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {TRADE_UPDATE?.map((obj, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
                    color:
                      obj.X !== "EXPIRED" && obj.S === "SELL"
                        ? "red"
                        : obj.S === "BUY"
                        ? "lightgreen"
                        : "#fff",
                  }}
                >
                  {obj.s}
                </td>
                <td>{obj.S}</td>
                <td style={{fontWeight: "bold"}}>{obj.p}</td>
                <td>${(+obj.q * +obj.p).toFixed(2)}</td>
                <td>{obj.X}</td>
                <td>{obj.i}</td>
                <td>
                  {-+obj.n}
                  {obj.N}
                </td>
                <td
                  style={{
                    color: obj.R ? "lightgreen" : "red",
                  }}
                >
                  {obj.R ? "✔" : "❌"}
                </td>
                <td
                  style={{
                    color:
                      obj.X !== "EXPIRED" && obj.S === "SELL"
                        ? "red"
                        : obj.S === "BUY"
                        ? "lightgreen"
                        : "#fff",
                  }}
                >
                  {obj.rp}
                </td>
                <td>{new Date(obj.T).toTimeString().slice(0, 8)}</td>
                <td>
                  {ctx.currentOrders.filter((order) => order.id === obj.i) ? (
                    <CancelOrderBtn pair={obj.s} orderId={obj.i} />
                  ) : ctx.currentTrades.filter(
                      (trade) => trade.id === obj.i
                    ) ? (
                    <CustomExitBtn />
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
