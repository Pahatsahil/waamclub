import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

import {Button, Icon} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {HeaderHeight} from '../constants/utils';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Api} from '../api/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {StoreContext} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [profilePictureLink, setProfilePictureLink] = useState('');
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const {state, actions} = useContext<any>(StoreContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (state.userLoginData) {
      console.log('LOGIN DATA', state.userLoginData);

      setName(state.userLoginData.name);
      setEmail(state.userLoginData.email);
      setMobile(state.userLoginData.mobile);
      setProfilePicture(state.userLoginData.profile_image);
      console.log('PP', profilePicture);
      setPassword(state.userLoginData.enc_pass);
      getImage();
    } else {
      try {
        let savedEmail = await AsyncStorage.getItem('email');
        let savedPassword = await AsyncStorage.getItem('password');
        if (savedEmail != null && savedPassword != null) {
          try {
            // const data = ;
            console.log('EMAIL: ', {
              email: savedEmail,
              password: savedPassword,
            });
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
              setEmail(data.user.email);
              setMobile(data.user.mobile);
              setPassword(savedPassword);
              setProfilePicture(data.user.profile_image);
              console.log('PP', profilePicture);
              getImage();
            } else {
              console.log('ERROR', error);
            }
          } catch (error) {
            console.log('Errors', error);
          }
        } else {
          console.log('Empty');
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
  };

  const getImage = async () => {
    try {
      fetch(`http://waamclub.com/${profilePictureLink}`)
        .then(response => {
          console.log(response);
          if (response.ok) {
            return response.url;
          }
          throw new Error('Failed to retrieve image');
        })
        .then(imageUrl => {
          // Use the image URL to display the image in your React Native app
          setProfilePicture(imageUrl);
          console.log('IMAGE', profilePicture);
          console.log('IMAGE', imageUrl);
        })
        .catch(error => {
          console.log('IMAGE ERROR', error);
        });
    } catch (error) {
      console.log('IMAGE CATCH ERROR', error);
    }
  };
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}>
          <Block flex style={styles.profileCard}>
            <Block middle row style={styles.avatarContainer}>
              <Image
                source={{
                  uri:
                    // profilePicture ||
                    //  `http://waamclub.com/${profilePicture}`
                    // `data:image/png;base64,${profilePicture}`
                    Images.ProfilePicture,
                }}
                style={styles.avatar}
              />
              <Text
                style={{fontFamily: fontFamily.MONTSERRATBOLD}}
                bold
                size={21}
                color="#32325D">
                Hello, {name}
              </Text>
            </Block>
            <Block style={styles.info}>
              <Block
                center
                row
                space="between"
                style={{marginTop: 20, paddingBottom: 24}}>
                <Button
                  small
                  style={{
                    backgroundColor: argonTheme.COLORS.INFO,
                    width: 120,
                    height: 45,
                  }}>
                  <Text
                    color={argonTheme.COLORS.WHITE}
                    style={{fontFamily: fontFamily.MONTSERRATBOLD}}
                    bold>
                    Total Earning
                  </Text>
                  <Text
                    color={argonTheme.COLORS.WHITE}
                    style={{fontFamily: fontFamily.MONTSERRATBOLD}}
                    bold>
                    {' Rs.'}{' '}
                    {state.totalReferralAmt ? state.totalReferralAmt : '0.00'}
                  </Text>
                </Button>
                <Button
                  small
                  style={{
                    backgroundColor: argonTheme.COLORS.BUTTON_PINK,
                    width: 120,
                    height: 45,
                  }}>
                  <Text
                    color={argonTheme.COLORS.WHITE}
                    style={{fontFamily: fontFamily.MONTSERRATBOLD}}
                    bold>
                    Total Rewards
                  </Text>
                  <Text
                    color={argonTheme.COLORS.WHITE}
                    style={{fontFamily: fontFamily.MONTSERRATBOLD}}
                    bold>
                    Rs. 0.00
                  </Text>
                </Button>
              </Block>
            </Block>
            <Block flex>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Account Settings')}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="account-settings"
                      family={'MaterialCommunityIcons'}
                      size={14}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="black"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Account Settings
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate('KYC', {profile: true})}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="piggy-bank"
                      // family={'MaterialCommunityIcons'}
                      size={14}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="black"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Bank Details
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Payments')}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="payments"
                      family={'MaterialIcons'}
                      size={14}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="black"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Payments
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentHistory')}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="history"
                      family={'MaterialCommunityIcons'}
                      size={14}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="black"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Payments History
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Refer')}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="attach-money"
                      family="MaterialIcons"
                      size={16}
                      color={argonTheme.COLORS.BLACK}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="black"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Refer and Earn
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Help')}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="call"
                      family={'MaterialIcons'}
                      size={14}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="black"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Help Center
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Rating')}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="star-rate"
                      family={'MaterialIcons'}
                      size={14}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="black"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Rate Us
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.clear();
                  navigation.navigate('Login');
                  // navigation.reset()
                }}>
                <Block row center card style={styles.screens}>
                  <Block row center style={{width: width * 0.75}}>
                    <Icon
                      name="logout"
                      family={'MaterialCommunityIcons'}
                      size={14}
                      style={styles.screensIcon}
                    />
                    <Text
                      color="red"
                      style={{fontFamily: fontFamily.WHITNEYREGULAR}}
                      size={15}>
                      Logout
                    </Text>
                  </Block>
                  <Text
                    color="black"
                    size={15}
                    style={{fontFamily: fontFamily.WHITNEYREGULAR}}>
                    {'>'}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            {/* <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={16} color="#32325D" style={{marginTop: 10}}>
                      San Francisco, USA
                    </Text>
                  </Block>
                  <Block middle style={{marginTop: 30, marginBottom: 16}}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{textAlign: 'center'}}>
                      An artist of considerable range, Jessica name taken by
                      Melbourne …
                    </Text>
                    <Button
                      color="transparent"
                      textStyle={{
                        color: '#233DD2',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      Show more
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Text
                      bold
                      size={16}
                      color="#525F7F"
                      style={{marginTop: 12}}>
                      Album
                    </Text>
                    <Button
                      small
                      color="transparent"
                      textStyle={{
                        color: '#5E72E4',
                        fontSize: 12,
                        marginLeft: 24,
                      }}>
                      View all
                    </Button>
                  </Block>
                  <Block style={{paddingBottom: -HeaderHeight * 2}}>
                    <Block row space="between" style={{flexWrap: 'wrap'}}>
                      {Images.Viewed.map((img, imgIndex) => {
                        {if (imgIndex > 2)
                          return;
                        }
                        return(
                        <Image
                          source={{uri: img}}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      )})}
                    </Block>
                  </Block>
                </Block> */}
          </Block>
        </ImageBackground>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -(HeaderHeight / 4) : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    paddingTop: 10,
    // marginHorizontal: argonTheme.SIZES.BASE,
    marginTop: '27%',
    paddingBottom: 15,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: argonTheme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    elevation: 5,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    // marginTop: -80
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 62,
    marginRight: 20,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  screens: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomColor: argonTheme.COLORS.GREY,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: width * 0.85,
    elevation: 1,
    marginVertical: 5,
  },
  screensIcon: {
    marginRight: 10,
    color: 'black',
  },
});

export default Profile;
