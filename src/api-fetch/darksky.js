export const weather = (latitude, longitude, callback) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`https://api.darksky.net/forecast/1cbf19365e401f5955592dadf07a9e83/${latitude},${longitude}`)
        .then(response => response.json())
        .then(result => callback(result.hourly.summary,result.currently.cloudCover))
        .catch(error => console.log('error', error));
} 