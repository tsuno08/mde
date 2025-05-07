import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface TabBarProps {
  activeTab: "editor" | "preview";
  setActiveTab: (tab: "editor" | "preview") => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabBar}>
      {(
        [
          { tab: "editor", icon: "edit", label: "Editor" },
          { tab: "preview", icon: "preview", label: "Preview" },
        ] as const
      ).map((item) => (
        <TouchableOpacity
          key={item.tab}
          style={[styles.tabButton, activeTab === item.tab && styles.activeTab]}
          onPress={() => setActiveTab(item.tab)}
        >
          <MaterialIcons
            name={item.icon}
            size={24}
            color={activeTab === item.tab ? "#333" : "#999"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === item.tab && styles.activeTabText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: "#333",
    fontWeight: "600",
  },
});
