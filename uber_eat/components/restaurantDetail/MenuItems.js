import { View, Text,StyleSheet,Image,ScrollView} from 'react-native'
import { Divider } from "react-native-elements";
import React from 'react'
import BouncyCheckbox from"react-native-bouncy-checkbox"
import{useDispatch} from"react-redux"
import { useSelector } from "react-redux";
const foods=[{
    title:"qqq",
    description:"11",
    price:"4.5",
    image:"https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg"

},
{
  title:"qq1q",
  description:"111",
  price:"4.51",
  image:"https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg"

},
{
  title:"qq1q",
  description:"111",
  price:"4.51",
  image:"https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg"

},{
  title:"qq1q",
  description:"111",
  price:"4.51",
  image:"https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg"

},
]

const styles = StyleSheet.create({
    menuItemStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 20,
    },
  
    titleStyle: {
      fontSize: 19,
      fontWeight: "600",
    },
  });



const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly" }}>
      <Text style={styles.titleStyle}>{props.food.title}</Text>
      <Text>{props.food.description}</Text>
      <Text>{props.food.price}</Text>
    </View>
  );

  const FoodImage = ({ marginLeft, ...props }) => (
    <View>
      <Image
        source={{ uri: props.food.image }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
          marginLeft: marginLeft,
        }}
      />
    </View>
  );




export default function MenuItems(restaurantName) {
  const dispatch =useDispatch();
  const selectItem=(item,checkboxValue)=>
  dispatch({
    type:"ADD_TO_CART",
    payload:{...item,
      restaurantName:restaurantName,
    checkboxValue:checkboxValue }
  });

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );



  const isFoodInCart=(food,cartItems)=> 
    Boolean(cartItems.find((item)=>item.title===food.title))
  






  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    {foods.map((food,index)=>(
      <View key={index}>
      <View style={styles.menuItemStyle}>
        <BouncyCheckbox
        iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
        fillColor="green"
        onPress={(checkboxValue)=>selectItem(food,checkboxValue)}
        isChecked={isFoodInCart(food,cartItems)}/>
        <FoodInfo food={food}/>
        <FoodImage food={food}/>
    </View>
    <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
    </View>
    
    ))}
    </ScrollView>
    
  );
}