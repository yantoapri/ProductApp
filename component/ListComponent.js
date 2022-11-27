
import React, { useState,useEffect, useCallback } from 'react';
import { Chip,Card,Text,Button,Icon } from 'react-native-paper';
import { StyleSheet,View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default ListComponent=(props)=>{
    const navigation = useNavigation();
    const limitText=(str)=>{
      return str.substring(0,20)
    }
    return (
      <>
        <Card style={styles.listItem}>
          <View>
          <Image style={{width:'100%',height:150}} source={{ uri: props.data.thumbnail }}/>
          </View>
          <Text style={styles.price} variant="bodyLarge">
              <Button
                style={{color:'white'}}
                icon="bitcoin"
              >
                {props.data.price} 
                <Text style={styles.stock} variant="bodyLarge"> ({props.data.stock})</Text>
              </Button>
              
            </Text>
          <View style={styles.pd}>
            
            <Text style={styles.title} variant="titleMedium">
              {props.data.title}
            </Text>
            <Text  variant="bodyMedium">
              {limitText(props.data.description)}
            </Text>
            <Button  style={styles.btnFull}  mode="contained" onPress={() => navigation.navigate('Detail',{id:props.data.id})}>
              Detail
            </Button>
          </View>

        </Card>
       
      </>
      
    );
  }
  
  const styles = StyleSheet.create({
    item:{
      borderBottomWidth:1,
      paddingBottom:5,
      paddingTop:5,
      marginBottom:5,
    },
    cover:{
      width:'100%'
    },
    listItem:{
      borderRadius:0,
      flex:1,
      width:"100%",
      minHeight:250,
      backgroundColor:'white',
      color:'white',
      marginBottom:10,
    },
    pd:{
      padding:10
    },
    title:{
      width:'100%',
    },
    price:{
      fontWeight: "bold",
      backgroundColor:'#e7d134',
      width:"100%",
      padding:5,
      color:'white'
    },
    discount:{
      xtDecorationLine: 'line-through',
      color:'white'
    },
    btnFull:{
      marginTop:10,
      width:'100%'
    },
    brand:{
      color:'white',
      backgroundColor:'aqua',
      marginBottom:5,
      marginTop:5
    },
    category:{
      marginBottom:5,
      marginTop:5,
    },
    
    stock:{
      color:'red'
    },
    p0:{
      padding:0,
      textAlign:'left',
      position:'relative',
      color:'white',
      left:-14
    },
    
  });
  