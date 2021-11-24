import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Alert } from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register( { navigation } ) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const setData = async () => {
    if (userName.length == 0 || password.length == 0) {
        Alert.alert('Error', 'Please enter a username and password')
    } else {
        try {
            var user = {
                Username: userName,
                Password: password
            }
            await AsyncStorage.setItem('UserData', JSON.stringify(user));
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }
}

  return (
    <Background>
      <Logo/>
      <TextInput autoCorrect={false} autoCapitalize={'none'} placeholder=" User Name" placeholderTextColor='#91DFFF' style={styles.input} onChangeText={(value) => {setUserName(value); console.log(userName)}}/>
      <TextInput autoCorrect={false} secureTextEntry={true} autoCapitalize={'none'} placeholder=" Password" placeholderTextColor='#91DFFF'style={styles.input} onChangeText={(value) => setPassword(value)}/>
      <Button title="Register" onPress={setData}></Button>
      <Text>Enter your username and password to register.</Text> 
   
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
