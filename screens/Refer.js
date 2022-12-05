import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Modal,
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Block, theme, DeckSwiper} from 'galio-framework';
import {argonTheme, blocks} from '../constants';
import Theme from '../constants/Theme';
const {width, height} = Dimensions.get('window');

import {Images} from '../constants';

const Refer = () => {
  const [modal, hideModal] = useState(false);

  const appsData = [
    {
      index: 1,
      name: 'WhatsApp',
      image: Images.WhatsAppBig,
    },
    {
      index: 2,
      name: 'Messenger',
      image: Images.Messenger,
    },
    {
      index: 3,
      name: 'Viber',
      image: Images.ViberBig,
    },
    {
      index: 4,
      name: 'Twitter',
      image: Images.Twitter,
    },
    {
      index: 5,
      name: 'Messages',
      image: Images.Messages,
    },
    {
      index: 6,
      name: 'Instagram',
      image: Images.Instagram,
    },
    {
      index: 7,
      name: 'Gmail',
      image: Images.Gmail,
    },
    {
      index: 8,
      name: 'More',
      image: Images.More,
    },
    {
      index: 9,
      name: 'Twitch',
      image: Images.More,
    },
    {
      index: 10,
      name: 'SnapChat',
      image: Images.More,
    },
    {
      index: 10,
      name: 'Telegram',
      image: Images.More,
    },
    {
      index: 11,
      name: 'Bluetooth',
      image: Images.More,
    },
    {
      index: 12,
      name: 'TikTok',
      image: Images.More,
    },
  ];

  const halfData = [
    {
      index: 1,
      name: 'WhatsApp',
      image: Images.WhatsAppBig,
    },
    {
      index: 2,
      name: 'Twitter',
      image: Images.Twitter,
    },
    {
      index: 3,
      name: 'More',
      image: Images.More,
    },
  ];

  const Share = () => {
    return (
      <Modal
        visible={modal}
        onRequestClose={() => {
          hideModal(false);
        }}
        transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: argonTheme.COLORS.GREY2,
          }}></View>
        <View
          style={{
            justifyContent: 'flex-end',
            marginHorizontal: 10,
            marginBottom: 15,
            borderColor: argonTheme.COLORS.WHITE,
            borderWidth: 1,
            borderRadius: 10,
            height: 300,
            backgroundColor: argonTheme.COLORS.WHITE,
            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              paddingLeft: 100,
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: argonTheme.COLORS.BLACK,
              }}>
              Share Referral Code
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                hideModal(false);
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: argonTheme.COLORS.BLACK,
                  marginBottom: 4,
                  alignSelf: 'flex-end',
                }}>
                X
              </Text>
            </TouchableWithoutFeedback>
          </View>
          {/* <View> */}
          <FlatList
            data={appsData}
            // horizontal={true}
            numColumns={4}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    marginLeft: 8,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item.name);
                    }}
                    style={{
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={{
                        width: 50,
                        height: 50,
                      }}
                    />
                    <Text style={{color: argonTheme.COLORS.BLACK2}}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  {/* <View style={{padding: 15, alignItems: 'center'}}>
                      <Image
                        source={item.image}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: argonTheme.COLORS.GREY2,
                        }}
                      />
                      <Text style={{color: argonTheme.COLORS.BLACK2}}>{item.name}</Text>
                    </View> */}
                </View>
              );
            }}
          />
          {/* </View> */}
        </View>
      </Modal>
    );
  };
  return (
    <ImageBackground
      source={Images.ProfileBackground}
      style={styles.profileContainer}
      imageStyle={styles.profileBackground}>
      <Block flex card center style={styles.container}>
        <Share />
        <Image
          resizeMode="contain"
          source={Images.WhatsAppBig}
          style={{
            width: width * 0.5,
            height: height * 0.2,
            alignSelf: 'center',
            marginBottom: 25,
          }}
        />
        <Text style={styles.boldText}>
          Invite friends & earn flat 10% of their cashback amount, Everytime
          they shop!!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 10,
            color: argonTheme.COLORS.BLACK,
          }}>
          Make your friends join waamclub via your referral link below
        </Text>
        <View
          style={{
            backgroundColor: argonTheme.COLORS.WHITE,
            borderWidth: 2,
            borderColor: argonTheme.COLORS.ERROR,
            borderStyle: 'dashed',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={[styles.boldText, {color: argonTheme.COLORS.ERROR}]}>
            https://waamclub/reiojweYY
          </Text>
        </View>
        <Text
          style={[
            styles.boldText,
            {color: argonTheme.COLORS.BLACK, textTransform: 'capitalize'},
          ]}>
          Tap to Copy
        </Text>
        <Block
          card
          style={{
            backgroundColor: argonTheme.COLORS.PRIMARY,
            marginTop: 10,
            elevation: 3,
            padding: 10,
            height: 150,
          }}>
          <Text
            style={[
              styles.boldText,
              {color: argonTheme.COLORS.WHITE, fontWeight: 'bold'},
            ]}>
            Invite By Social Media
          </Text>
          <FlatList
            scrollEnabled={false}
            data={halfData}
            // horizontal={true}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    marginTop: 8,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      item.name == 'More'
                        ? hideModal(!modal)
                        : console.log(item.name);
                    }}
                    style={{
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={item.image}
                      style={{
                        width: 55,
                        height: 55,
                      }}
                    />
                    <Text
                      style={{color: argonTheme.COLORS.WHITE, marginTop: 5}}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  {/* <View style={{padding: 15, alignItems: 'center'}}>
                      <Image
                        source={item.image}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: argonTheme.COLORS.GREY2,
                        }}
                      />
                      <Text style={{color: argonTheme.COLORS.BLACK2}}>{item.name}</Text>
                    </View> */}
                </View>
              );
            }}
          />
        </Block>
      </Block>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: argonTheme.COLORS.WHITE,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  boldText: {
    fontSize: 16,
    color: argonTheme.COLORS.BLACK,
    marginBottom: 4,
    textAlign: 'center',
  },
  changeButton: {
    alignItems: 'center',
  },
  buttons: {
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    fontSize: 14,
    textAlign: 'center',
    color: argonTheme.COLORS.WHITE,
  },
  profileContainer: {
    width: width,
    height: height * 0.65,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height * 0.35,
  },
});

export default Refer;
