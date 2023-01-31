import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
// import Icons as Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Input} from '../../components';
import {Images, argonTheme, fontFamily} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductPayment from './ProductPayment';
import ReferralPayment from './ReferralPayment';

const {width, height} = Dimensions.get('screen');
// const bottomTabHeight = useBottomTabBarHeight()

const PaymentHistory = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  return (
    <Block flex>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{
          width,
          height: height,
          zIndex: 1,
          paddingTop: 10,
        }}>
        <Block center flex >
          <Block style={styles.registerContainer}>
            <Tab.Navigator
              screenOptions={{
                swipeEnabled: true,
                tabBarLabelStyle: {
                  fontFamily: fontFamily.ROBOTOBOLD,
                  lineHeight: 15,
                },
                tabBarShowIcon: true,
              }}>
              <Tab.Screen
                name="Referral Payment"
                component={ReferralPayment}
                options={{
                  tabBarIcon: ({focused, color}) => {
                    return (
                      <Icon
                        name="account-cash"
                        family={'MaterialCommunityIcons'}
                        size={20}
                        color={
                          focused
                            ? argonTheme.COLORS.PRIMARY
                            : argonTheme.COLORS.BLACK
                        }
                      />
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Product Payment"
                component={ProductPayment}
                options={{
                  tabBarIcon: ({focused, color}) => {
                    return (
                      <Icon
                        size={16}
                        color={
                          focused
                            ? argonTheme.COLORS.PRIMARY
                            : argonTheme.COLORS.BLACK
                        }
                        name="lock"
                      />
                    );
                  },
                }}
              />
            </Tab.Navigator>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.73,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
    // marginBottom: 100,
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: 0,
    borderColor: '#8898AA',
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.BLACK,
    fontWeight: '800',
    fontSize: 14,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  inputIcons: {
    marginRight: 5
  }
});

export default PaymentHistory;
