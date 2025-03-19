import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function SetPasswordScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Clear input fields function
  const clearFields = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  // Handle Register button click
  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.', [{ text: 'OK' }]);
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.', [{ text: 'OK' }]);
    } else {
      // Proceed with registration logic, e.g., saving user data
      Alert.alert('Success', 'Registration completed successfully!');
      // Navigate to the login screen after registration
      router.push('/');
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/scback1.png')} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Set Up Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearFields} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>

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
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 16 },
  clearButton: { backgroundColor: 'white', padding: 10, borderWidth: 1, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  clearButtonText: { color: 'black', fontSize: 16 },
  signInContainer: { alignItems: 'center' },
  signIn: { textAlign: 'center', color: 'blue', marginTop: 20 },
});
