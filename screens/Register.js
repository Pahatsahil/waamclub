import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';

import {Button, Icon, Input} from '../components';
import {Images, argonTheme} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Theme from '../constants/Theme';

const {width, height} = Dimensions.get('screen');

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation.getState())
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
              <Block flex={0.1} middle style={styles.socialConnect} >
                <Text size={25}>Register</Text>
              </Block>
              <Block flex center>
                <ScrollView style={{flex: 1,}}>
                  <Block width={width * 0.8} style={{marginBottom: 5}}>
                    <Input
                      borderless
                      placeholder="Name(as per Addhaar Card)"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="envelope-open-text"
                          // family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8} style={{marginBottom: 5}}>
                    <Input
                      borderless
                      placeholder="Email"
                      type={'email-address'}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="envelope"
                          // family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block>
                    <Input
                      placeholder={'Mobile Number'}
                      type={'numeric'}
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
                    />
                  </Block>
                  <Block>
                    <Input
                      placeholder={'Whatsapp Number'}
                      type={'numeric'}
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
                    />
                  </Block>
                  {/* <Block row >
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3,
                      }}
                      color={argonTheme.COLORS.PRIMARY}
                      label="I agree with the"
                    />
                    <Button
                      style={{width: 100}}
                      color="transparent"
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
                        navigation.navigate('Register2');
                      }}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Next
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
