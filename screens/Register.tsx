import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Theme from '../constants/Theme';
import { Formik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';

const {width, height} = Dimensions.get('screen');
const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let validateSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is required'),
    name: yup.string()
    .min(4, ({min}) => `Username must be atleast ${min} characters`)
    .required('Username is required'),
    mobile: yup
    .string()
    .min(10, `Phone Number cannot be < 10`)
    .max(10, 'Phone Number cannot be > 10')
    .matches(phoneRegex, 'Please Enter a valid Phone Number'),
    whatsapp_number: yup
    .string()
    .min(10, `Phone Number cannot be < 10`)
    .max(10, 'Phone Number cannot be > 10')
    .matches(phoneRegex, 'Please Enter a valid Phone Number'),
});

const Register = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState(0);
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState('');
  // console.log(navigation.getState());


  const sendData =  () => {
    console.log(name,email,mobile,code,whatsapp,)
    
  };

  return (
    <Block>
      {/* <StatusBar hidden /> */}
      <ImageBackground
        source={Images.RegisterBackground}
        style={{width, height, zIndex: 1, paddingTop: 10}}>
        <Block center flex style={{marginTop: height * 0.12}}>
          <Block style={styles.registerContainer}>
            {/* <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block> */}
            <Block flex>
              <Block flex={0.1} middle style={styles.socialConnect}>
                <Text size={25}>Register</Text>
              </Block>
              <Block flex center>
                <Formik
                  initialValues={{email: email, mobile: mobile, name: name, whatsapp_number: whatsapp}}
                  onSubmit={(values, action) => {
                    // setRespData(values);
                    // let val = values;
                    setEmail(values['email']);
                    setName(values['name']);
                    // setWhatsapp(values['whatsapp_number']);
                    setMobile(values['mobile']);
                    console.log('Emailsubmit: ', email);
                    console.log('Passwordsubmit: ', name);
                    console.log('Submit: ', values);
                    // setLoader(true);
                    // sendData();
                    navigation.navigate('Register2', {
                      name: values['name'],
                      email: values['email'],
                      mobile: values['mobile'],
                      whatsapp: values['whatsapp_number'],
                      code: code.toUpperCase() || '',
                    })
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
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            borderless
                            placeholder="Name(as per Addhaar Card)"
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={30}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="envelope-open-text"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                          />
                          {errors.name && touched.name && (
                            <Text style={styles.errors}>{errors.name}</Text>
                          )}
                        </Block>
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            borderless
                            placeholder="Email"
                            type={'email-address'}
                            maxLength={30}
                            placeholderTextColor={argonTheme.COLORS.BLACK}
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
                        <Block>
                          <Input
                            placeholder={'Mobile Number'}
                            type={'numeric'}
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            borderless
                            maxLength={10}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="mobile-alt"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('mobile')}
                            onBlur={handleBlur('mobile')}
                            value={values.mobile}
                          />
                          {errors.mobile && touched.mobile && (
                            <Text style={styles.errors}>{errors.mobile}</Text>
                          )}
                        </Block>
                        <Block>
                          <Input
                            placeholder={'Whatsapp Number'}
                            type={'numeric'}
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            maxLength={10}
                            borderless
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="mobile-alt"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('whatsapp_number')}
                            onBlur={handleBlur('whatsapp_number')}
                            value={values.whatsapp_number}
                          />
                          {errors.whatsapp_number && touched.whatsapp_number && (
                            <Text style={styles.errors}>{errors.whatsapp_number}</Text>
                          )}
                        </Block>
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            borderless
                            placeholder="Enter the Referral Code"
                            placeholderTextColor={argonTheme.COLORS.BLACK}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="gift"
                                family="AntDesign"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={(text: any) => setCode(text)}
                            // onBlur={handleBlur('name')}
                            value={code}
                          />
                        </Block>
                        <Block middle>
                          <Button
                            color={isValid ? 'primary' : 'grey'}
                            disabled={!isValid || false}
                            style={styles.createButton}
                            onPress={() => {
                              handleSubmit()
                            }}>
                            <Text
                              bold
                              size={14}
                              color={
                                isValid
                                  ? argonTheme.COLORS.WHITE
                                  : argonTheme.COLORS.BLACK
                                  }>
                              Next
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
  errors: {
    color: 'red',
    marginTop: 3,
    fontSize: 11,
    fontFamily: fontFamily.WHITNEYMEDIUM,
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

export default Register;
