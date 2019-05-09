import React, {Component} from 'react';
import {StatusBar, ImageBackground, AsyncStorage,Text} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Spinner} from 'native-base';
import OnBoarding from './OnBoarding/OnBoarding'
import MainScreen from './MainScreens/MainScreen'
import {NetInfo} from 'react-native';


const resetActionToOnboarding = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'OnBoarding'})],
});

const resetActionToMainScreen = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'MainScreen'})],
});


type Props = {};
export default class SplashScreen extends Component<Props> {

    state = {connection_Status: ""}

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        // Hide the status bar
        StatusBar.setHidden(true);
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );

        NetInfo.isConnected.fetch().done((isConnected) => {

            if (isConnected === true) {
                this.setState({connection_Status: "Online"})
            } else {
                this.setState({connection_Status: "Offline"})
            }

        });

    }

    render() {
        if (this.state.connection_Status === "Online") {
            return (
                <ImageBackground source={require('./Backgrounds/splash-bg.png')}
                                 style={{
                                     width: '100%',
                                     height: '100%',
                                     justifyContent: 'center',
                                     alignItems: 'center'
                                 }}>
                    <ImageBackground source={require('./Logo/logo.png')}
                                     style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner color="#228B22"/>
                    </ImageBackground>
                </ImageBackground>
            );
        } else {
            return (
                <ImageBackground source={require('./Backgrounds/splash-bg.png')}
                                 style={{
                                     width: '100%',
                                     height: '100%',
                                     justifyContent: 'center',
                                     alignItems: 'center'
                                 }}>
                    <Spinner color="#228B22"/>
                    <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20,color:'white'}}> You are { this.state.connection_Status } </Text>
                </ImageBackground>
            )
        }
    }

    componentWillUnmount() {

        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );

    }

    _handleConnectivityChange = (isConnected) => {

        if (isConnected === true) {
            this.setState({connection_Status: "Online"})
            this.moveToOnBoarding()
        } else {
            this.setState({connection_Status: "Offline"})
            //show alert
        }
    };

    moveToOnBoarding() {
        AsyncStorage.getItem("here").then((val) => {
            setTimeout(() => {
                if (val === "yes") {
                    this.props.navigation.dispatch(resetActionToMainScreen);
                } else {
                    this.props.navigation.dispatch(resetActionToOnboarding);
                }

            }, 1000);
        });
    }
}