export const geoCoordinates=(city,callback)=>{
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      
      };
      
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYWhtZWRtZWh0YWIiLCJhIjoiY2s3OWhrMWtkMHA1aDNmb2c0cDliNnJkZSJ9.kTl3mb_ML3GxEWwolRRHQw`, requestOptions)
        .then(response => response.json())
        .then(result => {
            //center= 
            callback(result.features[0].center)
        })
        .catch(error => console.log('error', error));
       ;
}
