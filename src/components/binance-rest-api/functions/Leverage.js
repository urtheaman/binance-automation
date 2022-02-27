import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";

const Leverage = ({ symbol, leverage }) => {
  

  const config = {
    endPoint: EndPoints.leverage.endPoint,
    method: EndPoints.leverage.method,
    details: {
      symbol: symbol,
      leverage: leverage,
      timestamp: new Date().getTime(),
    },
  };

  const resHandler = (data) => {
    if (data.leverage) {
      console.log(`Leverage ${leverage} set for all coins.`);   
    }
  };

  return <BinanceRestApi resHandler={resHandler} config={config} />;
};

export default Leverage;
