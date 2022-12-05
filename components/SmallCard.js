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

import {argonTheme} from '../constants';
import { useNavigation } from '@react-navigation/native';

const SmallCard = ({navi, selectedFilter,item, horizontal, full, style, ctaColor, imageStyle}) => {
    const navigation = useNavigation();
    console.log(navi)
    const imageStyles = [
      styles.horizontalImage,
      imageStyle,
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      styles.horizontalStyles,
    //   styles.shadow,
    ];

    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Categories', {selectedFilter: selectedFilter})}>
        <Block card flex style={cardContainer}>
          <Block flex style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>
              {item.title}
            </Text>
          </Block>
          <Block style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  }


SmallCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    // borderWidth: 0,
    flex: 1,
    minHeight: 80,
    minWidth: 120,
    marginBottom: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    color: argonTheme.COLORS.BLACK,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    // borderRadius: 3,
    // elevation: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 60,
    width: 60,
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

export default SmallCard;
