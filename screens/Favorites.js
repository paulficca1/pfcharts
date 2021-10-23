import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';


export default function Favorites({ route }) {

  const { oItem } = route.params;
  Alert.alert(oItem + " added to favorites!")
  return (
    <Background>
      <Logo/>
      <Text>{oItem}</Text>
      <StatusBar style="auto" />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
