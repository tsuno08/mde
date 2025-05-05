import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Editor from "./components/editor";
import Preview from "./components/preview";
import { TextIntentModule } from "./modules/text-intent";

export default function App() {
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [text, setText] = useState("");

  useEffect(() => {
    setText(TextIntentModule.getTextIntent());
  }, []);

  const handleSave = () => {
    TextIntentModule.setTextIntent(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "editor" && styles.activeTab]}
          onPress={() => setActiveTab("editor")}
        >
          <MaterialIcons
            name="edit"
            size={24}
            color={activeTab === "editor" ? "#4c669f" : "#999"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "editor" && styles.activeTabText,
            ]}
          >
            Editor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "preview" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("preview")}
        >
          <MaterialIcons
            name="preview"
            size={24}
            color={activeTab === "preview" ? "#4c669f" : "#999"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "preview" && styles.activeTabText,
            ]}
          >
            Preview
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "editor" ? (
        <Editor text={text} setText={setText} onSave={handleSave} />
      ) : (
        <Preview text={text} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    padding: 10,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#f8f9fa",
  },
  tabText: {
    fontSize: 16,
    color: "#999",
  },
  activeTabText: {
    color: "#4c669f",
    fontWeight: "600",
  },
});
