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
  ActivityIndicator,
} from 'react-native';
import {Block, CheckBox, Text, theme} from 'galio-framework';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment/moment';
import ActionSheet from 'react-native-actionsheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Api } from '../api/Api';

const {width, height} = Dimensions.get('screen');

let validateSchema = yup.object().shape({
  adhaarNumber: yup
    .string()
    .required('Please enter a valid Adhaar Number')
    .min(12, `Adhaar Number cannot be < 12`)
    .max(12, 'Adhaar Number cannot be > 12'),
});
const KYC2 = ({route}) => {
  const navigation = useNavigation();
  const {name, panImage, mobile, panNumber, accNumber, accName,IFSC} = route.params;
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [imageAdded, setImageAdded] = useState('');
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState('');
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [signature, setSignature] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  let actionSheet = useRef();
  const BUTTONS = ['Take Photo', 'Choose Photo from Library', 'Cancel'];

  const sendData = async (values: any) => {
    setLoader(true)
    const senData = new FormData();
    senData.append('panCard', {
      type: panImage.mime,
      uri: panImage.path,
      name: 'PAN_Image.jpeg',
    });
    senData.append('name', name);
    senData.append('mobile', mobile);
    senData.append('panNumber', panNumber);
    senData.append('bankAccountNumber', accNumber);
    senData.append('bankHolderName', accName);
    senData.append('IFSC', IFSC);
    senData.append('adhaarNumber', values['adhaarNumber']);
    senData.append('DOB', date);
    senData.append('profilePicture', { type: profilePicture.mime, uri: profilePicture.path, name: 'Profile_Picture.jpeg'});
    senData.append('signatureImage', { type: signature.mime, uri: signature.path, name: 'Signature.jpeg'});
    // senData.append(...data)
    console.log('DATA', senData);
    try{
      // navigation.navigate('Login')
      const res = await axios.post(Api.KYC, senData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'Application/json'
      }
    });
    const {data, error} = res.data;
    if(!error){
      console.log('SUCCESS', data)
      navigation.navigate('Login')
    }
    else{
      console.log("ERROR", error)
    }
    setLoader(false)
  }
  catch(error){
    console.log('error', error.response.data)
    setLoader(false)
  }
  };

  useEffect(() => {
    // console.log('first', data);
    // setProfilePicture('');
    // setSignature('');
    setLoader(false)
  }, []);

  const PhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      console.log(image);
      {
        imageAdded =='PP' ? setProfilePicture(image) : setSignature(image);
      }
    });
  };
  const PhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      console.log(image);
      {
        imageAdded =='PP' ? setProfilePicture(image) : setSignature(image);
      }
    });
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
        <Block center flex style={{marginTop: height * 0.12}}>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.13} middle style={styles.socialConnect}>
                <Text size={25}>KYC</Text>
              </Block>
              <Block flex center>
                <Formik
                  initialValues={{
                    adhaarNumber: '',
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
                        style={{flex: 1, width: width * 0.8}}
                        showsVerticalScrollIndicator={false}>
                        <Block>
                          <Input
                            placeholder={'Aadhar Card Number'}
                            type={'numeric'}
                            borderless
                            maxLength={12}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="id-card"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={handleChange('adhaarNumber')}
                            onBlur={handleBlur('adhaarNumber')}
                            value={
                              values.adhaarNumber
                              // values.adhaarNumber.length % 4 == 0 &&
                              // values.adhaarNumber.length != 0 &&
                              // values.adhaarNumber.length < 12
                              //   ? values.adhaarNumber + '-'
                              //   : values.adhaarNumber
                            }
                          />
                          {errors.adhaarNumber && touched.adhaarNumber && (
                            <Text style={styles.errors}>
                              {errors.adhaarNumber}
                            </Text>
                          )}
                        </Block>
                        <Block>
                          <TouchableOpacity
                            onPress={() =>
                              setDatePickerVisible(!isDatePickerVisible)
                            }>
                            <>
                              <Text
                                style={[
                                  styles.specialText,
                                  {
                                    color:
                                      date != ''
                                        ? argonTheme.COLORS.BLACK
                                        : argonTheme.COLORS.MUTED,
                                  },
                                ]}>
                                <Icon
                                  size={16}
                                  color={argonTheme.COLORS.ICON}
                                  name="birthday-cake"
                                  // family="ArgonExtra"
                                  style={styles.inputIcons}
                                />
                                {date != '' ? date : 'Date of Birth'}
                              </Text>
                              <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={date => {
                                  const birthDate =
                                    moment(date).format('DD/MM/YYYY');
                                  setDate(birthDate);
                                  setDatePickerVisible(false);
                                }}
                                onCancel={() => {
                                  setDatePickerVisible(false);
                                }}
                              />
                            </>
                          </TouchableOpacity>
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
                                  break;
                                default:
                                  break;
                              }
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setImageAdded('PP')
                              actionSheet.current.show();
                            }}>
                            <Text
                              style={[
                                styles.specialText,
                                {
                                  color:
                                    profilePicture
                                      ? argonTheme.COLORS.BLACK
                                      : argonTheme.COLORS.MUTED,
                                },
                              ]}>
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="id-card"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                              {profilePicture
                                ? 'Image Added'
                                : 'Add your Image'}
                            </Text>
                          </TouchableOpacity>
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
                            onPress={() => {
                              setImageAdded('S')
                              actionSheet.current.show();
                            }}>
                            <Text
                              style={[
                                styles.specialText,
                                {
                                  color:
                                    signature
                                      ? argonTheme.COLORS.BLACK
                                      : argonTheme.COLORS.MUTED,
                                },
                              ]}>
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="id-card"
                                // family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                              {signature
                                ? 'Signature Added'
                                : 'Add Signature Image'}
                            </Text>
                          </TouchableOpacity>
                        </Block>
                        {/* <Block row width={width * 0.75} style={{marginTop: 10}}>
                          <CheckBox
                            checkboxStyle={{
                              borderWidth: 3,
                            }}
                            color={argonTheme.COLORS.PRIMARY}
                            label="I agree to give my Personal Information"
                            onChange={isSelcted => setSelected(isSelcted)}
                          />
                        </Block> */}
                        <Block middle>
                          <Button
                            color="primary"
                            style={styles.createButton}
                            onPress={() => handleSubmit()}>
                            <Text
                              bold
                              size={14}
                              color={argonTheme.COLORS.WHITE}>
                              Complete KYC
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
  specialText: {
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.58,
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
    marginTop: 20,
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
  errors: {
    color: 'red',
    marginTop: 3,
    fontSize: 11,
    fontFamily: fontFamily.WHITNEYMEDIUM,
  },
});

export default KYC2;
