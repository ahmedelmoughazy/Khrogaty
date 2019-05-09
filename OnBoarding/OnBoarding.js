import React, {Component} from 'react';
import {StatusBar, AsyncStorage} from 'react-native';
import Screens from './Screens';

export default class OnBoarding extends Component {

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        // Hide the status bar
        StatusBar.setHidden(true);
    }

    render() {
        return (
            <Screens>
                {this.saveDate()}
            </Screens>
        );
    }

    saveDate() {
        AsyncStorage.setItem("here", "yes")
    }
}