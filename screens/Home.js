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


  return (
    <SafeAreaView
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: imageUrl !== "" ? imageUrl :  bitcoinUrl}} />
      <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabs}>
            <Text style={styles.tabsText}>7 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabs}>
          <Text style={styles.tabsText}>30 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabs}>
          <Text style={styles.tabsText}>90 Days</Text>
          </TouchableOpacity>
      </View>
      <SlideAreaChart
        fillColor={"#121212"}
        chartLineColor={"#66d9ff"}
        data={chartData}
        chartPaddingTop={180}
        height={400}
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
          axisLabel: "30 Days",
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
    marginTop: 60,
    marginBottom: 200, 
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
    height: 60,
    width: 60,
    marginBottom: 50,
    marginTop: 80
  },
  tabBar: {
    flex: 1, 
    flexDirection: "row",
    height: 40,
    marginBottom: 15
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
  }

});
