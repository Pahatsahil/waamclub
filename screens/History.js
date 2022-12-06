import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {Button, Icon, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import Theme from '../constants/Theme';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const History = () => {
  const navigation = useNavigation();

  const transactions = [
    {
      index: 1,
      order: 'Money Delivered',
      id: 2489015,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 2,
      order: 'Money Placed',
      id: 2489016,
      date: 'Nov 5, 2022',
      deposit: 0,
      withdraw: 1,
      amt: 1314,
    },
    {
      index: 3,
      order: 'Money Refund',
      id: 2489014,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1294,
    },
    {
      index: 4,
      order: 'Money Delivered',
      id: 2489017,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 5,
      order: 'Money Delivered',
      id: 2489018,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 6,
      order: 'Money Delivered',
      id: 2489019,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 7,
      order: 'Money Placed',
      id: 2419014,
      date: 'Nov 5, 2022',
      deposit: 0,
      withdraw: 1,
      amt: 1314,
    },
    {
      index: 8,
      order: 'Money Refund',
      id: 2439014,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1294,
    },
    {
      index: 9,
      order: 'Money Delivered',
      id: 2189014,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 10,
      order: 'Money Delivered',
      id: 2789014,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 11,
      order: 'Money Delivered',
      id: 2489019,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 12,
      order: 'Money Placed',
      id: 2419014,
      date: 'Nov 5, 2022',
      deposit: 0,
      withdraw: 1,
      amt: 1314,
    },
    {
      index: 13,
      order: 'Money Refund',
      id: 2439014,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1294,
    },
    {
      index: 14,
      order: 'Money Delivered',
      id: 2189014,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
    {
      index: 15,
      order: 'Money Delivered',
      id: 2789014,
      date: 'Nov 5, 2022',
      deposit: 1,
      withdraw: 0,
      amt: 1214,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Block>
        <Text
          style={{
            borderBottomColor: argonTheme.COLORS.PRIMARY,
            // borderBottomWidth: 2,
            paddingVertical: 10,
            paddingLeft: 30,
            fontFamily: fontFamily.WHITNEYSEMIBOLD,
            fontSize: 18,
            textTransform: 'uppercase',
            // marginTop: 7,
            color: argonTheme.COLORS.PRIMARY,
            backgroundColor: argonTheme.COLORS.WHITE,
          }}>
          transaction log
        </Text>
      </Block>
      <FlatList
        data={transactions}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Block
              card
              style={{
                elevation: 3,
                borderColor: argonTheme.COLORS.BORDER_COLOR,
                borderWidth: 1,
                borderRadius: 20,
                marginHorizontal: 10,
                marginVertical: 5,
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: argonTheme.COLORS.WHITE,
              }}>
              <Block
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.Code}>{item.order}</Text>
                <Text style={styles.Code}>{item.date}</Text>
              </Block>
              <Block
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Block
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: argonTheme.COLORS.BLACK2,
                      fontFamily: fontFamily.WHITNEYREGULAR,
                    }}>  
                    Transaction No:{' '}
                  </Text>
                  <Text
                    style={{
                      color: argonTheme.COLORS.BLACK2,
                      fontFamily: fontFamily.WHITNEYREGULAR,
                    }}>
                    {item.id}
                  </Text>
                </Block>
                <Block
                  style={{
                    flexDirection: 'row',
                  }}>
                  {item.deposit == 1 ? (
                    <>
                      <Text
                        style={[
                          styles.Code,
                          {color: argonTheme.COLORS.DARK_GREEN},
                        ]}>
                        + INR.{' '}
                      </Text>
                      <Text
                        style={[
                          styles.Code,
                          {color: argonTheme.COLORS.DARK_GREEN},
                        ]}>
                        {item.amt}
                      </Text>
                    </>
                  ) : item.withdraw == 1 ? (
                    <>
                      <Text style={[styles.Code, {color: 'red'}]}>- INR. </Text>
                      <Text style={[styles.Code, {color: 'red'}]}>
                        {item.amt}
                      </Text>
                    </>
                  ) : null}
                </Block>
              </Block>
            </Block>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: argonTheme.COLORS.GREY2,
  },
  Code: {
    fontFamily: fontFamily.WHITNEYSEMIBOLD,
    fontSize: 15,
    textTransform: 'uppercase',
    lineHeight: 22,
    // marginTop: 7,
    color: argonTheme.COLORS.BLACK,
  },
});

export default History;
