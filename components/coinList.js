import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Button,
  Image,
} from "react-native";
import axiosApi from "../data/axios";
import Background from "./background";

export default function CoinList(props) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState("");

  const faveNavFunction = async (paramName) => {
    if (favorites == "") {
      setFavorites(paramName);
    } else {
      setFavorites(favorites.concat("," + paramName));
    }
    alert(paramName + " has been added to favorites.");
  };
  // newColor = {}
  // handleColor = (iVal) => {
  //   let sVal = iVal.toString();
  //   if (sVal.startsWith('-')){
  //     newColor.color = 'red'
  //     return sVal
  //   }else {
  //     newColor.color = 'green'
  //     return sVal
  //   }
  // }

  const dataFetch = async () => {
    const response = await axiosApi.get("coins/markets", {
      params: {
        vs_currency: "usd",
        ids: "",
      },
    });
    setCoins(response.data);
    setLoading(false);
  };

  useEffect(() => {
    dataFetch();
  }, []);
  useEffect(() => {
    if (favorites !== "") {
      props.navigation.navigate("Favorites", { oItem: favorites });
    }
  }, [favorites]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        props.navigation.navigate("Home", {
          coinParam: item.id,
          imageUrl: item.image,
          currentPrice: item.current_price,
          name: item.name,
          capRank: item.market_cap_rank,
          priceChange: item.price_change_24h,
        });
      }}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.current_price}</Text>
      <Text style={styles.itemPercentChange}>{item.price_change_24h}</Text>
      <Ionicons
        style={{ marginRight: 30 }}
        name="heart"
        size={30}
        color="purple"
        onPress={() => {
          faveNavFunction(item.id);
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={coins}
        onRefresh={() => {
          dataFetch();
        }}
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
  itemName: {
    paddingTop: 25,
    width: "26%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
  },
  itemPrice: {
    paddingTop: 25,
    width: "18%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    textAlign: "center",
  },
  itemPercentChange: {
    paddingTop: 25,
    width: "25%",
    height: 50,
    fontSize: 15,
    marginBottom: 20,
    marginRight: 14,
    textAlign: "right",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#3A3B3C",
    marginBottom: 4,
    borderRadius: 5,
  },
  favoritesIcon: {
    marginRight: 20,
  },
  image: {
    height: 48,
    width: 48,
    marginRight: 10,
    marginLeft: 10,
  },
});
