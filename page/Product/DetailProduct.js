import React,{ useState,useEffect, useCallback }  from 'react';
import { View, StyleSheet, Image,Text, ScrollView, Dimensions, Animated } from 'react-native';
import { Card,Button,Chip } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
const { width } = Dimensions.get('window');



export default DetailProduct=({ navigation,route })=> {
  const [loading, setLoading] = useState(false);
  const [detail,setProduct]=useState([])
  const [load,setLoad]=useState(false)
  const getDetail=useCallback(async ()=>{
    setLoading(true)
      try {
        let id=route.params.id
        let res = await fetch('https://dummyjson.com/products/'+id, {
          method: 'GET',
        });
        res= await res.json();
        await setProduct(res)
        setTimeout(() => {
          setLoading(false)
        }, 400);
      } catch (e) {
        console.error(e);
        setProduct([])
        setTimeout(() => {
          setLoading(false)
        }, 400);
      }
    })
    useEffect(()=>{
      if(!load){
        setLoad(true)
        getDetail()
      }
    },[getDetail,setLoad,load])
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width);

    return (
      <View style={styles.content}>
        <View >
            <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
            <ScrollView>
              <View
              style={{ width, height: width, }}
              >
                <ScrollView
                  horizontal={true}
                  pagingEnabled={true} 
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                  )} 
                  scrollEventThrottle={16} 
                  >
                  {detail.images!=undefined && detail.images.map((source, i) => {
                    return ( 
                      <Image
                        key={i}
                        style={{ width, height: width }}
                        source={{uri:source}}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View
                style={{position:'relative',top:-50,flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'  }} // this will layout our dots horizontally (row) instead of vertically (column)
                >
                {detail.images!=undefined && detail.images.map((_, i) => {
                  let opacity = position.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp' 
                  });
                  return (
                    <Animated.View 
                      key={i} 
                      style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                    />
                  );
                })}
              </View>
              <View>
                <Card style={styles.price}>
                    <Text variant="titleMedium">
                      <Button
                        icon="bitcoin"
                      >
                        {detail.price} 
                        <Text style={styles.stock} variant="bodyLarge"> ({detail.stock})</Text>
                      </Button>  
                    </Text>
                    
                </Card>
              </View>
              <View style={styles.container}>
                <Text style={{fontSize:25,fontWeight:'bold',marginBottom:5}}>
                  {detail.title}       
                </Text>
                <Text style={{fontSize:15,marginBottom:3}}>
                      <Chip icon="tag">{detail.category}</Chip>
                </Text>
                <Text  variant="bodyLarge">
                  {detail.description}       
                </Text>
                <Text style={styles.rating}>
                  <Button
                  style={{position:'relative',left:-10,padding:0,marginLeft:-15}}
                       contentStyle={{ position:'relative',left:-15,padding:0}}
                        labelStyle={{ color: "#e7d134"}}
                        icon="star"
                      >
                        <Text style={{color:'black'}}>{detail.rating} </Text>
                    </Button> 
                </Text>
              </View>
            </ScrollView>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  content:{
    flex: 1,
    backgroundColor:'white'
    
  },
  container: {
    flex: 1,
    paddingTop:10,
    width:"100%",
    paddingLeft:20,
    paddingRight:20,
    position:'relative',
    top:-20
  },
  price:{
    backgroundColor:'#e7d134',
    width:"100%",
    fontWeight: "bold",
    padding:10,
    color:'white',
    borderRadius:0,
    position:'relative',
    top:-30
  },
  stock:{
    color:"red"
  },
 
})