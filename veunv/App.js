import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Modal, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";

const App = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [modalVisible, setModalVisible] = useState(true);

  // Request user location permission and fetch current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:3000/search", {
        latitude: region.latitude,
        longitude: region.longitude,
      });
      setDrivers(response.data);
      setModalVisible(false);
    } catch (error) {
      console.error("Error fetching drivers", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Location Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Destination</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your destination..."
              value={destination}
              onChangeText={setDestination}
            />
            <Button title="Find Drivers" onPress={handleSearch} />
          </View>
        </View>
      </Modal>

      {/* Map */}
      <MapView style={styles.map} region={region}>
        {/* Marker for User Location */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You"
            pinColor="blue"
          />
        )}

        {/* Markers for Drivers */}
        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.latitude,
              longitude: driver.longitude,
            }}
            title={driver.name}
            description={`Price: ${driver.price}`}
          />
        ))}
      </MapView>

      {/* Drivers List */}
      <View style={styles.driversList}>
        {drivers.map((driver) => (
          <View key={driver.id} style={styles.driverCard}>
            <Text>{driver.name}</Text>
            <Text>Price: {driver.price}</Text>
            <Button title="Request" onPress={() => Alert.alert("Request Sent")} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  driversList: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  driverCard: {
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default App;
