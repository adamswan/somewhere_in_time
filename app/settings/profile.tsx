import React from "react";
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Go Back to Settings" onPress={() => router.back()} />
    </View>
  );
};

export default ProfileScreen;
