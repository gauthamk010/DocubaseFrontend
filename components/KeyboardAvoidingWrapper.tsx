import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";

interface LayoutProps {
  children: ReactNode;
}

export const KeyboardAvoidingWrapper = ({ children }: LayoutProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
        <Pressable
          onPress={Keyboard.dismiss}
          style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.95 }]}
        >
          {children}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
