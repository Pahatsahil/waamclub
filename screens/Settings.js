import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
// import Icons as Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import Theme from '../constants/Theme';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const {width, height} = Dimensions.get('screen');

const Settings = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [old, setOld] = useState(true);
  const [newPass, setNewPass] = useState(true);
  const [confirm, setConfirm] = useState(true);

  const PersonalDetails = () => {
    return (
      <Block flex center>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
          <Block width={width * 0.8} style={{marginBottom: 15, marginTop: 30}}>
            <Text>Full Name</Text>
            <Input
              borderless
              placeholder="Name"
              iconContent={
                <Icon
                  size={14}
                  color={argonTheme.COLORS.ICON}
                  name="user-alt"
                  style={styles.inputIcons}
                  family='FontAwesome5'
                />
              }
            />
          </Block>
          <Block width={width * 0.8} style={{marginBottom: 15}}>
            <Text>Email Address</Text>
            <Input
              borderless
              placeholder="Email Address"
              type="email"
              iconContent={
                <Icon
                  size={18}
                  color={argonTheme.COLORS.ICON}
                  name="email"
                  family='MaterialCommunityIcons'
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8} style={{marginBottom: 15}}>
            <Text>Mobile NUmber</Text>
            <Input
              borderless
              placeholder="Mobile Number"
              type="numeric"
              iconContent={
                <Icon
                  size={14}
                  color={argonTheme.COLORS.ICON}
                  name="phone-alt"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block middle>
            <Button
              color="primary"
              style={styles.createButton}
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                SAVE DETAILS
              </Text>
            </Button>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  };

  const ChangePassword = () => {
    return (
      <Block flex center>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
          <Block width={width * 0.8} style={{marginBottom: 15, marginTop: 30}}>
            <Block row space="between">
              <Text>Old Passsword</Text>
              <TouchableOpacity
                style={{paddingRight: 10}}
                onPress={() => {
                  setOld(!old);
                }}>
                {old ? (
                  <Icon
                    name="eye-slash"
                    family="FontAwesome"
                    size={20}
                    color={argonTheme.COLORS.BLACK}
                  />
                ) : (
                  <Icon
                    name="eye"
                    family="FontAwesome"
                    size={20}
                    color={argonTheme.COLORS.BLACK}
                  />
                )}
              </TouchableOpacity>
            </Block>
            <Input
              borderless
              placeholder="Old Password"
              secureTextEntry={old}
              password={old}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="phone-alt"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8} style={{marginBottom: 15}}>
            <Block row space="between">
              <Text>New Passsword</Text>
              <TouchableOpacity
                onPress={() => {
                  setNewPass(!newPass);
                }}>
                {newPass ? (
                  <Icon
                    name="eye-slash"
                    family="FontAwesome"
                    size={20}
                    color={argonTheme.COLORS.BLACK}
                  />
                ) : (
                  <Icon
                    name="eye"
                    family="FontAwesome"
                    size={20}
                    color={argonTheme.COLORS.BLACK}
                  />
                )}
              </TouchableOpacity>
            </Block>
            <Input
              borderless
              placeholder="New Password"
              password={newPass}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="phone-alt"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8} style={{marginBottom: 15}}>
            <Block row space="between">
              <Text>Confirm New Passsword</Text>
              <TouchableOpacity
                onPress={() => {
                  setConfirm(!confirm);
                }}>
                {confirm ? (
                  <Icon
                    name="eye-slash"
                    family="FontAwesome"
                    size={20}
                    color={argonTheme.COLORS.BLACK}
                  />
                ) : (
                  <Icon
                    name="eye"
                    family="FontAwesome"
                    size={20}
                    color={argonTheme.COLORS.BLACK}
                  />
                )}
              </TouchableOpacity>
            </Block>
            <Input
              borderless
              placeholder="Confirm New Password"
              secureTextEntry={confirm}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="phone-alt"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block middle>
            <Button
              color="primary"
              style={styles.createButton}
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                CHANGE PASSWORD
              </Text>
            </Button>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  };

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
        <Block center flex style={{marginTop: height * 0.08}}>
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
                name="Personal Details"
                component={PersonalDetails}
                options={{
                  tabBarIcon: ({focused, color}) => {
                    return (
                      <Icon
                        name="account-settings"
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
                name="Change Passsword"
                component={ChangePassword}
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
    height: height * 0.6,
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
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    color: Theme.COLORS.BLACK,
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

export default Settings;
