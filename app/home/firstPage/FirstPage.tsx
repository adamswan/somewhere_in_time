import {
  Text,
  View,
  Button,
  StatusBar,
  Platform,
  UIManager,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

const FirstPage: React.FC = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text>首页</Text>
      </View>
    </>
  );
};

export default FirstPage;
