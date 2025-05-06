import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ToolbarProps {
  isIntentFile: boolean;
  onList: () => void;
  onCode: () => void;
  onInlineCode: () => void;
  onLink: () => void;
  onHeading: () => void;
  onSave: () => void;
  onOpen: () => void;
  onSaveAs: () => void;
}

export const Toolbar = ({
  isIntentFile,
  onList,
  onCode,
  onInlineCode,
  onLink,
  onHeading,
  onSave,
  onOpen,
  onSaveAs,
}: ToolbarProps) => {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity style={styles.toolbarButton} onPress={onList}>
        <MaterialIcons name="format-list-bulleted" size={20} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onCode}>
        <MaterialIcons name="code" size={20} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onInlineCode}>
        <MaterialIcons name="data-object" size={20} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onLink}>
        <MaterialIcons name="link" size={20} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onHeading}>
        <MaterialIcons name="title" size={20} color="#4c669f" />
      </TouchableOpacity>
      <View style={styles.toolbarSeparator} />
      <TouchableOpacity style={styles.toolbarButton} onPress={onOpen}>
        <MaterialIcons name="folder-open" size={20} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toolbarButton, !isIntentFile && { opacity: 0.5 }]}
        onPress={onSave}
        disabled={!isIntentFile}
      >
        <MaterialIcons name="save" size={20} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onSaveAs}>
        <MaterialIcons name="save-as" size={20} color="#4c669f" />
      </TouchableOpacity>
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
