import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Button, Modal} from 'native-base';
import {Icon} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {StoreContext} from '../redux/store/index';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Api} from '../api/Api';
const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const OfferPage = ({navigation, route}) => {
  const {data} = route.params;
  const productLink = 'https://www.waamclub.com/ragister/demat?referral_id=';
  const {state, actions} = useContext(StoreContext);
  const [agentID, setAgentID] = useState(state.userID || []);
  const [offerTerms, setOfferTerms] = useState(false);
  const [rewardTerms, setRewardTerms] = useState(false);
  const [loader, setLoader] = useState(false);
  const amount = 8;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getData();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    console.log('Count', state.dematReferralCount);
    console.log('object', agentID);
    getData();
  }, [agentID, state.dematReferralCount]);

  const getData = async () => {
    setLoader(true);
    try {
      let savedEmail = await AsyncStorage.getItem('email');
      let savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail != null && savedPassword != null) {
        try {
          // const data = ;
          console.log('EMAIL: ', {email: savedEmail, password: savedPassword});
          const res = await axios.post(
            Api.LOGIN,
            {email: savedEmail, password: savedPassword},
            {},
          );
          const {data, error} = res.data;
          console.log('Header', res.headers.token);
          if (res) {
            console.log('DATAA', data.user);
            console.log('DATAA', data.TotalReferral);
            setDematCount(data.TotalReferral);
            actions.setDematReferralCount(data.TotalReferral);
            actions.setUserLoginDATA(data.user);
            actions.setUserID(data.user.agent_id);
            actions.setUserToken(res.headers.token);
          } else {
            console.log('ERROR', error);
          }
        } catch (error) {
          console.log('Errors', error);
          setLoader(false);
        }
        console.log('STATE', state.userLoginDATA);
      } else {
        console.log('Empty');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('Error', error);
    }
  };
  const onShare = link => {
    const shareOptions = {
      message: `Join ${data.title} with this Link ${link}\n Referral id is: ${agentID}`,
      // url: Images.Facebook
    };
    try {
      const response = Share.open(shareOptions);
      console.log(response);
    } catch (error) {
      console.log('Errror', error);
    }
  };

  const Rewards = () => {
    return (
      <Modal
        isOpen={rewardTerms}
        top="1/4"
        onClose={() => setRewardTerms(!rewardTerms)}
        animationPreset="slide">
        <Modal.CloseButton />
        <Modal.Header w={'full'}>
          <Text
            size={18}
            bold
            color={argonTheme.COLORS.BLACK}
            style={{fontFamily: fontFamily.MONTSERRATBOLD}}>
            Rewards Terms and COnditions
          </Text>
        </Modal.Header>
        <Modal.Body w={'full'} backgroundColor={argonTheme.COLORS.WHITE}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
        </Modal.Body>
      </Modal>
    );
  };

  const OfferTerms = () => {
    return (
      <Modal
        isOpen={offerTerms}
        top="1/4"
        onClose={() => setOfferTerms(!offerTerms)}
        animationPreset="slide">
        <Modal.CloseButton />
        <Modal.Header w={'full'}>
          <Text
            size={18}
            bold
            color={argonTheme.COLORS.BLACK}
            style={{fontFamily: fontFamily.MONTSERRATBOLD}}>
            Offer Terms and Conditions
          </Text>
        </Modal.Header>
        <Modal.Body w={'full'} backgroundColor={argonTheme.COLORS.WHITE}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{'\n'}
          </Text>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Block flex style={styles.profile}>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[argonTheme.COLORS.PRIMARY]}
          />
        }>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Block
              row
              style={{height: 20, alignItems: 'center', width: width * 0.7}}>
              <Icon
                name={'chevron-left'}
                size={20}
                color={argonTheme.COLORS.WHITE}
                style={{marginRight: 15}}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: argonTheme.COLORS.WHITE,
                  fontSize: 17,
                  fontFamily: fontFamily.MONTSERRATBOLD,
                }}>
                {data.demat ? data.title : 'Amazon'}
              </Text>
            </Block>
          </TouchableOpacity>
          <Block width={width * 0.2} style={{marginTop: '-2%'}}>
            <Button
              rounded={'full'}
              color={argonTheme.COLORS.PRIMARY}
              // size={'xs'}
              onPress={() => onShare(productLink + agentID)}
              leftIcon={
                <Icon
                  name={'share'}
                  size={16}
                  // onPress={() => navigation.goBack()}
                  color={argonTheme.COLORS.WHITE}
                  // style={{marginRight: 2}}
                />
              }>
              <Text size={14} color={argonTheme.COLORS.WHITE}>
                Share
              </Text>
            </Button>
          </Block>
        </ImageBackground>
        <Block flex style={styles.profileBackground}>
          <Block flex style={styles.profileCard}>
            <Block
              middle
              center
              style={{
                marginTop: '-15%',
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: argonTheme.COLORS.WHITE,
                borderRadius: 5,
                elevation: 5,
              }}>
              <Image
                style={{height: 50, width: 100}}
                source={data.demat ? data.image : Images.Gmail}
                resizeMode="contain"
              />
            </Block>
            <Block center style={{marginTop: 20}}>
              <Text
                color={argonTheme.COLORS.BLACK}
                style={{textAlign: 'justify', marginBottom: 10}}
                // size={16}
              >
                {data.about}
              </Text>
            </Block>
            <Block style={{marginVertical: 10, marginBottom: 20}}>
              <Text
                color={argonTheme.COLORS.INFO}
                style={{textAlign: 'justify'}}>
                In order to get rewards and be a Product Seller on our Waamclub.
                You need to the following:
              </Text>
              <Text
                color={argonTheme.COLORS.BLACK}
                style={{textAlign: 'justify'}}
                bold>
                1. Share the {data.title} referral link from our app to your
                friends and family
              </Text>
              <Text
                color={argonTheme.COLORS.BLACK}
                style={{textAlign: 'justify'}}
                bold>
                2. Make sure they register and open an acccount
              </Text>
              <Text
                color={argonTheme.COLORS.BLACK}
                style={{textAlign: 'justify'}}
                bold>
                3. After sucessfull opening an account under {data.title} you
                will get your commison.
              </Text>
              <Text
                color={argonTheme.COLORS.BLACK}
                style={{textAlign: 'justify'}}
                bold>
                4. After their first sucessfull trade.. You will get more
                Rewards
              </Text>
            </Block>
            <Button
              paddingY={'1'}
              background={argonTheme.COLORS.WARNING}
              onPress={() => onShare(productLink + agentID)}>
              <Text color={argonTheme.COLORS.WHITE} bold>
                Share Referral Link now
              </Text>
            </Button>
          </Block>
          {/* <Block
            height={10}
            style={{
              backgroundColor: argonTheme.COLORS.SECONDARY2,
              // paddingBottom: 10,
              marginHorizontal: '-10%',
            }}></Block> */}
          <Block
            // flex
            row
            style={{
              backgroundColor: argonTheme.COLORS.WHITE,
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <Block flex width={width / 2.3}>
              <Button
                style={{marginBottom: 10}}
                background={argonTheme.COLORS.WARNING}
                onPress={() => navigation.navigate('Home')}
                size={'xs'}
                px={'1'}>
                <Block row center>
                  <Icon
                    name={'plus-circle'}
                    size={14}
                    family={'FontAwesome5'}
                    color={argonTheme.COLORS.WHITE}
                    style={{marginRight: 5}}
                  />
                  <Text color={argonTheme.COLORS.WHITE} bold>
                    See More Offers {'>'}
                  </Text>
                </Block>
              </Button>
              <Button
                justifyContent={'flex-start'}
                style={{marginBottom: 10}}
                background={argonTheme.COLORS.PRIMARY}
                onPress={() => setRewardTerms(true)}
                size={'xs'}
                px={'6'}>
                <Block row center>
                  <Icon
                    name={'plus-circle'}
                    size={14}
                    family={'FontAwesome5'}
                    color={argonTheme.COLORS.WHITE}
                    style={{marginRight: 5}}
                  />
                  <Text color={argonTheme.COLORS.WHITE} bold>
                    Reward Rates
                  </Text>
                </Block>
              </Button>
              <Button
                justifyContent={'flex-start'}
                style={{marginBottom: 10}}
                background={argonTheme.COLORS.BUTTON_PINK}
                onPress={() => setOfferTerms(true)}
                size={'xs'}
                px={'6'}>
                <Block row center>
                  <Icon
                    name={'plus-circle'}
                    size={14}
                    family={'FontAwesome5'}
                    color={argonTheme.COLORS.WHITE}
                    style={{marginRight: 5}}
                  />
                  <Text color={argonTheme.COLORS.WHITE} bold>
                    Offers Terms
                  </Text>
                </Block>
              </Button>
            </Block>
            <Block flex width={width / 2.5} style={{paddingHorizontal: 5}}>
              <Block row center>
                <Icon
                  name={'user-circle'}
                  size={15}
                  family={'FontAwesome'}
                  color={argonTheme.COLORS.WARNING}
                  style={{marginRight: 5}}
                />
                <Text color={argonTheme.COLORS.BLACK} bold size={15}>
                  Complete {10 - state.dematReferralCount} Referral{'\n'} Today
                </Text>
              </Block>
              <Block>
                <Text
                  style={{paddingLeft: '17%'}}
                  color={argonTheme.COLORS.BLACK}
                  bold
                  size={15}>
                  |{'\n'}|{'\n'}|{'\n'}
                </Text>
                <Block style={{paddingLeft: '14%', marginTop: '-10%'}}>
                  <Icon
                    name={'angle-double-down'}
                    size={22}
                    family={'FontAwesome'}
                    color={argonTheme.COLORS.PRIMARY}
                    // style={{paddingRight: 5}}
                  />
                </Block>
                <Text
                  style={{paddingLeft: '17%', marginTop: '-2%'}}
                  color={argonTheme.COLORS.BLACK}
                  bold
                  size={15}>
                  |{'\n'}|{'\n'}|{'\n'}
                </Text>
              </Block>
              <Block row center style={{marginTop: '-18%'}}>
                <Icon
                  name={'gift'}
                  size={18}
                  family={'FontAwesome'}
                  color={argonTheme.COLORS.BUTTON_PINK}
                  style={{marginRight: 12}}
                />
                <Block>
                  <Text color={argonTheme.COLORS.BLACK} size={15}>
                    Rewards in
                  </Text>
                  <Text color={argonTheme.COLORS.BLACK} bold size={15}>
                    24 hours after{'\n'}{' '}
                    {data.demat ? `10 Referral \nCompletion` : 'Shipment'}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
      <OfferTerms />
      <Rewards />
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    // marginTop: Platform.OS === 'android' ? -(HeaderHeight / 4) : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height / 4,
    padding: 15,
    // zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileBackground: {
    width: width,
    // height: 'auto',
    marginBottom: 10,
  },
  profileCard: {
    // position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE,
    // marginHorizontal: theme.SIZES.BASE,
    marginBottom: 10,
    backgroundColor: theme.COLORS.WHITE,
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
    backgroundColor: theme.COLORS.WHITE,
    borderBottomColor: theme.COLORS.GREY,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: width * 0.85,
    elevation: 3,
    marginVertical: 5,
  },
  screensIcon: {
    marginRight: 10,
    color: 'black',
  },
});

export default OfferPage;
