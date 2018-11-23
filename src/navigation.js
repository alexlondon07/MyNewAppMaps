import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import SocialScreen from "./social-screen";
import MapsScreen from "./maps-screen";

const AppNavigator = createStackNavigator({
    Social: SocialScreen,
    Maps: MapsScreen
},{
    initialRouteName: 'Social'
});

export const AppContainer = createAppContainer(AppNavigator);