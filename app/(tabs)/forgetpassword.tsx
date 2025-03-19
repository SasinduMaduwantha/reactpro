import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [employeeNumber, setEmployeeNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Function to send OTP (you need to implement OTP sending logic)
  const sendOtp = () => {
    if (!employeeNumber) {
      Alert.alert('Error', 'Please enter your employee number.');
      return;
    }

    // Add OTP sending logic here (e.g., Firebase or API)
    Alert.alert('OTP Sent', 'An OTP has been sent to your registered phone/email.');
  };

  // Function to handle password reset
  const handleResetPassword = () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP sent to you.');
      return;
    }
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please enter both new password and confirm password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Add password reset logic here (e.g., Firebase or API)
    Alert.alert('Success', 'Your password has been successfully reset.');
    router.push('/');
  };

  return (
    <ImageBackground source={require('@/assets/images/scback1.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>

        {/* Employee Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Employee Number"
          value={employeeNumber}
          onChangeText={setEmployeeNumber}
          keyboardType="numeric"
        />

        {/* Send OTP Button */}
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        {/* OTP Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />

        {/* New Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        {/* Confirm Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for the form
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
  
});
