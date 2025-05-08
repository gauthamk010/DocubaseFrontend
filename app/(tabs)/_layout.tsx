//layout.tsx
import React from 'react'
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons'
import AuthProvider from '@/context/authcontext';

export default function TabsLayout() {
    return( 
      <AuthProvider>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#cfc',
                tabBarInactiveTintColor: '#010',
                tabBarStyle: {
                backgroundColor: '#ff8f50' ,
                borderTopWidth: 0.75,
                borderTopColor: '#374151',
                height: 60,
                },
                tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />
                }}
            />
            <Tabs.Screen
            name="explore"
            options={{
              title: 'Explore',
              tabBarLabel: 'Explore',
              tabBarIcon: ({ color }) => <Ionicons name="archive" color={color} size={24} />
            }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
                tabBarLabel: 'My Profile',
                tabBarIcon: ({ color }) => <Ionicons name="person" color={color} size={24} />
              }}  
            />
        </Tabs>
      </AuthProvider>
  )
}
