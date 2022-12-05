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
import {Button} from 'native-base';
const {width, height} = Dimensions.get('screen');

class MedimCards extends React.Component {
  render() {
    const {
      navigation,
      amount,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      sorted,
      filtered
    } = this.props;

    const imageStyles = [styles.horizontalImage, imageStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      styles.horizontalStyles,
      // styles.shadow,
    ];

    return (
      <TouchableWithoutFeedback onPress={() => Alert.alert('Image')}>
        <Block row={horizontal} card flex style={cardContainer}>
          <Block flex style={imgContainer}>
            <Image
              resizeMode="cover"
              source={{uri: item.image}}
              style={imageStyles}
            />
          </Block>
          <Block flex space="between" style={styles.cardDescription}>
            {/* <Button paddingX={'1'} w={'95%'}>Earn Rs Cashback Now</Button> */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('OfferPage')}>
              <Block
                style={{
                  width: '95%',
                  borderRadius: 5,
                  paddingVertical: 5,
                  backgroundColor: argonTheme.COLORS.WARNING,
                  marginBottom: 5,
                }}>
                <Text
                  size={11}
                  bold
                  color={argonTheme.COLORS.SECONDARY}
                  style={{alignSelf: 'center', textTransform: 'uppercase'}}>
                  Earn Rs {amount} Cashback Now
                </Text>
              </Block>
            </TouchableWithoutFeedback>
            <Text
              size={14}
              color={ctaColor ? ctaColor : argonTheme.COLORS.BLACK}
              style={styles.cardTitle}>
              Cashback Terms
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  }
}

MedimCards.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    flex: 1,
    minHeight: height * 0.1,
    maxWidth: width * 0.45,
    // marginBottom: 16,
    marginTop: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    // color: argonTheme.COLORS.BLACK,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cardDescription: {
    // padding: theme.SIZES.BASE / 2,
    paddingVertical: theme.SIZES.BUTTON_HEIGHT / 4,
    alignItems: 'center',
  },
  imageContainer: {
    // borderRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: height / 9,
    width: '100%',
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

export default withNavigation(MedimCards);
