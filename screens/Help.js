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
import {Images, argonTheme, fontFamily, blocks} from '../constants';

import {Icon, Input, SmallCard} from '../components';
import React from 'react';
// import SmallCard from '../components/SmallCard';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const Help = () => {
  return (
    <Block flex style={{backgroundColor: argonTheme.COLORS.WHITE}}>
      <Block row >
        <Input
          placeholder="What are you looking for"
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{alignItems: 'center', marginHorizontal: 20,}}>
        <Block flex >
          <SmallCard
            navi={('Categories', {selectedFilter: blocks[0]})}
            item={blocks[0]}
            style={{marginRight: theme.SIZES.BASE}}
          />
          <SmallCard
            navi={('Categories', {selectedFilter: blocks[0]})}
            item={blocks[1]}
            style={{marginRight: theme.SIZES.BASE}}
          />
          <SmallCard
            navi={('Categories', {selectedFilter: blocks[0]})}
            item={blocks[2]}
            style={{marginRight: theme.SIZES.BASE}}
          />
          <SmallCard
            navi={('Categories', {selectedFilter: blocks[0]})}
            item={blocks[3]}
            style={{marginRight: theme.SIZES.BASE}}
          />
          <SmallCard
            navi={('Categories', {selectedFilter: blocks[0]})}
            item={blocks[4]}
            style={{marginRight: theme.SIZES.BASE}}
          />
        </Block>
      </ScrollView>
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

export default Help;
