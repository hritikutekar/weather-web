import Axios from "axios";
import { OPEN_CAGEDATE_URL, OPEN_CAGEDATE_API_KEY } from "../utils/constants";

export const getAddressFromLatLon = ({ lat, lon }) => {
  return Axios.get(
    `${OPEN_CAGEDATE_URL}/?q=${lat}+${lon}&key=${OPEN_CAGEDATE_API_KEY}`
  );
};

export const getAddressFromName = ({ city }) => {
  return Axios.get(
    `${OPEN_CAGEDATE_URL}/?q=${city}&key=${OPEN_CAGEDATE_API_KEY}`
  );
};
