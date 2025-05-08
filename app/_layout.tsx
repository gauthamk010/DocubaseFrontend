//app.layout.tsx
import { Stack } from "expo-router";
import { StatusBar, Text, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 3.75,
        backgroundColor: "#fffff0",
        borderColor: "#ccc",
        borderWidth: 2,
        elevation: 5
      }}
    >
      <Image 
        source={require('@assets/images/logo.png')}
        style={{ height: 30, width: 30, margin: 8}}
      />
      <Text style={{ fontSize: 15, fontFamily: "Verdana", fontWeight: "700" }}>DOCUBASE</Text>
    </View>
  )
}


export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Header />
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />  
    </>
    
  );
}
