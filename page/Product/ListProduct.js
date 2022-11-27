
import React, { useState,useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import { Row, Col } from 'react-native-responsive-grid-system';
import DropDown from "react-native-paper-dropdown";
import ListComponent from '../../component/ListComponent';

export default ListProduct=({ navigation })=>{
    const [loading, setLoading] = useState(false);
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const [list,setProduct]=useState([])
    const [kategoryList,setKategoryList]=useState([])
    const [kategory,setKategory]=useState("")
    const [showSelect, setShowSelect] = useState(false);
    const [filters,setFilter]=useState('')
    const [load,setLoad]=useState(false)
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    const filterList=[
      {label:"Semua",value:""},
      {label:"Harga Rendah",value:"0"},
      {label:"Harga Tinggi",value:"1"}
    ]
    const getList=useCallback(async (cat="")=>{
      setLoading(true)
      try {
        if(cat!=""){
          cat="/category/"+cat
        }
        let res = await fetch(apiUrl+'products'+cat, {
          method: 'GET',
        });
        res= await res.json();
        await setProduct(res)
        setTimeout(() => {
          setLoading(false)
        }, 400);
        
      } catch (e) {
        Alert(e.message)
        console.error(e);
        setProduct([])
        setTimeout(() => {
          setLoading(false)
        }, 400);
      }
    })
    const getKategory=useCallback(async ()=>{
      setLoading(true)
      try {
        let res = await fetch(apiUrl+'products/categories', {
          method: 'GET',
        });
        res= await res.json();
        let arr=[]
        await res.map((val,index)=>{
          if(index==0){
            arr.push({label:'Tampilakn Semua',value:""})
            arr.push({label:val.replace("-"," "),value:val})
          }else{
            arr.push({label:val.replace("-"," "),value:val})
          }
        })
        await setKategoryList(arr)
        setTimeout(() => {
          setLoading(false)
        }, 400);
        
      } catch (e) {
        Alert(e.message)
        console.error(e);
        setKategoryList([])
        setTimeout(() => {
          setLoading(false)
        }, 400);
      }
    })
    const changeKategory=(e)=>{
      setKategory(e)
      getList(e)
    }
    const changeFilter=(e)=>{
      setFilter(e)
      let data=list
      if(e=="0"){
        data.products=data.products.sort((a,b) => a.price > b.price);
        setProduct(data)
      }else
      if(e=="1"){
        data.products=data.products.sort((a,b) => a.price < b.price);
        setProduct(data)
      }else{
        getList(kategory)
      }
    }
    useEffect(()=>{
      if(!load){
        setLoad(true)
        getList()
        getKategory()
        
      }
      
    },[getList,list,setLoad,load])
    return (
      <View style={{ flex: 1,}}>
        <StatusBar backgroundColor={'transparent'} translucent/>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.container}>
          <ScrollView>
          <Row style={styles.w100}>
            <Col xs={8} sm={4} md={3} lg={3} >
              <DropDown
                  label={"Category"}
                  
                  placeholder={"Category"}
                  visible={showMultiSelectDropDown}
                  showDropDown={() => setShowMultiSelectDropDown(true)}
                  onDismiss={() => setShowMultiSelectDropDown(false)}
                  value={kategory}
                  setValue={(e)=>changeKategory(e)}
                
                  list={kategoryList}
              />
            </Col>
            <Col xs={4} sm={4} md={3} lg={3} >
              <DropDown
                  label={"Filter"}
                  placeholder={"Filter"}
                  visible={showSelect}
                  showDropDown={() => setShowSelect(true)}
                  onDismiss={() => setShowSelect(false)}
                  value={filters}
                  setValue={(e)=>changeFilter(e)}
                  list={filterList}
              />
            </Col>
          </Row>
            
            <View style={styles.mt}>
              <Row style={styles.w100}>
                {list.products!=undefined && list.products.map((val,index)=>{
                    return (
                        <Col xs={6} sm={4} md={3} lg={3} key={"col"+index}>
                          <ListComponent data={val} key={index} />
                        </Col>
                      )
                })}
              </Row>
                
            </View>
          </ScrollView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  content:{
    flex: 1,
    backgroundColor: '#ecf0f1',
    
  },
  container: {
    flex: 1,
    paddingTop:10,
    width:"100%",
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#34bee7'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item:{
    borderBottomWidth:1,
    paddingBottom:5,
    paddingTop:5,
    marginBottom:5,
  },
  w100:{
    width:'100%',
  },
  mt:{
    marginTop:10
  },
  
});
