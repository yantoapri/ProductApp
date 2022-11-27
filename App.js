// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, View,LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import ListProduct from './page/Product/ListProduct'
import DetailProduct from './page/Product/DetailProduct';
enableScreens();

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
function App() {
  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="ListProduct" component={ListProduct}  
            options={{
              headerStyle: {
                backgroundColor: '#4d44db',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
            />
            <Stack.Screen name="Detail" component={DetailProduct}
             options={{
              headerStyle: {
                backgroundColor: '#4d44db',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    
  );
}
export default App;