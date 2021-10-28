import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Favorites from './screens/Favorites';
import List from './screens/List';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';





const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Main() {
  return (
    
      <Tab.Navigator theme={DarkTheme} initialRouteName="Home" screenOptions={{
        headerShown: false, tabBarActiveTintColor: '#560CCE'
      }} style={styles.tabbar}>
        <Tab.Screen name="List" component={List} options={{
          tabBarIcon: () => (
            <Ionicons name="md-list-circle-outline" color="#560CCE" size={30} padding='20' />),
        }} />
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: () => (<Ionicons name="bar-chart-outline" color="#560CCE" size={30} />),
        }} />
        <Tab.Screen name="Favorites" component={Favorites} options={{
          tabBarIcon: () => (<Ionicons name="heart-circle-outline" color="#560CCE" size={30} />),
        }} />
      </Tab.Navigator>
    
  );
}

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme} >
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="List" component={List}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabbar: {
    paddingBottom: 30
  }

});
