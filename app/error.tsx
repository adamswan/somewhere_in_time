import React from "react";
import { Text, View } from "react-native";

const ErrorScreen = ({ error }: { error: Error }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Error: {error.message}</Text>
    </View>
  );
};

export default ErrorScreen;
