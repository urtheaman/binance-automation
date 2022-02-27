import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";

const CancelAllOrders = (props) => {
  const { pair } = props;
  const config = {
    endPoint: EndPoints.cancelOrder.endPoint,
    method: EndPoints.cancelOrder.method,
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

export default CancelAllOrders;
