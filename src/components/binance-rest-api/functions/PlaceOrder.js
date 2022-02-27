import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";

const PlaceOrder = (props) => {
  const {
    coin,
    side,
    reduceOnly = false,
    quantity,
    onApiResponse,
    price,
  } = props;

  const config = {
    endPoint: EndPoints.placeOrder.endPoint,
    method: EndPoints.placeOrder.method,
    details: {
      symbol: coin,
      side: side,
      type: "LIMIT",
      timeInForce: "GTX",
      quantity: quantity,
      price: price,
      timestamp: new Date().getTime(),
    },
  };

  if (reduceOnly) {
    if (side === "BUY") config.details.positionSide = "SHORT";
    else config.details.positionSide = "LONG";
    // config.details.reduceOnly = reduceOnly;
    // config.details.closePosition = reduceOnly;
  } else {
    if (side === "BUY") config.details.positionSide = "LONG";
    else config.details.positionSide = "SHORT";
  }

  const resHandler = (data) => {
    onApiResponse(data);
  };

  return <BinanceRestApi resHandler={resHandler} config={config} />;
};

export default PlaceOrder;
