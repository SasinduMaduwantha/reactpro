import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDocs, query, collection, where, getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const firebaseConfig = {
  apiKey: "AIzaSyDJk8U5Hr8CMwI0Mgr45LHsk2IQqEiPeOw",
  authDomain: "exapp-c6ee7.firebaseapp.com",
  projectId: "exapp-c6ee7",
  storageBucket: "exapp-c6ee7.firebasestorage.app",
  messagingSenderId: "95563416478",
  appId: "1:95563416478:web:6c08202411d43a5869cc8f",
  measurementId: "G-KT01GYD4QV"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Delivery {
  billNo: string;
  shopName: string;
  ownerName: string;
  contactNo: string;
  address: string;
  latitude: number;
  longitude: number;
}

const DeliveriesScreen = () => {
  const [deliveryData, setDeliveryData] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
        setLoading(true);
        try {
          const empNo = await AsyncStorage.getItem('employeeNo');
          console.log('Fetched employeeNo from AsyncStorage:', empNo);
      
          if (!empNo) {
            console.warn('Employee number not found in AsyncStorage');
            setLoading(false);
            return;
          }

          // Log query for debugging
          console.log(`Querying 'assignedDeliveries' for employee number: ${empNo}`);
      
          const deliveryQuery = query(
            collection(db, 'assignedDeliveries'),
            where('deliverEmpNo', '==', empNo)
          );
          const deliverySnapshot = await getDocs(deliveryQuery);
      
          // Log fetched documents for debugging
          console.log('Fetched deliveries snapshot:', deliverySnapshot.docs);
      
          const results: Delivery[] = [];
      
          // Iterate over the documents in the snapshot
          for (const doc of deliverySnapshot.docs) {
            const data = doc.data();
            const billNos = data.billNos;
      
            if (billNos && Array.isArray(billNos)) {
              for (const billNo of billNos) {
                const invoiceQuery = query(
                  collection(db, 'assignedInvoices'),
                  where('billNo', '==', billNo)
                );
                const invoiceSnapshot = await getDocs(invoiceQuery);
                if (!invoiceSnapshot.empty) {
                  const invoiceData = invoiceSnapshot.docs[0].data();
                  const shopName = invoiceData.shopName;
      
                  const shopQuery = query(
                    collection(db, 'shops'),
                    where('shopName', '==', shopName)
                  );
                  const shopSnapshot = await getDocs(shopQuery);
                  if (!shopSnapshot.empty) {
                    const shopData = shopSnapshot.docs[0].data();
                    results.push({
                      billNo,
                      shopName,
                      ownerName: shopData.ownerName || 'N/A',
                      contactNo: shopData.contactNo || 'N/A',
                      address: shopData.address || 'N/A',
                      latitude: shopData.latitude || 0, // assuming latitude is stored in Firestore
                      longitude: shopData.longitude || 0, // assuming longitude is stored in Firestore
                    });
                  }
                }
              }
            }
          }
      
          setDeliveryData(results);
        } catch (error) {
          console.error('Error fetching deliveries:', error);
        } finally {
          setLoading(false);
        }
      };
    fetchDeliveries();
  }, []);

  const showLocation = (latitude: number, longitude: number) => {
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Assigned Deliveries</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : deliveryData.length === 0 ? (
        <Text>No deliveries assigned.</Text>
      ) : (
        deliveryData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text><Text style={styles.label}>Bill No:</Text> {item.billNo}</Text>
            <Text><Text style={styles.label}>Shop Name:</Text> {item.shopName}</Text>
            <Text><Text style={styles.label}>Owner:</Text> {item.ownerName}</Text>
            <Text><Text style={styles.label}>Contact:</Text> {item.contactNo}</Text>
            <Text><Text style={styles.label}>Address:</Text> {item.address}</Text>
            <Button 
              title="Show Location" 
              onPress={() => showLocation(item.latitude, item.longitude)} 
            />
          </View>
        ))
      )}
      {selectedLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={selectedLocation} />
        </MapView>
      )}
    </ScrollView>
  );
};

export default DeliveriesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
  },
  map: {
    height: 300,
    marginTop: 20,
  },
});
