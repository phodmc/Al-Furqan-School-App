import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";

import NavigationBar from "./components/NavigationBar";

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // https://mstrchf.github.io/calculator-app/
  // https://www.isarms.org/aiisgambia


  // back press handler
  const handleBackPress = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
      return true;
    }

    return false;
  };

  // forward handler
  const handleForwardPress = () => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
      return true;
    }

    return false;
  };

  // home
  const onHome = () => {
    if (webViewRef.current) {
      webViewRef.current.onNavigationStateChange((navState) => {});
      return true;
    }

    return false;
  };

  useEffect(() => {

    const backAction = () => {
      if (canGoBack) {
        webViewRef.current.goBack();
        return true;
      } else if (!canGoBack) {
        Alert.alert("Hold On!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }

      return false
    };

    // setup
    BackHandler.addEventListener("hardwareBackPress", backAction);

    // clean up
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <>
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{ uri: "https://www.isarms.org/aiisgambia" }}
        originWhitelist={["*", "https://www.isarms.org/aiisgambia/*"]}
        allowsBackForwardNavigationGestures={true}
        startInLoadingState={true}
        pullToRefreshEnabled={true}
        onLoadStart={(syntheticEvent) => {
          setIsLoading(true);
        }}
        onLoadEnd={(syntheticEvent) => {
          setIsLoading(false);
        }}
        renderLoading={() => (
          <View>
            <ActivityIndicator size={"large"} color="lightskyblue" />
          </View>
        )}
        renderError={(errorName) => (
          <View>
            <Text>{errorName}</Text>
          </View>
        )}
        onNavigationStateChange={(state) => {
          const forward = state.canGoForward;
          const back = state.canGoBack;

          setCanGoForward(forward);
          setCanGoBack(back);

          console.log(`url: ${state.url}`);
        }}
      >
        <StatusBar style="auto" />
      </WebView>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} color="lightskyblue" />
          <Text>Loading</Text>
        </View>
      )}

      <NavigationBar
        onBack={handleBackPress}
        onForward={handleForwardPress}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
  },
});
