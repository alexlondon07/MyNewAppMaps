import React, { Component } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import axios from 'axios';

const mapStyle = require('./map-style.json');
const { width, height } =  Dimensions
const latlng ={
    latitude: 6.249921,
    longitude: -75.6007283
}
const API_BASE = "http://shoppingproducts.herokuapp.com/cinemas";
class MapsScreen extends Component {

        state = {
            points: []
        }

        componentDidMount (){
        this.getPointsService();
        }

        async getPointsService (){
            try {
            const data = await axios.get(API_BASE);
            if(data){
                this.setState({
                points: data.data
                });
            }
            } catch (error) {
            console.log('Error-->' +error);
            }
        }

        render() {
        return (
            <View style={styles.container}>
            <MapView
                //provider={ PROVIDER_GOOGLE }
                style={ styles.map }
                region={ {
                latitude: 6.2441988,
                longitude: -75.6512519,
                latitudeDelta: 1.015,
                longitudeDelta: 1.0121,
                } }
                customMapStyle = { mapStyle }
            >
            {
                this.state.points.map( ( cinema ) => (
                cinema.locationsList.map( (place, key) => {
                    let point = {
                    latitude: place.location.coordinates[1],
                    longitude: place.location.coordinates[0],
                    }
                    return(
                    <Marker 
                        key = { key }
                        coordinate = { point }
                        title = { place.name }
                        description = { cinema.name }
                    />
                    )
                })
                ))
            }
            </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
        container: {
        ...StyleSheet.absoluteFillObject,
        height,
        width,
        alignItems: 'center',
        justifyContent: 'flex-end'
        },
        map: {
        ...StyleSheet.absoluteFillObject
        }
});

export default MapsScreen;
