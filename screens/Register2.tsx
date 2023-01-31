import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Block, CheckBox, Text, theme} from 'galio-framework';

import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import YupPassword from 'yup-password';
import { Api } from '../api/Api';

YupPassword(yup);
let validateSchema = yup.object().shape({
  homeAddress: yup.string().required('Address is required'),
  currentAddress: yup.string().required('Address is required'),
  landmark: yup.string().required('Enter your nearby landmark'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be atleast ${min} characters`)
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minNumbers(1, 'password must contain at least 1 number')
    .minSymbols(1, 'password must contain at least 1 special character')
    .required(
      'Password must have atleast 1 lower case letter and 1 upper case letter and 1 number and 1 special character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const {width, height} = Dimensions.get('screen');

const Register2 = ({navigation, route}) => {
  const [homeAddress, setHomeAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [bothAddress, setBothAddress] = useState(false);
  const {name, email, whatsapp_number, mobile, code} = route.params;
  
  const sendData = (homeAddress: any, landmark: any,password: any,currentAddress: any) => {
    console.log(name, email, whatsapp_number, mobile, code);
    try {
      // WHEN API GOT PROTECTED
      // RequestAPI.makeRequest(
      //   Api.REGISTERED_USERS,
      //   {
      //       email: email,
      //     password: password,
      //   },
      //   'POST',
      //   async (res: any) => {
      //     if (res) {
      //       console.log('DATA', res.body);
      //       setRespData(res.body);
      //     } else {
      //         console.log('DATA', res.error);
      //     }
      //   },
      //   );
      const data = {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        whatsapp_number: whatsapp_number,
        home_Address: homeAddress,
        current_Address: currentAddress,
        landmark: landmark,       
        referal_id: code 
    // "name":"admin2",
    // "email":"vendor23@gmail.com",
    // "password":"Vendor23@1on",
    // "mobile":9827891123,
    // "whatsapp_number":"9876543210",
    // "home_address":"Dewadsa",
    // "current-address":"dsaadsdasasd",
    // "landmark":"bombay"
      };
      console.log('EMAIL: ', data);
      const res = axios
        .post(Api.REGISTER, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${accessToken || ""}`,
          },
          // auth: accessToken
        })
        .then(resp => {
          console.log('RES', resp.data);
          // Alert.alert('Registration Complete!!! Please Login')
          Alert.alert('Registration Complete', 'Complete the KYC Progress',
            // "KYC", navigation.navigate('KYC')
          )
          navigation.navigate('KYC', {
            profile: false,
            name: name,
            mobile: mobile
          })
          // navigation.navigate('Login')
          setLoader(false)
        })
        .catch(err => {
          console.log('ERRORS: ', err.response.data);
          setLoader(false);
        });
      // if (res) {
      //   console.log('EMAIL: ', email);
      //   console.log('PASSWORD: ', password);
      //   setLoader(false);
      // }
    } catch (error) {
      console.log('Errors', error);
      setLoader(false);
    }
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
    <Block>
      <Save />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{width, height, zIndex: 1, paddingTop: 10}}>
        <Block center flex style={{marginTop: height * 0.07}}>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.1} middle style={styles.socialConnect}>
                <Text size={25}>Register</Text>
              </Block>
              <Block flex center>
                <Formik
                  initialValues={{
                    homeAddress: homeAddress,
                    landmark: landmark,
                    password: password,
                    confirmPassword: confirmPassword,
                    currentAddress: currentAddress,
                  }}
                  onSubmit={(values, action) => {
                    // setRespData(values);
                    // let val = values;
                    // setHomeAddress(values['homeAddress']);
                    // setCurrentAddress(values['currentAddress']);
                    // setLandmark(values['landmark']);
                    // setPassword(values['password']);
                    // setMobile(values['mobile']);
                    // console.log('Emailsubmit: ', homeAddress);
                    // console.log('Passwordsubmit: ', password);
                    setLoader(true);
                    sendData(values.homeAddress, values.landmark,values.password,values.currentAddress);
                    console.log('Submit: ', values);
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
                      <ScrollView style={{flex: 1}}>
                        <Block>
                          <Input
                            placeholder={'Home Address'}
                            borderless
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={30}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="home"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('homeAddress')}
                            onBlur={handleBlur('homeAddress')}
                            value={values.homeAddress}
                          />
                          {errors.homeAddress && touched.homeAddress && (
                            <Text style={styles.errors}>
                              {errors.homeAddress}
                            </Text>
                          )}
                        </Block>
                        <Block>
                          <Input
                            placeholder={'Choose Nearest Hub'}
                            borderless
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={30}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="home"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('landmark')}
                            onBlur={handleBlur('landmark')}
                            value={values.landmark}
                          />
                          {errors.landmark && touched.landmark && (
                            <Text style={styles.errors}>{errors.landmark}</Text>
                          )}
                        </Block>
                        <Block>
                          <Input
                            placeholder={'Current Address'}
                            borderless
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={30}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="home"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('currentAddress')}
                            onBlur={handleBlur('currentAddress')}
                            value={
                              bothAddress
                                ? values.homeAddress
                                : values.currentAddress
                            }
                          />
                          {errors.currentAddress && touched.currentAddress && (
                            <Text style={styles.errors}>
                              {errors.currentAddress}
                            </Text>
                          )}
                        </Block>                        
                        <Block width={width * 0.8}>
                          <Input
                            password
                            borderless
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={30}
                            placeholder="Password"
                            iconContent={
                              <Icon
                                size={18}
                                color={argonTheme.COLORS.ICON}
                                name="lock"
                                // family="ArgonExtra"
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
                        <Block width={width * 0.8}>
                          <Input
                            password
                            borderless
                            placeholder="Confirm Password"
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={30}
                            iconContent={
                              <Icon
                                size={18}
                                color={argonTheme.COLORS.ICON}
                                name="lock"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                          />
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <Text style={styles.errors}>
                                {errors.confirmPassword}
                              </Text>
                            )}
                        </Block>
                        {/* <Block row width={width * 0.75}>
                          <CheckBox
                            checkboxStyle={{
                              borderWidth: 3,
                            }}
                            color={argonTheme.COLORS.PRIMARY}
                            label="I agree with the"
                          />
                          <Button
                            style={{width: 100}}
                            color="transparent"
                            borderWidth={0}
                            textStyle={{
                              color: argonTheme.COLORS.PRIMARY,
                              fontSize: 14,
                            }}>
                            Privacy Policy
                          </Button>
                        </Block> */}
                        <Block middle>
                          <Button
                            color="primary"
                            style={styles.createButton}
                            onPress={() => {
                              // navigation.navigate('KYC', {profile: false});
                              handleSubmit();
                            }}>
                            <Text
                              bold
                              size={14}
                              color={argonTheme.COLORS.WHITE}>
                              CREATE ACCOUNT
                            </Text>
                          </Button>
                        </Block>
                      </ScrollView>
                    );
                  }}
                </Formik>
              </Block>
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
    height: height * 0.65,
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
    elevation: 1,
  },
  errors: {
    color: 'red',
    marginTop: 3,
    fontSize: 11,
    fontFamily: fontFamily.WHITNEYMEDIUM,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
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
    width: width * 0.5,
    marginVertical: 15,
  },
});

export default Register2;
