//Register.tsx
import { Link } from "expo-router";
import { useFocusEffect, useRouter } from 'expo-router';
import { Alert, BackHandler, Image } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingWrapper } from "@/components/KeyboardAvoidingWrapper";
import React from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDeviceIP } from "@/utils/getIPAddress";

type RegisterForm = {
    name: string,
    phone_number: string,
    email: string,
    password: string,
    confirmPassword: string;
}

export default function Register() {
    const { control, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>({
      defaultValues: {
        name: '',
        phone_number: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    });
    const router = useRouter();
    const [APIURL, setAPIUrl] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          router.replace('/');
          return true; // prevent default behavior
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
    
        const RegisterURI = `${APIURL}/user/register`;

        /*
    const handleRegister = async(data: RegisterForm) => {
      try 
      {
        if (data.password !== data.confirmPassword) {
          Alert.alert("Registration Failed", "Passwords do not match!");
          return;
        }
        const response = await axios.post(RegisterURI, data);
        const token = response.data.token;
        if (token) 
        {
            await AsyncStorage.setItem('token', token);
            Alert.alert("Registration Successful", "You have successfully registered!");
            router.replace('/home');
        }
      } 
      catch (error) 
      {
        console.error("Registration failed:", error);
        Alert.alert('Error', 'Registration Unsuccessful. Please try again.');
      } 
    };
        */
    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingWrapper>
          <View style={styles.registerContainer}>
                    
            {/* Heading */}
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require('@assets/images/logo.png')}
                style={styles.logo}
              />
              <Text style={styles.headingText}>Register</Text>
            </View>

            {/* Form Fields */}
            <View style={{ width: '100%', alignItems: 'center' }}>

              {/* Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.inputField}
                      placeholder="Name"
                      keyboardType="default"
                      autoCapitalize="words"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.name?.message && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
              </View>

              {/* Phone Number */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <Controller
                  control={control}
                  name="phone_number"
                  rules={{ required: "Phone Number is required" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.inputField}
                      placeholder="Phone Number"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.phone_number?.message && <Text style={{ color: 'red' }}>{errors.phone_number.message}</Text>}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address"
                    }
                  }}
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
                {errors.email?.message && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
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
                {errors.password?.message && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.passwordFieldWrapper}>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{ required: "Please confirm your password" }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
                    <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="gray" />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword?.message && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}
              </View>

            </View>

            {/* Register Button */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => {router.replace('/home')}}
                style={styles.registerButton}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>

            {/* Already have account */}
            <View>
              <Text>
                Already have an account?{" "}
                <Link href="/login" style={{ color: '#4682b4' }}>Login</Link>
              </Text>
            </View>

          </View>
        </KeyboardAvoidingWrapper>
      </View>
    );
}

        
const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },  
    registerContainer: {
        width: '100%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'snow',
        borderWidth: 2,
        borderColor: '#ff8f50',
        borderRadius: 10,
        padding: 40,
        marginHorizontal: 'auto',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    headingText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'serif',
        margin: 10
    },
    logo:{
        height: 50,
        width: 50
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
        padding: 10,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                height: 40,
                shadowColor: "#000",        
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                height: 45,
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
      width: 250, 
      ...Platform.select({
        ios: {
          height: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          height: 45,
          elevation: 5
        }
      }),
    },
    passwordInput: {
      flex: 1,
      fontSize: 16,
      fontWeight: "500",
      fontFamily: 'serif',
      paddingHorizontal: 5, // Ensure padding for the input field
    },    
    eyeButton: {
      paddingHorizontal: 5,
    },    
    registerButton: {
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
    registerButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'serif',
        color: "#fff",
    }  
})
