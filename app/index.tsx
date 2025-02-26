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

const HomeScreen = () => {
  // 在安卓平台启用布局动画的实验性功能
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const router = useRouter();

  // initialRouteName 配置默认启动页不生效，只能手动跳转
  useEffect(() => {
    setTimeout(() => {
      router.replace("/welcome");
    }, 0);
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Stack>
          {/* 欢迎页 */}
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          {/* 登录页 */}
          <Stack.Screen name="login" options={{ headerShown: false }} />
          {/* 首页 */}
          <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
      </View>
    </>
  );
};

export default HomeScreen;
