export const geoCoordinates = (city, callback) => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',

  };

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_GEO_LOCATION}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      callback(result.features[0].center)
    })
    .catch(error => console.log('error', error));
  ;
}
