//Login.tsx
import { Link } from "expo-router";
import { useFocusEffect, useRouter } from 'expo-router';
import { BackHandler, Image } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { KeyboardAvoidingWrapper } from "@/components/KeyboardAvoidingWrapper";
import axios from 'axios'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDeviceIP } from "@/utils/getIPAddress";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React from "react";

export default function Login () {
    const [showPassword, setShowPassword] = useState(false);
    const { control, 
            handleSubmit,  
            formState: { errors } } = useForm<LoginForm>({
      defaultValues: {
        email: '',
        password: '',
      },
    });
    
    const router = useRouter();
    const [APIURL, setAPIUrl] = useState('');

    type LoginForm = {
        email: string ;
        password: string;
      }

    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            router.replace('/');
            return true;
          };
          const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () => subscription.remove();
        }, [])
    );
        
    useEffect(() => {
        (async () => {
            const ip = await getDeviceIP();
            if (ip) {
                setAPIUrl(`http://${ip}:7000`);
            }
        })();
    }, []);

    const LoginURI = `${APIURL}/user/login`;

    const handleLogin: SubmitHandler<LoginForm> = async (data) => {
        try {
            const response = await axios.post(LoginURI, data);
            const token = response.data.token;
            if (token) {
                await AsyncStorage.setItem('token', token);
                router.replace('/(tabs)/explore');
            }
        } catch (error) {
            console.error("Login failed:", error);
            Alert.alert('Error', 'Login failed. Please try again.');
        }
    };

    return (
        <View style={styles.mainContainer}>
          <KeyboardAvoidingWrapper>
              <View style={styles.loginContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* Heading */}
                    <Image
                      source={require('@assets/images/logo.png')}
                      style={styles.logo}
                    />
                    <Text style={styles.headingText}>Login</Text>
                </View>
              
                <View style={{ width: '100%', alignItems: 'center'}}>
                  {/* Email */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                      <Controller
                        control={control}
                        name="email"
                        rules={{ required: "Email is required" }}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            style={styles.inputField}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={value}
                            onChangeText={onChange}
                          />
                        )}
                      />
                      {errors.email && (<Text style={{ color: "red" }}>{errors.email?.message?.toString() ?? 'Error'}</Text>)}
                  </View>
                        
                  {/* Password */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordFieldWrapper}>
                      <Controller
                        control={control}
                        name="password"
                        rules={{ required: "Password is required" }}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            value={value}
                            onChangeText={onChange}
                          />
                        )}
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <Text style={{ color: "red" }}>
                        {errors.password?.message?.toString() ?? "Error"}
                      </Text>
                    )}
                  </View>
                </View>
                        
                {/* Login Button */}
                <TouchableOpacity onPress={handleSubmit(handleLogin)} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View>
                  <Text>
                    Don't have an account?
                    <Link href="/register" style={{ color: '#4682b4' }}> Register</Link>
                  </Text>
                </View>
              </View>
          </KeyboardAvoidingWrapper>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },  
    loginContainer: {
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'snow',
        borderWidth: 2,
        borderColor: '#ff8f50',
        borderRadius: 10,
        padding: 50,
        margin: 'auto',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    logo:{
        height: 50,
        width: 50,
        marginRight: 10
    },
    headingText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'serif',
        margin: 1
    },
    inputContainer: {
        width: '100%',
        marginVertical: 10,
    },    
    inputLabel: {
        fontSize: 18,
        fontWeight: "900",
        fontFamily: 'serif',
        marginBottom: 6,
        color: "#333"
    },  
    inputField: {
        width: 250,
        fontSize: 16,
        fontWeight: "500",
        fontFamily: 'serif',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        height: 45,
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          android: {
            elevation: 5
          }
        }),
      }, 
    passwordFieldWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        height: 50,
        width: 250,
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          android: {
            elevation: 5
          }
        }),
      },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        fontFamily: 'serif',
    },
    eyeButton: {
        padding: 10,              
      },     
    loginButton: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#ff8f50",
        width: 150,
      },
    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'serif',
        color: "#fff",
      }  
});
