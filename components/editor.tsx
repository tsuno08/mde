import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { Toolbar } from "./toolbar";

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

  const handleHeading = () => {
    insertAtCursor("# ");
  };

  return (
    <View style={styles.container}>
      <Toolbar
        onList={handleList}
        onCode={handleCode}
        onInlineCode={handleInlineCode}
        onLink={handleLink}
        onHeading={handleHeading}
        onSave={onSave}
      />
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
