import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Button, Menu, ScrollView} from 'native-base';
import {sortedData, Images, argonTheme, fontFamily} from '../constants';
import {MediumCards} from '../components';

const {height, width} = Dimensions.get('screen');

const HotOffers = ({navigation, route}) => {
  const [showmodal, setShowModal] = useState(false);
  const filterData = [
    {
      index: 1,
      name: 'Freebies',
    },
    {
      index: 2,
      name: 'Clothing',
    },
    {
      index: 3,
      name: 'Mobile Accessories',
    },
    {
      index: 4,
      name: 'Electronics',
    },
    {
      index: 5,
      name: 'Laptops',
    },
    {
      index: 6,
      name: 'Mens Footwear',
    },
    {
      index: 7,
      name: 'Female Clothing',
    },
    {
      index: 8,
      name: 'Household',
    },
    {
      index: 9,
      name: 'Tools',
    },
  ];

  const Cards = () => {
    return (
      <Block>
        <FlatList
          data={sortedData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          renderItem={items => {
            return (
              <MediumCards
                navi={'HotOffers'}
                item={items.item}
                style={{marginRight: theme.SIZES.BASE}}
                amount={300}
                ctaColor={theme.COLORS.FACEBOOK}
              />
            );
          }}
        />
      </Block>
    );
  };

  return (
    <Block flex style={styles.container}>
      <Block center row></Block>
      <Block
        flex
        style={{
          paddingHorizontal: 5,
          backgroundColor: argonTheme.COLORS.WHITE,
        }}>
        <Cards />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: argonTheme.COLORS.SECONDARY,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  boldText: {
    color: argonTheme.COLORS.BLACK,
    fontSize: 12,
    fontFamily: fontFamily.MONTSERRATSEMIBOLD,
    textAlignVertical: 'center',
  },
  boldLabel: {
    color: argonTheme.COLORS.BLACK,
    fontFamily: fontFamily.WHITNEYBOLD,
  },
});

export default HotOffers;
