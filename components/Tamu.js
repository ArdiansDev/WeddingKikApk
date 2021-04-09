import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  Text,
} from 'native-base';

import database from '@react-native-firebase/database';
import {LogBox} from 'react-native';
import DetailTamu from './DetailTamu';

const Tamu = ({route}) => {
  // console.log(route);
  const {itemId} = route.params;

  LogBox.ignoreLogs(['Setting a timer']);

  const [Nama, setNama] = useState([]);
  const [Result, setResult] = useState('');
  const [search, setSearch] = useState('');
  const [FilteredName, setFilteredName] = useState([]);

  function contains(target, pattern) {
    var value = 0;
    pattern.forEach(function (word) {
      value = value + target.includes(word);
    });
    return value === 1;
  }
  let today = new Date();
  const hh = String(today.getHours());
  const mm = String(today.getMinutes());
  const ss = String(today.getSeconds());
  function makeTwoDigits(time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time;
    return `0${time}`;
  }
  const timestamp = `${makeTwoDigits(hh)}${makeTwoDigits(mm)}${makeTwoDigits(
    ss,
  )}`;

  useEffect(() => {
    // update();
    const nameRef = database().ref(itemId).child('Name');
    nameRef.on('value', snapshot => {
      const names = snapshot.val();
      const nameList = [];
      for (let id in names) {
        nameList.push({id, ...names[id]});
      }
      //   const List = [...nameList];

      setNama(nameList);
    });
  }, []);

  useEffect(() => {
    setFilteredName(
      Nama.filter(hasil =>
        hasil.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, Nama]);

  return (
    <View>
      <Item
        regular
        style={{
          borderRadius: 15,
          backgroundColor: 'white',

          marginTop: 40,
        }}>
        <Icon type="AntDesign" name="search1" style={{color: '#384850'}} />
        <Input
          style={{}}
          placeholder="Search Name"
          onChangeText={text => setSearch(text)}
        />
      </Item>
      <ScrollView>
        <List>
          {FilteredName.map(name => (
            <DetailTamu key={name.id} name={name} UID={itemId} />
          ))}
        </List>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTrue: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  containerFalse: {
    backgroundColor: 'red',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,

    color: 'black',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Tamu;
