import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Button, Modal} from 'native-base';
import {Icon} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {HeaderHeight} from '../constants/utils';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const OfferPage = () => {
  const navigation = useNavigation();
  const [offerTerms, setOfferTerms] = useState(false);
  const [rewardTerms, setRewardTerms] = useState(false);
  const amount = 8;

  const Rewards = () => {
    return (
      <Modal
        isOpen={rewardTerms} top='1/4'
        onClose={() => setRewardTerms(!rewardTerms)}
        animationPreset="slide">
        <Modal.CloseButton />
        <Modal.Header w={'full'} >
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
        isOpen={offerTerms} top='1/4'
        onClose={() => setOfferTerms(!offerTerms)}
        animationPreset="slide">
        <Modal.CloseButton />
        <Modal.Header w={'full'} >
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
      {/* <ScrollView  StickyHeaderComponent={Header}> */}
      <ImageBackground
        source={Images.ProfileBackground}
        style={styles.profileContainer}>
        <Block
          row
          style={{height: 20, alignItems: 'center', width: width * 0.7}}>
          <Icon
            name={'chevron-left'}
            size={20}
            onPress={() => navigation.goBack()}
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
            Amazon
          </Text>
        </Block>
        <Block width={width * 0.2} style={{marginTop: '-2%'}}>
          <Button
            rounded={'full'}
            color={argonTheme.COLORS.PRIMARY}
            // size={'xs'}
            leftIcon={
              <Icon
                name={'share'}
                size={16}
                onPress={() => navigation.goBack()}
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
            <Image source={Images.Gmail} />
          </Block>
          <Block center style={{marginVertical: 20}}>
            <Text
              color={argonTheme.COLORS.BLACK}
              style={{textAlign: 'center', marginBottom: 10}}
              size={16}
              bold>
              Earn upto 10% on Amazon while purchasing Mobiles, Fashion, Beauty,
              Kitchen
            </Text>
            <Text color={argonTheme.COLORS.INFO} style={{textAlign: 'center'}}>
              Earn upto 10% on Amazon while purchasing Mobiles, Fashion, Beauty,
              Kitchen
            </Text>
          </Block>
          <Button background={argonTheme.COLORS.WARNING}>
            <Text color={argonTheme.COLORS.WHITE} bold>
              Earn Upto {amount}% Rewards
            </Text>
          </Button>
        </Block>
        <Block
          height={10}
          style={{
            backgroundColor: argonTheme.COLORS.SECONDARY2,
            // paddingBottom: 10,
            marginHorizontal: '-10%',
          }}></Block>
        <Block
          flex
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
              onPress={() => navigation.navigate('Hot Offers')}
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
                Purchase Today
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
                  24 hours after{'\n'} Shipment
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      {/* </ScrollView> */}
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
    height: height,
  },
  profileCard: {
    // position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE,
    // marginHorizontal: theme.SIZES.BASE,
    paddingBottom: 10,
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
