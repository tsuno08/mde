import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { pick, saveDocuments, types } from "@react-native-documents/picker";
import {
  cacheDirectory,
  copyAsync,
  EncodingType,
  readAsStringAsync,
} from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import { ToastAndroid } from "react-native";
import { Editor } from "./components/editor";
import { Preview } from "./components/preview";
import { TextIntentModule } from "./modules/text-intent";

export const App = () => {
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setText(TextIntentModule.getTextIntent());
    setLoading(false);
    ToastAndroid.show("Loaded", ToastAndroid.SHORT);

    const subscription = TextIntentModule.addListener(
      "onIntentReceived",
      (event) => {
        if (event.text) {
          setText(event.text);
          ToastAndroid.show("Intent received", ToastAndroid.SHORT);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  const openDocument = async (): Promise<string | void> => {
    try {
      const [res] = await pick({
        type: [
          types.plainText,
          types.doc,
          types.docx,
          types.json,
          types.csv,
          "text/markdown",
        ],
      });

      if (!res) {
        ToastAndroid.show("No file selected", ToastAndroid.SHORT);
        return;
      }
      if (res.error) {
        ToastAndroid.show("Error: " + res.error, ToastAndroid.SHORT);
        return;
      }
      const pickedUri = res.uri;
      const fileName = pickedUri.split("/").pop();
      const cacheDir = cacheDirectory;
      const localUri = `${cacheDir}${fileName}`;

      await copyAsync({
        from: pickedUri,
        to: localUri,
      });

      const text = await readAsStringAsync(localUri, {
        encoding: EncodingType.UTF8,
      });
      console.log("File content: ", text, "local URI: ", localUri);
      setText(text);
      ToastAndroid.show("Opened successfully", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show("Error: " + e, ToastAndroid.SHORT);
    }
  };

  const saveAsDocument = async (): Promise<void> => {
    try {
      if (!text) {
        ToastAndroid.show("Please enter some text", ToastAndroid.SHORT);
        return;
      }
      await saveDocuments({
        sourceUris: ["content://com.android.providers.downloads.documents/mde"],
        mimeType: "text/markdown",
        fileName: "Untitled.md",
      });
      ToastAndroid.show("Saved successfully", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show("Error: " + e, ToastAndroid.SHORT);
      console.error("Error saving document: ", e);
    }
  };

  const handleSave = () => {
    if (!text) {
      ToastAndroid.show("Please enter some text", ToastAndroid.SHORT);
      return;
    }
    const err = TextIntentModule.setTextIntent(text);
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
    <View style={styles.container}>
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={openDocument}>
          <MaterialIcons name="folder-open" size={24} color="#4c669f" />
          <Text style={styles.actionText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => saveAsDocument()}
        >
          <MaterialIcons name="save-alt" size={24} color="#4c669f" />
          <Text style={styles.actionText}>Save As</Text>
        </TouchableOpacity>
      </View>
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
