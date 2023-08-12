import { View, Text, Modal } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from "react-redux";
import {useState} from "react";
import { StyleSheet } from 'react-native';
import Orderitem from"./Orderitem";
import firebase from"../../firebase";


export default function ViewCart() {

    const[modalVisible,setModalVisible]=useState(false)


    const {items,restaurantName} = useSelector(
        (state) => state.cartReducer.selectedItems
      );
      console.log(items)
      console.log(restaurantName)
    
      const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);
         
        const totalUSD = total.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          });

const addOrderToFireBase=()=>{
    const db=firebase.firestone();
    db.collection("orders").add({
        items:items,
        restaurantName:restaurantName.restaurantName,
        createAt:firebase.firestone.FieldValue.serverTimestamp(),

    })
    setModalVisible(false)
}

          const styles = StyleSheet.create({
            modalContainer: {
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.7)",
            },
        
            modalCheckoutContainer: {
              backgroundColor: "white",
              padding: 16,
              height: 500,
              borderWidth: 1,
            },
        
            restaurantName: {
              textAlign: "center",
              fontWeight: "600",
              fontSize: 18,
              marginBottom: 10,
            },
        
            subtotalContainer: {
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            },
        
            subtotalText: {
              textAlign: "left",
              fontWeight: "600",
              fontSize: 15,
              marginBottom: 10,
            },
          });

    const checkoutModalContent=()=>{
        return(
            <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName.restaurantName}</Text>
            {items.map((item,index)=>(
                <Orderitem key={index} item={item}/>
            ))}
            <View style={styles.subtotalContainer}>
                <Text style={styles.subtotalText}>Subtotal</Text>
                <Text>{totalUSD}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"center"}}>
            <TouchableOpacity 
            style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {addOrderToFireBase()
                  setModalVisible(false);}}>
                <Text style={{ color: "white", fontSize: 20 }}>checkout</Text>
                <Text
                style={{
                  position: "absolute",
                  right: 20,
                  color: "white",
                  fontSize: 15,
                  top: 17,
                }}
                
              
              
              
              
              >{total ? totalUSD : ""}</Text>
                
                
                </TouchableOpacity>
            </View>
            </View> 

            </View>
            </>
        );

        return
            (<View style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
                marginTop:30,

            }}>
            <View
                style={{
                    backgroundColor:"black",
                    padding:10,
                    borderRadius:30,
                    width:150,
                    alignItems:"center",
            }}
            >
            <TouchableOpacity onPress={()=>setModalVisible(false)}>
                <Text style={{color:"white"}}>Checkout</Text>
            </TouchableOpacity>
            </View> 
        </View> 
        );
    };



  return (
    <>
    <Modal
    animationType='slide'
    visible={modalVisible}
    transparent={true}
    onRequestClose={()=>setModalVisible(false)}
    
    >{checkoutModalContent()}
    </Modal>
    {total?(
    <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 80,
            zIndex: 999,
          }}
        >
    <View style={{ flexDirection: "row", justifyContent: "center",width:"100%"}}>
        <TouchableOpacity style={{
                marginTop: 20,
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={()=>setModalVisible(true)}>
      <Text style={{color:"white",fontSize:20,marginRight: 100}}>View Cart</Text>
      <Text style={{ color: "white", fontSize: 20 }}>{totalUSD}</Text>
      </TouchableOpacity>
    </View>
    </View>
  ) : (
  <></>
  )}
  </>
  );
}