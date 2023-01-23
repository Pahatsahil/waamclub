import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
// import Icons as Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'native-base';
import Theme from '../constants/Theme';
import ActionSheet from 'react-native-actionsheet';

const {width, height} = Dimensions.get('screen');

const AffiliateCustomer = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selected, setSelected] = useState(false);
  const [panImage, setPANImage] = useState(null);
  const [modal, setModal] = useState(false);
  let actionSheet = useRef();
  const BUTTONS = ['Take Photo', 'Choose Photo from Library', 'Cancel'];

  const PhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log(image);
      setPANImage(image.path);
    });
  };
  const PhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPANImage(image.path);
    });
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
        <Block center flex>
          <Block style={styles.registerContainer}>
            <Block flex center>
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior="padding"
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
                    onChangeText={val => setName(val)}
                    value={name}
                  />
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
                        name="phone-alt"
                        style={styles.inputIcons}
                      />
                    }
                    onChangeText={val => setPhone(val)}
                    value={phone}
                  />
                </Block>
                <Block row style={styles.passwordCheck}>
                  <Checkbox
                    value={'Want Cashback'}
                    onChange={isSelcted => setSelected(isSelcted)}>
                    Want Cashback
                  </Checkbox>
                </Block>
                {selected && (
                  <Block flex center>
                    <ScrollView
                      style={{flex: 1, width: width * 0.75}}
                      showsVerticalScrollIndicator={false}>
                      <Block>
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
                            {panImage ? 'Image Added' : 'Add PAN Card Image'}
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
                      <Block middle>
                        <Button
                          color="primary"
                          style={styles.createButton}
                          onPress={() => navigation.navigate('KYC2')}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Next
                          </Text>
                        </Button>
                      </Block>
                    </ScrollView>
                  </Block>
                )}
                <Block middle row>
                  <Button
                    color="primary"
                    style={styles.createButton}
                    onPress={() => {
                      // setData();
                      // navigation.dispatch(DrawerActions.openDrawer())
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
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
    elevation: 2,
    flexDirection: 'row',
  },

  registerContainer: {
    width: width * 0.9,
    height: height,
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

export default AffiliateCustomer;
