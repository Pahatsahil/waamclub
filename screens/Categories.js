import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {Button, Menu, ScrollView} from 'native-base';
import {sortedData, Images, argonTheme, fontFamily} from '../constants';
import {MediumCards} from '../components';

const {height, width} = Dimensions.get('screen');

const Categories = ({navigation, route}) => {
  const [showmodal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('Clothing');
  const [sort, setSort] = useState('');
  const {selectedFilter} = route.params;
  const filterData = [
    {
      index: 1,
      name: 'Freebies',
    },
    {
      index: 2,
      name: 'Clothing',
    },
    {
      index: 3,
      name: 'Mobile Accessories',
    },
    {
      index: 4,
      name: 'Electronics',
    },
    {
      index: 5,
      name: 'Laptops',
    },
    {
      index: 6,
      name: 'Mens Footwear',
    },
    {
      index: 7,
      name: 'Female Clothing',
    },
    {
      index: 8,
      name: 'Household',
    },
    {
      index: 9,
      name: 'Tools',
    },
  ];

  const Cards = () => {
    return (
      <Block>
        <FlatList
          data={sortedData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          renderItem={items => {
            if (filter == items.item.type) {
              console.log(selectedFilter);
              console.log(items.item.type);
              return (
                <MediumCards
                  navi={'Categories'}
                  item={items.item}
                  style={{marginRight: theme.SIZES.BASE}}
                  amount={300}
                  ctaColor={theme.COLORS.FACEBOOK}
                />
              );
            }
          }}
        />
      </Block>
    );
  };

  return (
    <Block flex style={styles.container}>
      <Block center row>
        <Menu
          placement="bottom right"
          trigger={trigger => {
            return (
              <Button
                background={argonTheme.COLORS.WHITE}
                borderBottomColor={argonTheme.COLORS.PRIMARY}
                borderBottomWidth={3}
                // borderRightWidth={3}
                // borderRightColor={argonTheme.COLORS.SECONDARY2}
                // borderRightRadius={0}
                // ml={'1'}
                w={'1/2'}
                {...trigger}>
                <Text color={argonTheme.COLORS.BLACK} size={15}>
                  SORT
                </Text>
              </Button>
            );
          }}>
          <Menu.OptionGroup
            defaultValue={'A to Z'}
            title="Sort By"
            type="radio">
            <Menu.ItemOption>
              <Button
                onPress={() => {
                  setSort('A to Z');
                  return <Cards />;
                }}>
                A to Z
              </Button>
            </Menu.ItemOption>
            <Menu.ItemOption>
              <Button
                onPress={() => {
                  setSort('Z to A');
                  return <Cards />;
                }}>
                Z to A
              </Button>
            </Menu.ItemOption>
            <Menu.ItemOption>
              <Button
                onPress={() => {
                  setSort('Discount');
                  return <Cards />;
                }}>
                Discount
              </Button>
            </Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu>
        <Menu
          placement="bottom left"
          trigger={trigger => {
            return (
              <Button
                background={argonTheme.COLORS.WHITE}
                // alignSelf={'self-end'}
                ml={'1'}
                borderBottomColor={argonTheme.COLORS.PRIMARY}
                borderBottomWidth={3}
                w={'1/2'}
                {...trigger}>
                <Text color={argonTheme.COLORS.BLACK} size={15}>
                  Filter
                </Text>
                {/* FILTER */}
              </Button>
            );
          }}>
          <Menu.OptionGroup
            defaultValue={selectedFilter != '' ? selectedFilter : 'Freebies'}
            title="Filter By"
            type="checkbox">
            <Menu.ItemOption onPress={() => setFilter('Home Appliance')}>
              Home
            </Menu.ItemOption>
            <Menu.ItemOption onPress={() => setFilter('Clothing')}>
              Clothing
            </Menu.ItemOption>
            <Menu.ItemOption onPress={() => setFilter('Electronics')}>
              Electronics
            </Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu>
      </Block>
      <Block
        flex
        style={{
          paddingHorizontal: 5,
          backgroundColor: argonTheme.COLORS.WHITE,
        }}>
        <Cards />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: argonTheme.COLORS.SECONDARY,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  boldText: {
    color: argonTheme.COLORS.BLACK,
    fontSize: 12,
    fontFamily: fontFamily.MONTSERRATSEMIBOLD,
    textAlignVertical: 'center',
  },
  boldLabel: {
    color: argonTheme.COLORS.BLACK,
    fontFamily: fontFamily.WHITNEYBOLD,
  },
});

export default Categories;
