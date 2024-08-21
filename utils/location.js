const { default: axios } = require("axios");
const HttpError = require("../models/http-error");

const getCoordsForAddress = async (address) => {
  let data;
  try {
    const url = "https://api.mapbox.com/geocoding/v5";
    const endpoint = "mapbox.places";
    const searchText = encodeURIComponent(address);
    const API_KEY =
      "pk.eyJ1IjoiamFja2hhbnNlbiIsImEiOiJjbHZ4aGl4MDYyZW1pMnFtczk5dGpwcXRoIn0.pqVM6L1Muhi7X0z4Fbef0Q";

    const response = await axios({
      method: "GET",
      url: `${url}/${endpoint}/${searchText}.json/?access_token=${API_KEY}`,
    });
    data = response.data;
  } catch (e) {
    throw new HttpError(
      "Could not find location for the specified address",
      422,
    );
  }

  const [lng, lat] = data.features[0].center;

  return { lat, lng };
};

module.exports = getCoordsForAddress;
