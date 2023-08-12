import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Catergories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTab";
import SearchBar from "../components/home/SearchBar";
import RestaurantItem, { localRestaurants } from "../components/home/RestaurantItem";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";

const YELP_API_KEY =
  "Zo7gZwCF10Yj7wNRhoPupFK5m6YBlwbleP8gmRKgXcJUGChHvk6lUhjKGuq4FVKpCsrxxKZnzs5ZMlfsfIZd_YN9ttH-pChFDkFkiGkAjQ9JQyrik6ubU31DM04OZHYx";

export default function Home({navigation}) {
  const [restaurantData, setRestaurantData] = React.useState(localRestaurants);
  const [city,setcity]=React.useState("Seattle");
  const[activeTab,setActiveTab]=React.useState("Delivery")
  const getRestaurantsFromyelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };
    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(
        json.businesses.filter((business) =>
      business.transactions.includes(activeTab.toLowerCase()))
        ));
  };
  useEffect(() => {
    getRestaurantsFromyelp();
  }, [city,activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}> </HeaderTabs>
        <SearchBar cityHandler={setcity}></SearchBar>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Catergories></Catergories>
        <RestaurantItem navigation={navigation} restaurantData={restaurantData} ></RestaurantItem>
      </ScrollView>
      <Divider width={1}/>
      <BottomTabs/>
    </SafeAreaView>
  );
}
