import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { load } from "../../utils/Storages";
import UserStore from "../../stores/UserStore";
import { useRouter } from "expo-router";

import icon_logo_main from "../../assets/icon_main_logo.png";

function Welcome() {
  const router = useRouter();

  // 2s 后，根据 async-storage 的是否有用户信息，判断用户是否已经登录
  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
      // router.replace("/login" as any);
    }, 2000);
  }, []);

  async function getUserInfo() {
    const cacheUserInfo = await load("userInfo");

    if (!cacheUserInfo) {
      goToLogin();
    } else {
      const parse = JSON.parse(cacheUserInfo);

      if (parse) {
        UserStore.setUserInfo(parse);
        goToHome();
      } else {
        goToLogin();
      }
    }
  }

  const goToLogin = () => {
    router.replace("/login" as any);
  };

  const goToHome = () => {
    router.replace("/home" as any);
  };

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
