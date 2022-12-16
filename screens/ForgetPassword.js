import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
// import Icons as Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import Theme from '../constants/Theme';

const {width, height} = Dimensions.get('screen');

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [newPass, setNewPass] = useState(true);
  const [confirmPass, setConfirmPass] = useState(false);
  return (
    <Block flex>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{
          width,
          height: height,
          zIndex: 1,
          paddingTop: 10,
        }}>
        <Block center flex style={{marginTop: height * 0.14}}>
          <Block style={styles.registerContainer}>
            <Block flex center>
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior="padding"
                enabled>
                <Block flex>
                  <Block flex={0.1} middle style={styles.socialConnect}>
                    <Text size={25} color={argonTheme.COLORS.BLACK}>Forget Password</Text>
                  </Block>
                <Block width={width * 0.8} style={{marginTop: 30}}>
                  <Input
                    borderless
                    placeholder="Phone"
                    type="numeric"
                    color={argonTheme.COLORS.BLACK}
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
                      SEND OTP
                    </Text>
                  </Button>
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    password
                    borderless
                    placeholder="Set New Password"
                    color={argonTheme.COLORS.BLACK}
                    iconContent={
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="lock"
                        style={styles.inputIcons}
                      />
                    }
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    password
                    borderless
                    placeholder="Confirm New Password"
                    color={argonTheme.COLORS.BLACK}
                    iconContent={
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="lock"
                        style={styles.inputIcons}
                      />
                    }
                  />
                  <Block row style={styles.passwordCheck}>
                    <Text size={12} color={argonTheme.COLORS.MUTED}>
                      password strength:
                    </Text>
                    <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                      {' '}
                      strong
                    </Text>
                  </Block>
                </Block>
                <Block middle row>
                  <Button
                    color="primary"
                    style={styles.createButton}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Change Password
                    </Text>
                  </Button>
                  <Button
                    color="secondary"
                    style={styles.createButton}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.BLACK}>
                      Back
                    </Text>
                  </Button>
                </Block>
                </Block>
              </KeyboardAvoidingView>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.55,
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
    marginVertical: 20,
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
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.35,
    marginTop: 25,
  },
});

export default ForgetPassword;
