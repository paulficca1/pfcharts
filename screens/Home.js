import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import Background from "../components/background";
import Button from "../components/appButton";
import Logo from "../components/logo";
import { Dimensions } from "react-native";
import axiosApi from "../data/axios";
import {
  SlideAreaChart,
  SlideBarChart,
  SlideBarChartProps,
  SlideAreaChartProps,
  YAxisProps,
  XAxisProps,
  XAxisLabelAlignment,
  YAxisLabelAlignment,
  CursorProps,
  ToolTipProps,
  ToolTipTextRenderersInput,
  GradientProps,
} from "@connectedcars/react-native-slide-charts";
import { SafeAreaView } from "react-native-safe-area-context";

export const { width: SIZE } = Dimensions.get("window");

export default function Home({ route, navigation }) {
  let bitcoinUrl = "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579";
  const [chartData, setChartData] = useState([]);
  const [coinId, setCoinId] = useState("bitcoin");
  const [imageUrl, serImageUrl] = useState("");
  const [days, setDays] = useState("30");
  const [currentPrice, setCurrentPrice] = useState("");
  const [name, setName] = useState("");
  const [capRank, setCapRank] = useState("");
  const [priceChange, setPriceChange] = useState("");
  if (route.params) {
    const { coinParam, imageUrl, currentPrice, name, capRank, priceChange} = route.params;
    if (coinParam != coinId) {
      setCoinId(coinParam);
      serImageUrl(imageUrl);
      setCurrentPrice(currentPrice);
      setName(name);
      setCapRank(capRank);
      setPriceChange(priceChange.toFixed(4))
    }
  }
  const dataFetch = async (days = "30") => {
    setDays(days);
    const response = await axiosApi.get("coins/" + coinId + "/market_chart", {
      params: {
        vs_currency: "usd",
        days: days,
        interval: "daily",
      },
    });
    const responseArray = response.data.prices.map((elements) => {
      return { x: elements[0], y: elements[1].toFixed(2) };
    });
    setChartData(responseArray);
  };

  useEffect(() => {
    dataFetch();
  }, [coinId]);


  return (
    <SafeAreaView
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: imageUrl !== "" ? imageUrl :  bitcoinUrl}} />
      
      <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabs} onPress={()=>{dataFetch("7")}}>
            <Text style={days === "7" ? styles.tabsTextPress : styles.tabsText}>7 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabs} onPress={()=>{dataFetch("30")}}>
          <Text style={days === "30" ? styles.tabsTextPress : styles.tabsText}>30 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabs} onPress={()=>{dataFetch("90")}}>
          <Text style={days === "90" ? styles.tabsTextPress : styles.tabsText}>90 Days</Text>
          </TouchableOpacity>
      </View>
      <SlideAreaChart
        fillColor={"#121212"}
        chartLineColor={"#66d9ff"}
        data={chartData}
        chartPaddingTop={180}
        height={450}
        scrollable
        style={styles.chartView}
        shouldCancelWhenOutside={false}
        axisWidth={8}
        axisHeight={12}
        paddingBottom={8}
        yAxisProps={{
          verticalLineWidth: 0,
          axisLabel: "Price",
          rotateAxisLabel: true,
          numberOfTicks: 0,
          horizontalLineColor: "#66d9ff",
          horizontalLineWidth: 0,
          
        }}
        xAxisProps={{
          axisLabel: days + " Days",
        }}
        toolTipProps={{
          toolTipTextRenderers: [
            ({ scaleY, y }) => ({
              text: "$" + scaleY.invert(y).toFixed(2).toString(),
            }),
          ],
        }}
        cursorProps={{
          cursorLine: false,
          cursorColor: "#66d9ff"
        }}
      />
      <View style={styles.textArea}>
      <Text style={styles.text}>Coin:</Text>
      <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.textArea}>
      <Text style={styles.text}>Current Price:</Text>
      <Text style={styles.text}>{currentPrice}</Text>
      </View>
      <View style={styles.textArea}>
      <Text style={styles.text}>24h Change:</Text>
      <Text style={styles.text}>{priceChange}</Text>
      </View>
      <View style={styles.textArea}>
      <Text style={styles.text}>Market Cap Ranking:</Text>
      <Text style={styles.text}>{capRank}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  chartView: {
    marginTop: 50,
    marginBottom: 10, 
    backgroundColor: "#121212",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#3A3B3C",
    borderRadius: 5
    
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 75,
    width: 75,
    marginBottom: 20,
    marginTop: 20
  },
  tabBar: {
    flex: 1, 
    flexDirection: "row",
    height: 40,
    marginBottom: 10
  }, 
  tabs: {
    width: Dimensions.get("window").width / 3.5,
    borderWidth: 1,
    borderColor: "#3A3B3C",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginRight: 3,
    marginLeft: 3,
    borderRadius: 5
    
  }, 
  tabsText: {
    color: "#a9a9a9"
  },
  tabsTextPress: {
    color: "#66d9ff"
  },
  textArea:{
    width: "60%",
    justifyContent: "space-between",
    flexDirection: "row" ,
    borderBottomWidth: 1,
    borderColor: "#3A3B3C"
  },
  text: {
    color: "#66d9ff",
    marginBottom: 5,
    marginTop: 5,
    alignSelf: "center",
    fontSize: 16

   
  }

});
