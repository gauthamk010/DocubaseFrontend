//account.tsx
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getDeviceIP } from "@/utils/getIPAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Account() {
  const [baseURL, setBaseURL] = useState('');
  const [tokenValue, setTokenValue] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const ip = await getDeviceIP();
      if (ip) {
        setBaseURL(`http://${ip}:7000`);
      }
  
      const token = await AsyncStorage.getItem("token");
      setTokenValue(token);
    })();
  }, []);
  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    if (tokenValue) {
      try {
        const tokenObject = JSON.parse(tokenValue);
        fetchUserProfile(tokenObject?.id);
      } catch (err) {
        console.log('Invalid token format:', err);
      }
    }
  }, [tokenValue]);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await axios.get(`${baseURL}/user/${userId}`);
      setUserName(response.data.name);
      setUserEmail(response.data.email);
    } catch (err) {
      console.log('Failed to fetch user profile', err);
    }
  };
  
  const deleteAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              if (tokenValue) {
                const tokenObject = JSON.parse(tokenValue);
                const userId = tokenObject?.id;
  
                const response = await axios.delete(`${baseURL}/user/delete/${userId}`);
                console.log("Account deleted:", response.data);
  
                // Clear token and logout
                await AsyncStorage.removeItem("token");
                router.replace("/(auth)/login");
              }
            } catch (error) {
              console.log("Error deleting user", error);
              Alert.alert("Deletion Failed", "Could not delete your account. Please try again.");
            }
          }
        }
      ]
    );
  };
  
  return (
        <View style={styles.profileContainer}>
            <Image 
            source={require('@assets/images/profileimage.jpg')}
            style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileEmail}>{userEmail}</Text>
            </View>
            <TouchableOpacity 
              onPress={deleteAccount}
              style={styles.deleteAccountButton}>
                <Text><FontAwesome name="user-times" size={25} color="red" /></Text>
                <Text style={styles.deleteAccountText}>Delete Account</Text>    
            </TouchableOpacity>    
        </View>
    );
}

const styles = StyleSheet.create({profileContainer: {
    flexDirection: 'column',
    flex: 1,         
    alignItems: 'center',         
    justifyContent: 'flex-start',  
    paddingVertical: 16,          
    paddingHorizontal: 24,         
    backgroundColor: '#fff',      
    borderRadius: 12,           
    shadowColor: '#000',         
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,                  
    marginHorizontal: "auto",          
    marginVertical: 8,           
    width: '100%',   
  },
  profileImage: {
    width: 200,                  
    height: 200,                 
    borderRadius: 48,            
  },
  profileDetails: {
    flex: 1,                  
  },
  profileName: {
    fontSize: 35,              
    fontWeight: '600',           
    color: '#333',              
    marginBottom: 4, 
    textAlign: "center"            
  },
  profileEmail: {
    fontSize: 20,                
    color: '#666',  
    textAlign: "center"            
  },
  deleteAccountButton: {
    alignItems: 'center',         
    justifyContent: 'flex-start',  
    paddingVertical: 16,          
    paddingHorizontal: 24,         
    backgroundColor: '#fff',      
    borderRadius: 12,
    borderColor: "red",           
    shadowColor: '#000',         
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,                  
    marginHorizontal: "auto",          
    marginVertical: 8,           
    width: '100%',   
  },
  deleteAccountText:{
    color: "red",
    fontSize: 20,
    fontWeight: "900"
  }
})