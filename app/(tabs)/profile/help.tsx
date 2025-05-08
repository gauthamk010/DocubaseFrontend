//help.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet, Platform, UIManager, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const inquiries = [
  { question: "How long do I have access to the books?", answer: "You have lifetime access to all the books!" },
  { question: "Can I read books offline?", answer: "Yes, you can download books and read them offline." },
  { question: "Do I need an account to use the app?", answer: "Yes, an account is required to use the app." },
  { question: "Is audio transcription of the books available?", answer: "Sorry! The feature isn't available right now. We're still working on it."},
];

export default function Help() {
  const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);

  const toggleAnswer = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisibleAnswers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <Text style={styles.headingText}>HELP & QUERIES</Text>
      <ScrollView>
        <View style={styles.container}>
          {inquiries.map((inquiry, index) => (
            <View key={index}>
              {/* Question */}
              <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionContainer}>
                <Text style={styles.questionText}>{inquiry.question}</Text>
                <AntDesign
                  name={visibleAnswers.includes(index) ? "up" : "down"}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>

              {/* Answer */}
              {visibleAnswers.includes(index) && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{inquiry.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      margin: 20,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      backgroundColor: "#f9f9f9",
      marginVertical: 20,
      paddingVertical: 10,
    },
    headingText: {
        fontSize: 30,
        fontWeight: "800",
        textAlign: "center",
        marginVertical: 30,
    },
    questionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 18,
    },
    questionText: {
      fontSize: 20,
      fontWeight: "bold",
      flex: 1,
    },
    answerContainer: {
      marginTop: 10,
      paddingLeft: 5,
    },
    answerText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#228b22",
    },
  });
