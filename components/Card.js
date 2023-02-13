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
import {useNavigation} from '@react-navigation/native';
import {argonTheme} from '../constants';

const {width, height} = Dimensions.get('window');
const Card = ({navi, item, horizontal, full, style, ctaColor, imageStyle}) => {
  const navigation = useNavigation();
  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate(navi, {data: item})}>
      <Block flex style={cardContainer}>
        <Block style={imgContainer}>
          {item.demat ? (
            <Image source={item.image} resizeMode='contain' style={imageStyles} />
          ) : (
            <Image source={{uri: item.image}} style={imageStyles} />
          )}
        </Block>
      </Block>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    borderRadius: 10,
    minHeight: 114,
    elevation: 3,
    padding: 7.5,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    // borderRadius: 13,
    // elevation: 3,
    overflow: 'hidden',
    // backgroundColor: theme.COLORS.WHITE,
    // marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 104,
    // marginBottom: 16,
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 170,
    width: width * 0.7,
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
    width: width,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);
