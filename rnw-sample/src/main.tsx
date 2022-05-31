import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const main = () => {
  return (
    <View style={styles.text}>
      <Text>RNW App</Text>
    </View>
)};

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    top: 30,
    alignItems: "center",
  }
});

export default main;
