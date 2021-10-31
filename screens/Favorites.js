import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import Background from '../components/background';
import FavoritesList from '../components/favoritesList';

export default function List({ route, navigation }) {
  const { oItem } = route.params;

 
  return (
    <Background>
      <SafeAreaView> 
      < FavoritesList navigation={navigation} coinList={oItem}/>
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
