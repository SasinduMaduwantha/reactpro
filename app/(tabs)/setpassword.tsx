import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Crypto from 'expo-crypto';  // Import expo-crypto for hashing
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

export default function SetPasswordScreen() {
  const router = useRouter();
  const { email: passedEmail } = useLocalSearchParams(); // Get email from RegistrationScreen

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Set the email when the component mounts
  useEffect(() => {
    if (passedEmail) {
      setEmail(Array.isArray(passedEmail) ? passedEmail[0] : passedEmail);
    }
  }, [passedEmail]);

  // Prevent the email field from being edited
  const handleEmailChange = () => {
    Alert.alert("Email Locked", "You cannot change the email address.", [{ text: "OK" }]);
  };

  // Password validation function
  const validatePassword = (password: string): string | null => {
    const minLength = /.{8,}/; // Minimum 8 characters
    const upperCase = /[A-Z]/; // At least one uppercase letter
    const lowerCase = /[a-z]/; // At least one lowercase letter
    const number = /[0-9]/; // At least one number
    const specialChar = /[!@#$%^&*]/; // At least one special character

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters long.";
    } else if (!upperCase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!lowerCase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!number.test(password)) {
      return "Password must contain at least one number.";
    } else if (!specialChar.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*).";
    }
    return null; // Password is valid
  };

  // Hash the password using expo-crypto
  const hashPassword = async (password: string) => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hashedPassword;
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.', [{ text: 'OK' }]);
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.', [{ text: 'OK' }]);
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        Alert.alert('Weak Password', passwordError, [{ text: 'OK' }]);
        return;
      }

      try {
        // Hash the password before storing it
        const hashedPassword = await hashPassword(password);

        // Store user authentication data in Firestore (No plain-text password storage!)
        await addDoc(collection(db, "Authentication"), {
          email: email,
          passwordHash: hashedPassword, // Store the hashed password
          createdAt: new Date(),
        });

        Alert.alert('Success', 'Password set successfully! You can now sign in.');
        router.push('/'); // Redirect to login screen
      } catch (error) {
        console.error("Error saving password:", error);
        Alert.alert('Error', 'Failed to save data. Please try again.', [{ text: 'OK' }]);
      }
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/scback1.png')} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Set Up Password</Text>

        {/* Email Field (Read-Only) */}
        <TextInput
          style={[styles.input, styles.disabledInput]}
          placeholder="Email"
          value={email}
          editable={false} // Make it read-only
          onFocus={handleEmailChange} // Prevent user from editing
        />

        {/* Password Field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password Field */}
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => router.push('/')} style={styles.signInContainer}>
          <Text style={styles.signIn}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  formContainer: { backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 20, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  disabledInput: { backgroundColor: '#e0e0e0' }, // Grey out email field
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 16 },
  signInContainer: { alignItems: 'center' },
  signIn: { textAlign: 'center', color: 'blue', marginTop: 20 },
});
