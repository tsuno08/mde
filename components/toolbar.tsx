import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ToolbarProps {
  onList: () => void;
  onCode: () => void;
  onInlineCode: () => void;
  onLink: () => void;
  onHeading: () => void;
  onSave: () => void;
}

export const Toolbar = ({
  onList,
  onCode,
  onInlineCode,
  onLink,
  onHeading,
  onSave,
}: ToolbarProps) => {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity style={styles.toolbarButton} onPress={onList}>
        <MaterialIcons name="format-list-bulleted" size={24} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onCode}>
        <MaterialIcons name="code" size={24} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onInlineCode}>
        <MaterialIcons name="data-object" size={24} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onLink}>
        <MaterialIcons name="link" size={24} color="#4c669f" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolbarButton} onPress={onHeading}>
        <MaterialIcons name="title" size={24} color="#4c669f" />
      </TouchableOpacity>
      <View style={styles.toolbarSeparator} />
      <TouchableOpacity style={styles.toolbarButton} onPress={onSave}>
        <MaterialIcons name="save" size={24} color="#4c669f" />
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
