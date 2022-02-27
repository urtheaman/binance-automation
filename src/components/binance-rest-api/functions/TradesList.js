import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";

const TradesList = (props) => {
  const { pair } = props;
  const config = {
    endPoint: EndPoints.userTrades.endPoint,
    method: EndPoints.userTrades.method,
    details: {
      symbol: pair,
      timestamp: new Date().getTime(),
    },
  };
  const resHandler = (response) => {
    console.log(response);
  };
  return <BinanceRestApi resHandler={resHandler} config={config} />;
};

export default TradesList;