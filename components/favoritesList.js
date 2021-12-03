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

export default function FavoritesList(props) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  let displayText;
  if (props.coinList == "empty") {
    displayText = "Please select favorite from list page";
  } else {
    displayText = "";
  }
  const dataFetch = async () => {
    const response = await axiosApi.get("coins/markets", {
      params: {
        vs_currency: "usd",
        ids: props.coinList,
      },
    });
    console.log(response.data);
    setCoins(response.data);
    setLoading(false);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
          <Image
        style={styles.image}
        source={{uri: item.image}}
      />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.current_price}</Text>
      <Text style={styles.itemPercentChange}>{item.price_change_24h}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
        {displayText}
      </Text>
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
    width: "20%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    alignSelf: "center",
    marginRight: 35,
    fontWeight: 'bold'
  },
  itemPrice: {
    paddingTop: 25,
    width: "18%",
    height: 50,
    marginBottom: 20,
    fontSize: 15,
    textAlign: "center",
    marginRight: 20
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
    borderWidth: 0.2,
    borderColor: "#3A3B3C",
    marginBottom: 4,
    borderRadius: 5
  },
  refreshIcon: {
    alignSelf: "center",
    paddingBottom: 20,
  },
  image: {
    height: 48,
    width: 48,
    marginRight: 5,
    marginLeft: 10
  }
});
