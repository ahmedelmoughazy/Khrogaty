import React, {Component} from 'react';
import {ImageBackground, Image, StyleSheet, Text, View} from 'react-native';
import Swiper from './Swiper';


export default class Screens extends Component {
    render() {
        return (
            <Swiper>
                {/* First screen */}
                <ImageBackground source={require('../Backgrounds/onboarding-bg-left.png')} style={[styles.slide, {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Image source={require('../Logo/logo.png')} style={{width: 150, height: 150}}/>
                    <Image source={require('../Vector_Icons/onboard-first-icon.png')} style={{width: 70, height: 70,marginTop:140}}/>
                    <Text style={{fontWeight: 'bold',color: '#000',marginTop:20,textAlign:'center'}}>Place For Going Out</Text>
                    <Text style={{color: '#555',marginTop:5,textAlign:'center',width:300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</Text>
                </ImageBackground>

                {/* Second screen */}
                <ImageBackground source={require('../Backgrounds/onboarding-bg-right.png')} style={[styles.slide, {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Image source={require('../Logo/logo.png')} style={{width: 150, height: 150}}/>
                    <Image source={require('../Vector_Icons/onboard-second-icon.png')} style={{width: 70, height: 70,marginTop:140}}/>
                    <Text style={{fontWeight: 'bold',color: '#000',marginTop:20,textAlign:'center'}}>Restaurants & Coffee Shops</Text>
                    <Text style={{color: '#555',marginTop:5,textAlign:'center',width:300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</Text>
                </ImageBackground>

                {/* Third screen */}
                <ImageBackground source={require('../Backgrounds/onboarding-bg-left.png')} style={[styles.slide, {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Image source={require('../Logo/logo.png')} style={{width: 150, height: 150}}/>
                    <Image source={require('../Vector_Icons/onboard-third-icon.png')} style={{width: 70, height: 70,marginTop:140}}/>
                    <Text style={{fontWeight: 'bold',color: '#000',marginTop:20,textAlign:'center'}}>What Do I Do</Text>
                    <Text style={{color: '#555',marginTop:5,textAlign:'center',width:300}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</Text>
                </ImageBackground>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    // Slide styles
    slide: {
        flex: 1,                    // Take up all screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
    },
    // Header styles
    header: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    // Text below header
    text: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
    },
});