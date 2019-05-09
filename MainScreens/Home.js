/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Image,View, ScrollView, ImageBackground,TouchableOpacity,Alert} from 'react-native';
import {Content, Card} from 'native-base';
import ContentLoader from 'react-native-content-loader'
import {Rect} from 'react-native-svg'
import {withNavigation} from "react-navigation";
import { NetInfo } from 'react-native';

NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected)
    {
        console.log('Internet is connected');
        this.setState({connection_Status: "online"})
    }
});

const MyLoader = () => (
    <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb">

        <Rect x="154" y="11" rx="4" ry="4" width="171" height="20"/>
        <Rect x="154" y="43" rx="3" ry="3" width="236" height="9"/>
        <Rect x="154" y="84" rx="3" ry="3" width="236" height="9"/>
        <Rect x="154" y="72" rx="3" ry="3" width="236" height="9"/>
        <Rect x="154" y="58" rx="3" ry="3" width="236" height="9"/>
        <Rect x="13" y="4" rx="0" ry="0" width="125" height="137"/>
        <Rect x="219" y="101" rx="0" ry="0" width="0" height="0"/>
    </ContentLoader>
)

class Home extends Component<Props> {

    state = {placesData:[],restaurantsData:[],whatDoData:[], placesLoaded: 0,restaurantsLoaded: 0,whatDoLoaded: 0}

    componentDidMount(): void {

        //places api
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
            .then((response) => response.json())
            .then((resJson) => {
                this.setState({placesData: resJson, placesLoaded: 1}, function () {
                    console.log(resJson)
                })
            })

        //restaurants api
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
            .then((response) => response.json())
            .then((resJson) => {
                this.setState({restaurantsData: resJson, restaurantsLoaded: 1}, function () {
                    console.log(resJson)
                })
            })

        //what do api
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2")
            .then((response) => response.json())
            .then((resJson) => {
                this.setState({whatDoData: resJson, whatDoLoaded: 1}, function () {
                    console.log(resJson)
                })
            })
    }

    render() {
        if (this.state.connection_Status){
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <ImageBackground source={require('../Backgrounds/home-header.png')} style={{
                    width: '100%',
                    height: 140,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('../Logo/logo.png')} style={{width: 80, height: 80}}/>
                    {Alert.alert("Internet")}
                </ImageBackground>
                <View>{this.renderPlacesData()}</View>
                <View>{this.renderRestaurantsData()}</View>
                <View>{this.renderWhatDoIDoData()}</View>
            </ScrollView>
        )}else {
                Alert.alert("No Internet")
        }
    }

