import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  cacheDirectory,
  EncodingType,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import { ToastAndroid } from "react-native";
import { Editor } from "./components/editor";
import { Preview } from "./components/preview";
import { FileTextModule } from "./modules/file-text";
import { getDocumentAsync } from "expo-document-picker";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import { SafeAreaView } from "react-native-safe-area-context";

export const App = () => {
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const text = FileTextModule.getFileText();
    if (text) {
      setText(text);
    }
    setLoading(false);

    const subscription = FileTextModule.addListener(
      "onIntentReceived",
      ({ text }) => {
        if (text) {
          setText(text);
          ToastAndroid.show("Loaded", ToastAndroid.SHORT);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  const openFile = useCallback(async () => {
    try {
      const result = await getDocumentAsync({
        type: ["text/*"],
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri) {
          const content = await readAsStringAsync(asset.uri, {
            encoding: EncodingType.UTF8,
          });
          setText(content);
          ToastAndroid.show(
            `Opened ${asset.name || "file"}.`,
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show("Failed to get the file URI.", ToastAndroid.SHORT);
        }
      } else if (result.canceled) {
        ToastAndroid.show("File selection was canceled.", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "Failed to open the file. Unexpected result.",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      ToastAndroid.show(
        `Failed to open the file: ${error}`,
        ToastAndroid.SHORT
      );
    }
  }, []);

  const saveFileWithSharing = async () => {
    if (!text) {
      ToastAndroid.show("No content to save.", ToastAndroid.SHORT);
      return;
    }

    const defaultFilename = "Untitled.md";
    const fileUri = cacheDirectory + defaultFilename;

    try {
      await writeAsStringAsync(fileUri, text, {
        encoding: EncodingType.UTF8,
      });

      const canShare = await isAvailableAsync();
      if (!canShare) {
        ToastAndroid.show(
          "Sharing is not available on this device.",
          ToastAndroid.SHORT
        );
        return;
      }

      await shareAsync(fileUri, {
        mimeType: "text/markdown",
        dialogTitle: "Save As...",
      });
    } catch (error) {
      console.error("Error sharing the file:", error);
      ToastAndroid.show(
        `Failed to save (share) the file: ${error}`,
        ToastAndroid.SHORT
      );
    }
  };

  const handleSave = () => {
    if (!text) {
      ToastAndroid.show("Please enter some text", ToastAndroid.SHORT);
      return;
    }
    const err = FileTextModule.setFileText(text);
    if (err) {
      ToastAndroid.show(`Error: ${err}`, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Saved successfully", ToastAndroid.SHORT);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#4c669f" />
        <Text style={{ marginTop: 16, color: "#4c669f" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        <Editor
          text={text}
          setText={setText}
          onSave={handleSave}
          onOpen={openFile}
          onSaveAs={saveFileWithSharing}
        />
      ) : (
        <Preview text={text} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
  },
  actionText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#4c669f",
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
