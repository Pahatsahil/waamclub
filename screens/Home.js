import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  // Text,
  View,
} from 'react-native';
import {Block, theme, Text} from 'galio-framework';

import {Card, SmallCard, ProductCards, BigCards} from '../components';
import articles from '../constants/articles';
import {argonTheme, blocks, fontFamily} from '../constants';
import {SliderBox} from 'react-native-image-slider-box';
import Theme from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import demats from '../constants/demats';
const {width, height} = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation()
  const images = [
    'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80',
    'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
    'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80',
    'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
    'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
  ];
  const renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex card style={styles.slider}>
          <SliderBox
            images={images}
            onCurrentImagePressed={index =>
              navigation.navigate('OfferPage')
            }
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
        <Block flex>
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
        </Block>
        <Block flex>
        <Text size={15} style={styles.heading}>
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
              />
              <BigCards
                navi={'LimitedTimeDeals'}
                item={articles[2]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <BigCards
                navi={'LimitedTimeDeals'}
                item={articles[3]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <BigCards
                navi={'LimitedTimeDeals'}
                item={articles[4]}
                style={{marginRight: theme.SIZES.BASE}}
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
              />
              <Card
                navi={'OfferPage'}
                item={articles[2]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <Card
                navi={'OfferPage'}
                item={articles[3]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <Card
                navi={'OfferPage'}
                item={articles[4]}
                style={{marginRight: theme.SIZES.BASE}}
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
              />
              <ProductCards
                navi={'Product'}
                item={articles[2]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <ProductCards
                navi={'Product'}
                item={articles[3]}
                style={{marginRight: theme.SIZES.BASE}}
              />
              <ProductCards
                navi={'Product'}
                item={articles[4]}
                style={{marginRight: theme.SIZES.BASE}}
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
