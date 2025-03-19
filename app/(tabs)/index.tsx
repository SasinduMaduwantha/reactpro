import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import * as Crypto from 'expo-crypto';  // Import expo-crypto for hashing
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hash the password entered by the user
  const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hashedPassword;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      // Hash the entered password
      const hashedPassword = await hashPassword(password);

      // Query Firestore to get the user with the matching email
      const q = query(collection(db, 'Authentication'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Error', 'Incorrect password or email.'); // email finding
        return;
      }

      const userDoc = querySnapshot.docs[0].data(); // Get user data from Firestore

      // Compare the hashed passwords
      if (userDoc.passwordHash === hashedPassword) {
        // Store email in AsyncStorage after successful login
        await AsyncStorage.setItem('userEmail', email); 

        router.push('/dashboard'); // Navigate to dashboard after successful login
      } else {
        Alert.alert('Error', 'Incorrect password or email.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/scback1.png')} style={styles.backgroundImage} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity onPress={() => router.push('/forgetpassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/explore')}>
          <Text style={styles.signUp}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' },
  formContainer: { width: '80%', padding: 20, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  title: { fontSize: 35, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  forgotPassword: { color: 'blue', textAlign: 'right', marginBottom: 20 },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  signUp: { textAlign: 'center', color: 'blue', marginTop: 20 },
});
