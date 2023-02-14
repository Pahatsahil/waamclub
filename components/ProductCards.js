import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {argonTheme, fontFamily} from '../constants';
import {useNavigation} from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';

const {width, height} = Dimensions.get('screen');

const ProductCards = ({
  navi,
  item,
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
  locked,
  count,
}) => {
  const navigation = useNavigation();
  const imageStyles = [styles.horizontalImage, imageStyle];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    styles.horizontalStyles,
    // styles.shadow,
  ];

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        locked
          ? navigation.navigate('LockModal', {data: item, count: count})
          : navigation.navigate(navi, {data: item});
      }}>
      <Block card flex style={cardContainer}>
        <Block flex style={imgContainer}>
          {locked ? (
            <Image
              source={require('../assets/Lock.png')}
              resizeMode="contain"
              style={imageStyles}
            />
          ) : (
            <>
              <Image source={{uri: item.image}} style={imageStyles} />
              <Block
                row
                style={{
                  paddingBottom: 5,
                  borderColor: argonTheme.COLORS.BORDER_COLOR,
                  borderBottomWidth: 1,
                }}>
                <Text
                  size={13}
                  color={argonTheme.COLORS.BLACK}
                  style={{fontFamily: fontFamily.MONTSERRATREGULAR}}>
                  Brand:
                </Text>
                <Text
                  size={13}
                  color={argonTheme.COLORS.BLACK}
                  style={{
                    textTransform: 'uppercase',
                    fontFamily: fontFamily.MONTSERRATBOLD,
                  }}>
                  RealMe
                </Text>
              </Block>
            </>
          )}
        </Block>
        {locked ? (
          <Text
            color={argonTheme.COLORS.BLACK}
            bold
            style={{textAlign: 'center', marginVertical: 10}}
            size={16}>
            {10 - count} Referral left
          </Text>
        ) : (
          <Block flex space="between" style={styles.cardDescription}>
            <Text
              size={13}
              color={argonTheme.COLORS.BLACK}
              style={{textTransform: 'uppercase', lineHeight: 20}}>
              RealMe 10 Pro +
            </Text>
            <Block
              row
              center
              space="evenly"
              style={{
                paddingVertical: 5,
              }}>
              <Text
                size={11}
                color={argonTheme.COLORS.BLACK}
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                  marginRight: 2,
                  textDecorationLine: 'line-through',
                }}>
                Rs 19,999
              </Text>
              <Text
                size={13}
                color={argonTheme.COLORS.BLACK}
                style={{
                  textTransform: 'uppercase',
                  fontFamily: fontFamily.WHITNEYBOLD,
                  marginRight: 3,
                }}>
                Rs 14,999
              </Text>
              <Text
                size={11}
                color={argonTheme.COLORS.WARNING}
                style={{
                  fontFamily: fontFamily.WHITNEYREGULAR,
                }}>
                (5000 Off)
              </Text>
            </Block>
            <Block
              style={{
                padding: 10,
                backgroundColor: argonTheme.COLORS.BUTTON_PINK,
              }}>
              <Text
                size={13}
                muted={!ctaColor}
                color={argonTheme.COLORS.SECONDARY}
                style={{textTransform: 'uppercase'}}>
                Best Deal in this Price
              </Text>
            </Block>
            <Text
              size={13}
              muted={!ctaColor}
              color={argonTheme.COLORS.WARNING}
              style={{textTransform: 'uppercase', lineHeight: 20}}>
              FInal Price Rs: 14,999
            </Text>
          </Block>
        )}
      </Block>
    </TouchableWithoutFeedback>
  );
};

ProductCards.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 4,
    flex: 1,
    minHeight: width * 0.9,
    minWidth: width * 0.5,
    // marginBottom: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    color: argonTheme.COLORS.BLACK,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    paddingVertical: theme.SIZES.BUTTON_HEIGHT / 4,
    alignItems: 'center',
  },
  imageContainer: {
    // borderRadius: 3,
    // elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: width / 2,
    width: '60%',
    margin: 10,
    // flex: 1
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default ProductCards;
