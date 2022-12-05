// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
// import AppLoading from "expo-app-loading";
// import { useFonts } from '@use-expo/font';
// import { Asset } from "expo-asset";
import {Block, GalioProvider} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
// Before rendering any navigation stack
import {enableScreens} from 'react-native-screens';
enableScreens();
import SplashScreen from 'react-native-splash-screen';

import Screens from './navigation/Screens';
import {Images, articles, argonTheme} from './constants';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];

// cache product images
articles.map(article => assetImages.push(article.image));

// function cacheImages(images) {
//   return images.map(image => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//     } else {
//       return Asset.fromModule(image).downloadAsync();
//     }
//   });
// }

const App = props => {
  // const [isLoadingComplete, setLoading] = useState(false);
  // let [fontsLoaded] = useFonts({
  //   'ArgonExtra': require('./assets/font/argon.ttf'),
  // });

  // function _loadResourcesAsync() {
  //   return Promise.all([...cacheImages(assetImages)]);
  // }
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  function _handleFinishLoading() {
    setLoading(true);
  }

  // if(!fontsLoaded && !isLoadingComplete) {
  //   return (
  //     <AppLoading
  //       startAsync={_loadResourcesAsync}
  //       onError={_handleLoadingError}
  //       onFinish={_handleFinishLoading}
  //     />
  //   );
  // } else if(fontsLoaded) {
  return (
    <NavigationContainer>
      <GalioProvider theme={argonTheme}>
        <NativeBaseProvider>
          <Block flex>
            <Screens />
          </Block>
        </NativeBaseProvider>
      </GalioProvider>
    </NavigationContainer>
  );
  // } else {
  //   return null
  // }
};
export default App;
// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false
//   };

//   render() {
//     if (!this.state.isLoadingComplete) {
//       return (
//         <AppLoading
//           startAsync={this._loadResourcesAsync}
//           onError={this._handleLoadingError}
//           onFinish={this._handleFinishLoading}
//         />
//       );
//     } else {
//       return (
//         <NavigationContainer>
//           <GalioProvider theme={argonTheme}>
//             <Block flex>
//               <Screens />
//             </Block>
//           </GalioProvider>
//         </NavigationContainer>
//       );
//     }
//   }

//   _loadResourcesAsync = async () => {
//     return Promise.all([...cacheImages(assetImages)]);
//   };

//   _handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };

//   _handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });
//   };
// }
