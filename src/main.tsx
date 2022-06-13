import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const main = () => {
  return (
    <View style={styles.text}>
      <Text>React Native Web On-Demand-Rides-Deliveries Sample App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: 'auto',
    alignItems: 'center',
  }
});

export default main;
