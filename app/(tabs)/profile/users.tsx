import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, FlatList, Image } from "react-native";
import { getDeviceIP } from "@/utils/getIPAddress";

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    roles: string[];
}

export default function Users() {
    const [ baseURL, setBaseURL ] = useState('');
    const [ users, setUsers ] = useState<User[]>([])

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
            await axios.get(`${baseURL}/user/all`)
                .then((response) => {
                    setUsers(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [users])

    return(
        <View>
            <FlatList 
                data={users} 
                keyExtractor={(item) => item._id}
                renderItem={({item}) => {
                    return(
                        <View>
                            <Image 
                                source={{uri: item.image}} 
                                style={{width: 50, height: 50}}
                            />
                            <Text>{item.name}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.phone}</Text>
                            <Text>{item.roles}</Text>
                        </View>
                    )
                }}
                ItemSeparatorComponent={() => <View style={{height: 10,}} />}           
            />
        </View>
    )
}