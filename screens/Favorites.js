import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import Background from '../components/background';
import FavoritesList from '../components/favoritesList';

export default function List({ route, navigation }) {
  return (
    <Background>
      <SafeAreaView> 
        
          < FavoritesList navigation={navigation} coinList={route.params ? route.params.oItem : "empty"}/>
      
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
