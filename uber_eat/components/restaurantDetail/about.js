import { View, Text,Image} from 'react-native'
import React from 'react'
const yelpRestaurantInfo={
    name:"thai",
    image:"https://www.thesprucepets.com/thmb/iSt4lkFUtrJEba5pvq-j2y4UPjU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/siamese-fighting-fish-bettas-1378308-hero-f459084da1414308accde7e21001906c.jpg",
    price:"$$",
    reviews:"1500",
    rating:4.5,
    categories:[{title:"thai"},{title:'good food'}]
}



export default function about(props) {
const { name, image, price, reviews, rating, categories } =props.route.params

const formattedCategories = categories.map((cat) => cat.title).join(" • ");

const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;





  return (
    <View>
     <RestaurantImage image={image} />
     <RestaurantName name={name} />
     <RestaurantDescription description={description} />
    </View>
  )
}
const RestaurantImage = (props) => (
    <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
  );

  const RestaurantName = (props) => (
    <Text
      style={{
        fontSize: 29,
        fontWeight: "600",
        marginTop: 10,
        marginHorizontal: 15,
      }}
    >
      {props.name}
    </Text>
  );

  const RestaurantDescription = (props) => (
    <Text
      style={{
        marginTop: 10,
        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
      }}
    >
      {props.description}
    </Text>
  );