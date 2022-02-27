import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";

const PlaceMultipleOrders = (props) => {
  const {
    coin,
    reduceOnly = false,
    onApiResponse,
    quantity,
    bidPrice,
    askPrice,
  } = props;

  const buyDetails = {
    symbol: coin,
    side: "BUY",
    positionSide: reduceOnly ? "SHORT" : "LONG",
    type: "LIMIT",
    timeInForce: "GTX",
    quantity: quantity,
    reduceOnly: reduceOnly,
    price: bidPrice,
  };
  const sellDetails = {
    symbol: coin,
    side: "SELL",
    positionSide: reduceOnly ? "LONG" : "SHORT",
    type: "LIMIT",
    timeInForce: "GTX",
    quantity: quantity,
    reduceOnly: reduceOnly,
    price: askPrice,
  };

  const config = {
    endPoint: EndPoints.placeMultipleOrders.endPoint,
    method: EndPoints.placeMultipleOrders.method,
    details: {
      batchOrders: `[${JSON.stringify(buyDetails)},${JSON.stringify(
        sellDetails
      )}]`,
      timestamp: new Date().getTime(),
    },
  };
  const resHandler = (response) => {
    onApiResponse(response);
  };

  return (
    <div>
      <BinanceRestApi config={config} resHandler={resHandler} />
    </div>
  );
};

export default PlaceMultipleOrders;
