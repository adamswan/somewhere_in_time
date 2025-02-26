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

const Mine: React.FC = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Text>我的</Text>
      </View>
    </>
  );
};

export default Mine;
