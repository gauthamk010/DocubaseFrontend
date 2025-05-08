//home.tsx
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';

export default function Home() {
    const router = useRouter();

    const genres = [
        { name: 'Web Development', icon: <Ionicons name="code" size={25} /> },
        { name: 'Mobile Development', icon: <FontAwesome name="mobile-phone" size={25} /> },
        { name: 'Machine Learning', icon: <FontAwesome name='mixcloud' size={25} />},
        { name: 'Cloud Computing', icon: <MaterialIcons name='cloud' size={25} /> },         
        { name: 'Cyber Security', icon: <FontAwesome name='shield' size={25} /> },   
        { name: 'Data Analytics', icon: <FontAwesome name="bar-chart" size={25} /> },                    
        { name: 'Digital Circuit Design', icon: <FontAwesome name='microchip' size={24}/> },           
        { name: 'Signal Processing', icon:<MaterialIcons name='waves' size={25} /> },
        { name: 'Mathematics', icon:<MaterialIcons name='calculate' size={25} /> }, 
        { name: 'Search Engine Optimization', icon: <MaterialIcons name='saved-search' size={25} /> },   
      ];

    return (
        <View style={{ flex: 1 }}>
            {/* Greeting Box */}
            <View style={styles.greetContainer}>
                <ImageBackground
                    source={require('@assets/images/homepage.jpg')}
                    style={styles.greetImage}
                    resizeMode='cover'
                    imageStyle={{ alignSelf: 'flex-start' }} 
                >
                    <View style={styles.overlay}>
                        <Text style={styles.greetText}> Welcome!</Text>
                        <Text style={styles.greetSubText}>Your learning experience starts here</Text>
                    </View>
                </ImageBackground>
            </View>
            {/* Genres */}
            <View style={styles.readContainer}>

                <Text style={styles.readHeading}>Genres</Text>
                <Text style={styles.readSubHeading}>Choice is yours</Text>

                {/* List of Genres */}
                <ScrollView>
                    <View style={styles.gridContainer}>
                        {genres.map((genre, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.genreContainer}
                                onPress={() => router.push({ 
                                    pathname: '/(tabs)/explore', 
                                    params: { query: genre.name } 
                                })}
                            >
                                <Text style={styles.genreText}>{genre.name}</Text>
                                <Text>{genre.icon}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                       
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    greetContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: "auto",
        width: "90%",
        borderRadius: 10,
        overflow: 'hidden'
    },
    greetImage: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
    },
    greetText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    greetSubText: {
        color: "white",
        fontSize: 15,
        textAlign: "center"
    },
    readContainer: {
        flex: 3,
        marginHorizontal: "auto",
        height: 50,
        width: "90%",
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: "#fff"
    },
    readHeading: {
        fontSize: 35,
        fontWeight: "bold",
        marginHorizontal: 5,
        padding: 5,
        textAlign: "center",
    },
    readSubHeading: {
        fontSize: 12.5,
        marginHorizontal: 10,
        paddingBottom: 5,
        color:"darkgray",
        textAlign: "center",
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",                   
        justifyContent: 'space-around', 
        padding: 16,         
      },
    genreContainer: {
        width: '45%', 
        backgroundColor: 'white',  
        borderColor: "darkgray",
        borderWidth: 2,
        borderRadius: 8,            
        paddingVertical: 12, 
        paddingHorizontal: 10,       
        alignItems: 'center',       
        marginBottom: 16,         
        shadowColor: '#000',        
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,                  
      },
    genreText: {
        alignSelf: 'center',
        fontSize: 16,                 
        fontWeight: '800',         
        color: '#333',         
      },
})
