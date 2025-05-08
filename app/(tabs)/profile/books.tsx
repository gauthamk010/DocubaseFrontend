import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from "react-native";
import { getDeviceIP } from "@/utils/getIPAddress";

interface Book {
    _id: string;
    name: string;
    author: string;
    genre: string;
    description: string;
    coverImagePath: string;
    textFilePath: string;
}

export default function Books() {
    const [ baseURL, setBaseURL ] = useState('');
    const [ Books, setBooks ] = useState<Book[]>([])

    useEffect(() => {
            (async () => {
                const ip = await getDeviceIP();
                if (ip) {
                    setBaseURL(`http://${ip}:7000`);
                }
            })();
            }, []);

    useEffect(() => {
        async() => {        
            await axios.get(`${baseURL}/book/all`)
                .then((response) => {
                    setBooks(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [Books])

    return(
        <View>
            <FlatList 
                data={Books} 
                keyExtractor={(item) => item._id}
                renderItem={({item}) => {
                    return(
                        <View>
                            <Pressable onPress={() => {}}>
                                <Image 
                                    source={{uri: item.coverImagePath}} 
                                    style={{width: 50, height: 50}}
                                />
                            </Pressable>
                            <Text>{item.name}</Text>
                            <Text>{item.genre}</Text>
                            <Text>{item.description}</Text>
                            <TouchableOpacity 
                                style={{width: 50, height: 50, backgroundColor: 'blue'}} 
                                onPress={() => {}}>
                                <Text>Read</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                ItemSeparatorComponent={() => <View style={{height: 10,}} />}           
            />
        </View>
    )
}