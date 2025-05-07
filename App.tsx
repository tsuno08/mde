import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { ToastAndroid } from "react-native";
import { Editor } from "./components/editor";
import { Preview } from "./components/preview";
import { FileTextModule } from "./modules/file-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toolbar } from "./components/toolbar";
import useEditorStore from "./store";
import { TabBar } from "./components/tabbar";

export const App = () => {
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [loading, setLoading] = useState(true);
  const { setText, setIsFileOpen } = useEditorStore();

  useEffect(() => {
    const text = FileTextModule.getFileText();
    if (text) {
      setText(text);
      setIsFileOpen(true);
    }
    setLoading(false);

    const subscription = FileTextModule.addListener(
      "onIntentReceived",
      ({ text }) => {
        if (text) {
          setText(text);
          setIsFileOpen(true);
          ToastAndroid.show("Loaded", ToastAndroid.SHORT);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#333" />
        <Text style={{ marginTop: 16, color: "#333" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "editor" ? (
        <View style={styles.container}>
          <Toolbar />
          <Editor />
        </View>
      ) : (
        <Preview />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
