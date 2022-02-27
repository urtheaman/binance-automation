import BinanceRestApi from "../BinanceRestApi";
import EndPoints from '../FuturesEndPoints.json'

const CancelOrder = (props) => {
    const {pair, orderId} = props
    const config = {
      endPoint: EndPoints.cancelOrder.endPoint,
      method: EndPoints.cancelOrder.method,
      details: {
          symbol: pair,
        orderId: orderId,
        timestamp: new Date().getTime(),
      },
    };
    const resHandler = (response) => {
        console.log(response)
    }
    return <BinanceRestApi resHandler={resHandler} config={config} />
}

export default CancelOrder