import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextIntentModule } from "../../modules/text-intent";

export default function EditorTab() {
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
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton}>
          <MaterialIcons name="format-bold" size={24} color="#4c669f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <MaterialIcons name="format-italic" size={24} color="#4c669f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <MaterialIcons
            name="format-list-bulleted"
            size={24}
            color="#4c669f"
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.editor}
        multiline
        onChangeText={handleTextChange}
        value={text}
        placeholder="Markdown を入力してください..."
        textAlignVertical="top"
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  toolbar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  toolbarButton: {
    padding: 8,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editor: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
});
