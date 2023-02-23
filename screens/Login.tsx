import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
// import Icons as Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
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
import * as yup from 'yup';
import {useToast} from 'native-base';
import {Formik} from 'formik';
import axios from 'axios';
import {Api} from '../api/Api';
import {StoreContext} from '../redux/store/index';
const {width, height} = Dimensions.get('screen');

let validateSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be atleast ${min} characters`)
    .required('Password is required'),
});

const Login = ({navigation}) => {
  const [emaiL, setEmail] = useState('');
  const [passworD, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [dematCount, setDematCount] = useState(0);
  const {state, actions} = useContext<any>(StoreContext);
  const Toast = useToast();
  useEffect(() => {
    getData();
    GoogleSignin.configure();
    setLoader(false);
  }, []);

  const getData = async () => {
    setLoader(true);
    try {
      let savedEmail = await AsyncStorage.getItem('email');
      let savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail != null && savedPassword != null) {
        try {
          Toast.show('API CALLING');
          // const data = ;
          console.log('EMAIL: ', {email: savedEmail, password: savedPassword});
          // const res = axios
          //   .post(Api.LOGIN, {email: email, password: password},{})
          //   .then(resp => {
          //     console.log('RES', resp.data.data);
          //   })
          //   .catch(err => {
          //     console.log('PASSWORDERROR: ', err.response.data);
          //     setLoader(false);
          //   });
          // if (res) {
          //   console.log('EMAIL: ', email);
          //   console.log('PASSWORD: ', password);
          // }
          const res = await axios.post(
            Api.LOGIN,
            {email: savedEmail, password: savedPassword},
            {},
          );
          const {data, error} = res.data;
          console.log('Header', res.headers.token);
          if (res) {
            console.log('DATAA', data.user);
            console.log('DATAA', data.TotalReferral);
            setDematCount(data.TotalReferral);
            actions.setDematReferralCount(data.TotalReferral);
            actions.setUserLoginDATA(data.user);
            actions.setUserID(data.user.agent_id);
            actions.setUserToken(res.headers.token);
            setData(savedEmail, savedPassword);
          } else {
            console.log('ERROR', error);
          }
        } catch (error) {
          console.log('Errors', error);
          setLoader(false);
        }
        console.log('STATE', state.userLoginDATA);
        navigation.navigate('BottomTabs');
      } else {
        console.log('Empty');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('Error', error);
    }
  };

  const setData = async (email, password) => {
    setLoader(true);
    try {
      if (email != null && password != null) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        setLoader(false);
        console.log('email: ', email);
        console.log('Password: ', password);
        console.log('STATE', state.userLoginData);
        navigation.navigate('BottomTabs');
      } else {
        console.log('Empty');
      }
    } catch (error) {
      console.log('Error', error);
    }
    setLoader(false);
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
  const sendData = async (email: any, password: any) => {
    try {
      if (email != '' && password != '') {
        setLoader(true);
        const res = await axios.post(Api.LOGIN, {
          email: email,
          password: password,
        });
        const {data, error} = res.data;
        console.log('Header', res.headers.token);
        if (res) {
          console.log('DATAA', data);
          console.log('Total', data.TotalReferral);
          actions.setUserLoginDATA(data.user);
          actions.setUserID(data.user.agent_id);
          actions.setUserToken(res.headers.token);
          setDematCount(data.TotalReferral);
          actions.setDematReferralCount(data.TotalReferral);
          setData(email, password);
        } else {
          console.log('ERROR', error);
          Alert.alert('Error', email+password)
        }
      } else {
        setLoader(false);
        Alert.alert('Error', email+password)
      }
    } catch (error) {
      console.log('Errors', error);
      setLoader(false);
      Alert.alert('Error', email+password)
    }
    setLoader(false);
  };

  const Save = () => {
    return (
      <Modal visible={loader} animationType="fade" transparent>
        <ActivityIndicator
          color={argonTheme.COLORS.PRIMARY}
          size={'large'}
          style={{marginTop: 'auto', marginBottom: 'auto'}}
        />
      </Modal>
    );
  };

  return (
    <Block flex>
      <Save />
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
                <Formik
                  initialValues={{email: '', password: ''}}
                  onSubmit={(values, action) => {
                    // setRespData(values);
                    setEmail(values['email']);
                    setPassword(values['password']);
                    console.log('Emailsubmit: ', emaiL);
                    console.log('Passwordsubmit: ', passworD);
                    console.log('Submit: ', values);
                    sendData(values.email, values.password);
                  }}
                  enableReinitialize
                  validationSchema={validateSchema}>
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                  }) => {
                    return (
                      <>
                        <Block
                          width={width * 0.8}
                          style={{marginBottom: 15, marginTop: 30}}>
                          <Input
                            borderless
                            placeholder="Email"
                            type="email-address"
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={30}
                            // returnKeyType={'next'}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="envelope"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                          />
                          {errors.email && touched.email && (
                            <Text style={styles.errors}>{errors.email}</Text>
                          )}
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            maxLength={30}
                            password
                            borderless
                            placeholder="Password"
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="lock"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                          />
                          {errors.password && touched.password && (
                            <Text style={styles.errors}>{errors.password}</Text>
                          )}
                        </Block>
                        <Block middle row>
                          <Button
                            color={isValid ? 'primary' : 'grey'}
                            disabled={!isValid}
                            style={styles.createButton}
                            onPress={() => {
                              handleSubmit();
                              // navigation.dispatch(DrawerActions.openDrawer())
                            }}>
                            <Text
                              bold
                              size={14}
                              color={
                                isValid
                                  ? argonTheme.COLORS.WHITE
                                  : argonTheme.COLORS.BLACK
                              }>
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
                            <Text
                              bold
                              size={14}
                              color={argonTheme.COLORS.BLACK}>
                              Forget Password
                            </Text>
                          </Button>
                        </Block>
                      </>
                    );
                  }}
                </Formik>
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
  errors: {
    color: 'red',
    marginTop: 3,
    fontSize: 11,
    fontFamily: fontFamily.WHITNEYMEDIUM,
  },
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