    renderPlacesData() {
        if (this.state.placesLoaded === 0) {
            return (
                <Content>
                    <MyLoader/>
                </Content>
            )
        } else {
            return (
                <View>
                    <Card
                        containerStyle={{
                            backgroundColor: '#FFFFFF',
                            paddingTop:10,
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 0,
                        }}>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Image source={require('../Vector_Icons/home-first-icon.png')} style={
                                {marginTop:8,marginLeft:10,marginBottom:2,width: 50, height: 50}}/>
                            <Text style={{fontWeight: 'bold',color: '#000',marginRight:130,marginTop:20}}>Place For Going Out</Text>
                            <Text style={{fontWeight: 'bold',color: '#228B22',marginTop:20,marginRight:10}} onPress={() => this.props.navigation.navigate('MoreDetails',{title:"More Places",data:this.state.placesData})}>
                                View More
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '100%'}}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {this.state.placesData.map((mapingData) => {
                                    return (
                                        <View style={{margin: 5, width: 150}}>

                                            <TouchableOpacity onPress={()=>{this.moveToDetails(mapingData)}}>
                                                <Image source={{uri: mapingData.better_featured_image.source_url,}}
                                                       style={{width: 140, height: 180, borderRadius: 10, margin: 10}}/>
                                            </TouchableOpacity>

                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{color: '#494949', fontWeight: '200'}}
                                                      onPress={() => {
                                                          alert('Title ' + mapingData.title.rendered + ' Clicked');
                                                      }}>{mapingData.title.rendered}</Text>

                                                <Text style={{color: '#228B22'}}>⋮</Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text style={{color: '#228B22'}}>{mapingData.acf.address}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </Card>
                </View>
            )
        }
    }

    renderRestaurantsData() {
        if (this.state.restaurantsLoaded === 0) {
            return (
                <Content>
                    <MyLoader/>
                </Content>
            )
        } else {
            return (
                <View>
                    <Card
                        containerStyle={{
                            backgroundColor: '#FFFFFF',
                            paddingTop:10,
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 0,
                        }}>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Image source={require('../Vector_Icons/home-second-icon.png')} style={
                                {marginTop:8,marginLeft:10,marginBottom:2,width: 50, height: 50}}/>
                            <Text style={{fontWeight: 'bold',color: '#000',marginRight:90,marginTop:20}}>Restaurants & Coffe Shop</Text>
                            <Text style={{fontWeight: 'bold',color: '#228B22',marginTop:20,marginRight:10}} onPress={() => this.props.navigation.navigate('MoreDetails',{title:"More Restaurants",data:this.state.restaurantsData})}>
                                View More
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '100%'}}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {this.state.restaurantsData.map((mapingData) => {
                                    return (
                                        <View style={{margin: 5, width: 150}}>

                                            <TouchableOpacity onPress={()=>{this.moveToDetails(mapingData)}}>
                                                <Image source={{uri: mapingData.better_featured_image.source_url,}}
                                                       style={{width: 140, height: 180, borderRadius: 10, margin: 10}}/>
                                            </TouchableOpacity>

                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{color: '#494949', fontWeight: '200'}}
                                                      onPress={() => {
                                                          alert('Title ' + mapingData.title.rendered + ' Clicked');
                                                      }}>{mapingData.title.rendered}</Text>

                                                <Text style={{color: '#228B22'}}>⋮</Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text style={{color: '#228B22'}}>{mapingData.acf.address}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </Card>
                </View>
            )
        }
    }

    renderWhatDoIDoData() {
        if (this.state.whatDoLoaded === 0) {
            return (
                <Content>
                    <MyLoader/>
                </Content>
            )
        } else {
            return (
                <View>
                    <Card
                        containerStyle={{
                            backgroundColor: '#FFFFFF',
                            paddingTop:10,
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 0,
                        }}>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Image source={require('../Vector_Icons/home-third-icon.png')} style={
                                {marginTop:8,marginLeft:10,marginBottom:2,width: 50, height: 50}}/>
                            <Text style={{fontWeight: 'bold',color: '#000',marginRight:160,marginTop:20}}>What Do I Do?</Text>
                            <Text style={{fontWeight: 'bold',color: '#228B22',marginTop:20,marginRight:10}} onPress={() => this.props.navigation.navigate('MoreDetails',{title:"More To Do",data:this.state.whatDoData})}>
                                View More
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '100%'}}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {this.state.whatDoData.map((mapingData) => {
                                    return (
                                        <View style={{margin: 5, width: 150}}>

                                            <TouchableOpacity onPress={()=>{this.moveToDetails(mapingData)}}>
                                                <Image source={{uri: mapingData.better_featured_image.source_url,}}
                                                       style={{width: 140, height: 180, borderRadius: 10, margin: 10}}/>
                                            </TouchableOpacity>

                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{color: '#494949', fontWeight: '200'}}
                                                      onPress={() => {
                                                          alert('Title ' + mapingData.title.rendered + ' Clicked');
                                                      }}>{mapingData.title.rendered}</Text>

                                                <Text style={{color: '#228B22'}}>⋮</Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <Text style={{color: '#228B22'}}>{mapingData.acf.address}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </Card>
                </View>
            )
        }
    }

    moveToDetails(mapingData){
        this.props.navigation.navigate('DetailsScreen',{
            title: mapingData.title.rendered,
            image: mapingData.better_featured_image.source_url,
            address:mapingData.acf.address,
            phone:mapingData.acf.phone_number,
            email:mapingData.acf.email_address,
            content: mapingData.content.rendered,
            map_location:mapingData.acf.map_location,
            id: mapingData.id
        })
    }
}

export default withNavigation(Home)