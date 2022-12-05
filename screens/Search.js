//galio
import {Block, Text, theme} from 'galio-framework';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
//argon
import {Images, argonTheme, fontFamily} from '../constants';

import {Icon, Input} from '../components';
import React from 'react';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const Search = () => {
  return (
    <Block flex style={{backgroundColor: argonTheme.COLORS.WHITE}}>
      <Block row flex>
        <Input
          placeholder="Search by Product, Copany, Deals, Discount"
          textColor={argonTheme.COLORS.WHITE}
          iconContent={
            <Icon
              size={14}
              color={argonTheme.COLORS.WHITE}
              name="search"
              style={styles.inputIcons}
              family="FontAwesome5"
            />
          }
          style={{
            height: height / 16,
            elevation: 5,
            width: width * 0.9,
            marginHorizontal: 20,
            backgroundColor: argonTheme.COLORS.PRIMARY,
            color: argonTheme.COLORS.WHITE,
            fontFamily: fontFamily.MONTSERRATBOLD,
          }}
        />
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER,
  },
  group: {
    paddingTop: theme.SIZES.BASE,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3,
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE,
    // paddingBottom: theme.SIZES.BASE * 2,
  },
});

export default Search;
