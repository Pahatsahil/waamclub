import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';
import Login from './Login';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontFamily} from '../constants';
import Images from '../constants/Images';
import argonTheme from '../constants/Theme';
import AnimatedLottieView from 'lottie-react-native';
import Splash from '../assets/Splash.json';
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Onboarding = () => {
  const edges = useSafeAreaInsets();
  const navigation = useNavigation()
  const startAnimation = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const title = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: {
            x: 0,
            y: -height,
          },
          useNativeDriver: true,
        }),
        Animated.timing(title, {
          toValue: (width / 10),
          useNativeDriver: true,
        }),
      ]).start();
      navigation.navigate('Login')
    }, 4000);
  }, []);

  return (
    // <View
    //   style={{
    //     position: 'absolute',
    //     top: 0,
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //   }}>
    <Animated.View
      style={{
        flex: 1,
        transform: [{translateY: startAnimation.y}],
        backgroundColor: '#4D4A95',
        // zIndex: 1,
        justifyContent: 'center',
      }}>
      <AnimatedLottieView source={Splash} autoPlay loop />
      <Animated.Text
        style={{
          fontFamily: fontFamily.MONTSERRATBOLD,
          fontSize: 30,
          color: 'white',
          marginTop: height / 2.2,
          textAlign: 'center'
        }}>
        waamclub.com
      </Animated.Text>
      {/* <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => navigation.navigate("LoginStack")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Get Started
                </Button>
              </Block> */}
    </Animated.View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%',
  },
  title: {
    marginTop: '-5%',
  },
  subTitle: {
    marginTop: 20,
  },
});

export default Onboarding;
