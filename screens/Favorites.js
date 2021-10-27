import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList} from 'react-native';
import Background from '../components/background';
import Button from '../components/appButton';
import Logo from '../components/logo';
import axiosApi from "../data/axios";


export default function Favorites({ route }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false)

  const { oItem } = route.params;
  Alert.alert(oItem + " added to favorites!")
  const [FavoriteCoins, setFavoriteCoins] = useState([oItem].concat(FavoriteCoins));

  const dataFetch = async () => {
    
    const response = await axiosApi.get("coins/markets", {
      params: {
        vs_currency: "usd",
        ids: FavoriteCoins,
      },
    });
    console.log(response.data);
    setCoins(response.data);
    setLoading(false)
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.current_price}</Text>
      <Text style={styles.itemPercentChange}>{item.ath_change_percentage}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={coins}
        onRefresh={() => {dataFetch()}}
        refreshing={loading}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
