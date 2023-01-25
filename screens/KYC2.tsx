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
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme} from '../constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment/moment';
import ActionSheet from 'react-native-actionsheet';

const {width, height} = Dimensions.get('screen');

const KYC2 = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [imageAdded, setImageAdded] = useState(false);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState('');
  let actionSheet = useRef();
  const BUTTONS = ['Take Photo', 'Choose Photo from Library', 'Cancel'];

  const sendData = async (values: any) => {

    // console.log('DATA', senData);
    // const res = await axios.post(Api.BANK_DETAILS, senData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Accept: 'Application/json'
    //   }
    // });
    // console.log('API', res.data);
  };
  
  useEffect(() => {
    console.log('first', data)
  }, []);

  const PhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log(image);
      return (
        <Modal visible={modal} onRequestClose={() => setModal(modal)}>
          <Block flex middle card center>
            <Text>{image}</Text>
          </Block>
        </Modal>
      );
    });
  };
  const PhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
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
      <StatusBar hidden />
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
                <ScrollView
                  style={{flex: 1, width: width * 0.8}}
                  showsVerticalScrollIndicator={false}>
                  {/* <Block>
                    <Input
                      placeholder={'Pan Card Number'}
                      type={'numeric'}
                      borderless
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="id-card"
                          // family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
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
                        actionSheet.current.show();
                      }}>
                      <Text
                        style={[
                          styles.specialText,
                          {
                            color: imageAdded
                              ? argonTheme.COLORS.HEADER
                              : argonTheme.COLORS.MUTED,
                          },
                        ]}>
                        Add PAN Card Image
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
                    />
                  </Block>
                  <Block>
                    <Input
                      placeholder={'Bank IFSC Code'}
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
                    />
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
                    />
                  </Block> */}
                  <Block>
                    <Input
                      placeholder={'Aadhar Card Number'}
                      type={'numeric'}
                      borderless
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="id-card"
                          // family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block>
                    <TouchableOpacity
                      onPress={() =>
                        setDatePickerVisible(!isDatePickerVisible)
                      }>
                      <>
                        {/* <Input value={date} 
                      placeholder={'Date of Birth'}
                      borderless
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }/> */}
                        <Text
                          style={[
                            styles.specialText,
                            {
                              color:
                                date != ''
                                  ? argonTheme.COLORS.HEADER
                                  : argonTheme.COLORS.MUTED,
                            },
                          ]}>
                          {date != '' ? date : 'Date of Birth'}
                        </Text>
                        {/* <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={date => {
                            const birthDate = moment(date).format('DD/MM/YYYY');
                            setDate(birthDate);
                            setDatePickerVisible(false);
                          }}
                          onCancel={() => {
                            setDatePickerVisible(false);
                          }}
                        /> */}
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
                            setModal(!modal);
                            break;
                          default:
                            break;
                        }
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        actionSheet.current.show();
                      }}>
                      <Text
                        style={[
                          styles.specialText,
                          {
                            color: imageAdded
                              ? argonTheme.COLORS.HEADER
                              : argonTheme.COLORS.MUTED,
                          },
                        ]}>
                        Add your Image
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
                        actionSheet.current.show();
                      }}>
                      <Text
                        style={[
                          styles.specialText,
                          {
                            color: imageAdded
                              ? argonTheme.COLORS.HEADER
                              : argonTheme.COLORS.MUTED,
                          },
                        ]}>
                        Add Signature Image
                      </Text>
                    </TouchableOpacity>
                  </Block>
                  <Block row width={width * 0.75} style={{marginTop: 10}}>
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3,
                      }}
                      color={argonTheme.COLORS.PRIMARY}
                      label="I agree to give my Personal Information"
                    />
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => navigation.navigate('BottomTabs')}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Complete KYC
                      </Text>
                    </Button>
                  </Block>
                </ScrollView>
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
    marginTop: 20
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

export default KYC2;
