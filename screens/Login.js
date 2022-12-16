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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData();
    GoogleSignin.configure();
  }, []);

  const getData = async () => {
    try {
      let savedEmail = await AsyncStorage.getItem('phone');
      let savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail != null && savedPassword != null) {
        navigation.navigate('BottomTabs');
      } else {
        console.log('Empty');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const setData = async () => {
    try {
      if (phone != null && password != null) {
        await AsyncStorage.setItem('phone', phone);
        await AsyncStorage.setItem('password', password);
        console.log('Phone: ', phone);
        console.log('Password: ', password);
        navigation.navigate('BottomTabs');
      } else {
        console.log('Empty');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info', userInfo);
      Alert.alert(
        'Google Logged in',
        'email ' + userInfo.user.email + '\n id ' + userInfo.user.id,
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Error', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Error', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Error', error);
        // play services not available or outdated
      } else {
        console.log('Error', error);
        // some other error happened
      }
    }
  };

  const fbLogin = resCallback => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('FB Result', result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback({message: 'Email is required'});
        }
        if (result.isCancelled) {
          console.log('Cancelled!!!!');
        } else {
          const infoRequest = new GraphRequest(
            '/me?fields=email,name,picture,friends',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log('Login failed with error ' + error);
      },
    );
  };

  const onfbLogin = async () => {
    try {
      await fbLogin(_responseInfoCallback);
    } catch (error) {
      console.log('Error raised', error);
    }
  };

  const _responseInfoCallback = async (error, result) => {
    if (error) {
      console.log('Error Top', error);
      return;
    } else {
      const userData = result;
      console.log('FB DATAAAA', userData);
      Alert.alert('FB Logged  in');
    }
  };

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
        <Block center flex style={{marginTop: height * 0.1}}>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Login with
              </Text>
              <Block row style={{marginTop: theme.SIZES.BASE}}>
                <Button
                  style={{...styles.socialButtons, marginRight: 30}}
                  onPress={() => onfbLogin()}>
                  <Block row>
                    <Icon
                      name="facebook"
                      size={14}
                      color={Theme.COLORS.ACTIVE}
                      style={{marginTop: 2, marginRight: 5}}
                    />
                    <Text style={styles.socialTextButtons}>Facebook</Text>
                  </Block>
                </Button>
                <Button
                  style={styles.socialButtons}
                  onPress={() => googleLogin()}>
                  <Block row>
                    <Icon
                      name="google"
                      size={13}
                      color={Theme.COLORS.ACTIVE}
                      style={{marginTop: 2, marginRight: 5}}
                    />
                    <Text style={styles.socialTextButtons}>Google</Text>
                  </Block>
                </Button>
              </Block>
            </Block>
            <Block flex center>
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior="padding"
                enabled>
                <Block
                  width={width * 0.8}
                  style={{marginBottom: 15, marginTop: 30}}>
                  <Input
                    borderless
                    placeholder="Phone"
                    type="numeric"
                    iconContent={
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="phone-alt"
                        style={styles.inputIcons}
                      />
                    }
                    onChangeText={val => setPhone(val)}
                    value={phone}
                  />
                </Block>
                {/* <Block>
                  <Icon name/>
                </Block> */}
                <Block width={width * 0.8}>
                  <Input
                    password
                    borderless
                    placeholder="Password"
                    iconContent={
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="lock"
                        style={styles.inputIcons}
                      />
                    }
                    onChangeText={val => setPassword(val)}
                    value={password}
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
                      setData();
                      // navigation.dispatch(DrawerActions.openDrawer())
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Login
                    </Text>
                  </Button>
                  <Button
                    color="secondary"
                    style={styles.createButton}
                    onPress={() => {
                      navigation.navigate('ForgetPassword');
                      // navigation.dispatch(DrawerActions.openDrawer())
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.BLACK}>
                      Forget Password
                    </Text>
                  </Button>
                </Block>
                <Block middle>
                  <Button
                    color="primary"
                    style={styles.createButton}
                    onPress={() => {
                      navigation.navigate('Register');
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      CREATE ACCOUNT
                    </Text>
                  </Button>
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
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.35,
    marginTop: 25,
  },
});

export default Login;
