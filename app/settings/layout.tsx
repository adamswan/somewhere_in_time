import React from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Settings Layout</Text>
      {/* 渲染当前匹配的子路由页面 */}
      <Stack.Screen />
    </View>
  );
};

export default SettingsLayout;
