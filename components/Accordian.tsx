import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacityProps,
  View,
  Text,
  Image,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import {fontFamily, argonTheme} from '../constants';
import {RIGHT_ARROW} from '../assets/imgs/rightArrow.png';
// import { I18nContext } from "../../services/I18nContext";
// import { FONT_FAMILY, FONT_SIZE, COLOR } from "../../constants";
// import OfflineDataIcon from "../../components/Icons/OfflineDataIcon";
// import LoaderIcon from "../../components/Icons/LoaderIcon";
import GreenTick from '../assets/imgs/greenTick.svg';
interface AccordionProps extends TouchableOpacityProps {
  customStyle?: any;
  isDisable?: boolean;
  tabData?: any;
  activeStep: any;
  selected?: any;
  d: any;
  tab: any;
  toggleExpand: any;
  children?: any;
  readonly?: any;
  pageName?: string;
  rightArrowShow?: boolean;
  adjacentRightArrowShow?: boolean;
  syncStatus?: string;
  awcDetailStyle?: boolean | false;
  awcCounter?: number;
  greenTickShow?: boolean | false;
  amount?: number
}

export default function Accordian(props: AccordionProps) {
  //   const { t } = useContext<any>(I18nContext);
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  // useEffect(() => {
  // console.log('D', props.d)
  // console.log('D', props.activeStep)
  // },[])
  const animate = (easing: any) => {
    opacity.setValue(0.7);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
      easing,
    }).start();
  };
  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  useEffect(() => {
    animate(Easing.inOut(Easing.ease));
    ///animate(Easing.linear);
  }, [props.activeStep]);

  return (
    <View
      style={
        props.awcDetailStyle
          ? {
              paddingBottom: 5,
              marginHorizontal: 5,
              marginVertical: props.activeStep == props.tab ? 3 : 5,
            }
          : {
              paddingHorizontal: 5,
              paddingTop: 5,
              paddingBottom: 15,
            }
      }>
      <Pressable
        style={[
          props.isDisable === true
            ? styles.disableTitleContainer
            : styles.titleContainer,
          props.readonly ? {} : {backgroundColor: '#ececec'},
          props.activeStep == props.tab
            ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}
            : {borderRadius: 8},
          props.awcDetailStyle
            ? {
                borderRadius: 0,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                elevation: 7,
                shadowOpacity: 0.1,
                shadowRadius: 4.65,
                paddingVertical: 20,
              }
            : {},
        ]}
        onPress={() => props.toggleExpand(props.tab)}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          {props.awcDetailStyle
            ? null
            : props.d.icon(props.activeStep == props.tab)}
          <Text
            style={[
              props.awcDetailStyle
                ? {
                    fontFamily: fontFamily.MONTSERRATSEMIBOLD,
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 17,
                    textTransform: 'capitalize',
                    color: argonTheme.COLORS.BLACK2,
                  }
                : styles.title,
              props.activeStep == props.tab
                ? props.awcDetailStyle
                  ? {}
                  : {color: argonTheme.COLORS.ROMAN_APPROX}
                : {color: argonTheme.COLORS.BLACK},
            ]}>
            {props.awcCounter == 0
              ? 'Affliate Referrals'
              : props.awcCounter == 1
              ? '1st Level Referrals'
              : props.awcCounter == 2
              ? '2nd Level Referrals'
              : ''}
          </Text>
          {props.awcDetailStyle ? (
            <View
              style={{
                marginHorizontal: 10,
                backgroundColor: argonTheme.COLORS.WHITE,
                paddingHorizontal: 5,
                paddingVertical: 4,
                height: 30,
                // width: 30,
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: argonTheme.COLORS.WHITE,
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 5,
              }}>
              <Text
                style={{
                  color: argonTheme.COLORS.BLACK,
                  fontFamily: fontFamily.MONTSERRATMEDIUM,
                  // fontWeight: 'bold',
                  fontSize: 12,
                  lineHeight: 15,
                  textAlign: 'center',
                }}>
                {'Total: '}
              </Text>
              <Text
                style={{
                  color: argonTheme.COLORS.WARNING,
                  fontFamily: fontFamily.MONTSERRATMEDIUM,
                  fontWeight: 'bold',
                  fontSize: 14,
                  lineHeight: 15,
                  textAlign: 'center',
                }}>
                {'  INR '+props.amount}
              </Text>
            </View>
          ) : null}
        </View>
        {props.adjacentRightArrowShow === true && (
          <View style={{alignItems: 'flex-end', marginRight: 0}}>
            {/* <OfflineDataIcon color={argonTheme.COLORS.ROMAN_APPROX} /> */}
          </View>
        )}
        {props.greenTickShow == true &&
          props.rightArrowShow == false &&
          props.activeStep == false &&
          props.tab == true && (
            <View style={{alignItems: 'flex-end', marginLeft: 5}}>
              <GreenTick style={[{width: 20, height: 16}]} />
            </View>
          )}
        {(props.rightArrowShow === undefined ||
          props.rightArrowShow === true) && (
          <View style={{alignItems: 'flex-end', marginLeft: 5}}>
            <Image
              source={RIGHT_ARROW}
              width={9.4}
              height={16}
              style={[
                {width: 9.4, height: 16},
                {
                  transform: [
                    props.activeStep == props.tab
                      ? {rotate: '90deg'}
                      : {rotate: '0deg'},
                  ],
                },
              ]}
            />
          </View>
        )}
      </Pressable>
      <View // Special animatable View
        style={
          props.awcDetailStyle
            ? {...styles.awcChild}
            : {
                ...styles.child,
                // opacity: opacity,         // Bind opacity to animated value
              }
        }>
        {props.activeStep != props.tab
          ? null
          : props.children
          ? props.children
          : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 20,
    borderRadius: 8,
    borderBottomWidth: 0,
    flexDirection: 'row',
    backgroundColor: `#fff`,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    paddingVertical: 16,
    // height: 50
  },
  disableTitleContainer: {
    paddingHorizontal: 20,
    borderRadius: 8,
    borderBottomWidth: 0,
    flexDirection: 'row',
    backgroundColor: `#ebebeb`,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    paddingVertical: 16,
    // height: 50
  },
  title: {
    fontFamily: fontFamily.POPPINSMEDIUM,
    fontSize: 16,
    color: argonTheme.COLORS.BLACK,
    paddingLeft: 20,
    lineHeight: 22,
    width: '82%',
  },
  child: {
    backgroundColor: argonTheme.COLORS.WHITE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 7,
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    paddingHorizontal: 20,
    // paddingVertical: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  awcChild: {
    backgroundColor: argonTheme.COLORS.WHITE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 7,
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    paddingHorizontal: 20,
  },
});
