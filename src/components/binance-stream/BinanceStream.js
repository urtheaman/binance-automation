import { useEffect } from "react";

const BinanceStream = (props) => {
  const { wsEndPoint, resHandler, wsref } = props;
  const wsUrl = "wss://fstream.binance.com/ws/" + wsEndPoint;

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    wsref(ws);
    ws.onopen = () => console.log("Connected.");

    ws.onping = () => {
      console.log("ping recieved");
      ws.send("pong");
      console.log("pong sent");
    };

    ws.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      resHandler(jsonData);
    };

    ws.onerror = (err) => console.error("Error: ", err);

    ws.onclose = (e) => console.log("Connection closed.", e);
  }, [wsUrl]);
  return null;
};

export default BinanceStream;
