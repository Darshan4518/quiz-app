import { Stack } from "expo-router";
import "../global.css";
import { StatusBar, View } from "react-native";
export default function RootLayout() {
  return (
    <View className=" flex-1">
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="quiz" />
        <Stack.Screen name="result" />
      </Stack>
    </View>
  );
}
