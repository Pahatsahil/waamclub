import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
// import Icons as Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'native-base';
import Theme from '../constants/Theme';
import ActionSheet from 'react-native-actionsheet';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {Api} from '../api/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {StoreContext} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mobileRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const regexIFSC = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
const regexPAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
let validateSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, ({min}) => `Username must be atleast ${min} characters`)
    .required('Username is required'),
  accName: yup
    .string()
    .min(4, ({min}) => `Account Name must be atleast ${min} characters`)
    .required('Account Name is required'),
  mobile: yup
    .string()
    .min(10, `Phone Number cannot be < 10`)
    .max(10, 'Phone Number cannot be > 10')
    .matches(mobileRegex, 'Please Enter a valid Phone Number'),
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

const AffiliateCustomer = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [selected, setSelected] = useState(false);
  const [panImage, setPANImage] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const {state, actions} = useContext<any>(StoreContext);
  // const [userData, setUserData] = useState<any>(actions.userLoginData || [])

  let actionSheet = useRef();
  const BUTTONS = ['Take Photo', 'Choose Photo from Library', 'Cancel'];

  const sendData = async (values: any) => {
    const senData = new FormData()
    senData.append('panCard', { type: panImage.mime, uri: panImage.path, name: 'PAN_Image.jpeg'})
    senData.append('name', name)
    senData.append('mobile', mobile)
    senData.append('panNumber', values['panNumber'].toUpperCase())
    senData.append('bankAccountNumber', values['accNumber'])
    senData.append('bankHolderName', values['accName'].toUpperCase())
    senData.append('IFSC', values['ifscCode'].toUpperCase())

    console.log('first', senData)
    console.log('DATA', senData);
    const res = await axios.post(Api.BANK_DETAILS, senData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'Application/json'
      }
    });
    console.log('API', res.data);
  };

  useEffect(() => {
    getData();
    console.log('mobile', mobile);
  }, []);

  const getData = async () => {
    setLoader(true);
    try {
      let savedEmail = await AsyncStorage.getItem('email');
      let savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail != null && savedPassword != null) {
        try {
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
            setName(data.user.name);
            setMobile(data.user.mobile);
          } else {
            console.log('ERROR', error);
          }
          setLoader(false);
        } catch (error) {
          console.log('Errors', error);
          setLoader(false);
        }
        console.log('STATE', state.userLoginDATA);
        // navigation.navigate('BottomTabs');
      } else {
        console.log('Empty');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('Error', error);
    }
  };

  const PhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      console.log(image)
      setPANImage(image);
      
    });
  };
  const PhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      setPANImage(image);
    });
  };
  return (
    <Block flex>
      {/* <StatusBar hidden /> */}
      <ImageBackground
        source={Images.RegisterBackground}
        style={{
          width,
          height: height,
          zIndex: 1,
          paddingTop: 10,
        }}>
        <Block center flex>
          <Block style={styles.registerContainer}>
            <Block flex center>
              <Formik
                initialValues={{
                  email: '',
                  mobile: mobile,
                  name: name,
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
                  console.log('Passwordsubmit: ', name);
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
                      showsVerticalScrollIndicator={false}
                      style={{flex: 1}}
                      keyboardShouldPersistTaps="always">
                      <KeyboardAvoidingView
                        style={{flex: 1}}
                        behavior="position"
                        enabled>
                        <Block width={width * 0.8} style={{marginTop: 50}}>
                          <Input
                            borderless
                            placeholder="Name"
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="user"
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
                        <Block width={width * 0.8}>
                          <Input
                            borderless
                            placeholder="Phone"
                            type="numeric"
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="mobile-alt"
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
                        <Block row style={styles.passwordCheck}>
                          <Checkbox
                            value={'Want Cashback'}
                            isChecked={selected}
                            onChange={isSelcted => setSelected(isSelcted)}>
                            Want Cashback
                          </Checkbox>
                        </Block>
                        {selected && (
                          // <ScrollView
                          //   style={{flex: 1, width: width * 0.75}}
                          //   showsVerticalScrollIndicator={false}>
                          <>
                            <Block>
                              <Input
                                placeholder={'Pan Card Number'}
                                type={
                                  values.panNumber.length > 4 &&
                                  values.panNumber.length > 9
                                    ? 'numeric'
                                    : 'default'
                                }
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
                                    ? 'Image Added'
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
                          </>
                        )}
                        <Block middle row>
                          <Button
                            color="primary"
                            style={styles.createButton}
                            onPress={() => {
                              handleSubmit();
                              // setData();
                              // navigation.dispatch(DrawerActions.openDrawer())
                            }}>
                            <Text
                              bold
                              size={14}
                              color={argonTheme.COLORS.WHITE}>
                              Submit
                            </Text>
                          </Button>
                          {/* <Button
                    color="secondary"
                    style={styles.createButton}
                    onPress={() => {
                      navigation.navigate('ForgetPassword');
                      // navigation.dispatch(DrawerActions.openDrawer())
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.BLACK}>
                      Forget Password
                    </Text>
                  </Button> */}
                        </Block>
                      </KeyboardAvoidingView>
                    </ScrollView>
                  );
                }}
              </Formik>
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
  specialText: {
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
    flexDirection: 'row',
  },

  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
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
    paddingBottom: 10,
  },
  createButton: {
    width: width * 0.35,
    // marginTop: 25,
  },
});

export default AffiliateCustomer;
