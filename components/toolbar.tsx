import React from "react";
import { StyleSheet, View, TouchableOpacity, ToastAndroid } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useEditorStore from "../store";
import { FileTextModule } from "../modules/file-text";
import {
  cacheDirectory,
  EncodingType,
  writeAsStringAsync,
} from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing";

export const Toolbar = () => {
  const {
    handleList,
    handleCode,
    handleInlineCode,
    handleLink,
    handleHeading,
    text,
    setIsFileOpen,
    isFileOpen,
  } = useEditorStore();

  const handleOpen = () => {
    FileTextModule.openTextFile();
    setIsFileOpen(true);
  };

  const handleShare = async () => {
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
      ToastAndroid.show(
        `Failed to save (share) the file: ${error}`,
        ToastAndroid.SHORT
      );
    }
  };

  const handleSave = () => {
    if (!text || !isFileOpen) {
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

  return (
    <View style={styles.toolbar}>
      {[
        { icon: "title" as const, onPress: handleHeading },
        { icon: "format-list-bulleted" as const, onPress: handleList },
        { icon: "link" as const, onPress: handleLink },
        { icon: "code" as const, onPress: handleInlineCode },
        { icon: "segment" as const, onPress: handleCode },
      ].map((item) => (
        <TouchableOpacity
          key={item.icon}
          style={styles.toolbarButton}
          onPress={item.onPress}
        >
          <MaterialIcons name={item.icon} size={20} color="#333" />
        </TouchableOpacity>
      ))}
      <View style={styles.toolbarSeparator} />
      {[
        { icon: "folder-open" as const, onPress: handleOpen },
        {
          icon: "save" as const,
          onPress: isFileOpen ? handleSave : handleShare,
        },
        { icon: "save-as" as const, onPress: handleShare },
      ].map((item) => (
        <TouchableOpacity
          key={item.icon}
          style={styles.toolbarButton}
          onPress={item.onPress}
        >
          <MaterialIcons name={item.icon} size={20} color="#333" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    alignItems: "center",
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
  toolbarSeparator: {
    width: 1,
    height: 24,
    backgroundColor: "#e9ecef",
    marginRight: 10,
  },
});
