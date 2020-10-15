import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OrphanageDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orphanage Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000'
  }
});
