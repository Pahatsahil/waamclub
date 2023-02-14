import {Button, Modal} from 'native-base';
import React from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Images, argonTheme, fontFamily} from '../constants';
import {Icon} from '../components';
import demats from '../constants/demats';
const {width, height} = Dimensions.get('screen');
const LockModal = ({navigation, route}) => {
  const {data, count} = route.params;
  return (
    <Block flex>
      <Block
        row
        style={{
          height: 20,
          alignItems: 'center',
          width: width * 0.7,
          marginVertical: 20,
          paddingHorizontal: 10,
        }}>
        <Icon
          name={'chevron-left'}
          size={20}
          onPress={() => navigation.goBack()}
          color={argonTheme.COLORS.BLACK}
          style={{marginRight: 15}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: argonTheme.COLORS.BLACK,
            fontSize: 17,
            fontFamily: fontFamily.MONTSERRATBOLD,
          }}>
          {data.demat ? data.title : 'Product'}
        </Text>
      </Block>
      <Block center flex style={{marginHorizontal: 10}}>
            <Icon
              name={'error'}
              size={100}
              onPress={() => null}
              color={argonTheme.COLORS.WARNING}
              style={{marginVertical: 25,}}
              family={'MaterialIcons'}
            />
        <Text
          color={argonTheme.COLORS.BLACK}
          size={16}
          style={{textAlign: 'justify', marginVertical: 10}}
          bold>
          Currently You have completed{' '}
          <Text color={argonTheme.COLORS.PRIMARY}>{count}</Text> Demat Referrals
        </Text>
        <Text
          color={argonTheme.COLORS.BLACK}
          size={15}
          style={{textAlign: 'justify'}}
          bold>
          Complete <Text color={argonTheme.COLORS.PRIMARY}>{10 - count}</Text>{' '}
          more Referrals to become Product Seller
        </Text>
        <Block
          style={{marginVertical: 10, marginBottom: 20, marginHorizontal: 10}}>
          <Text
            color={argonTheme.COLORS.PRIMARY}
            style={{textAlign: 'justify', marginVertical: 10}}>
            In order to get rewards and be a Product Seller on our Waamclub. You
            need to the following:
          </Text>
          <Text
            color={argonTheme.COLORS.BLACK}
            style={{textAlign: 'justify'}}
            bold>
            1. Share the {data.title} referral link from our app to your friends
            and family
          </Text>
          <Text
            color={argonTheme.COLORS.BLACK}
            style={{textAlign: 'justify'}}
            bold>
            2. Make sure they register and open an acccount
          </Text>
          <Text
            color={argonTheme.COLORS.BLACK}
            style={{textAlign: 'justify'}}
            bold>
            3. After sucessfull opening an account under {data.title} you will
            get your commison.
          </Text>
          <Text
            color={argonTheme.COLORS.BLACK}
            style={{textAlign: 'justify'}}
            bold>
            4. After their first sucessfull trade.. You will get more Rewards
          </Text>
        </Block>
        <Block row>
          <Button mx={'2'} onPress={() => navigation.navigate('OfferPage', {data: demats[0]})}>
            <Text
              style={{textAlign: 'center'}}
              color={argonTheme.COLORS.WHITE}
              size={16}
              bold>
              {demats[0].title}
            </Text>
          </Button>
          <Button mx={'2'} onPress={() => navigation.navigate('OfferPage', {data: demats[1]})}>
            <Text
              style={{textAlign: 'center'}}
              color={argonTheme.COLORS.WHITE}
              size={16}
              bold>
              {demats[1].title}
            </Text>
          </Button>
          <Button mx={'2'} onPress={() => navigation.navigate('OfferPage', {data: demats[2]})}>
            <Text
              style={{textAlign: 'center'}}
              color={argonTheme.COLORS.WHITE}
              size={16}
              bold>
              {demats[2].title}
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};
export default LockModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
