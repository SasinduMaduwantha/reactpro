import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker correctly
import { useRouter } from 'expo-router';

export default function RegistrationScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [employeeNo, setEmployeeNo] = useState('');
  const [jobType, setJobType] = useState('Seller');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');

  // Clear input fields function
  const clearFields = () => {
    setName('');
    setEmployeeNo('');
    setJobType('');
    setEmail('');
    setContactNo('');
  };

  // Function to handle Next button click
  const handleNext = () => {
    if (!name || !employeeNo || !jobType || !email || !contactNo) {
      Alert.alert('Error', 'Please fill out all fields.', [{ text: 'OK' }]);
    } else {
      // All fields are filled, navigate to setpassword screen
      router.push('/setpassword');
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/scback1.png')} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Employee No" value={employeeNo} onChangeText={setEmployeeNo} />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Job Type:</Text>
          <Picker selectedValue={jobType} onValueChange={(itemValue) => setJobType(itemValue)} style={styles.picker}>
            <Picker.Item label="Seller" value="Seller" />
            <Picker.Item label="Deliverer" value="Deliverer" />
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Contact No" value={contactNo} onChangeText={setContactNo} keyboardType="phone-pad" />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
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
  pickerContainer: { marginBottom: 10 },
  pickerLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  picker: { width: '100%' },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 16 },
  clearButton: { backgroundColor: 'white', padding: 10, borderWidth: 1, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  clearButtonText: { color: 'black', fontSize: 16 },
  signInContainer: { alignItems: 'center' },
  signIn: { textAlign: 'center', color: 'blue', marginTop: 20 },
});
