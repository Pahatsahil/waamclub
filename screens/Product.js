import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Button} from 'native-base';
import {Icon, ProductCards} from '../components';
import {Images, argonTheme, fontFamily, articles} from '../constants';
import {HeaderHeight} from '../constants/utils';
import {useNavigation} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import {Dropdown} from 'react-native-element-dropdown';
import {Alert} from 'react-native';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Product = () => {
  const navigation = useNavigation();
  const amount = 8;
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const images = [
    'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80',
    'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
    'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
  ];

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: 'none',
  //     },
  //   });
  // }, [navigation]);
  const PriceData = [
    {
      index: 1,
      name: 'Amazon',
      sellerPrice: 19999,
      cashback: 5000,
      bestPrice: 14999,
    },
    {
      index: 2,
      name: 'Flipkart',
      sellerPrice: 19999,
      cashback: 5000,
      bestPrice: 14999,
    },
    {
      index: 3,
      name: 'Croma',
      sellerPrice: 19999,
      cashback: 5000,
      bestPrice: 14999,
    },
  ];

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <Block style={styles.profileContainer}>
        <Block
          row
          style={{height: 20, alignItems: 'center', width: width * 0.7}}>
          <Icon
            name={'chevron-left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={argonTheme.COLORS.WHITE}
            style={{marginRight: 15}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: argonTheme.COLORS.WHITE,
              fontSize: 17,
              fontFamily: fontFamily.MONTSERRATBOLD,
            }}>
            RealMe 10 Pro 5G
          </Text>
        </Block>
        <Block width={width * 0.2}>
          <Button
            rounded={'full'}
            bgColor={argonTheme.COLORS.WARNING}
            alignSelf={'center'}
            alignItems={'center'}
            leftIcon={
              <Icon
                name={'share'}
                size={16}
                onPress={() => navigation.goBack()}
                color={argonTheme.COLORS.WHITE}
                // style={{marginRight: 2}}
              />
            }>
            <Text size={14} color={argonTheme.COLORS.WHITE}>
              Share
            </Text>
          </Button>
        </Block>
      </Block>
      <Block flex style={styles.profileBackground}>
        <Block flex style={styles.profileCard}>
          <Text
            size={14}
            color={argonTheme.COLORS.BLACK}
            style={{fontFamily: fontFamily.MONTSERRATBOLD, marginBottom: 10}}>
            RealMe 10 Pro 5G
          </Text>
          <Block row>
            <Block
              middle
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderBottomRightRadius: 50,
                borderTopRightRadius: 50,
                backgroundColor: argonTheme.COLORS.WARNING,
                height: 30,
                marginRight: 20,
              }}>
              <Text size={11} color={argonTheme.COLORS.WHITE} bold>
                Rs: 5000 off
              </Text>
            </Block>
            <Block card style={styles.slider}>
              <SliderBox
                images={images}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                // currentImageEmitter={index =>
                //   console.log(`current pos is: ${index}`)
                // }
                dotColor={argonTheme.COLORS.PRIMARY}
                inactiveDotColor={argonTheme.COLORS.WARNING}
                autoplay
                loop
                sliderBoxHeight={width / 1.5}
                parentWidth={width / 2.5}
              />
            </Block>
          </Block>
          <Block row style={{marginTop: 20}}>
            <Block
              flex
              style={{
                backgroundColor: argonTheme.COLORS.WHITE,
                marginRight: 5,
              }}>
              <Text style={styles.boldLabel}>Variant</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Search Product type' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </Block>
            <Block flex style={{backgroundColor: argonTheme.COLORS.WHITE}}>
              <Text style={styles.boldLabel}>Color</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Search Product type' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </Block>
          </Block>
          <Block flex>
            <Text
              color="black"
              size={14}
              bold
              style={{
                padding: 10,
                fontFamily: fontFamily.MONTSERRATBOLD,
                backgroundColor: argonTheme.COLORS.BORDER_COLOR,
                marginHorizontal: '-4%',
              }}>
              Choose Best Price
            </Text>
            {/* {PriceData.map(item => {
              return (
                <Block
                  card
                  style={{
                    backgroundColor: argonTheme.COLORS.WHITE,
                    marginVertical: 10,
                  }}>
                  <Block
                    space="between"
                    row
                    middle
                    // flex
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderColor: argonTheme.COLORS.BORDER_COLOR,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={Images.Gmail}
                      style={{width: width / 4, height: 50}}
                    />
                    <TouchableOpacity onPress={() => Alert.alert('choosen')}>
                      <Block
                        style={{
                          padding: 10,
                          backgroundColor: argonTheme.COLORS.WARNING,
                        }}>
                        <Text
                          size={13}
                          color={argonTheme.COLORS.SECONDARY}
                          style={{textTransform: 'uppercase'}}>
                          Grab Deal
                        </Text>
                      </Block>
                    </TouchableOpacity>
                  </Block>
                  <Block row>
                    <Block
                      flex
                      style={{
                        padding: 5,
                        borderRightWidth: 1,
                        borderColor: argonTheme.COLORS.BORDER_COLOR,
                      }}>
                      <Block row style={{padding: 5}}>
                        <Text
                          size={11}
                          color={argonTheme.COLORS.BLACK}
                          style={{
                            fontFamily: fontFamily.WHITNEYMEDIUM,
                            marginRight: 2,
                            textDecorationLine: 'line-through',
                          }}>
                          Rs 19,999
                        </Text>
                        <Text
                          size={13}
                          color={argonTheme.COLORS.BLACK}
                          style={{
                            textTransform: 'uppercase',
                            fontFamily: fontFamily.WHITNEYBOLD,
                            marginRight: 3,
                          }}>
                          Rs 14,999
                        </Text>
                      </Block>
                      <Text
                        size={11}
                        color={argonTheme.COLORS.BLACK}
                        style={{
                          fontFamily: fontFamily.WHITNEYMEDIUM,
                          marginRight: 2,
                          textDecorationLine: 'line-through',
                        }}>
                        Seller Price
                      </Text>
                    </Block>
                    <Block
                      flex
                      style={{
                        padding: 5,
                        borderRightWidth: 1,
                        borderColor: argonTheme.COLORS.BORDER_COLOR,
                      }}>
                      <Block row style={{padding: 5}}>
                        <Text
                          size={11}
                          color={argonTheme.COLORS.BLACK}
                          style={{
                            fontFamily: fontFamily.WHITNEYMEDIUM,
                            marginRight: 2,
                            textDecorationLine: 'line-through',
                          }}>
                          Rs 19,999
                        </Text>
                        <Text
                          size={13}
                          color={argonTheme.COLORS.BLACK}
                          style={{
                            textTransform: 'uppercase',
                            fontFamily: fontFamily.WHITNEYBOLD,
                            marginRight: 3,
                          }}>
                          Rs 14,999
                        </Text>
                      </Block>
                      <Text
                        size={11}
                        color={argonTheme.COLORS.BLACK}
                        style={{
                          fontFamily: fontFamily.WHITNEYMEDIUM,
                          marginRight: 2,
                          textDecorationLine: 'line-through',
                        }}>
                        Seller Price
                      </Text>
                    </Block>
                    <Block
                      flex
                      style={{
                        padding: 5,
                        borderRightWidth: 1,
                        borderColor: argonTheme.COLORS.BORDER_COLOR,
                      }}>
                      <Block row style={{padding: 5}}>
                        <Text
                          size={11}
                          color={argonTheme.COLORS.BLACK}
                          style={{
                            fontFamily: fontFamily.WHITNEYMEDIUM,
                            marginRight: 2,
                            textDecorationLine: 'line-through',
                          }}>
                          Rs 19,999
                        </Text>
                        <Text
                          size={13}
                          color={argonTheme.COLORS.BLACK}
                          style={{
                            textTransform: 'uppercase',
                            fontFamily: fontFamily.WHITNEYBOLD,
                            marginRight: 3,
                          }}>
                          Rs 14,999
                        </Text>
                      </Block>
                      <Text
                        size={11}
                        color={argonTheme.COLORS.BLACK}
                        style={{
                          fontFamily: fontFamily.WHITNEYMEDIUM,
                          marginRight: 2,
                          textDecorationLine: 'line-through',
                        }}>
                        Seller Price
                      </Text>
                    </Block>
                  </Block>
                </Block>
              );
            })} */}
          </Block>
          <Block
            flex
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: argonTheme.COLORS.BORDER_COLOR,
            }}>
            <Text
              color="black"
              size={14}
              bold
              style={{
                fontFamily: fontFamily.WHITNEYMEDIUM,
              }}>
              Key Features
            </Text>
          </Block>
          <Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
            <Block
              row
              space="between"
              style={{width: width * 0.6, marginVertical: 5}}
              center>
              <Text color="black">Seller</Text>
              <Text
                color="black"
                size={14}
                bold
                style={{
                  fontFamily: fontFamily.WHITNEYMEDIUM,
                }}>
                Amazon
              </Text>
            </Block>
          </Block>
        </Block>
        <ScrollView style={{marginHorizontal: 10, marginBottom: 10,}} horizontal showsHorizontalScrollIndicator={false}>
          <Block flex row>
            <ProductCards
              navi={'Product'}
              item={articles[1]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <ProductCards
              navi={'Product'}
              item={articles[2]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <ProductCards
              navi={'Product'}
              item={articles[3]}
              style={{marginRight: theme.SIZES.BASE}}
            />
            <ProductCards
              navi={'Product'}
              item={articles[4]}
              style={{marginRight: theme.SIZES.BASE}}
            />
          </Block>
        </ScrollView>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profile: {
    // marginTop: Platform.OS === 'android' ? -(HeaderHeight / 4) : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: width / 6,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  profileBackground: {
    width: width,
    flex: 1,
  },
  profileCard: {
    // position: 'relative',
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE,
    // marginHorizontal: theme.SIZES.BASE,
    paddingBottom: 10,
    backgroundColor: theme.COLORS.WHITE,
    elevation: 5,
    marginBottom: 10,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    // marginTop: -80
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 62,
    marginRight: 20,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  screens: {
    backgroundColor: theme.COLORS.WHITE,
    borderBottomColor: theme.COLORS.GREY,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: width * 0.85,
    elevation: 3,
    marginVertical: 5,
  },
  screensIcon: {
    marginRight: 10,
    color: 'black',
  },
  slider: {
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: argonTheme.COLORS.WHITE,
    elevation: 3,
    padding: 8,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    marginBottom: 30,
    height: 40,
    borderColor: argonTheme.COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: argonTheme.COLORS.GREY2,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: argonTheme.COLORS.BLACK,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: argonTheme.COLORS.BLACK,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: argonTheme.COLORS.BLACK,
  },
  boldLabel: {
    textAlign: 'center',
    fontFamily: fontFamily.WHITNEYMEDIUM,
    color: 'black',
    paddingBottom: 5,
  },
});

export default Product;
