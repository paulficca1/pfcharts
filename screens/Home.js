import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import Background from "../components/background";
import Button from "../components/appButton";
import Logo from "../components/logo";
import { Dimensions } from "react-native";
import axiosApi from "../data/axios";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
  ChartYLabel,
} from "@rainbow-me/animated-charts";

export const { width: SIZE } = Dimensions.get("window");

export default function Home({ route, navigation }) {
  const [chartData, setChartData] = useState([]);

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }
    return `$ ${value.toLocaleString("en-US", {
      currency: "USD",
    })}`;
  };

  // if (route.params) {
  //   const { coinId } = route.params;
  //   console.log(coinId);
  // }else{
  const coinId = "bitcoin";
  // }

  const dataFetch = async () => {
    const response = await axiosApi.get("coins/" + coinId + "/market_chart", {
      params: {
        vs_currency: "usd",
        days: "30",
        interval: "daily",
      },
    });
    const responseArray = response.data.prices.map((elements) => {
      return elements[1].toFixed(2);
    });
    setChartData(responseArray);
    console.log(response.data.prices);
    console.log(responseArray);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const data = [
    { x: 1453075200, y: 1.47 },
    { x: 1453161600, y: 1.37 },
    { x: 1453248000, y: 1.53 },
    { x: 1453334400, y: 1.54 },
    { x: 1453420800, y: 1.52 },
    { x: 1453507200, y: 2.03 },
    { x: 1453593600, y: 2.1 },
    { x: 1453680000, y: 2.5 },
    { x: 1453766400, y: 2.3 },
    { x: 1453852800, y: 2.42 },
    { x: 1453939200, y: 2.55 },
    { x: 1454025600, y: 2.41 },
    { x: 1454112000, y: 2.43 },
    { x: 1454198400, y: 2.2 },
  ];

  const points = monotoneCubicInterpolation({ data, range: 40 });
 

  return (
    <ChartPathProvider data={{ points, smoothingStrategy: "bezier" }}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.container}
      >
        
          <View style={styles.lowerTitles}>
            <ChartYLabel
              format={formatUSD}
              style={{
                color: "green",
                margin: 4,
                fontSize: 24,
                fontWeight: "bold",
              }}
            />
          </View>
          
        
        <View style={styles.chartView}>
        <ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} />
        <ChartDot style={{ backgroundColor: "blue" }} />
        </View>
      </ImageBackground>
    </ChartPathProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  chartView: {
    marginTop: 40,
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
