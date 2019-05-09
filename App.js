/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator, createAppContainer} from "react-navigation";
import SplashScreen from './SplashScreen'
import OnBoarding from './OnBoarding/OnBoarding'
import MainScreen from './MainScreens/MainScreen'
import DetailsScreen from './MainScreens/DetailsScreen'
import Places from  './MainScreens/Places'
import MoreDetails from './MainScreens/MoreDetails'
import Searching from './MainScreens/Searching'
import WhatToDo from './MainScreens/WhatToDo'

const AppNavigator = createStackNavigator({
    SplashScreen:SplashScreen,
    OnBoarding:OnBoarding,
    MainScreen:MainScreen,
    DetailsScreen:DetailsScreen,
    Places:Places,
    Searching:Searching,
    WhatToDo:WhatToDo,
    MoreDetails:MoreDetails
});

export default createAppContainer(AppNavigator);
