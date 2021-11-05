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

export const { width: SIZE } = Dimensions.get("window");

export default function Home({ route, navigation }) {
  let bitcoinUrl = "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579";
  const [chartData, setChartData] = useState([]);
  const [coinId, setCoinId] = useState("bitcoin");
  const [imageUrl, serImageUrl] = useState("");
  if (route.params) {
    const { coinParam, imageUrl } = route.params;
    if (coinParam != coinId) {
      setCoinId(coinParam);
      serImageUrl(imageUrl);
      console.log(imageUrl)
    }
  }
  const dataFetch = async () => {
    const response = await axiosApi.get("coins/" + coinId + "/market_chart", {
      params: {
        vs_currency: "usd",
        days: "30",
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

  // const data = [
  //   { x: 1453075200, y: 1.47 },
  //   { x: 1453161600, y: 1.37 },
  //   { x: 1453248000, y: 1.53 },
  //   { x: 1453334400, y: 1.54 },
  //   { x: 1453420800, y: 1.52 },
  //   { x: 1453507200, y: 2.03 },
  //   { x: 1453593600, y: 2.1 },
  //   { x: 1453680000, y: 2.5 },
  //   { x: 1453766400, y: 2.3 },
  //   { x: 1453852800, y: 2.42 },
  //   { x: 1453939200, y: 2.55 },
  //   { x: 1454025600, y: 2.41 },
  //   { x: 1454112000, y: 2.43 },
  //   { x: 1454198400, y: 2.2 },
  // ];

  return (
    <ImageBackground
      source={require("../assets/black.jpg")}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: imageUrl !== "" ? imageUrl :  bitcoinUrl}} />
      <SlideAreaChart
        data={chartData}
        chartPaddingTop={100}
        height={300}
        scrollable
        style={{ backgroundColor: "black" }}
        shouldCancelWhenOutside={false}
        axisWidth={12}
        axisHeight={12}
        paddingBottom={8}
        yAxisProps={{
          verticalLineWidth: 1,
          axisLabel: "Price",
          axisLabelAlignment: "middle",
          rotateAxisLabel: true,
          numberOfTicks: 1,
          hideMarkers: false,
        }}
        xAxisProps={{
          axisLabel: "30 Days",
        }}
        toolTipProps={{
          toolTipTextRenderers: [
            ({ scaleY, y }) => ({
              text: "$" + scaleY.invert(y).toFixed(2).toString(),
            }),
          ],
        }}
      />
    </ImageBackground>
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
  image: {
    height: 60,
    width: 60,
    marginBottom: 40
  },
});
