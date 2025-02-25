import React from "react";
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

const AboutScreen = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>我是关于页</Text>

      <Button title="Go Back to Home" onPress={() => router.back()} />
    </View>
  );
};

export default AboutScreen;
