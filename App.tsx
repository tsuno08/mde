import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TextIntentModule } from "./modules/text-intent";

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(TextIntentModule.getTextIntent());
  }, []);

  const handleTextChange = (newText: string) => {
    setText(newText);
    TextIntentModule.setTextIntent(newText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        onChangeText={handleTextChange}
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
