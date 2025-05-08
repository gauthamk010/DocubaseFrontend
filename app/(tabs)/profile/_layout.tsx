//layout.tsx
import AuthProvider from "@/context/authcontext";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
    return(
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}/>
        </AuthProvider>
    ) 
}
