import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
// import Icons as Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import Theme from '../constants/Theme';
const {width, height} = Dimensions.get('screen');

const Login = () => {
  const navigation = useNavigation();
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
        <Block center flex style={{marginTop: height * 0.07}}>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Login with
              </Text>
              <Block row style={{marginTop: theme.SIZES.BASE}}>
                <Button style={{...styles.socialButtons, marginRight: 30}}>
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
                <Button style={styles.socialButtons}>
                  <Block row>
                    <Icon
                      name="google"
                      size={13}
                      color={Theme.COLORS.ACTIVE}
                      style={{marginTop: 2, marginRight: 5}}
                    />
                    <Text
                      style={
                        styles.socialTextButtons}>
                      Google
                    </Text>
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
                      navigation.navigate('BottomTabs');
                      // navigation.dispatch(DrawerActions.openDrawer())
                    }}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Login
                    </Text>
                  </Button>
                  <Button color="secondary" style={styles.createButton}>
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
    height: height * 0.7,
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
