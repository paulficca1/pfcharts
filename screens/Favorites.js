import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import Background from '../components/background';
import FavoritesList from '../components/favoritesList';

export default function List({ route, navigation }) {
  const { oItem } = route.params;
  const [favorites, setFavorites] = useState(oItem);
  if (favorites !== oItem){
    setFavorites(oItem)
  }
  // setFavorites(oItem)
  // setFavorites("test2");
 
  return (
    <Background>
      <SafeAreaView> 
      < FavoritesList navigation={navigation} coinList={favorites}/>
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
