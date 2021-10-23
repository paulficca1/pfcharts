import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, Alert} from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';

export default function Register( { navigation } ) {
  return (
    <Background>
      <Logo/>
      <TextInput placeholder=" User Name" placeholderTextColor='#91DFFF' style={styles.input} />
      <TextInput placeholder=" Password" placeholderTextColor='#91DFFF'style={styles.input} />
      <Button title="Register" onPress={() => navigation.navigate('Home')}></Button>
      <Text>Enter your username and password to register.</Text> 
      <StatusBar style="auto" />
   
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: "#91DFFF",
    borderRadius: 5,
    marginTop: 10 
    
  }
});
