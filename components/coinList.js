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
} from "react-native";
import axiosApi from "../data/axios";

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
        props.navigation.navigate("Home", { coinId: item.id });
      }}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.current_price}</Text>
      <Text style={styles.itemPercentChange}>{item.ath_change_percentage}</Text>
      <Ionicons
        name="heart"
        size={30}
        color="blue"
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
    width: "30%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    alignSelf: "center",
  },
  itemPrice: {
    paddingTop: 25,
    width: "30%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    textAlign: "center",
  },
  itemPercentChange: {
    paddingTop: 25,
    width: "30%",
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
    alignSelf: "center",
    paddingBottom: 20,
  },
});
