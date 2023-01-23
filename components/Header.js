import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import {Button, Block, NavBar, Text, theme} from 'galio-framework';
import {fontFamily, Images} from '../constants';
import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';
import {DrawerActions} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => Alert.alert('Notify')}>
    <Icon
      // family="FontAwesome5"
      size={16}
      name="bell"
      color={argonTheme.COLORS.BLACK}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const FAQButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => Alert.alert('FAQ')}>
    <Icon
      // family="ArgonExtra"
      size={16}
      name="casket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);
const UserPhoto = ({isWhite, style, navigation}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => Alert.alert('UserPhoto')}>
    <Image
      source={{
        uri: 'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
      }}
      style={{width: 25, height: 25, borderRadius: 20}}
    />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => Alert.alert('Search')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const {back, navigation} = this.props;
    return back ? navigation.goBack() : null;
    // navigation.dispatch(DrawerActions.openDrawer())
  };
  renderRight = () => {
    const {white, title, navigation} = this.props;

    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        // <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ];
    }

    switch (title) {
      case 'Home':
        return [
          <BellButton
            key="chat-home"
            navigation={navigation}
            isWhite={white}
          />,
          <FAQButton
            key="basket-home"
            navigation={navigation}
            isWhite={white}
          />,
          <UserPhoto
            key="user-photo"
            navigation={navigation}
            isWhite={white}
          />,
        ];
      case 'Deals':
        return [
          // <BellButton key="chat-categories" navigation={navigation} />,
          // <BasketButton key='basket-categories' navigation={navigation} />
        ];
      case 'Categories':
        return [
          // <BellButton
          //   key="chat-categories"
          //   navigation={navigation}
          //   isWhite={white}
          // />,
          // <BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ];
      case 'Category':
        return [
          <BellButton
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          // <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ];
      case 'Profile':
        return [
          <BellButton
            key="chat-profile"
            navigation={navigation}
            isWhite={white}
          />,
          // <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ];
      case 'Product':
        return [
          <SearchButton
            key="search-product"
            navigation={navigation}
            isWhite={white}
          />,
          // <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ];
      case 'Search':
        return [
          // <BellButton
          //   key="chat-search"
          //   navigation={navigation}
          //   isWhite={white}
          // />,
          // <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ];
      case 'Settings':
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          // <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ];
      default:
        break;
    }
  };
  renderSearch = () => {
    const {navigation} = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        onFocus={() => Alert.alert('Search')}
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" />
        }
      />
    );
  };
  renderOptions = () => {
    const {navigation, optionLeft, optionRight} = this.props;

    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => Alert.alert('Options')}>
          <Block row middle>
            <Icon
              name="diamond"
              family="ArgonExtra"
              style={{paddingRight: 8}}
              color={argonTheme.COLORS.ICON}
            />
            <Text size={16} style={styles.tabTitle}>
              {optionLeft || 'Beauty'}
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => Alert.alert('Options')}>
          <Block row middle>
            <Icon
              size={16}
              name="bag-17"
              family="ArgonExtra"
              style={{paddingRight: 8}}
              color={argonTheme.COLORS.ICON}
            />
            <Text size={16} style={styles.tabTitle}>
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };
  renderTabs = () => {
    const {tabs, tabIndex, navigation} = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({tabId: id})}
      />
    );
  };
  renderHeader = () => {
    const {search, options, tabs} = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {/* {search ? this.renderSearch() : null} */}
          {/* {options ? this.renderOptions() : null} */}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  };
  Earning = () => {
    return (
      <Block style={{position: 'relative', right: width / 5}}>
        <Text
          style={{
            fontSize: 16,
            color: argonTheme.COLORS.BLACK,
            fontFamily: fontFamily.WHITNEYBOLD,
          }}>
          Total Earning: 0.00
        </Text>
      </Block>
    );
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const noShadow = [
      'Search',
      'Categories',
      'Deals',
      'Pro',
      'Profile',
    ].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? {backgroundColor: 'rgba(0,0,0,0)'} : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && {backgroundColor: bgColor}];
    const ImageBackground = () => {
      return (
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}>
          <Block row>
            <Icon
              name={back ? 'chevron-left' : null}
              size={20}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
              }
              style={{marginTop: 2}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: argonTheme.COLORS.BLACK,
                fontSize: 15,
              }}>
              Total Earning: 0.00
            </Text>
          </Block>
        </ImageBackground>
      );
    };
    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title == 'Home' ? this.Earning() : title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{
            alignItems: 'center',
            position: 'relative',
            left: width / 12,
          }}
          left={
            title == 'Home' ? null : (
              <Icon
                name={back ? 'chevron-left' : null}
                size={20}
                onPress={this.handleLeftPress}
                color={
                  iconColor ||
                  (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
                }
                style={{marginTop: 2}}
              />
            )
          }
          leftStyle={{paddingVertical: 12, flex: 0.2}}
          titleStyle={[
            styles.title,
            {color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER']},
            titleColor && {color: titleColor},
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: 'relative',
    alignSelf: 'center',
  },
  title: {
    width: '100%',
    fontSize: 16,
    color: argonTheme.COLORS.BLACK,
    fontFamily: fontFamily.MONTSERRATBOLD,
    textTransform: 'uppercase'
  },
  navbar: {
    paddingVertical: 0,
    // paddingBottom: theme.SIZES.BASE * 1.5,
    // paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
    // backgroundColor: argonTheme.COLORS.DEFAULT,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 9,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 4,
  },
});

export default withNavigation(Header);
