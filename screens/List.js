import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';
import CoinList from '../components/coinList';

export default function List({ navigation , parentFunction}, props) {

 
  return (
    <Background>
      <SafeAreaView>  
      < CoinList navigation={navigation} parentFunction={parentFunction}/>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff'
  },
});
