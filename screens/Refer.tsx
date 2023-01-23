import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Block, theme, DeckSwiper} from 'galio-framework';
import {argonTheme, blocks} from '../constants';
import Share from 'react-native-share';
import {StoreContext} from '../redux/store/index';

const {width, height} = Dimensions.get('window');

import {Images} from '../constants';

const Refer = () => {
  // const affiliateLink = 'https://waamclub/reiojweYY';
  const customerLink = 'https://aviraspices.in/api/app/register?referral_id=';
  const {state, actions} = useContext<any>(StoreContext);
  const [agentID, setAgentID] = useState<any>(state.userID || []);

  const onShare = link => {
    const shareOptions = {
      message: `Join Waamclub with this Link and earn cashback  ${link}`,
      // url: Images.Facebook
    };
    try {
      const response = Share.open(shareOptions);
      console.log(response);
    } catch (error) {
      console.log('Errror', error);
    }
  };

  useEffect(() => {
    // data.map(item => console.log(item.agent_id));
    console.log('object', agentID)
  }, []);

  return (
    <ImageBackground
      source={Images.ProfileBackground}
      style={styles.profileContainer}
      imageStyle={styles.profileBackground}>
      <Block flex card center style={styles.container}>
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: argonTheme.COLORS.BLACK,}}>Your Referral ID: </Text>
          <View>
            <Text style={[styles.boldText, {color: argonTheme.COLORS.ERROR, fontWeight: 'bold'}]}>
              {agentID}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: argonTheme.COLORS.BLACK, fontWeight: 'bold'}}>Link: </Text>

          <TouchableOpacity
            onPress={() => {
              onShare(customerLink+agentID);
            }}
            style={{
              backgroundColor: argonTheme.COLORS.WHITE,
              borderWidth: 2,
              borderColor: argonTheme.COLORS.ERROR,
              borderStyle: 'dashed',
              paddingHorizontal: 10,
              width: width * 0.6
            }}>
            <Text style={[styles.boldText, {color: argonTheme.COLORS.ERROR}]}>
              {customerLink+agentID}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.boldText,
            {color: argonTheme.COLORS.BLACK, textTransform: 'capitalize'},
          ]}>
          Tap to Copy
        </Text>
        {/* <Block
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
                      item.name == 'More' ? onShare() : console.log(item.name);
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
                   <View style={{padding: 15, alignItems: 'center'}}>
                      <Image
                        source={item.image}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: argonTheme.COLORS.GREY2,
                        }}
                      />
                      <Text style={{color: argonTheme.COLORS.BLACK2}}>{item.name}</Text>
                    </View> 
                </View>
              );
            }}
          />
        </Block> */}
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
