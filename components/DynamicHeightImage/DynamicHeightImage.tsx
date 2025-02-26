import { Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

type Props = {
  uri: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SHOW_WIDTH = (SCREEN_WIDTH - 18) / 2;

export default function DynamicHeightImage(props: Props) {
  const [height, setHeight] = useState<number>(200);
  const uri = props.uri;

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const showHeight = SHOW_WIDTH * (height / width);
      setHeight(showHeight);
    });
  }, [uri]);

  return (
    <Image
      style={{
        width: (SCREEN_WIDTH - 18) / 2,
        height: height,
        resizeMode: "cover",
      }}
      source={{ uri }}
    ></Image>
  );
}
