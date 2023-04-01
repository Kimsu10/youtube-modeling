const fetch = require("node-fetch");

export async function getCurrentLocation() {
  const response = await fetch("https://geolocation-db.com/json/");
  const json = await response.json();
  return {
    latitude: json.latitude,
    longitude: json.longitude,
  };
}

getCurrentLocation().then((location) => console.log(location));
