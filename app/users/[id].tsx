import React from "react";
import { Text, View, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const UserScreen = () => {
  const router = useRouter();

  const routeParams = useLocalSearchParams();

  const { id } = routeParams;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>用户ID: {id}</Text>
      <Button title="Go Back to Home" onPress={() => router.back()} />
    </View>
  );
};

export default UserScreen;
