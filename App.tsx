import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { TextIntentModule } from "./modules/text-intent";
import Markdown from "react-native-markdown-display";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [text, setText] = useState("");
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    setText(TextIntentModule.getTextIntent());
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTextChange = (newText: string) => {
    setText(newText);
    TextIntentModule.setTextIntent(newText);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.header}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.headerTitle}>Markdown Editor</Text>
          <Text style={styles.headerSubtitle}>
            Write and preview your Markdown
          </Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.editorContainer}>
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
        <View style={styles.separator} />
        <View style={styles.previewContainer}>
          <Markdown style={markdownStyles}>{text}</Markdown>
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  editorContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolbar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  toolbarButton: {
    padding: 8,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
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
  separator: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginHorizontal: 10,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  heading2: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 12,
  },
  heading3: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4c669f",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#2c3e50",
    marginBottom: 12,
  },
  list_item: {
    fontSize: 16,
    lineHeight: 26,
    color: "#2c3e50",
    marginBottom: 8,
  },
  code_block: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    fontFamily: "monospace",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
});
