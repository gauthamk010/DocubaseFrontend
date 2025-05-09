//explore.tsx
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from 'axios'
import { getDeviceIP } from "@/utils/getIPAddress"
import React from "react";

interface SearchResult {
    _id: string;
    name: string;
    author: string;
    genre: string;
    description: string;
  }

export default function Explore() {
    const { query } = useLocalSearchParams();
    const [search, setSearch] = useState('');
    const [ baseURL, setBaseURL ] = useState('');
    const [results, setResults] =  useState<SearchResult[]>([]);

    useEffect(() => {
        if (query) {
            setSearch(String(query)); 
        }
    }, [query]);

      useEffect(() => {
        (async () => {
            const ip = await getDeviceIP();
            if (ip) {
                setBaseURL(`http://${ip}:7000`);
            }
        })();
        }, []);

        const handleSearch = async () => {
            try {
                const response = await axios.get(`${baseURL}/book`, {
                    params: { genre: search }
                });
                setResults(response.data);
            } catch (error) {
                console.error("Search failed:", error);
            }
        };
    
    return (
        <View style={{ flex: 1 }}>

            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchBar}
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity 
                    onPress={handleSearch}
                    style={styles.searchBtn}>
                        <Ionicons name="search" size={27} color={"white"} style={{alignSelf: "center"}} />
                </TouchableOpacity>
            </View>

            <Text style={styles.searchHeading}>Search Results</Text>
            <FlatList 
                data={results}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardText}>Author: {item.author}</Text>
                        <Text style={styles.cardText}>Genre: {item.genre}</Text>
                        <Text style={styles.cardText}>Description: {item.description}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />  
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "auto",
        padding: 20,
    },
    searchBtn:{
        flex: 1,
        padding: 7,
        marginLeft: 10,
        borderColor: "#000",
        borderWidth: 1.25,
        borderRadius: 100,
        backgroundColor: "midnightblue"
    },
    searchBar: {
        flex: 7,
        height: 45,
        borderRadius: 100,
        borderWidth: 1.75,
        borderColor: "gray",
        padding: 10,
    },
    searchHeading: {
        fontSize: 30,
        fontWeight: "800",
        textAlign: "center",
    },
    card:{
        backgroundColor: '#f2f2f2',
        padding: 15,
        margin: 10,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardText: {
        fontSize: 14,
        marginTop: 4
    }
});
