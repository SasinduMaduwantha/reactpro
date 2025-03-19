import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/scback1.png')} style={styles.backgroundImage} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        
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
        
        <TouchableOpacity onPress={() => alert('Forgot Password Pressed')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => alert('Login Pressed')}>
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
  backgroundImage: { position: 'absolute', width: '100%', height: '100%' },
  formContainer: { width: '80%', padding: 20, borderRadius: 10 },
  title: { fontSize: 35, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  forgotPassword: { color: 'blue', textAlign: 'right', marginBottom: 20 },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  signUp: { textAlign: 'center', color: 'blue', marginTop: 20 },
});
