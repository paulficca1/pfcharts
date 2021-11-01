import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';


export default function Home({route, navigation}) {
  if (route.params){
    const { coinId } = route.params;
    console.log(coinId)
  }
  



  return (
    <Background>
      <Logo/>
      <Text>Home</Text>
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
