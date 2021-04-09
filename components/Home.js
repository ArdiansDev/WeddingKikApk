import React, {useRef, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Label,
  Row,
} from 'native-base';

import Scan from './Scan';
import Tamu from './Tamu';

export default function Home({navigation}) {
  const Logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#7B287D',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          paddingBottom: 50,
          paddingHorizontal: 30,
        }}>
        <Text style={{color: 'white', fontSize: 30}}>WeddingKik</Text>
        <Text style={{color: 'white', fontSize: 20}}>Welcome!</Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 60,
          }}
          onPress={Logout}>
          <Icon
            style={{
              fontSize: 30,
              color: '#CBF3D2',
            }}
            type="AntDesign"
            name="logout"
          />
          <Text
            style={{
              fontSize: 11,
              color: '#CBF3D2',
              right: 5,
            }}>
            Log-out
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flex: 3,
          paddingVertical: 30,
          paddingHorizontal: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          // height: '60%',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Scan')}>
          <Icon
            style={{
              fontSize: 90,
              color: '#7B287D',
            }}
            type="MaterialCommunityIcons"
            name="qrcode-scan"
          />
          <Text
            style={{
              fontSize: 20,
              color: '#7B287D',
            }}>
            Scan QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Tamu')}>
          <Icon
            style={{
              fontSize: 90,
              color: '#7B287D',
            }}
            type="MaterialCommunityIcons"
            name="account-search"
          />
          <Text
            style={{
              fontSize: 20,
              color: '#7B287D',
            }}>
            Cari Tamu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
