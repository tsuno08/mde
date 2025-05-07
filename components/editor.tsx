import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import useEditorStore from "../store";

export const Editor = () => {
  const { text, setText, setSelection } = useEditorStore();

  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => {
    setSelection(event.nativeEvent.selection);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.editor}
        multiline
        onChangeText={setText}
        onSelectionChange={handleSelectionChange}
        value={text}
        placeholder="Enter Markdown text..."
        textAlignVertical="top"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  editor: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
});
