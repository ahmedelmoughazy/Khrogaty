/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Image, View, ScrollView, ImageBackground, TouchableOpacity, Button} from 'react-native';
import {Content, Card, CardItem, Body, Left, Container, Header, Tabs, Tab} from 'native-base';
import ContentLoader from 'react-native-content-loader'
import {Rect} from 'react-native-svg'
import {withNavigation} from "react-navigation";

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

class Restaurants extends Component<Props> {

    state = {placesData: [], placesLoaded: 0}

    componentDidMount(): void {

        //places api
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
            .then((response) => response.json())
            .then((resJson) => {
                this.setState({placesData: resJson, placesLoaded: 1}, function () {
                    console.log(resJson)
                })
            })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <ImageBackground source={require('../Backgrounds/theme-header.png')} style={{width: '100%', height:90}}>
                    <View style={{position: 'absolute', left: 0, bottom: 0}}>
                        <View style={{
                            borderRadius: 50,         // Rounded border
                            borderWidth: 2,           // 2 point border widht
                            borderColor: 'transparent',   // White colored border
                            paddingHorizontal: 20,    // Horizontal padding
                            paddingVertical: 20,      // Vertical padding
                        }}>
                            <Text style={{fontWeight:'bold',fontSize:25,color:'white',marginLeft:'4%'}}>{"Restaurants"}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <Container>
                    <Tabs tabBarUnderlineStyle={{borderBottomWidth:2,backgroundColor:'#228B22'}} >
                        <Tab tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'normal'}} heading="All">
                            {this.renderAllData()}
                        </Tab>
                        <Tab tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'normal'}} heading="Restaurants">
                            {this.renderAllData()}
                        </Tab>
                        <Tab tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#000', fontWeight: 'normal'}} heading="Coffee Shops">
                            {this.renderAllData()}
                        </Tab>
                    </Tabs>
                </Container>
            </ScrollView>
        );
    }

    renderAllData() {
        if (this.state.placesLoaded === 0) {
            return (
                <Content>
                    <MyLoader/>
                    <MyLoader/>
                    <MyLoader/>
                    <MyLoader/>
                    <MyLoader/>
                </Content>
            )
        } else {
            return (
                this.state.placesData.map((mapingData) => {
                    return (
                        <Card key={mapingData.id}>
                            <CardItem >
                                <Left style={{flex: 2}}>
                                    <Image
                                        style={{width: 120, height: 150, borderRadius: 10}}
                                        source={{uri: mapingData.better_featured_image.source_url}}/>
                                </Left>
                                <Body style={{flex: 3}}>
                                <Text style={{fontWeight: 'bold', color: '#000'}}>{mapingData.title.rendered}</Text>
                                <Text style={{color: '#228B22'}}>{mapingData.acf.address}</Text>
                                <Text style={{color: '#999', marginTop: 10,marginBottom:5}}>{mapingData.excerpt.rendered}</Text>
                                <Button
                                    style={{borderRadius:10}}
                                    onPress={()=>{this.props.navigation.navigate('DetailsScreen',{
                                        title: mapingData.title.rendered,
                                        image: mapingData.better_featured_image.source_url,
                                        address:mapingData.acf.address,
                                        phone:mapingData.acf.phone_number,
                                        email:mapingData.acf.email_address,
                                        content: mapingData.content.rendered,
                                        map_location:mapingData.acf.map_location,
                                        id: mapingData.id
                                    })}}
                                    title="See More"
                                    color="#228B22"
                                />
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })
            )
        }
    }
}

export default withNavigation(Restaurants);