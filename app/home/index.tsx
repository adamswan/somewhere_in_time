import {
  Text,
  View,
  Button,
  StatusBar,
  Platform,
  UIManager,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function Home() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text>首页</Text>
      </View>
    </>
  );
}

export default Home;
