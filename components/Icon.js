import React from 'react';
// import * as Font from 'expo-font';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
// import { Icon } from 'galio-framework';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import argonConfig from '../assets/config/argon.json';
const ArgonExtra = require('../assets/font/argon.ttf');
const IconArgonExtra = createIconSetFromIcoMoon(argonConfig, 'ArgonExtra');

class IconExtra extends React.Component {
  state = {
    fontLoaded: false,
  }

  // async componentDidMount() {
  //   await Font.loadAsync({ ArgonExtra: ArgonExtra });
  //   this.setState({ fontLoaded: true });
  // }

  render() {
    const { name, family, ...rest } = this.props;
    
    if (name && family) {
      if(family === 'FontAwesome5')
      return <FontAwesome5 name={name} {...rest} />;
      if(family === 'FontAwesome')
      return <FontAwesome name={name} {...rest} />;
      if(family === 'MaterialIcons')
      return <MaterialIcons name={name} {...rest} />;
      if(family === 'MaterialCommunityIcons')
      return <MaterialCommunityIcons name={name} {...rest} />;
      if(family === 'AntDesign')
      return <AntDesign name={name} {...rest} />;
      if(family === 'Entypo')
      return <AntDesign name={name} {...rest} />;
    }
    return <FontAwesome5 name={name} family={'FontAwesome5'} {...rest} />;

    // return null;
  }
}

export default IconExtra;
