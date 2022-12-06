import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
// header for screens
import {Header, Icon} from '../components';
import {argonTheme, fontFamily, tabs} from '../constants';
import {Block, Text, theme} from 'galio-framework';

import Articles from '../screens/Search';
// drawer
import CustomDrawerContent from './Menu';
import HotOffers from '../screens/HotOffers';
// screens
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';
import Categories from '../screens/Categories';
import Profile from '../screens/Profile';
import React from 'react';
import Register from '../screens/Register';
import Register2 from '../screens/Register2';
import KYC2 from '../screens/KYC2';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import KYC from '../screens/KYC';
import Login from '../screens/Login';
import CustomTabContent from './CustomTabs';
import Refer from '../screens/Refer';
import OfferPage from '../screens/OfferPage';
import {Images} from '../constants';
import {Button} from 'native-base';
import Settings from '../screens/Settings';
import History from '../screens/History';
import Payments from '../screens/Payment';
import Rating from '../screens/Rating';
import LimitedTimeDeals from '../screens/LimitedTimeDeals';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Search from '../screens/Search';
import Product from '../screens/Product';
import Help from '../screens/Help';
const {height, width} = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const ElementsStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}>
      <Stack.Screen
        name="HotOffers"
        component={HotOffers}
        options={{
          header: ({navigation, scene}) => (
            <Header title="HotOffers" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="App"
        component={AppStack}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

const RegisterStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
        // options={{
        //   header: ({ navigation, scene }) => (
        //     <Header title="Register" navigation={navigation} scene={scene} />
        //   ),
        //   cardStyle: { backgroundColor: "#F8F9FE" },
        // }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
        // options={{
        //   header: ({ navigation, scene }) => (
        //     <Header title="Register" navigation={navigation} scene={scene} />
        //   ),
        //   cardStyle: { backgroundColor: "#F8F9FE" },
        // }}
      />
      <Stack.Screen
        name="Register2"
        component={Register2}
        options={{headerShown: false}}
        // options={{
        //   header: ({ navigation, scene }) => (
        //     <Header title="Register" navigation={navigation} scene={scene} />
        //   ),
        //   cardStyle: { backgroundColor: "#F8F9FE" },
        // }}
      />
      <Stack.Screen
        name="KYC"
        component={KYC}
        options={{headerShown: false}}
        // options={{
        //   header: ({ navigation, scene }) => (
        //     <Header title="Articles" navigation={navigation} scene={scene} />
        //   ),
        //   cardStyle: { backgroundColor: "#F8F9FE" },
        // }}
      />
      <Stack.Screen
        name="KYC2"
        component={KYC2}
        options={{headerShown: false}}
        // options={{
        //   header: ({ navigation, scene }) => (
        //     <Header title="Articles" navigation={navigation} scene={scene} />
        //   ),
        //   cardStyle: { backgroundColor: "#F8F9FE" },
        // }}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Art"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const ArticlesStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}>
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="App"
        component={AppStack}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

const ProfileStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({navigation, scene}) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Account Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment History"
        component={History}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Payment History"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Payments"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Rate Us"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Help Center"
              navigation={navigation}
              scene={scene}
              back
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={RegisterStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="HotOffers"
        component={ElementsStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LimitedTimeDeals"
        component={LimitedTimeDeals}
        options={{
          // header: ({navigation, scene}) => (
          //   <Header
          //     title="Categories"
          //     navigation={navigation}
          //     scene={scene}
          //   />
          // ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OfferPage"
        component={OfferPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          header: ({navigation, scene}) => (
            <Header
              title="Categories"
              navigation={navigation}
              back
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
};

const OnboardingStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="LoginStack"
        component={RegisterStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      {/* <Stack.Screen name="App" component={AppStack} /> */}
    </Stack.Navigator>
  );
};

// const AppStack = props => {
//   return (
//     <Drawer.Navigator
//       style={{flex: 1}}
//       drawerContent={props => <CustomDrawerContent {...props} />}
//       drawerStyle={{
//         backgroundColor: 'white',
//         width: width * 0.8,
//       }}
//       drawerContentOptions={{
//         activeTintcolor: 'white',
//         inactiveTintColor: '#000',
//         activeBackgroundColor: 'transparent',
//         itemStyle: {
//           width: width * 0.75,
//           backgroundColor: 'transparent',
//           paddingVertical: 16,
//           paddingHorizonal: 12,
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           overflow: 'hidden',
//         },
//         labelStyle: {
//           fontSize: 18,
//           marginLeft: 12,
//           fontWeight: 'normal',
//         },
//       }}
//       initialRouteName="Home">
//       <Drawer.Screen
//         name="Home"
//         component={HomeStack}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileStack}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="Account"
//         component={RegisterStack}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="HotOffers"
//         component={ElementsStack}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="Articles"
//         component={ArticlesStack}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

const BottomTabs = ({navigation, route}) => {
  // const tabHiddenRoutes = ['LimitedTimeDeals'];
  // if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
  //   navigation.setOptions({tabBarStyle: {display: 'none'}});
  // } else {
  //   navigation.setOptions({tabBarStyle: {display: 'flex'}});
  // }
  return (
    <Tab.Navigator
      style={{flex: 1}}
      // sceneContainerStyle={{
      //   backgroundColor: argonTheme.COLORS.WHITE,
      //   height: h * 0.1,
      // }}
      tabBar={props => <CustomTabContent {...props} />}
      // screenOptions={{
      //   tabBarItemStyle: {
      //     backgroundColor: argonTheme.COLORS.BLACK,
      //   },
      // }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Search" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
      <Tab.Screen
        name="Refer"
        component={Refer}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Refer" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
      <Tab.Screen
        name="Hot Offers"
        component={HotOffers}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Hot Offers" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default OnboardingStack;

const styles = StyleSheet.create({
  profileContainer: {
    width: width,
    height: height / 4,
    padding: 15,
    zIndex: -1,
    flexDirection: 'row',
  },
  profileBackground: {
    width: width,
    height: height / 4,
  },
});
