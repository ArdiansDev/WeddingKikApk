import React, {useState, useEffect, useRef} from 'react';
import CheckBox from '@react-native-community/checkbox';
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

const DetailTamu = ({name, UID}) => {
  // console.log(route);
  //   const {itemId} = route.params;

  LogBox.ignoreLogs(['Setting a timer']);

  const [Nama, setNama] = useState([]);
  const [Check, setCheck] = useState();
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

  const update = () => {
    const todoRef = database().ref(UID).child('Name').child(name.id);
    todoRef.update({
      hadir: !name.hadir,
      time: timestamp,
    });
  };

  //   console.log(UID);
  return (
    <ListItem avatar style={{width: '90%'}}>
      <Left>
        <Icon
          type="FontAwesome"
          name="exclamation-triangle"
          style={name.konfirmasi ? {color: 'white'} : {color: 'red'}}
        />
      </Left>
      <Body>
        <Text key={name.id}>{name.title}</Text>
        {/* <Text note>
                Doing what you like will always keep you happy . .
              </Text> */}
      </Body>
      <Right></Right>
      <CheckBox disabled={false} value={name.hadir} onValueChange={update} />
    </ListItem>
  );
};

export default DetailTamu;
