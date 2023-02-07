import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {Button, Icon, Input} from '../../components';
import {Images, argonTheme, fontFamily} from '../../constants';
import Theme from '../../constants/Theme';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../redux/store';
import axios from 'axios';
import {Accordian} from '../../components';
import { Api } from '../../api/Api';

const {width, height} = Dimensions.get('screen');

const ReferralPayment = () => {
  const navigation = useNavigation();
  const {state, actions} = useContext<any>(StoreContext);
  const [affiliateData, setAffiliateData] = useState([]);
  const [level1Data, setLevel1Data] = useState([]);
  const [level2Data, setLevel2Data] = useState([]);
  const [level3Data, setLevel3Data] = useState([]);
  const [affiliateAmount, setAffiliateAmount] = useState(0);
  const [level1Amount, setLevel1Amount] = useState(0);
  const [level2Amount, setLevel2Amount] = useState(0);
  const [tab, setTab] = useState<number>(0);
  const [activeTabName, setActiveTabName] = useState<any>('');
  const [loader, setLoader] = useState(false);
  const scrollRef = React.useRef(null);
  const fullData = new FormData();
  let temp_amt = 0

  useEffect(() => {
    console.log('ID', state.userID);
    getData();
  }, [affiliateAmount, level1Amount, level2Amount]);

  const getData = async () => {
    setLoader(true)
    try {
      // 6B97 = ID to check data
      const temp = '6B97';
      const res = await axios.get(`https://www.waamclub.com/api/app/getdetails/${state.userID}`)
      // const res = await axios.get(
      //   `http://waamclub.com/api/app/getdetails/${temp}`,
      // );
      const {data, error} = res.data;

      if (!error) {
        console.log('DATA', data);
        setAffiliateData(data);
        setLevel1Data(data[0]);
        setLevel2Data(data[1]);
        setLevel3Data(data[2]);
        fullData.append('Affliate', data[0]);
        fullData.append('Level1', data[1]);
        fullData.append('Level2', data[2]);
        console.log('DATA', fullData);
        getTotalAmount(data[0], data[1],data[2])
      } else {
        console.log('error', error);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
    setLoader(false)
  };
  const toggleExpand = (index: number) => {
    tab != index ? setTab(index) : setTab(0);
  };

  const changeActiveTab = (tab: any, val: any, next?: any) => {
    // if (!next && !(submitedTab >= tab - 1)) {
    //   return;
    // }
    // const greenTickSubmit = (td: any) => {
    // const name = tabData.filter((x: any) => x.name == val.name)
    // if (name[0].name == val.name) {
    //   setGreenTick(!greenTick);
    // }
    setActiveTabName('Name');
    toggleExpand(tab);
    // scrollRef.current?.scrollTo({y: 0, animated: true});
  };

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

  const getTotalAmount = (data1, data2, data3) => {
    console.log(data1.length)
    if(data1.length){
      data1.map((item: any) => {
        temp_amt = parseInt(item.affiliate_amount) + temp_amt
        console.log("AMT1", temp_amt)
      })
      setAffiliateAmount(temp_amt)
      console.log("AMT", affiliateAmount)
      temp_amt = 0
    }
    if(data2.length){
      data2.map((item: any) => {
        temp_amt = parseInt(item.uplevel1) + temp_amt
        console.log("AMT2", temp_amt)
      })
      setLevel1Amount(temp_amt)
      console.log("AMT3", level1Amount)
      temp_amt = 0
    }
    if(data3.length){
      data3.map((item: any) => {
        temp_amt = parseInt(item.uplevel2) + temp_amt
        console.log("AMTT", temp_amt)
      })
      setLevel2Amount(temp_amt)
      console.log("AMTT", level2Amount)
      temp_amt = 0
    }
    if(level1Amount + level2Amount + affiliateAmount > 0){
      const total = level1Amount + level2Amount + affiliateAmount
      actions.setTotalReferralAmt(total)
    }
  }

  const Save = () => {
    return (
      <Modal visible={loader} animationType="fade" transparent>
        <ActivityIndicator
          color={argonTheme.COLORS.PRIMARY}
          size={'large'}
          style={{marginTop: 'auto', marginBottom: 'auto'}}
        />
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Save />
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
      <ScrollView
        // ref={scrollRef}
        // style={styles.svContainer}
        // contentContainerStyle={styles.svContentContainer}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}>
        {affiliateData.map((array: any, index: number) => {
          
          return (
            <Accordian
              d={array}
              tab={index + 1}
              activeStep={tab}
              toggleExpand={(tab: any) => changeActiveTab(tab, array)}
              readonly={affiliateAmount + level1Amount + level2Amount > 0}
              // key={`formik_${idx}_`}
              amount={index == 0 ? affiliateAmount : index == 1 ? level1Amount : level2Amount}
              rightArrowShow
              awcDetailStyle={true}
              awcCounter={index}>
              {array.map((item: any) => {
                return (
                  <Block
                    // card
                    style={{
                      // elevation: 3,
                      // borderColor: argonTheme.COLORS.BORDER_COLOR,
                      // borderWidth: 1,
                      // borderRadius: 20,
                      // marginHorizontal: 10,
                      marginVertical: 5,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      backgroundColor: argonTheme.COLORS.WHITE,
                      width: width * 0.8,
                    }}>
                    <Block
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: argonTheme.COLORS.BLACK2,
                          fontFamily: fontFamily.WHITNEYREGULAR,
                          fontSize: 16,
                        }}>
                        Name:
                      </Text>
                      <Text style={styles.Code}>{item.affiliate_to}</Text>
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
                          Amount:{' '}
                        </Text>
                        {/* <Text
                          style={{
                            color: argonTheme.COLORS.BLACK2,
                            fontFamily: fontFamily.WHITNEYREGULAR,
                          }}>
                          {item.id}
                        </Text> */}
                      </Block>
                      <Block
                        style={{
                          flexDirection: 'row',
                        }}>
                        {item.affiliate_amount && (
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
                              {item.affiliate_amount}
                            </Text>
                          </>
                        )}
                        {item.uplevel1 && (
                          <>
                            <Text style={[styles.Code, {color: 'blue'}]}>
                              + INR.{' '}
                            </Text>
                            <Text style={[styles.Code, {color: 'blue'}]}>
                              {item.uplevel1}
                            </Text>
                          </>
                        )}
                        {item.uplevel2 && (
                          <>
                            <Text style={[styles.Code, {color: 'purple'}]}>
                              + INR.{' '}
                            </Text>
                            <Text style={[styles.Code, {color: 'purple'}]}>
                              {item.uplevel2}
                            </Text>
                          </>
                        )}
                      </Block>
                    </Block>
                  </Block>
                );
              })}
            </Accordian>
          );
        })}
      </ScrollView>
      <Block
        card
        row
        style={{
          padding: 10,
          justifyContent: 'space-between',
          backgroundColor: argonTheme.COLORS.WHITE,
          alignItems: 'flex-end',
          elevation: 5,
          marginTop: 10,
        }}>
        <Text color={argonTheme.COLORS.BLACK} bold size={16}>
          Total Payment
        </Text>
        <Text color={argonTheme.COLORS.PRIMARY} size={16} bold>
          {'INR '}{affiliateAmount + level1Amount + level2Amount}
        </Text>
      </Block>
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

export default ReferralPayment;
