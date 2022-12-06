import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  View,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import AnimatedLottieView from 'lottie-react-native';
import Icon from './Icon';
import argonTheme from '../constants/Theme';
const {width, height} = Dimensions.get('window');

class TabItem extends React.Component {
  renderIcon = () => {
    const {title, focused} = this.props;

    switch (title) {
      case 'Home':
        return (
          <Icon
            name="home"
            // family="ArgonExtra"
            size={14}
            color={focused ? 'white' : argonTheme.COLORS.PRIMARY}
          />
        );
      case 'Hot Offers':
        return (
          <Icon
            name="fire"
            family="MaterialCommunityIcons"
            size={20}
            color={focused ? 'white' : argonTheme.COLORS.PRIMARY}
          />
        );
      case 'Search':
        return (
          <Icon
            name="search"
            family="FontAwesome5"
            size={14}
            color={focused ? 'white' : argonTheme.COLORS.PRIMARY}
          />
        );
      case 'Profile':
        return (
          <Icon
            name="profile"
            family="AntDesign"
            size={14}
            color={focused ? 'white' : argonTheme.COLORS.PRIMARY}
          />
        );
      case 'Account':
        return (
          <Icon
            name="inbox"
            // family="ArgonExtra"
            size={14}
            color={focused ? 'white' : argonTheme.COLORS.PRIMARY}
          />
        );
      case 'Refer':
        return (
          <Icon
            name="attach-money"
            family="MaterialIcons"
            size={20}
            color={
              focused ? argonTheme.COLORS.WHITE : argonTheme.COLORS.WARNING
            }
          />
        );
      case 'Log out':
        return <Icon />;
      default:
        return null;
    }
  };

  render() {
    const {focused, title, navigation} = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{
          // height: height * 0.1,
          width: width * 0.2,
          alignSelf: 'center',
        }}
        onPress={() => navigation.navigate(title)}>
        <Block
          flex
          row
          middle
          center
          card={title == 'Refer' ? true : false}
          style={[
            containerStyles,
            {
              paddingVertical: 12,
              backgroundColor: focused
                ? argonTheme.COLORS.PRIMARY
                : title
                ? title == 'Refer'
                  ? argonTheme.COLORS.WHITE
                  : null
                : null,
              // borderColor: focused
              //   ? argonTheme.COLORS.WHITE
              //   : title
              //   ? title == 'Refer'
              //     ? argonTheme.COLORS.WARNING
              //     : argonTheme.COLORS.WHITE
              //   : argonTheme.COLORS.WHITE,
              borderRadius: title ? (title == 'Refer' ? 50 : null) : null,
              // borderWidth: title ? (title == 'Refer' ? 5 : null) : null,
              // elevation: title ? (title == 'Refer' ? 3 : null) : null,
            },
          ]}>
          <Block middle flex={0.9}>
            <View
              style={{
                position: 'relative',
                marginTop: title ? (title == 'Refer' ? '-10%' : null) : null,
                // padding: title ? (title == 'Refer' ? 10 : null) : null,
              }}>
              {this.renderIcon()}
            </View>
            <Block row center flex={1}>
              <Text
                size={14}
                bold={focused ? true : false}
                style={
                  {
                    // marginTop: title ? (title == 'Refer' ? 10 : null) : null,
                  }
                }
                color={
                  focused
                    ? argonTheme.COLORS.SECONDARY
                    : title
                    ? title == 'Refer'
                      ? argonTheme.COLORS.WARNING
                      : argonTheme.COLORS.BLACK
                    : argonTheme.COLORS.BLACK
                }>
                {title}
              </Text>
            </Block>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    // paddingHorizontal: 8,
    // backgroundColor: argonTheme.COLORS.WHITE,
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default TabItem;
