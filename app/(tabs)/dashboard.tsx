import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJk8U5Hr8CMwI0Mgr45LHsk2IQqEiPeOw",
  authDomain: "exapp-c6ee7.firebaseapp.com",
  projectId: "exapp-c6ee7",
  storageBucket: "exapp-c6ee7.firebasestorage.app",
  messagingSenderId: "95563416478",
  appId: "1:95563416478:web:6c08202411d43a5869cc8f",
  measurementId: "G-KT01GYD4QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function DashboardScreen() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        console.log("Retrieved Email from AsyncStorage:", userEmail);
        
        if (userEmail) {
          const q = query(collection(db, 'users'), where('email', '==', userEmail));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            console.log("Fetched User Data:", userData);
            setUserName(userData.name || "Unknown User");
          } else {
            console.log("No user found for this email");
          }
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    
    fetchUserName();
  }, []); 
  

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem('userEmail');
          router.replace('/'); // Redirect to login screen
        },
      },
    ], { cancelable: true });
  };

  return (
    <View style={styles.container}>
      {sidebarVisible && (
        <View style={styles.sidebarLayer}>
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => setSidebarVisible(false)} style={styles.closeButton}>
              <Entypo name="cross" size={30} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Manage Profile Clicked')} style={styles.sidebarItem}>
              <Entypo name="user" size={24} color="darkblue" style={styles.icon} />
              <Text style={styles.sidebarText}>Manage Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.sidebarItem}>
              <Entypo name="back" size={24} color="darkblue" style={styles.icon} />
              <Text style={styles.sidebarText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Entypo name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        
        <View style={styles.profileContainer}>
          <Image source={require('@/assets/images/user.png')} style={styles.profileImage} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>

      {!sidebarVisible && (
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => alert('Add Shop Clicked')}>
            <Image source={require('@/assets/images/store.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Add Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => alert('Check Stock Clicked')}>
            <Image source={require('@/assets/images/stock.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Check Stock</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => alert('Place Order Clicked')}>
            <Image source={require('@/assets/images/order.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  sidebarLayer: { position: 'absolute', top: 90, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(59, 55, 55, 0.22)', justifyContent: 'flex-start' },
  sidebar: { width: 220, backgroundColor: 'white', padding: 20, elevation: 5, height: '100%' },
  closeButton: { alignSelf: 'flex-end', marginBottom: 25, marginTop:30 },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  sidebarText: { fontSize: 18, color: 'darkblue', fontWeight: 'bold', marginLeft: 10 },
  icon: { marginRight: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30, backgroundColor: 'blue' },
  headerTitle: { fontSize: 24, color: 'white', fontWeight: 'bold' },
  profileContainer: { alignItems: 'center' },
  profileImage: { width: 40, height: 40, borderRadius: 20 , marginTop: 5 },
  userName: { color: 'white', fontSize: 10, marginTop: 5 },
  cardContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  card: { backgroundColor: 'white', padding: 20, alignItems: 'center', borderRadius: 10, elevation: 3 },
  cardImage: { width: 70, height: 70, marginBottom: 10 },
  cardText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});
