import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";

const IncomeHistory = (props) => {
  const { incomeArray } = props;
  const config = {
    endPoint: EndPoints.income.endPoint,
    method: EndPoints.income.method,
    details: {
      timestamp: new Date().getTime(),
    },
  };
  const resHandler = (response) => {
    incomeArray(response)
  };
  return <BinanceRestApi resHandler={resHandler} config={config} />;
};

export default IncomeHistory;
