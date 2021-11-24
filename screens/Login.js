import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login( { navigation } ) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

//   useEffect(() => {
//     getData();
// }, []);

const evaluateLoginData = () => {
    try {
        AsyncStorage.getItem('UserData')
            .then(value => {
                if (value != null) {
                  const savedUserName = value.split('"')[3]
                  const savedPassword = value.split('"')[7]
                  if (savedUserName !== userName){
                    Alert.alert('Incorrect password')
                  }else if (savedPassword !== password){
                    Alert.alert('Incorrect username')
                  }else{
                    navigation.navigate('Main')
                  }

                }else {
                  Alert.alert('No user data found, please register first.')
                }
            })
    } catch (error) {
        console.log(error);
    }
}




  return (
    <Background>
      <Logo/>
      <TextInput autoCorrect={false} autoCapitalize={'none'} placeholder=" User Name" placeholderTextColor='#91DFFF' style={styles.input} onChangeText={(value) => setUserName(value)}/>
      <TextInput autoCorrect={false} secureTextEntry={true} autoCapitalize={'none'} placeholder=" Password" placeholderTextColor='#91DFFF'style={styles.input} onChangeText={(value) => setPassword(value)}/>
      <Button title="SIGN IN" onPress={() => evaluateLoginData()}></Button>
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
