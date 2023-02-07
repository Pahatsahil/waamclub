import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';
import ActionSheet from 'react-native-actionsheet';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {Api} from '../api/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {StoreContext} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const regexIFSC = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
const regexPAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
let validateSchema = yup.object().shape({
  accName: yup
    .string()
    .min(4, ({min}) => `Account Name must be atleast ${min} characters`)
    .required('Account Name is required'),
  ifscCode: yup
    .string()
    .required('Please Enter a valid IFSC Code')
    .min(11, `IFSC code cannot be < 11`)
    .max(11, 'IFSC code cannot be > 11')
    .matches(
      regexIFSC,
      'First 4 letters should be Alphabets, with 5th letter a numeric \n and then last 6 will be alphanumeric',
    ),
  panNumber: yup
    .string()
    .required('Please enter a valid PAN Number')
    .min(10, `PAN Number cannot be < 10`)
    .max(10, 'PAN Number cannot be > 10')
    .matches(
      regexPAN,
      'First 5 letters should be Alphabets, next 4 should be Numeric\n & last again will be Alphabets',
    ),
});
const {width, height} = Dimensions.get('screen');

const KYC = ({navigation, route}) => {
  const {profile, name, mobile} = route.params;
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [panImage, setPANImage] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState('');
  let actionSheet = useRef();
  const BUTTONS = ['Take Photo', 'Choose Photo from Library', 'Cancel'];
  // const profile = false,
  //   name = 'Aman',
  //   mobile = '1286121233';

  useEffect(() => {
    console.log('Callback', profile);
  }, []);

  const sendData = (values: any) => {

    navigation.navigate('KYC2', {
      name: name,
      mobile: mobile,
      panImage: panImage,
      panNumber: values['panNumber'].toUpperCase(),
      accNumber: values['accNumber'],
      accName: values['accName'].toUpperCase(),
      IFSC: values['ifscCode'].toUpperCase(),
    });
  };

  const PhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPANImage(image);
    });
  };
  const PhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPANImage(image);
    });
  };

  // const RequestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  return (
    <Block>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{width, height, zIndex: 1, paddingTop: 10}}>
        <Block center flex style={{marginTop: height * 0.05}}>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.13} middle style={styles.socialConnect}>
                <Text size={25}>KYC</Text>
              </Block>
              <Block flex center>
                <Formik
                  initialValues={{
                    email: '',
                    // mobile: mobile,
                    // name: name,
                    accName: '',
                    accNumber: '',
                    panNumber: '',
                    ifscCode: '',
                  }}
                  onSubmit={(values, action) => {
                    // setRespData(values);
                    // let val = values;
                    // setEmail(values['email']);
                    // setName(values['name']);
                    // setWhatsapp(values['whatsapp_number']);
                    // setMobile(values['mobile']);
                    // console.log('Emailsubmit: ', email);
                    // console.log('Passwordsubmit: ', name);
                    console.log('Submit: ', values);
                    // setLoader(true);
                    sendData(values);
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
                      <ScrollView
                        style={{flex: 1, width: width * 0.75}}
                        showsVerticalScrollIndicator={false}>
                        <KeyboardAvoidingView
                          style={{flex: 1}}
                          behavior="position"
                          enabled>
                          <Block>
                            <Input
                              placeholder={'Pan Card Number'}
                              type={
                                values.panNumber.length > 4 &&
                                values.panNumber.length < 9
                                  ? 'numeric'
                                  : 'default'
                              }
                              autoComplete='characters'
                              borderless
                              style={{textTransform: 'capitalise'}}
                              iconContent={
                                <Icon
                                  size={16}
                                  color={argonTheme.COLORS.ICON}
                                  name="id-card"
                                  // family="ArgonExtra"
                                  style={styles.inputIcons}
                                />
                              }
                              onChangeText={handleChange('panNumber')}
                              onBlur={handleBlur('panNumber')}
                              value={values.panNumber}
                            />
                            {errors.panNumber && touched.panNumber && (
                              <Text style={styles.errors}>
                                {errors.panNumber}
                              </Text>
                            )}
                          </Block>
                          <Block>
                            <ActionSheet
                              ref={actionSheet}
                              title={'Select an Option'}
                              options={BUTTONS}
                              cancelButtonIndex={2}
                              destructiveButtonIndex={2}
                              onPress={buttonIndex => {
                                switch (buttonIndex) {
                                  case 0:
                                    PhotofromCamera();
                                    break;
                                  case 1:
                                    PhotofromLibrary();
                                    setModal(!modal);
                                    break;
                                  default:
                                    break;
                                }
                              }}
                            />
                            <TouchableOpacity
                              style={styles.specialText}
                              onPress={() => {
                                actionSheet.current.show();
                              }}>
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="id-card"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                              <Text
                                style={[
                                  {
                                    color: panImage
                                      ? argonTheme.COLORS.HEADER
                                      : argonTheme.COLORS.MUTED,
                                  },
                                ]}>
                                {panImage
                                  ? 'PAN Card Image Added'
                                  : 'Add PAN Card Image'}
                              </Text>
                            </TouchableOpacity>
                          </Block>
                          <Block>
                            <Input
                              placeholder={'Bank Account Number'}
                              type={'numeric'}
                              borderless
                              iconContent={
                                <Icon
                                  size={16}
                                  color={argonTheme.COLORS.ICON}
                                  name="piggy-bank"
                                  // family="ArgonExtra"
                                  style={styles.inputIcons}
                                />
                              }
                              onChangeText={handleChange('accNumber')}
                              onBlur={handleBlur('accNumber')}
                              value={values.accNumber}
                            />
                            {errors.accNumber && touched.accNumber && (
                              <Text style={styles.errors}>
                                {errors.accNumber}
                              </Text>
                            )}
                          </Block>
                          <Block>
                            <Input
                              placeholder={'Bank IFSC Code'}
                              // type={(values.panNumber.length > 5 && values.panNumber.length > 9)?'numeric':'default'}
                              borderless
                              maxLength={11}
                              autoComplete='characters'
                              style={{textTransform: 'capitalise'}}
                              iconContent={
                                <Icon
                                  size={16}
                                  color={argonTheme.COLORS.ICON}
                                  name="piggy-bank"
                                  // family="ArgonExtra"
                                  style={styles.inputIcons}
                                />
                              }
                              onChangeText={handleChange('ifscCode')}
                              onBlur={handleBlur('ifscCode')}
                              value={values.ifscCode}
                            />
                            {errors.ifscCode && touched.ifscCode && (
                              <Text style={styles.errors}>
                                {errors.ifscCode}
                              </Text>
                            )}
                          </Block>
                          <Block>
                            <Input
                              placeholder={'Bank A/c Holder Name'}
                              maxLength={30}
                              borderless
                              autoComplete='characters'
                              iconContent={
                                <Icon
                                  size={16}
                                  color={argonTheme.COLORS.ICON}
                                  name="piggy-bank"
                                  // family="ArgonExtra"
                                  style={styles.inputIcons}
                                />
                              }
                              onChangeText={handleChange('accName')}
                              onBlur={handleBlur('accName')}
                              value={values.accName}
                            />
                            {errors.accName && touched.accName && (
                              <Text style={styles.errors}>
                                {errors.accName}
                              </Text>
                            )}
                          </Block>
                          {/* <Block row width={width * 0.75}>
                  <Checkbox
                    checkboxStyle={{
                      borderWidth: 3,
                    }}
                    color={argonTheme.COLORS.PRIMARY}
                    label="I agree to give my Personal Information"
                  />
                </Block> */}
                          {/* <Block middle>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={() => navigation.navigate('KYC2')}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Next
                        </Text>
                      </Button>
                    </Block> */}
                          <Block middle>
                            <Button
                              color="primary"
                              style={styles.createButton}
                              onPress={() => {
                                handleSubmit();
                              }}>
                              <Text
                                bold
                                size={14}
                                color={argonTheme.COLORS.WHITE}>
                                {'Next'}
                              </Text>
                            </Button>
                          </Block>
                        </KeyboardAvoidingView>
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
  specialText: {
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    flexDirection: 'row',
  },
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

export default KYC;
