import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {Button, Input} from '../components';
import {Images, argonTheme, fontFamily} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';
import {IconButton, Box, Icon, TextArea, Modal} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Alert} from 'react-native';

const {width, height} = Dimensions.get('screen');

const Rating = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const data = [
    {
      index: 1,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 2,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 1,
    },
    {
      index: 3,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 4,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment Great App, Caskback & Payment system awesome. Great App, Caskback & Payment system awesome. ',
      starValue: 5,
    },
    {
      index: 5,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 1,
    },
    {
      index: 6,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 7,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 8,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 9,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 10,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 11,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 12,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 13,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 14,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 15,
      name: 'Rajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
    {
      index: 16,
      name: 'R6ajesh',
      image: {uri: Images.ProfilePicture},
      text: 'Great App, Caskback & Payment system awesome',
      starValue: 3,
    },
  ];

  const Review = () => {
    return (
      <Modal
        defaultIsOpen={false}
        isOpen={showModal}
        top="1/4"
        h={'1/3'}
        flex={1}
        onClose={() => setShowModal(!showModal)}
        animationPreset="slide">
        <Modal.CloseButton />
        <Modal.Header w={'full'}>
          <Text
            size={16}
            style={{
              fontFamily: fontFamily.ROBOTOMEDIUM,
              textTransform: 'uppercase',
              color: argonTheme.COLORS.BLACK,
            }}>
            Write a Review
          </Text>
        </Modal.Header>
        <Modal.Body backgroundColor={argonTheme.COLORS.SECONDARY} w={'xl'}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
            <Block style={{paddingLeft: 30, width: width * 0.8}}>
              <Input
                placeholder="Your Name"
                borderless
                iconContent={
                  <Icon
                    size={14}
                    color={argonTheme.COLORS.ICON}
                    name="user-alt"
                    style={{marginRight: 5}}
                    as={FontAwesome5Icon}
                  />
                }
              />
              <TextArea
                h={20}
                size={14}
                placeholder="Write your Review here"
                placeholderTextColor={argonTheme.COLORS.MUTED}
                maxW="330"
                backgroundColor={'white'}
                borderWidth={0}
                borderRadius={4}
                marginBottom={5}
              />
              <Block row style={{width: width * 0.8, alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: fontFamily.WHITNEYREGULAR,
                    fontSize: 15,
                    color: argonTheme.COLORS.BLACK,
                  }}>
                  Rate Us:{' '}
                </Text>
                <AirbnbRating
                  size={20}
                  ratingContainerStyle={{alignSelf: 'flex-start'}}
                  defaultRating={0}
                  showRating={false}
                />
              </Block>
              <Block style={{alignItems: 'center'}}>
                <Button
                  color="primary"
                  style={styles.createButton}
                  onPress={() => {
                    Alert.alert('Review Submitted');
                  }}>
                  <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                    SUBMIT
                  </Text>
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Review />
      <Block
        row
        style={[
          styles.box,
          {backgroundColor: argonTheme.COLORS.PRIMARY, marginVertical: 10},
        ]}>
        <Text
          style={{
            fontFamily: fontFamily.WHITNEYSEMIBOLD,
            fontSize: 16,
            color: argonTheme.COLORS.WHITE,
          }}>
          {data.length} Happy Customers & Counting.{'\n'}
          Please Rate us and share your reviews
        </Text>
      </Block>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Block card row style={styles.box}>
              <Image
                source={item.image}
                style={{
                  marginRight: 10,
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                }}
                resizeMode="contain"
              />
              <Block>
                <Text style={styles.Code}>{item.name}</Text>
                <Text style={styles.text}>{item.text}</Text>
                <AirbnbRating
                  isDisabled={true}
                  defaultRating={item.starValue}
                  size={15}
                  reviewSize={20}
                  ratingContainerStyle={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                  }}
                />
              </Block>
              {/* <Block
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
              </Block> */}
            </Block>
          );
        }}
      />
      <Box
        style={{
          elevation: 5,
          position: 'absolute',
          bottom: '8%',
          right: '5%',
          padding: 5,
          backgroundColor: argonTheme.COLORS.WHITE,
          borderRadius: 50,
        }}>
        <IconButton
          alignSelf={'flex-end'}
          onPress={() => setShowModal(!showModal)}
          icon={<Icon as={Entypo} name="emoji-happy" />}
          borderRadius="full"
          _icon={{
            color: 'orange.500',
            size: '3xl',
          }}
          _hover={{
            bg: 'orange.600:alpha.20',
          }}
          _pressed={{
            bg: 'orange.600:alpha.20',
            _icon: {
              name: 'emoji-flirt',
            },
            _ios: {
              _icon: {
                size: '2xl',
              },
            },
          }}
          _ios={{
            _icon: {
              size: '2xl',
            },
          }}
        />
      </Box>
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
  text: {
    fontFamily: fontFamily.WHITNEYREGULAR,
    fontSize: 13,
    color: argonTheme.COLORS.BLACK,
    width: width * 0.75,
  },
  box: {
    elevation: 5,
    borderBottomColor: argonTheme.COLORS.BORDER_COLOR,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: argonTheme.COLORS.WHITE,
    width: width * 0.95,
  },
  createButton: {
    width: width * 0.25,
    marginTop: 25,
  },
});

export default Rating;
