// 点赞组件
import React, { useEffect, useMemo, useState, useRef } from "react";
import { TouchableOpacity, Image, StyleSheet, Animated } from "react-native";
import icon_heart_empty from "../../assets/icon_heart_empty.png";
import icon_heart from "../../assets/icon_heart.png";

interface Props {
  [key: string]: any;
}

export default function Praise(props: Props) {
  let defaultValue = props.isFavorite;
  let onValChange = props.onValChange;
  let size = 20;

  const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
  const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

  // 是否点赞
  let [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    setLike(defaultValue);
  }, []);

  // 计算使用点赞图标还是未点赞图标
  let isPraise = useMemo(() => {
    if (like) {
      return icon_heart;
    }
    return icon_heart_empty;
  }, [like]);

  // 点击心型图片的回调
  const handleChangeLike = () => {
    let newState = !like;
    setLike(newState); // 切换星星图片
    onValChange(newState); // 通知父组件

    if (newState) {
      alpha.setValue(1);
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.8,
        duration: 300,
        useNativeDriver: false,
      });

      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        delay: 200,
      });

      Animated.parallel([scaleAnim, alphaAnim]).start();
    } else {
      scale.setValue(0);
      alpha.setValue(0);
    }
  };

  return (
    <TouchableOpacity onPress={handleChangeLike}>
      <Image style={styles.container} source={isPraise}></Image>
      {/* 点赞的特效 */}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 20,
          position: "absolute",
          borderColor: "#ff2442",
          transform: [{ scale: scale }],
          opacity: alpha,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
