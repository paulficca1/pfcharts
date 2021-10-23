import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';


export default function Login( { navigation } ) {
  return (
    <Background>
      <Logo/>
      <TextInput placeholder=" User Name" placeholderTextColor='#91DFFF' style={styles.input} />
      <TextInput placeholder=" Password" placeholderTextColor='#91DFFF'style={styles.input} />
      <Button title="SIGN IN" onPress={() => navigation.navigate('Main')}></Button>
      <Text>Enter your username and password to login.</Text>
      <Text>Not a member?.</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
      </TouchableOpacity>
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
