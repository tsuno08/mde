import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function App() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        onChangeText={setText}
        value={text}
        placeholder="Markdown を入力してください..."
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50, // Adjust as needed for status bar height
  },
  editor: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top", // Ensure text starts from the top on Android
  },
});
