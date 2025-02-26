import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FirstPage from "./firstPage/FirstPage";
import Message from "./message/Message";
import Mine from "./mine/Mine";
import Shop from "./shop/Shop";
import icon_tab_publish from "../../assets/icon_tab_publish.png";
import {
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";

const BottomTab = createBottomTabNavigator();

// 发布按钮点击事件
async function onPublishPress() {
  // // 打开用户的相册
  // launchImageLibrary(
  //   {
  //     mediaType: "photo",
  //     quality: 1,
  //     includeBase64: true,
  //   },
  //   (res: ImagePickerResponse) => {
  //     console.log("进入回调2");
  //     const { assets } = res;

  //     if (!assets?.length) {
  //       console.log("选择图片失败");
  //       return;
  //     }

  //     const { uri, width, height, fileName, fileSize, type } = assets[0];

  //     console.log(`uri=${uri}, width=${width}, height=${height}`);
  //     console.log(`fileName=${fileName}, fileSize=${fileSize}, type=${type}`);
  //   }
  // );

  console.log("进入回调1");

  // 配置选项
  const options = {
    mediaType: "photo", // 选择的媒体类型为照片
    quality: 1, // 图片质量，范围从 0 到 1
    includeBase64: true, // 是否包含 Base64 编码的数据
  };

  try {
    const result: ImagePickerResponse = await launchImageLibrary(
      options as any
    );

    if (result.didCancel === false) {
      const selectedImage = result.assets![0];
      console.log("选中的图片信息:", selectedImage);
      // 在这里可以处理选中的图片，例如显示图片
    } else {
      console.log("用户取消了选择");
    }
  } catch (error) {
    console.error("选择图片时出错:", error);
  }
}

const RedBookTabBar = ({ state, descriptors, navigation }: any) => {
  // routes 是一个数组，包含了所有的路由信息
  // index 是当前选中的路由的索引
  const { routes, index } = state;

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route: any, i: number) => {
        const { options } = descriptors[route.key];

        const label = options.title;

        const isFocused = index === i;

        // 发布按钮
        if (i === 2) {
          return (
            <TouchableOpacity
              key={label}
              style={styles.tabItem}
              onPress={onPublishPress}
            >
              <Image
                style={styles.icon_tab_publish}
                source={icon_tab_publish}
              />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={label}
            style={styles.tabItem}
            onPress={() => {
              navigation.navigate(route.name);
            }}
          >
            <Text
              style={{
                fontSize: isFocused ? 18 : 16,
                color: isFocused ? "#333" : "#999",
                fontWeight: isFocused ? "bold" : "normal",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function Home() {
  return (
    <>
      <View style={styles.root}>
        <BottomTab.Navigator tabBar={(props) => <RedBookTabBar {...props} />}>
          <BottomTab.Screen
            name="Home"
            component={FirstPage}
            options={{ title: "首页", headerShown: false }}
          />
          <BottomTab.Screen
            name="Shop"
            component={Shop}
            options={{ title: "购物", headerShown: false }}
          />
          <BottomTab.Screen
            name="Publish"
            component={Shop}
            options={{
              title: "发布",
              headerShown: false,
            }}
          />
          <BottomTab.Screen
            name="Message"
            component={Message}
            options={{ title: "消息", headerShown: false }}
          />
          <BottomTab.Screen
            name="Mine"
            component={Mine}
            options={{ title: "我的", headerShown: false }}
          />
        </BottomTab.Navigator>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
  },
  tabBarContainer: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  tabItem: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: "contain",
  },
  pubBtn: {
    width: 58,
    height: 42,
    resizeMode: "contain",
    position: "absolute",
    right: 10,
    top: -10,
  },
});

export default Home;
