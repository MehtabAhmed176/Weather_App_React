import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { geoCoordinates } from '../api-fetch/geolocation'
import { weather } from '../api-fetch/darksky'
const Example =  (props) => {

    const [city, setCity] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
       geoCoordinates(city,(data)=>{
       
        //data is an array
        /* data[0] is the latitude(hopefully)
        data[1] is the longitude
        
        both geoCoordinates and weather are using 
        callback pattern

        this could be improved
        
        */

        weather(data[0],data[1],(res,temp)=>{
console.log('the result is ',res,temp)
        })
        })
    }

    const handleChange = (e) => {
        console.log('e :', e.target.value);
        setCity(e.target.value);
    }

    const DisplayWeather = (props) => {
        return (
            <div>
                <h3>The weather right now {city} is {props.temprature}</h3>
            </div>
        )
    }


    return (
        <div className="container mt-5">
            <div className="p-5">
                {DisplayWeather(0)}
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

                    <Button>Check Weather</Button>

                </FormGroup>
            </Form>
        </div>
    );
}

export default Example;


//pk.eyJ1IjoiYWhtZWRtZWh0YWIiLCJhIjoiY2s3OWhrMWtkMHA1aDNmb2c0cDliNnJkZSJ9.kTl3mb_ML3GxEWwolRRHQw