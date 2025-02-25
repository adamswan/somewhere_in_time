import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
// import { load } from "../../utils/Storage";
// import UserStore from "../../stores/UserStore";
import { useRouter } from "expo-router";

import icon_logo_main from "../../assets/icon_main_logo.png";

function Welcome() {
  const router = useRouter();
  // const navigation = useNavigation<StackNavigationProp<any>>();

  // 2s 后自动跳转到登录页
  useEffect(() => {
    setTimeout(() => {
      router.push("/login" as any);
    }, 2000);
  }, []);

  // const getUserInfo = async () => {
  //   const cacheUserInfo = await load("userInfo");
  //   if (!cacheUserInfo) {
  //     startLogin();
  //   } else {
  //     const parse = JSON.parse(cacheUserInfo);
  //     if (parse) {
  //       UserStore.setUserInfo(parse);
  //       startHome();
  //     } else {
  //       startLogin();
  //     }
  //   }
  // };

  // const startLogin = () => {
  //   navigation.replace("Login");
  // };

  // const startHome = () => {
  //   navigation.replace("MainTab");
  // };

  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={icon_logo_main} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
  },
  logo_main: {
    width: 200,
    height: 105,
    marginTop: 200,
    resizeMode: "contain",
  },
});

export default Welcome;
