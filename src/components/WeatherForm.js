import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { geoCoordinates } from '../api-fetch/geolocation'
import { weather } from '../api-fetch/darksky'
const Example = (props) => {

    const [city, setCity] = useState("")
    const [weatherSummary, setWeatherSummary] = useState("")
    const [temprature, setTemprature] = useState("")
    const [buttonText, setButtonText] = useState('F');
    const [buttonTextChange,setButtonTextChange]=useState(true)
    const [formDisable,setFormDisable]=useState(true)
    const handleSubmit = (e) => {
        e.preventDefault()
        geoCoordinates(city, (data) => {

            //data is an array
            /* data[0] is the latitude(hopefully)
            data[1] is the longitude
            
            both geoCoordinates and weather are using 
            callback pattern
    
            this could be improved
            
            */

            weather(data[0], data[1], (summary, temp) => {
                console.log('the result is ', summary, temp)
                setWeatherSummary(summary)
                setTemprature(temp)
            })
        })
    }

    const handleChange = (e) => {
        console.log('e :', e.target.value);
        setCity(e.target.value);
        if(city===''||e.target.value.length<=3){
            setFormDisable(true)
        }
        else{
            setFormDisable(false)
        }
       
    }

    const DisplayWeather = (props) => {
        return (
            <div>
                <h4>Weather in {city} </h4> <br />
                <p><i>Summary</i> --  {weatherSummary}</p>
                <i>Temprature</i> --  {temprature*100}
                <FahrenhitetoCenti />

            </div>
        )
    }
    const FahrenhitetoCenti = () => {
        return (
            <div>
                <button onClick={() => {
                    setButtonTextChange(!buttonTextChange)
                    if(buttonTextChange){
                        setButtonText('F')
                    }
                    else{
                        setButtonText('C') 
                    }
                }}>
                    {buttonText}
                </button>
            </div>
        )
    }

    const Centigradetemprate=()=>{
   return 20*parseInt(temprature) * 9/5 + 32
    }
    return (
        <div className="container mt-5">
            <div className="p-5">
                {DisplayWeather()}
            </div>
            <Form onSubmit={(e) => {
                handleSubmit(e)
            }}>
                <FormGroup row>
                    <Label for="cityName" sm={2}>City Name</Label>
                    <Col sm={10}>

                        <Input type="text" name="cityName" id="cityName" placeholder="Please enter city name here" value={city} onChange={(e) => {
                            handleChange(e)
                        }} />
                    </Col>
                </FormGroup>

                <FormGroup check row>

                    <Button disabled={formDisable}>Check Weather</Button>

                </FormGroup>
            </Form>
        </div>
    );
}

export default Example;
