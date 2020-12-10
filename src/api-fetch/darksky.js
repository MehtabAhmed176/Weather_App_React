export const weather = (latitude, longitude, callback) => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY}/${latitude},${longitude}`)
    .then(response => response.json())
    .then(result => callback(result.hourly.summary, result.currently.cloudCover))
    .catch(error => console.log('error', error));
} 