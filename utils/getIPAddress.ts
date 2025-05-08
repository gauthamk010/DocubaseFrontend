// utils/ip.ts
import * as Network from 'expo-network';

export const getDeviceIP = async (): Promise<string | null> => {
  try {
    const ip = await Network.getIpAddressAsync();
    return ip;
  } 
  catch (err) {
    console.log('Failed to get IP address:', err);
    return null;
  }
};
