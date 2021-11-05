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
  Image
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
        props.navigation.navigate("Home", { coinParam: item.id, imageUrl: item.image});
      }}
    >
      <Image
        style={styles.image}
        source={{uri: item.image}}
      />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.current_price}</Text>
      <Text style={styles.itemPercentChange}>{item.ath_change_percentage}</Text>
      <Ionicons
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
    fontWeight: 'bold'
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
    width: "28%",
    height: 50,
    fontSize: 15,
    marginBottom: 20,
    marginRight: 14,
    textAlign: "right"
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
  image: {
    height: 48,
    width: 48,
    marginRight: 10
  }
});
