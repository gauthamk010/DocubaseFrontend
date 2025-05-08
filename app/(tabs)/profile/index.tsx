//profile->index.tsx
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from "expo-router";
import React from "react";
import { useAuth } from "@/context/authcontext";

const Footer = () => {
    return (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>© 2025 Docubase</Text>
            <Text style={styles.footerSubText}>Version 1.0.0</Text>
        </View>
    )
}

export default function Profile() {

    const router = useRouter();
    const { isAdmin, isModerator } = useAuth()
    
    return (
        <View style={{ flex: 3 }}>
            <ScrollView>
                {/* Heading */}
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>My Profile</Text>
                </View>

                {/* CTA Bars - User*/}
                <Text style={styles.settingsHeading}>Settings</Text>
                <View style={styles.ctaBarContainer}>
                    
                        {/* Account Settings */}
                        <TouchableOpacity style={styles.settingsOptionContainer} onPress={() => router.push('/(tabs)/profile/account')}>
                            <View style={styles.settingsRow}>
                                <View style={styles.settingsIcon}>
                                    <FontAwesome name="user" size={24} color="green" />
                                </View>
                                <Text style={styles.settingsLabel}>Account</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Help */}
                        <TouchableOpacity style={styles.settingsOptionContainer} onPress={() => router.push('/(tabs)/profile/help')}>
                            <View style={styles.settingsRow}>
                                <View style={styles.settingsIcon}>
                                    <FontAwesome name="question" size={28} color="blue" />
                                </View>
                                <Text style={styles.settingsLabel}>Help</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Logout */}
                        <TouchableOpacity style={styles.settingsOptionContainer} onPress={() => router.replace('/')}>
                            <View style={styles.settingsRow}>
                                <View style={styles.settingsIcon}>
                                    <FontAwesome name="sign-out" size={24} color="red" />
                                </View>
                                <Text style={styles.settingsLabel}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                {isAdmin  && (
                    <>
                    <Text style={styles.settingsHeading}
                    >
                        Admin Settings
                    </Text>
                    <View style={styles.adminCTABarContainer}>
                        <View style={{ flexDirection: "column", width: "90%", alignItems: "center"}}>

                            {/* Book Settings */}
                                {/* Edit books */}
                                <TouchableOpacity style={styles.adminSettingsOptionContainer} onPress={() => router.push('/(tabs)/profile/books')}>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                                        <View style={styles.settingsIcon}>
                                            <FontAwesome name="plus-circle" size={10} color="green" />
                                                <FontAwesome name="book" size={24} color="blue" />
                                            <FontAwesome name="minus-circle" size={10} color="red" style={{ position: "relative", left: 10 }} /> 
                                        </View>
                                        <Text style={styles.settingsLabel}>Books</Text>
                                    </View>
                                </TouchableOpacity>
                            

                            {/* User Settings */}
                                {/* Edit users */}
                                <TouchableOpacity style={styles.adminSettingsOptionContainer} onPress={() => router.push('/(tabs)/profile/users')}>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                                        <View style={styles.settingsIcon}>
                                        <FontAwesome name="plus-circle" size={10} color="green" />
                                            <FontAwesome name="user" size={24} color="orange" />
                                        <FontAwesome name="minus-circle" size={10} color="red" style={{ position: "relative", left: 10 }} /> 
                                        </View>
                                        <Text style={styles.settingsLabel}>Users</Text>
                                    </View>
                                </TouchableOpacity>
                            
                        </View> 
                    </View>
                </>
                )}

                {isModerator && (
                    <>
                        <Text style={styles.settingsHeading}
                        >
                            Moderator Settings
                        </Text>
                    <View style={styles.adminCTABarContainer}>
                        <View style={{ flexDirection: "column", width: "90%", alignItems: "center"}}>

                            {/* Book Settings */}
                                {/* Edit books */}
                                <TouchableOpacity style={styles.adminSettingsOptionContainer} onPress={() => router.push('/(tabs)/profile/books')}>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                                        <View style={styles.settingsIcon}>
                                            <FontAwesome name="plus-circle" size={10} color="green" />
                                                <FontAwesome name="book" size={24} color="blue" />
                                            <FontAwesome name="minus-circle" size={10} color="red" style={{ position: "relative", left: 10 }} /> 
                                        </View>
                                        <Text style={styles.settingsLabel}>Books</Text>
                                    </View>
                                </TouchableOpacity>
                    </View>
                    </View>
                    </>
                )}
               
            </ScrollView>

            <View style={{ flex: 1 }}>
                <Footer />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headingContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginHorizontal: "auto",
    },
    headingText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },
      settingsHeading: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        margin: 5,
      },
      settingsSubHeading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        margin: 5,
      },
      ctaBarContainer: {
        flexDirection: 'column',         
        alignItems: 'center',         
        justifyContent: 'center', 
        flex: 1,
        width: "90%",                
        marginHorizontal: "auto",   
        paddingVertical: 16,          
        paddingHorizontal: 24,         
        backgroundColor: '#fff',      
        borderRadius: 12,           
        shadowColor: '#000',         
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 2,
      },
      settingsOptionContainer: {
        flexDirection: 'row',         
        justifyContent: 'space-between', 
        alignItems: 'center',  
        width: "100%",        
        marginHorizontal: "auto",
        padding: 16,                
        marginBottom: 12, 
        borderWidth: 0.5,         
        borderRadius: 10,           
        backgroundColor: 'white',  
        shadowColor: '#000',        
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,                  
      },
      settingsRow: {
        flexDirection: 'row',         
        alignItems: 'center', 
        gap: 12,
      },
      settingsIcon: {
        marginHorizontal: 16,             
      },
      settingsLabel: {
        fontSize: 16,          
        fontWeight: '600',      
        color: '#333',        
        textAlign: 'center',    
      },
      adminCTABarContainer: {
        flexDirection: 'row',         
        alignItems: 'center',         
        justifyContent: 'center', 
        width: "90%",                
        marginHorizontal: "auto",   
        paddingVertical: 16,          
        paddingHorizontal: 24,         
        backgroundColor: '#fff',      
        borderRadius: 12,           
        shadowColor: '#000',         
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 2,
      },
      adminSettingsOptionContainer: {
        flexDirection: 'column',         
        justifyContent: 'center', 
        alignItems: 'center',  
        width: "45%",        
        padding: 16,                
        marginBottom: 12, 
        borderWidth: 0.5,         
        borderRadius: 100,           
        backgroundColor: 'white',  
        shadowColor: '#000',        
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,                  
      },
      footerContainer: {
        flexDirection: 'column',         
        alignItems: 'center',         
        justifyContent: 'center', 
        width: "100%", 
        height: "100%",               
        marginHorizontal: "auto",   
        paddingVertical: 10,          
        paddingHorizontal: 24,         
        backgroundColor: '#ccc',      
        borderTopEndRadius: 12,           
        shadowColor: '#000',         
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 2,
      },
      footerText:{
        fontSize: 20,
        margin: 10,
        textAlign: "center",
      },
      footerSubText:{
        fontSize: 15,
        fontFamily: "serif",
        textAlign: "center",
      }
})
