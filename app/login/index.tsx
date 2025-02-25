import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";

// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";

import { formatPhone, replaceBlank } from "../../utils/String";
// import UserStore from "../../stores/UserStore";
// import Toast from "../../components/widget/Toast";

import icon_logo_main from "../../assets/icon_main_logo.png";
import icon_unselected from "../../assets/icon_unselected.png";
import icon_selected from "../../assets/icon_selected.png";
import icon_arrow from "../../assets/icon_arrow.png";
import icon_wx_small from "../../assets/icon_wx_small.png";
import icon_triangle from "../../assets/icon_triangle.png";
import icon_eye_open from "../../assets/icon_eye_open.png";
import icon_eye_close from "../../assets/icon_eye_close.png";
import icon_exchange from "../../assets/icon_exchange.png";
import icon_wx from "../../assets/icon_wx.png";
import icon_qq from "../../assets/icon_qq.webp";
import icon_close_modal from "../../assets/icon_close_modal.png";

export default () => {
  // 登录类型：手机号登陆、账号密码登陆
  const [loginType, setLoginType] = useState<"quick" | "input">("quick");

  const [check, setCheck] = useState<boolean>(false);

  const [eyeOpen, setEyeOpen] = useState<boolean>(true);

  const [phone, setPhone] = useState<string>("");

  const [pwd, setPwd] = useState<string>("");

  // const navigation = useNavigation<StackNavigationProp<any>>();
  const router = useRouter();

  const onLoginPress = async () => {
    const canLogin = phone?.length === 13 && pwd?.length === 6;
    if (!canLogin || !check) {
      return;
    }
    // UserStore.requestLogin(replaceBlank(phone), pwd, (success: boolean) => {
    //   if (success) {
    //     navigation.replace("MainTab");
    router.push("/home");
    //   } else {
    //     Toast.show("登陆失败，请检查用户名和密码");
    //   }
    // });
  };

  // 快速登陆（手机号登陆、微信登录）
  function renderQuickLogin() {
    return (
      <View style={stylesQuickLogin.root}>
        {/* logo图片 */}
        <Image style={stylesQuickLogin.logoMain} source={icon_logo_main} />

        {/* 手机号登陆 */}
        <TouchableOpacity
          style={stylesQuickLogin.oneKeyLoginButton}
          activeOpacity={0.7}
        >
          <Text style={stylesQuickLogin.oneKeyLoginTxt}>手机号登陆</Text>
        </TouchableOpacity>

        {/* 微信登陆 */}
        <TouchableOpacity
          style={stylesQuickLogin.wxLoginButton}
          activeOpacity={0.7}
        >
          <Image style={stylesQuickLogin.icon_wx} source={icon_wx_small} />
          <Text style={stylesQuickLogin.wxLoginTxt}>微信登陆</Text>
        </TouchableOpacity>

        {/* 账号密码登陆 */}
        <TouchableOpacity
          style={stylesQuickLogin.otherLoginButton}
          onPress={() => {
            // 动画效果
            LayoutAnimation.easeInEaseOut();
            // 切换登陆方式
            setLoginType("input");
          }}
        >
          <Text style={stylesQuickLogin.otherLoginTxt}>账号密码登陆</Text>
          <Image style={stylesQuickLogin.icon_arrow} source={icon_arrow} />
        </TouchableOpacity>

        {/* 用户协议 */}
        <View style={allStyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}
          >
            <Image
              style={allStyles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>

          <Text style={allStyles.lableTxt}>我已阅读并同意</Text>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.bing.com");
            }}
          >
            <Text style={allStyles.protocolTxt}>
              《用户协议》和《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 账号密码登陆
  function renderInputLogin() {
    const canLogin = phone?.length === 13 && pwd?.length === 6;

    return (
      <View style={stylesInputLogin.root}>
        {/* 关闭 */}
        <TouchableOpacity
          style={stylesInputLogin.closeButton}
          onPress={() => {
            // 动画效果
            LayoutAnimation.easeInEaseOut();
            // 切换登陆方式
            setLoginType("quick");
          }}
        >
          <Image style={stylesInputLogin.closeImg} source={icon_close_modal} />
        </TouchableOpacity>
        <Text style={stylesInputLogin.pwdLogin}>密码登陆</Text>

        <Text style={stylesInputLogin.tip}>
          未注册的手机号登陆成功后将自动注册
        </Text>

        <View style={stylesInputLogin.phoneLayout}>
          <Text style={stylesInputLogin.pre86}>+86</Text>

          <Image style={stylesInputLogin.triangle} source={icon_triangle} />

          <TextInput
            style={stylesInputLogin.phoneInput}
            placeholderTextColor="#bbb"
            placeholder="请输入手机号码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => {
              // 格式化手机号, 转换成带空格的后,再塞回input
              setPhone(formatPhone(text));
            }}
          />
        </View>

        <View style={stylesInputLogin.pwdLayout}>
          <TextInput
            style={[stylesInputLogin.phoneInput, stylesInputLogin.pwdInput]}
            placeholderTextColor="#bbb"
            placeholder="输入密码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry={!eyeOpen}
            value={pwd}
            onChangeText={(text: string) => {
              setPwd(text);
            }}
          />
          {/* 密码明文密文切换 */}
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}
          >
            <Image
              style={stylesInputLogin.iconEye}
              source={eyeOpen ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>

        <View style={stylesInputLogin.changeLayout}>
          <Image style={stylesInputLogin.exchangeIcon} source={icon_exchange} />
          <Text style={stylesInputLogin.codeLoginTxt}>验证码登陆</Text>
          <Text style={stylesInputLogin.forgetPwdTxt}>忘记密码？</Text>
        </View>

        {/* 登陆按钮 */}
        <TouchableOpacity
          activeOpacity={canLogin ? 0.7 : 1}
          style={
            canLogin
              ? stylesInputLogin.loginButton
              : stylesInputLogin.loginButtonDisable
          }
          onPress={onLoginPress}
        >
          <Text style={stylesInputLogin.loginTxt}>登陆</Text>
        </TouchableOpacity>

        <View style={allStyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}
          >
            <Image
              style={allStyles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={allStyles.lableTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.bing.com");
            }}
          >
            <Text style={allStyles.protocolTxt}>
              《用户协议》和《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>

        <View style={stylesInputLogin.wxqqLayout}>
          <Image style={stylesInputLogin.iconWx} source={icon_wx} />
          <Image style={stylesInputLogin.iconQQ} source={icon_qq} />
        </View>
      </View>
    );
  }

  return (
    <View style={allStyles.root}>
      {loginType === "quick" ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

const allStyles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
  },
  protocolLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
  },
  lableTxt: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
  },
  protocolTxt: {
    fontSize: 12,
    color: "#1020ff",
  },
});

