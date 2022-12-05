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
import {useNavigation} from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';

const {width, height} = Dimensions.get('screen');

const BigCards = ({
  navi,
  item,
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
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
    // <TouchableWithoutFeedback onPress={() => Alert.alert('Image')}>
    <Block row={horizontal} card flex style={cardContainer}>
      <Block flex style={imgContainer}>
        <Image source={{uri: item.image}} style={imageStyles} />
      </Block>
      <Block flex row space="between" style={styles.cardDescription}>
        {/* <Text size={14} style={styles.cardTitle}>
              1:45:00
            </Text> */}

        <CountDown
          until={6300}
          onFinish={() => alert('finished')}
          onPress={() => alert('hello')}
          showSeparator={true}
          timeLabels={false}
          digitStyle={{
            backgroundColor: argonTheme.COLORS.WHITE,
          }}
          separatorStyle={{
            fontSize: 14,
            padding: 0,
            margin: 0,
            color: argonTheme.COLORS.BLACK,
          }}
          digitTxtStyle={{
            fontSize: 14,
            color: argonTheme.COLORS.BLACK,
          }}
          size={20}
        />
        <TouchableWithoutFeedback onPress={() => navigation.navigate(navi)}>
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
              Grab Deal
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    </Block>
    // </TouchableWithoutFeedback>
  );
};

BigCards.propTypes = {
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
    minHeight: 80,
    minWidth: width * 0.75,
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
    height: 160,
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

export default BigCards;
