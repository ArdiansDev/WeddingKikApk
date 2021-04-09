import React, {useState, Component} from 'react';
import {
  Container,
  Header,
  Icon,
  Form,
  Item,
  Input,
  Button,
  Label,
} from 'native-base';

import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {
  const [emailRef, setEmailRef] = useState('');
  const [passwordRef, setPasswordRef] = useState('');

  const handleSubmit = () => {
    if (!emailRef) {
      alert('masukan email');
    }
    if (!passwordRef) {
      alert('masukan password');
    } else {
      auth()
        .signInWithEmailAndPassword(emailRef, passwordRef)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('email/password salah');
          }

          console.error(error);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 3,
          justifyContent: 'flex-end',
          width: '100%',
          paddingBottom: 20,
          paddingHorizontal: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: '#7B287D',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            alignSelf: 'center',
            marginBottom: 80,
          }}>
          WeddingKik
        </Text>
        <Icon
          style={{
            fontSize: 72,
            color: 'white',
            alignSelf: 'center',
          }}
          type="FontAwesome5"
          name="user-lock"
        />
        <Form
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Label
            style={{
              margin: 10,
              color: 'white',
              alignSelf: 'flex-start',
            }}>
            Email
          </Label>
          <Item
            regular
            style={{
              height: 45,
              borderRadius: 15,
              backgroundColor: 'white',
              marginBottom: 20,
            }}>
            <Input onChangeText={text => setEmailRef(text)} />
          </Item>
          <Label
            style={{
              margin: 10,
              color: 'white',
              alignSelf: 'flex-start',
            }}>
            Password
          </Label>
          <Item
            regular
            style={{
              height: 45,
              borderRadius: 15,
              backgroundColor: 'white',
            }}>
            <Input
              secureTextEntry={true}
              onChangeText={text => setPasswordRef(text)}
            />
          </Item>
        </Form>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingVertical: 30,
          paddingHorizontal: 20,

          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          // height: '60%',
          backgroundColor: 'white',
        }}>
        <Button
          style={{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            // alignSelf: 'center',
            width: '66%',
            backgroundColor: '#7067CF',
          }}
          onPress={handleSubmit}>
          <Text
            style={{
              color: 'white',
            }}>
            Login
          </Text>
        </Button>
      </View>
    </View>
  );
}