const stylesQuickLogin = StyleSheet.create({
  root: {
    // backgroundColor: "#b3b3b1",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 56,
    paddingTop: 50,
  },

  logoMain: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    position: "absolute",
    top: 120,
  },

  oneKeyLoginButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#ff2442",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 340,
    marginBottom: 20,
  },
  oneKeyLoginTxt: {
    fontSize: 18,
    color: "white",
    marginLeft: 6,
  },

  wxLoginButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#05c160",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  icon_wx: {
    width: 40,
    height: 40,
  },
  wxLoginTxt: {
    fontSize: 18,
    color: "white",
    marginLeft: 6,
  },

  otherLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  otherLoginTxt: {
    fontSize: 16,
    color: "#303080",
  },
  icon_arrow: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginLeft: 6,
    transform: [{ rotate: "180deg" }],
  },
});

const stylesInputLogin = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 48,
  },
  pwdLogin: {
    fontSize: 28,
    color: "#333",
    fontWeight: "bold",
    marginTop: 56,
  },
  tip: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 6,
  },
  phoneLayout: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 28,
  },
  pre86: {
    fontSize: 24,
    color: "#bbb",
  },
  triangle: {
    width: 12,
    height: 6,
    marginLeft: 6,
  },
  phoneInput: {
    flex: 1,
    height: 60,
    backgroundColor: "transparent",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 24,
    color: "#333",
    marginLeft: 16,
  },
  pwdLayout: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 8,
  },
  pwdInput: {
    marginLeft: 0,
    marginRight: 16,
  },
  iconEye: {
    width: 30,
    height: 30,
  },
  changeLayout: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  exchangeIcon: {
    width: 16,
    height: 16,
  },
  codeLoginTxt: {
    fontSize: 14,
    color: "#303080",
    flex: 1,
    marginLeft: 4,
  },
  forgetPwdTxt: {
    fontSize: 14,
    color: "#303080",
  },
  loginButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#ff2442",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    marginTop: 20,
  },
  loginButtonDisable: {
    width: "100%",
    height: 56,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    marginTop: 20,
  },
  loginTxt: {
    fontSize: 20,
    color: "white",
  },
  wxqqLayout: {
    width: "100%",
    flexDirection: "row",
    marginTop: 54,
    justifyContent: "center",
  },
  iconWx: {
    width: 50,
    height: 50,
    marginRight: 60,
  },
  iconQQ: {
    width: 50,
    height: 50,
    marginLeft: 60,
  },
  closeButton: {
    position: "absolute",
    left: 36,
    top: 24,
  },
  closeImg: {
    width: 28,
    height: 28,
  },
});
