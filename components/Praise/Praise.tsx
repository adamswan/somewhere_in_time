// 点赞组件
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import icon_heart_empty from "../../assets/icon_heart_empty.png";
import icon_heart from "../../assets/icon_heart.png";

interface Props {
  [key: string]: any;
}

export default function Praise(props: Props) {
  let defaultValue = props.isFavorite;
  let onValChange = props.onValChange;

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
  };

  return (
    <TouchableOpacity onPress={handleChangeLike}>
      <Image style={styles.container} source={isPraise}></Image>
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
