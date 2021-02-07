import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as fb from './firebaseConfig.js';

export default function App() {

  // // Example call to our firestore
  // useEffect(() => {
  //   let example = {
  //     breed: 'floof'
  //   };
  
  //   fb.DogRef.add(example).then(() => {
  //     alert("Dog Added!")
  //   }).catch( (err) => {
  //     alert("Dog not added!")
  //   });
  // }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Woof woof</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
