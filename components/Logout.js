import React, {useRef, useState, Component} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

import {Link, useHistory} from 'react-router-native';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Linking,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './Login';
// import fire from "../fire";
export default function Logout({navigation}) {
  const Logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  };

  return (
    <View>
      <Button title="Logout" onPress={Logout} />
    </View>
  );
}
