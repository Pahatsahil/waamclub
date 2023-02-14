import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  RefreshControl,
  View,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Api} from '../api/Api';
import {Card, SmallCard, ProductCards, BigCards} from '../components';
import articles from '../constants/articles';
import {argonTheme, blocks, fontFamily} from '../constants';
import {SliderBox} from 'react-native-image-slider-box';
import Theme from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import demats from '../constants/demats';
import { StoreContext } from '../redux/store';
const {width, height} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Home = () => {
  const navigation = useNavigation()
  const {state, actions} = useContext(StoreContext);
  const [locked, setLocked] = useState(true);
  const [agentID, setAgentID] = useState(state.userID || []);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getData();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    state.dematReferralCount >= 10 ? setLocked(false) : setLocked(true)
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

  const images = [
    require('../assets/demat/angel.jpg'),
    require('../assets/demat/motilal.jpg'),
    require('../assets/demat/nuvama.jpg'),
  ]
  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[argonTheme.COLORS.PRIMARY]}
          />
        }>
        <Block flex card style={styles.slider}>
          <SliderBox
            images={images}
            onCurrentImagePressed={index =>{
              index == 0 ?
              navigation.navigate('OfferPage', {data: demats[0]})
              : index == 1 ?
              navigation.navigate('OfferPage', {data: demats[1]})
              : index == 2 ?
              navigation.navigate('OfferPage', {data: demats[2]})
              : null
            }
            }
            resizeMode={'contain'}
            // currentImageEmitter={index =>
            //   console.log(`current pos is: ${index}`)
            // }
            dotColor={Theme.COLORS.PRIMARY}
            inactiveDotColor={Theme.COLORS.WHITE}
            autoplay
            loop
            sliderBoxHeight={height * 0.25}
            parentWidth={width * 0.855}
          />
        </Block>
        {/* <Block flex>
          <Text
            size={15}
            style={{
              fontFamily: fontFamily.WHITNEYBOLD,
              color: Theme.COLORS.BLACK,
              // paddingTop: 10,
              marginTop: 20,
            }}>
            TOP CATEGORIES
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <SmallCard
              navi={('Categories', {selectedFilter: blocks[0]})}
              item={blocks[0]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[1]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[2]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[3]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[4]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[5]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[6]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[7]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[8]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <SmallCard
              navi={'Categories'}
              item={blocks[9]}
              style={{marginRight: theme.SIZES.BASE}}
            />
          </ScrollView>
        </Block> */}
        <Block flex>
        <Text size={15} style={[styles.heading, {marginTop: 10,}]}>
            Demat Offers
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Block flex row>
              <Card
                navi={'OfferPage'}
                item={demats[0]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <Card
                navi={'OfferPage'}
                item={demats[1]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <Card
                navi={'OfferPage'}
                item={demats[2]}
                style={{marginRight: theme.SIZES.BASE}}
              />
            </Block>
          </ScrollView>
          <Text
            size={15}
            style={{
              fontFamily: fontFamily.WHITNEYBOLD,
              color: Theme.COLORS.BLACK,
              paddingTop: 5,
              marginBottom: 5,
            }}>
            Exclusive Offers
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Block flex row>
              <BigCards
                navi={'LimitedTimeDeals'}
                item={articles[1]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <BigCards
                navi={'LimitedTimeDeals'}
                item={articles[2]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <BigCards
                navi={'LimitedTimeDeals'}
                item={articles[3]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <BigCards
                navi={'LimitedTimeDeals'}
                item={articles[4]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
            </Block>
          </ScrollView>
          <Text size={15} style={styles.heading}>
            Stores
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Block flex row>
              <Card
                navi={'OfferPage'}
                item={articles[1]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <Card
                navi={'OfferPage'}
                item={articles[2]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <Card
                navi={'OfferPage'}
                item={articles[3]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <Card
                navi={'OfferPage'}
                item={articles[4]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
            </Block>
          </ScrollView>
          <Text size={15} style={styles.heading}>
            Product
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Block flex row>
              <ProductCards
                navi={'Product'}
                item={articles[1]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <ProductCards
                navi={'Product'}
                item={articles[2]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <ProductCards
                navi={'Product'}
                item={articles[3]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
              <ProductCards
                navi={'Product'}
                item={articles[4]}
                style={{marginRight: theme.SIZES.BASE}}
                locked={locked}
                count={state.dematReferralCount}
              />
            </Block>
          </ScrollView>
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  slider: {
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: argonTheme.COLORS.WHITE,
    elevation: 5,
    padding: 8,
    width: width * 0.9,
  },
  heading: {
    color: Theme.COLORS.BLACK,
    paddingTop: 5,
    fontFamily: fontFamily.WHITNEYBOLD,
  },
});

export default Home;
