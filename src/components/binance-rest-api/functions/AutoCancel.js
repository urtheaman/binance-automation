import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";

const AutoCancel = (props) => {
  const { pair, countdown } = props;
  const config = {
    endPoint: EndPoints.countdownCancelAll.endPoint,
    method: EndPoints.countdownCancelAll.method,
    details: {
      symbol: pair,
      countdownTime: countdown,
      timestamp: new Date().getTime(),
    },
  };
  const resHandler = (response) => {
    console.log(response);
  };
  return <BinanceRestApi resHandler={resHandler} config={config} />;
};

export default AutoCancel;