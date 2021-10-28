import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import Background from '../components/background';
import FavoritesList from '../components/favoritesList';

export default function List({ route, navigation }) {
  const { oItem } = route.params;
  console.log("test:" +oItem)
  const [favorites, setFavorites] = useState(oItem);
  useEffect(() => {
    setFavorites(favorites.concat(oItem))
  }, []);
  // setFavorites("test2");
 
  return (
    <Background>
      <SafeAreaView>  
      <Text>{favorites}</Text>
      < FavoritesList navigation={navigation} />
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
