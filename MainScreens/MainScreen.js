/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home';
import Places from './Places';
import WhatToDo from './WhatToDo'
import Restaurants from './Restaurants';
import Searching from './Searching';

export default class MainScreen extends Component<Props> {

    state = {data:[], loaded: 0,selectedTab: 'home'}

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    renderIcon={() => <Image source={require('../Icons/home.png')} style={{width:25,height:25}}/>}
                    renderSelectedIcon={() => <Image source={require('../Icons/ghome.png')} style={{width:25,height:25}}/>}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <Home/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'search'}
                    title="Search"
                    renderIcon={() => <Image source={require('../Icons/filter.png')} style={{width:25,height:25}}/>}
                    renderSelectedIcon={() => <Image source={require('../Icons/gfilter.png')} style={{width:25,height:25}}/>}
                    onPress={() => this.setState({ selectedTab: 'search' })}>
                    <Searching/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'places'}
                    title="Places"
                    renderIcon={() => <Image source={require('../Icons/find-places.png')} style={{width:25,height:25}}/>}
                    renderSelectedIcon={() => <Image source={require('../Icons/gfind-places.png')} style={{width:25,height:25}}/>}
                    onPress={() => this.setState({ selectedTab: 'places' })}>
                    <Places/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'food'}
                    title="Food"
                    renderIcon={() => <Image source={require('../Icons/restaurants.png')} style={{width:25,height:25}}/>}
                    renderSelectedIcon={() => <Image source={require('../Icons/grestaurants.png')} style={{width:25,height:25}}/>}
                    onPress={() => this.setState({ selectedTab: 'food' })}>
                    <Restaurants/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'To Do'}
                    title="To Do"
                    renderIcon={() => <Image source={require('../Icons/todo.png')} style={{width:25,height:25}}/>}
                    renderSelectedIcon={() => <Image source={require('../Icons/gtodo.png')} style={{width:25,height:25}}/>}
                    onPress={() => this.setState({ selectedTab: 'To Do' })}>
                    <WhatToDo/>
                </TabNavigator.Item>

            </TabNavigator>
        );
    }
}