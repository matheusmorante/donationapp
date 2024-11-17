import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddDonationScreen from './screens/AddDonationScreen';
import DonationList from './screens/DonationList';
import { UserProvider } from './context/UserContext'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{
              headerLeft: () => null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{
              headerLeft: () => null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              headerLeft: () => null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Lista de Doação" 
            component={DonationList} 
          />
          <Stack.Screen 
            name="Publicar Doação" 
            component={AddDonationScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;