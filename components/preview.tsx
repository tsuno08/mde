import React from "react";
import { StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";

interface PreviewProps {
  text: string;
}

export const Preview = ({ text }: PreviewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Markdown style={markdownStyles}>{text}</Markdown>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  heading2: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 12,
  },
  heading3: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4c669f",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#2c3e50",
    marginBottom: 12,
  },
  list_item: {
    fontSize: 16,
    lineHeight: 26,
    color: "#2c3e50",
    marginBottom: 8,
  },
  code_block: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    fontFamily: "monospace",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
});
