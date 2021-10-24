import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Button,
} from "react-native";
import axiosApi from "../data/axios";

export default function CoinList(props) {
  const [coins, setCoins] = useState([]);

  const dataFetch = async () => {
    const response = await axiosApi.get("coins/markets", {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum,tether,cardano,solana,dodgecoin,shibainu,terra,uniswap,litecoin,cosmos,polygon,filecoin,tron,tezos",
      },
    });
    console.log(response.data);
    setCoins(response.data);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.current_price}</Text>
      <Text style={styles.itemPercentChange}>{item.ath_change_percentage}</Text>
      <Ionicons name="heart" size={30} color="blue" onPress={() => {
          props.navigation.navigate("Favorites", { oItem: item.name });
        }}/>
    </TouchableOpacity>
  );

  return (
    <View>
      <Ionicons style={styles.refreshIcon}name="refresh" size={30} color="#560CCE" onPress={() => {dataFetch()}}/>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={coins}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemName: {
    paddingTop: 25,
    width: "32%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    alignSelf: "center",
  },
  itemPrice: {
    paddingTop: 25,
    width: "35%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    textAlign: "center",
  },
  itemPercentChange: {
    paddingTop: 25,
    width: "20%",
    height: 50,
    fontSize: 15,
    marginBottom: 20,
    marginRight: 10,
    textAlign: "right",
    color: "green",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#91DFFF",
  },
  refreshIcon: {
      alignSelf: 'center',
      paddingBottom: 20
  }
});
