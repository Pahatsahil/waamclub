import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Payments = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: argonTheme.COLORS.WHITE}}>
      <Block style={{marginTop: 20, marginHorizontal: 20}}>
      </Block>
      <Block flex style={{marginVertical: 10, marginHorizontal: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Block
            row
            center
            card
            space="between"
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginVertical: 10,
              borderColor: argonTheme.COLORS.LIGHT_BORDER,
              // elevation: 1,
            }}>
            <Image
              source={{uri: Images.ProfilePicture}}
              style={{marginRight: 10, width: 40, height: 40, borderRadius: 30}}
              resizeMode="contain"
            />
            <Block flex>
              <Text
                style={{
                  color: argonTheme.COLORS.BLACK,
                  fontFamily: fontFamily.WHITNEYSEMIBOLD,
                  fontSize: 14,
                }}>
                Card Payments
              </Text>
              <Text
                style={{
                  color: argonTheme.COLORS.BLACK,
                  fontFamily: fontFamily.WHITNEYREGULAR,
                  fontSize: 12,
                }}>
                Pay with MasterCard, Visa or VisaElectron
              </Text>
            </Block>
            <Text
              style={{
                color: argonTheme.COLORS.GREY,
                fontFamily: fontFamily.MONTSERRATSEMIBOLD,
                fontSize: 24,
              }}>
              {'>'}
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Block
            row
            center
            card
            space="between"
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginVertical: 10,
              borderColor: argonTheme.COLORS.LIGHT_BORDER,
              // elevation: 1,
            }}>
            <Image
              source={{uri: Images.ProfilePicture}}
              style={{marginRight: 10, width: 40, height: 40, borderRadius: 30}}
              resizeMode="contain"
            />
            <Block flex>
              <Text
                style={{
                  color: argonTheme.COLORS.BLACK,
                  fontFamily: fontFamily.WHITNEYSEMIBOLD,
                  fontSize: 14,
                }}>
                Esewa Payments
              </Text>
              <Text
                style={{
                  color: argonTheme.COLORS.BLACK,
                  fontFamily: fontFamily.WHITNEYREGULAR,
                  fontSize: 12,
                }}>
                Faster & Safer way to pay using Esewa
              </Text>
            </Block>
            <Text
              style={{
                color: argonTheme.COLORS.GREY,
                fontFamily: fontFamily.MONTSERRATSEMIBOLD,
                fontSize: 24,
              }}>
              {'>'}
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Block
            row
            center
            card
            space="between"
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginVertical: 10,
              borderColor: argonTheme.COLORS.LIGHT_BORDER,
              // elevation: 1,
            }}>
            <Image
              source={{uri: Images.ProfilePicture}}
              style={{marginRight: 10, width: 40, height: 40, borderRadius: 30}}
              resizeMode="contain"
            />
            <Block flex>
              <Text
                style={{
                  color: argonTheme.COLORS.BLACK,
                  fontFamily: fontFamily.WHITNEYSEMIBOLD,
                  fontSize: 14,
                }}>
                Khalti Payments
              </Text>
              <Text
                style={{
                  color: argonTheme.COLORS.BLACK,
                  fontFamily: fontFamily.WHITNEYREGULAR,
                  fontSize: 12,
                }}>
                Faster & Safer way to pay using Khalti
              </Text>
            </Block>
            <Text
              style={{
                color: argonTheme.COLORS.GREY,
                fontFamily: fontFamily.MONTSERRATSEMIBOLD,
                fontSize: 24,
              }}>
              {'>'}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Payments;
