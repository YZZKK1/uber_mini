import { View, Text } from "react-native";
import RestaurantItem from "./components/home/RestaurantItem";
import RootNavigation from "./navigation";
import { AppRegistry } from 'react-native';
import Home from "./screens/Home";
import RestaurantDetail from"./screens/RestaurantDetail"

export default function App() {
  return (<RootNavigation/>)
    
  
}
