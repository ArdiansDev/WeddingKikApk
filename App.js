import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import Scan from './components/Scan';
import Login from './components/Login';
import Home from './components/Home';
import Tamu from './components/Tamu';
import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              // title: 'My home',
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            // title: 'My home',
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          style={styles.create}
          name="Scan"
          component={Scan}
          initialParams={{itemId: user.uid}}
        />
        <Stack.Screen
          style={styles.create}
          name="Tamu"
          component={Tamu}
          initialParams={{itemId: user.uid}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
