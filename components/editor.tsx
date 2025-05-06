import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ToastAndroid } from "react-native";

interface EditorProps {
  text: string;
  setText: (text: string) => void;
  onSave: () => void;
}

export const Editor = ({ text, setText, onSave }: EditorProps) => {
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => {
    setSelection(event.nativeEvent.selection);
  };

  const insertAtCursor = (prefix: string, suffix: string = "") => {
    const start = selection.start;
    const end = selection.end;
    const hasSelection = start !== end;
    const selectedText = hasSelection ? text.substring(start, end) : "";
    const newText =
      text.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      text.substring(end);
    setText(newText);
  };

  const handleBold = () => {
    insertAtCursor("**", "**");
  };

  const handleItalic = () => {
    insertAtCursor("*", "*");
  };

  const handleList = () => {
    const start = selection.start;
    const end = selection.end;
    const hasSelection = start !== end;

    if (hasSelection) {
      const selectedText = text.substring(start, end);
      const lines = selectedText.split("\n");
      const formattedLines = lines
        .map((line) => (line.trim() ? `- ${line}` : line))
        .join("\n");
      const newText =
        text.substring(0, start) + formattedLines + text.substring(end);
      setText(newText);
    } else {
      insertAtCursor("- ");
    }
  };

  const handleCode = () => {
    const start = selection.start;
    const end = selection.end;
    const hasSelection = start !== end;

    if (hasSelection) {
      const selectedText = text.substring(start, end);
      const newText =
        text.substring(0, start) +
        "```\n" +
        selectedText +
        "\n```" +
        text.substring(end);
      setText(newText);
    } else {
      insertAtCursor("```\n", "\n```");
    }
  };

  const handleInlineCode = () => {
    const start = selection.start;
    const end = selection.end;
    const hasSelection = start !== end;

    if (hasSelection) {
      const selectedText = text.substring(start, end);
      const newText =
        text.substring(0, start) +
        "`" +
        selectedText +
        "`" +
        text.substring(end);
      setText(newText);
    } else {
      insertAtCursor("`", "`");
    }
  };

  const handleLink = () => {
    const start = selection.start;
    const end = selection.end;
    const hasSelection = start !== end;

    if (hasSelection) {
      const selectedText = text.substring(start, end);
      const newText =
        text.substring(0, start) +
        "[" +
        selectedText +
        "]()" +
        text.substring(end);
      setText(newText);
    } else {
      insertAtCursor("[", "]()");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleBold}>
          <MaterialIcons name="format-bold" size={24} color="#4c669f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleItalic}>
          <MaterialIcons name="format-italic" size={24} color="#4c669f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleList}>
          <MaterialIcons
            name="format-list-bulleted"
            size={24}
            color="#4c669f"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleCode}>
          <MaterialIcons name="code" size={24} color="#4c669f" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={handleInlineCode}
        >
          <MaterialIcons name="data-object" size={24} color="#4c669f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleLink}>
          <MaterialIcons name="link" size={24} color="#4c669f" />
        </TouchableOpacity>
        <View style={styles.toolbarSeparator} />
        <TouchableOpacity style={styles.toolbarButton} onPress={onSave}>
          <MaterialIcons name="save" size={24} color="#4c669f" />
        </TouchableOpacity>
      </View>
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
  editor: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
});
