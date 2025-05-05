import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "editor",
};

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
