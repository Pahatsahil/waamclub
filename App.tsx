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
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StoreProvider} from './redux/store/index';

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

const App = () => {
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

  // function _handleFinishLoading() {
  //   setLoading(true);
  // }

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
          <SafeAreaProvider>
            <StoreProvider>
              <Screens />
            </StoreProvider>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </GalioProvider>
    </NavigationContainer>
  );
};
export default App;
