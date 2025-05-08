//app.index.tsx
import React from "react";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1}}>
    <ImageBackground
      source={require('@assets/images/background-image.jpg')}
      resizeMode="cover"
      imageStyle={{ alignSelf: "center" }}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        {/* DocuBase */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>DOCUBASE</Text>
          <Image
            source={require('@assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        
        {/* Button Container */}
        <View style={styles.buttonContainer}>
          {/* Login */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* Register */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/register")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    maxHeight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    width: "90%",
    marginHorizontal: 'auto',
    marginVertical: 50,
    padding: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20
  },
  heading: {
    fontSize: 50,
    fontFamily: "Impact",
    color: "white",
  },
  logo: {
    borderColor: "#FFD7AB",
    borderWidth: 2,
    borderRadius: 100,
    padding: 70,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#ff8f50",
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    width: 200
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  }
})
