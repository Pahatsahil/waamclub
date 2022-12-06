import {Block, Text, theme} from 'galio-framework';
import {Image, ScrollView, StyleSheet, Dimensions} from 'react-native';

import TabItem from '../components/TabItem';
import Images from '../constants/Images';
import React from 'react';
import { argonTheme } from '../constants';
const {width, height} = Dimensions.get('window');

const CustomTabContent = ({
  navigation,
  profile,
  focused,
  state,
  ...rest
}) => {
  const screens = ['Home', 'Search', 'Refer', 'Hot Offers', 'Profile'];
  return (
    <Block
      style={styles.container}
      forceInset={{bottom: 'always', vertical: 'never'}}>
      {/* <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
      </Block> */}
      <Block flex style={[styles.header]}>
        <ScrollView
          style={{flex: 1}}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {screens.map((item, index) => {
            return (
              <TabItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    // width: '100%',
    backgroundColor: argonTheme.COLORS.SECONDARY,
  },
  header: {
    // paddingHorizontal: 10,
    // paddingBottom: theme.SIZES.BASE,
    // paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
});

export default CustomTabContent;
