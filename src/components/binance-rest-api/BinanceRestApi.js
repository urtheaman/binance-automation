import { useEffect } from "react";
import forge from "node-forge";
import apiConfig from "../../test-secret/config.json";

const BinanceRestApi = (props) => {
  const {
    resHandler,
    reFetch = false,
    config: { details, endPoint, method },
  } = props;
  const API_KEY = apiConfig.API_KEY;
  const API_SECRET = apiConfig.SECRET_KEY;
  const url = "https://fapi.binance.com";

  // hash generate
  const queryStr = Object.keys(details)
    .map((key) => `${key}=${details[key]}`)
    .join("&");

    const hmac = forge.hmac.create();
    hmac.start("sha256", API_SECRET);
    hmac.update(queryStr);
    const hashed = hmac.digest().toHex();

  useEffect(() => {
    // sending api request
    fetch(`${url}${endPoint}?${queryStr}&signature=${hashed}`, {
      method: method,
      headers: {
        "X-MBX-APIKEY": API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => resHandler(data))
      .catch((err) => console.error(err));
  }, [reFetch]);
  return null;
};

export default BinanceRestApi;
